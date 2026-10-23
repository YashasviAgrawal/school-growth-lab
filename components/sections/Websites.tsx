"use client";

import { useRef, useState, type ReactNode } from "react";
import { Browser, Phone } from "@/components/mocks/Frames";
import { SiteAdmissions, SiteHome, SiteMobile, SiteNotices } from "@/components/mocks/Sites";
import { useSchool } from "@/components/mocks/SchoolContext";
import { FitScale } from "@/components/ui/FitScale";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clamp, useScrollFrame } from "@/lib/motion";

const STEPS = [
  ["Designed around your identity", "Your crest, colours, campus photography and voice, crafted into a site that feels unmistakably yours from the first scroll."],
  ["Dynamic, not brochureware", "Notices, events, galleries, results and faculty update from a simple dashboard. No developer, no waiting."],
  ["Built to fill seats", "Clear admission journeys, smart enquiry forms and WhatsApp click-to-chat turn curious visitors into campus visits."],
  ["Fast, findable, mobile-first", "Most parents meet your school on a phone. Your site loads fast on every one and is set up to be found on Google."],
];

function Visual({ i }: { i: number }) {
  const { school } = useSchool();
  const page: ReactNode[] = [
    <Browser key="0" url={`www.${school.domain}`} className="w-[860px]"><SiteHome /></Browser>,
    <Browser key="1" url={`www.${school.domain}/notices`} className="w-[860px]"><SiteNotices /></Browser>,
    <Browser key="2" url={`www.${school.domain}/admissions`} className="w-[860px]"><SiteAdmissions /></Browser>,
    <div key="3" className="flex justify-center"><Phone screenClass="bg-white"><SiteMobile /></Phone></div>,
  ];
  return (
    <FitScale width={i === 3 ? 420 : 880} height={640} max={i === 3 ? 0.9 : 1}>
      <div className="flex h-full items-center justify-center">{page[i]}</div>
    </FitScale>
  );
}

export function Websites() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const rail = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useScrollFrame((_, vh) => {
    let best = 0;
    let bestD = Infinity;
    steps.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - vh * 0.5);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
    if (list.current && rail.current) {
      const r = list.current.getBoundingClientRect();
      rail.current.style.transform = `scaleY(${clamp((vh * 0.5 - r.top) / r.height).toFixed(4)})`;
    }
  });

  return (
    <section id="websites" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>School Websites</SectionLabel>
          <h2 className="mt-6 max-w-[15ch] font-display text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            A website that works as hard as{" "}
            <span className="font-serif font-normal italic tracking-[-0.01em]">your admissions team.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-4 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div ref={list} className="relative lg:pl-10">
            <span aria-hidden="true" className="absolute bottom-[30vh] left-0 top-[30vh] hidden w-px bg-line lg:block">
              <span ref={rail} className="absolute inset-0 origin-top bg-ink" style={{ transform: "scaleY(0)" }} />
            </span>
            {STEPS.map(([h, p], i) => (
              <div
                key={h}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                className="flex flex-col justify-center py-8 lg:min-h-[76vh] lg:py-0"
              >
                <div className={`transition-[opacity,transform] duration-500 ease-out-expo ${active === i ? "lg:translate-x-0 lg:opacity-100" : "lg:-translate-x-1 lg:opacity-30"}`}>
                  <span className="font-serif text-[26px] italic leading-none text-muted">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">{h}</h3>
                  <p className="mt-3 max-w-[40ch] text-[16px] leading-relaxed text-muted">{p}</p>
                </div>
                <div className="mt-8 lg:hidden">
                  <Visual i={i} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-[96px] flex h-[calc(100vh-120px)] items-center">
              <div className="relative w-full">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    aria-hidden={active !== i}
                    className={`transition-[opacity,transform,filter] duration-700 ease-out-expo ${i === 0 ? "relative" : "absolute inset-0"} ${
                      active === i ? "opacity-100 blur-0" : "pointer-events-none translate-y-6 scale-[0.96] opacity-0 blur-[6px]"
                    }`}
                  >
                    <Visual i={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
