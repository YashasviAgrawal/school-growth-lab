"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  delay?: number;
  variant?: "up" | "scale";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

/** Fades, de-blurs and lifts its content in when it scrolls into view (once). */
export function Reveal({ as, delay = 0, variant = "up", className, style, children, id }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-shown", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant === "scale" ? "scale" : ""}
      className={className}
      style={{ ...style, ["--d" as string]: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
