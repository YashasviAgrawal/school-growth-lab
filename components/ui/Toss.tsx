"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { clamp, lerp } from "@/lib/motion";

/* Lets a decorative object be picked up, swung and tossed. It glides to a stop,
   bounces off the edges of the nearest [data-stage], and tilts in 3D under the cursor. */

let topZ = 40;

export function Toss({ children, rot = 0, onGrab }: { children: ReactNode; rot?: number; onGrab?: () => void }) {
  const el = useRef<HTMLDivElement>(null);
  const st = useRef({
    x: 0, y: 0, vx: 0, vy: 0, r: rot, rx: 0, ry: 0, s: 1,
    goalRx: 0, goalRy: 0, goalS: 1,
    drag: false, px: 0, py: 0, raf: 0,
    minX: 0, maxX: 0, minY: 0, maxY: 0,
  });

  useEffect(() => () => cancelAnimationFrame(st.current.raf), []);

  const tick = () => {
    const s = st.current;
    const n = el.current;
    if (!n) return;
    if (s.drag) {
      // Holding still lets the swing settle.
      s.vx *= 0.8;
      s.vy *= 0.8;
    } else {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.93;
      s.vy *= 0.93;
      if (s.x < s.minX || s.x > s.maxX) {
        s.x = clamp(s.x, s.minX, s.maxX);
        s.vx *= -0.55;
      }
      if (s.y < s.minY || s.y > s.maxY) {
        s.y = clamp(s.y, s.minY, s.maxY);
        s.vy *= -0.55;
      }
    }
    const goalR = rot + (s.drag ? clamp(s.vx * 1.4, -22, 22) : 0);
    s.r = lerp(s.r, goalR, 0.14);
    s.rx = lerp(s.rx, s.goalRx, 0.14);
    s.ry = lerp(s.ry, s.goalRy, 0.14);
    s.s = lerp(s.s, s.goalS, 0.2);
    n.style.transform = `perspective(900px) translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0) rotate(${s.r.toFixed(2)}deg) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) scale(${s.s.toFixed(3)})`;
    const settling =
      Math.abs(s.vx) + Math.abs(s.vy) > 0.05 ||
      Math.abs(s.r - goalR) + Math.abs(s.rx - s.goalRx) + Math.abs(s.ry - s.goalRy) > 0.05 ||
      Math.abs(s.s - s.goalS) > 0.001;
    s.raf = s.drag || settling ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => {
    if (!st.current.raf) st.current.raf = requestAnimationFrame(tick);
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const n = e.currentTarget;
    n.setPointerCapture(e.pointerId);
    const s = st.current;
    const stage = n.closest("[data-stage]")?.getBoundingClientRect();
    if (stage) {
      const r = n.getBoundingClientRect();
      s.minX = Math.min(s.x, s.x - (r.left - stage.left));
      s.maxX = Math.max(s.x, s.x + (stage.right - r.right));
      s.minY = Math.min(s.y, s.y - (r.top - stage.top));
      s.maxY = Math.max(s.y, s.y + (stage.bottom - r.bottom));
    }
    s.drag = true;
    s.px = e.clientX;
    s.py = e.clientY;
    s.vx = s.vy = 0;
    s.goalRx = s.goalRy = 0;
    s.goalS = 1.08;
    if (n.parentElement) n.parentElement.style.zIndex = String(++topZ);
    n.style.cursor = "grabbing";
    onGrab?.();
    wake();
  };

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (s.drag) {
      const dx = e.clientX - s.px;
      const dy = e.clientY - s.py;
      s.px = e.clientX;
      s.py = e.clientY;
      s.x = clamp(s.x + dx, s.minX, s.maxX);
      s.y = clamp(s.y + dy, s.minY, s.maxY);
      s.vx = lerp(s.vx, dx, 0.6);
      s.vy = lerp(s.vy, dy, 0.6);
      return;
    }
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    s.goalRy = ((e.clientX - r.left) / r.width - 0.5) * 18;
    s.goalRx = -((e.clientY - r.top) / r.height - 0.5) * 18;
    s.goalS = 1.04;
    wake();
  };

  const up = (e: PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (!s.drag) return;
    s.drag = false;
    s.goalS = 1;
    e.currentTarget.style.cursor = "";
    wake();
  };

  const leave = () => {
    const s = st.current;
    if (s.drag) return;
    s.goalRx = s.goalRy = 0;
    s.goalS = 1;
    wake();
  };

  return (
    <div
      ref={el}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={leave}
      className="pointer-events-auto cursor-grab touch-none select-none"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {children}
    </div>
  );
}
