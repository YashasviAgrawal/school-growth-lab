"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clamp, useScrollFrame } from "@/lib/motion";

const STEPS = [
  ["Discover", "We study your school, your brand, your workflows and what growth means to you."],
  ["Design", "We design your website and app screens in your identity. You approve every pixel."],
  ["Build & configure", "We build the website and configure the ERP to your fee structure, classes and grading."],
  ["Launch", "Your apps go live under your school's name on iOS and Android. We train your staff."],
  ["Grow", "Ongoing support, updates and a growth review with your leadership every term."],
];

export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const fillV = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(1);

  useScrollFrame((_, vh) => {
    const el = list.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = clamp((vh * 0.78 - r.top) / (r.height + vh * 0.15));
    if (fill.current) fill.current.style.transform = `scaleX(${p.toFixed(4)})`;
    if (fillV.current) fillV.current.style.transform = `scaleY(${p.toFixed(4)})`;
    setReached(Math.max(1, Math.ceil(p * STEPS.length + 0.001)));
  });

  return (
    <section id="process" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Our process</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            From first conversation to App Store. <span className="font-serif font-normal italic tracking-[-0.01em]">In five clear steps.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-[17px] leading-relaxed text-muted">
            One team, one timeline, one point of contact. You approve every screen before anything goes live.
          </p>
        </Reveal>

        <ol ref={list} className="relative mt-16 grid gap-9 pl-12 md:grid-cols-5 md:gap-6 md:pl-0">
          <span aria-hidden="true" className="absolute left-[22px] top-0 h-full w-px bg-line md:left-[22px] md:right-0 md:top-[22px] md:h-px md:w-auto">
            <span ref={fill} className="absolute inset-0 hidden origin-left bg-ink md:block" style={{ transform: "scaleX(0)" }} />
            <span ref={fillV} className="absolute inset-0 origin-top bg-ink md:hidden" style={{ transform: "scaleY(0)" }} />
          </span>
          {STEPS.map(([h, p], i) => {
            const on = i < reached;
            return (
              <li key={h} className="relative">
                <span
                  className={`absolute -left-12 top-0 grid h-[45px] w-[45px] place-items-center rounded-full border font-serif text-[20px] italic transition-all duration-500 ease-out-expo md:static ${
                    on ? "scale-100 border-ink bg-ink text-white" : "scale-90 border-line bg-paper text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className={`font-display text-[18px] font-semibold tracking-[-0.015em] transition-colors duration-500 md:mt-6 ${on ? "text-ink" : "text-faint"}`}>{h}</h3>
                <p className={`mt-2 text-[14.5px] leading-relaxed transition-colors duration-500 ${on ? "text-muted" : "text-faint"}`}>{p}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
