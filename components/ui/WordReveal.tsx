"use client";

import { useEffect, useRef, type ElementType } from "react";
import { progressOf, useScrollFrame } from "@/lib/motion";

export type Part = { t: string; serif?: boolean };

type Props = {
  parts: Part[];
  as?: ElementType;
  className?: string;
  dark?: boolean;
  /** Viewport fractions (top edge) where lighting starts and finishes. */
  start?: number;
  end?: number;
  id?: string;
};

/** Words light up from grey to ink as the reader scrolls through them. */
export function WordReveal({ parts, as, className = "", dark, start = 0.9, end = 0.35, id }: Props) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const words = useRef<HTMLElement[]>([]);
  const lit = useRef(-1);

  useEffect(() => {
    words.current = Array.from(ref.current?.querySelectorAll<HTMLElement>(".lit-word") ?? []);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.current.forEach((w) => w.setAttribute("data-lit", ""));
    }
  }, []);

  useScrollFrame((_, vh) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const p = progressOf(el, vh, start, end);
    const n = Math.round(p * words.current.length);
    if (n === lit.current) return;
    lit.current = n;
    words.current.forEach((w, i) => {
      if (i < n) w.setAttribute("data-lit", "");
      else w.removeAttribute("data-lit");
    });
  });

  let k = 0;
  return (
    <Tag ref={ref} id={id} className={`${dark ? "lit-dark " : ""}${className}`}>
      {parts.map((part, pi) => {
        const ws = part.t.split(" ").filter(Boolean);
        const inner = ws.map((w, wi) => (
          <span key={`${pi}-${wi}`} className="lit-word" data-i={k++}>
            {w}
            {wi < ws.length - 1 ? " " : ""}
          </span>
        ));
        return part.serif ? (
          <span key={pi} className="font-serif font-normal italic tracking-[-0.01em]">
            {inner}{" "}
          </span>
        ) : (
          <span key={pi}>{inner} </span>
        );
      })}
    </Tag>
  );
}
