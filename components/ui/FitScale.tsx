"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Renders children on a fixed design canvas (width × height) and scales it to
 * fit its container, keeping intricate product mocks pixel-perfect at every size.
 * `contain` fits both dimensions of a parent with its own height (centred);
 * otherwise the canvas scales to the container's width and sets its own height.
 */
export function FitScale({
  width,
  height,
  children,
  className = "",
  max = 1,
  contain = false,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
  max?: number;
  contain?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(contain ? 0.5 : 1);
  useIsoLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => {
      const byW = el.clientWidth / width;
      const byH = contain ? el.clientHeight / height : Infinity;
      setScale(Math.min(max, byW, byH));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height, max, contain]);
  return (
    <div ref={box} className={`relative w-full ${contain ? "h-full" : ""} ${className}`} style={contain ? undefined : { height: height * scale }}>
      <div
        className={`absolute left-1/2 ${contain ? "top-1/2" : "top-0"} origin-top`}
        style={{ width, height, transform: contain ? `translate(-50%, -50%) scale(${scale})` : `translateX(-50%) scale(${scale})`, transformOrigin: contain ? "center" : "top center" }}
      >
        {children}
      </div>
    </div>
  );
}
