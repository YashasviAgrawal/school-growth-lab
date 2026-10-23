"use client";

import { useRef, type CSSProperties } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STATS: { value: React.ReactNode; label: string }[] = [
  { value: <CountUp to={100} suffix="%" />, label: "of screens in your colours, crest and voice" },
  { value: <CountUp to={2} />, label: "app stores listing your school's own name" },
  { value: "24×7", label: "online fee payments via UPI, cards & net banking" },
  { value: "1 tap", label: "attendance for teachers, with instant alerts to parents" },
];

export function Stats() {
  const card = useRef<HTMLDivElement>(null);
  return (
    <section aria-labelledby="stats-h" className="relative py-10 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-3 sm:px-8">
        <Reveal variant="scale">
          <div
            ref={card}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
            }}
            className="relative isolate overflow-hidden rounded-[36px] bg-ink px-6 py-14 sm:px-12 sm:py-20"
            style={{ "--gx": "18%", "--gy": "10%" } as CSSProperties}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 transition-[background-position] duration-300"
              style={{
                background:
                  "radial-gradient(520px circle at var(--gx) var(--gy), color-mix(in oklab, var(--school-primary) 70%, transparent), transparent 60%), radial-gradient(600px circle at 95% 100%, rgb(255 138 61 / .22), transparent 60%)",
              }}
            />
            <SectionLabel dark>What changes</SectionLabel>
            <h2 id="stats-h" className="mt-6 max-w-[17ch] font-display text-[clamp(2rem,1.2rem+3vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
              What your school gains <span className="font-serif font-normal italic tracking-[-0.01em]">when its brand comes first.</span>
            </h2>
            <div className="mt-12 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.label} className={`p-6 sm:p-7 ${i > 0 ? "border-t border-white/10 sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-white/10" : ""} ${i === 2 ? "sm:border-t sm:border-white/10 lg:border-l lg:border-t-0" : ""} ${i === 3 ? "sm:border-t sm:border-white/10 lg:border-t-0" : ""}`}>
                  <b className="block font-display text-[clamp(2.4rem,1.8rem+2vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-white">{s.value}</b>
                  <span className="mt-3 block max-w-[24ch] text-[14px] leading-relaxed text-white/60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
