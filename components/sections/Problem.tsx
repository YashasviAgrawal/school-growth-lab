"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Phone, StatusBar } from "@/components/mocks/Frames";
import { ParentApp, VendorApp } from "@/components/mocks/Apps";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal } from "@/components/ui/WordReveal";
import { useInView, useReducedMotion } from "@/lib/motion";

const PAINS = [
  ["The same app as the school down the road", "Generic ERPs ship one app to thousands of schools. Your parents can't tell you apart."],
  ["Your brand disappears when it matters most", "Fees, results and attendance are the moments parents care about, and they happen inside a vendor's app."],
  ["Software that makes you fit its rules", "Rigid modules force your fee heads, grading and routines into someone else's idea of a school."],
];

function CompareSlider() {
  const box = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const inView = useInView(box, { threshold: 0.5 });
  const reduced = useReducedMotion();
  const touched = useRef(false);

  // A small "nudge" the first time it is seen, so people know it drags.
  useEffect(() => {
    if (!inView || reduced || touched.current) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      if (touched.current) return;
      const k = Math.min(1, (t - t0) / 1800);
      setX(50 + Math.sin(k * Math.PI * 2) * 26 * (1 - k));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-[300px] max-w-full justify-between text-[11px] font-semibold uppercase tracking-[0.14em]">
        <span className="text-muted">Off-the-shelf ERP</span>
        <span className="text-ink">Your school&apos;s app</span>
      </div>
      <div ref={box} className="relative h-[560px] w-[270px] select-none" style={{ touchAction: "pan-y" }}>
        <div className="absolute left-0 top-0 origin-top-left scale-[0.9]">
          <Phone screenClass="bg-[#eef0f3]">
            <VendorApp />
            <div className="absolute inset-0 bg-[#f6f6f4]" style={{ clipPath: `inset(0 0 0 ${x}%)` } as CSSProperties}>
              <div className="absolute inset-x-0 top-0">
                <StatusBar />
                <ParentApp />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 z-40 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(11_11_15/.08)]" style={{ left: `${x}%` }}>
              <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-white shadow-lift">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 6-5 6 5 6M15 6l5 6-5 6" />
                </svg>
              </span>
            </div>
          </Phone>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(x)}
          aria-label="Compare an off-the-shelf ERP app with your school's own app"
          onChange={(e) => {
            touched.current = true;
            setX(Number(e.target.value));
          }}
          className="absolute inset-0 z-50 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="mt-5 text-center text-[13.5px] text-muted">Drag to see the difference parents notice every single day.</p>
    </div>
  );
}

export function Problem() {
  return (
    <section id="problem" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionLabel>The problem</SectionLabel>
        <WordReveal
          as="h2"
          className="mt-6 max-w-[21ch] font-display text-[clamp(2.1rem,1.2rem+3vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
          parts={[
            { t: "Your school spent decades earning its name. Then it handed parents an app with" },
            { t: "someone else's logo", serif: true },
            { t: "on it." },
          ]}
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <CompareSlider />
          <ol className="grid gap-4">
            {PAINS.map(([h, p], i) => (
              <Reveal
                as="li"
                key={h}
                delay={i * 110}
                className="group rounded-3xl border border-line bg-white p-6 shadow-card transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex gap-5">
                  <span className="font-serif text-[30px] italic leading-none text-faint transition-colors group-hover:text-school">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[19px] font-semibold tracking-[-0.015em]">{h}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
