"use client";

import { useRef, useState } from "react";
import { Phone } from "@/components/mocks/Frames";
import { HomeScreen } from "@/components/mocks/Apps";
import { FitScale } from "@/components/ui/FitScale";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useInterval, useInView, useReducedMotion } from "@/lib/motion";

const ITEMS = [
  ["Your app name & icon", "Listed under your school's name on the App Store and Google Play."],
  ["Your colours, fonts & crest", "Applied with care to every screen, receipt and report card."],
  ["Your rules & routines", "Fee heads, grading scales, houses, terms and sections, exactly as you run them."],
  ["Your domain & email", "Everything lives on your school's own web address."],
  ["Your voice", "Launch screen, notifications and messages that sound like your school."],
  ["Your data", "Owned by your school, always. Export it whenever you want."],
];

export function Personalised() {
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(box, { once: false, threshold: 0.4, rootMargin: "0px" });
  const [note, setNote] = useState(true);
  // The bus notification drops in, rests, leaves, and comes back — like a real lock-screen alert.
  useInterval(() => setNote((v) => !v), note ? 4200 : 1100, inView && !reduced);

  return (
    <section id="personalised" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal variant="scale">
          <div ref={box} className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#ece9ff] via-[#f8eef6] to-[#ffeede] px-6 pt-10 sm:px-10 sm:pt-14">
            <span className="absolute left-8 top-8 h-4 w-4 rotate-12 rounded-[3px] bg-sun" aria-hidden="true" />
            <span className="absolute bottom-24 right-8 h-3.5 w-3.5 -rotate-12 rounded-[3px] bg-mint" aria-hidden="true" />
            <div className="mx-auto max-w-[330px] translate-y-[8%]">
              <FitScale width={300} height={560}>
                <div className={inView ? "sgl-installed" : ""}>
                  <Phone darkStatus={false} screenClass="bg-transparent">
                    <HomeScreen showNote={note} />
                  </Phone>
                </div>
              </FitScale>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Truly personalised</SectionLabel>
            <h2 className="mt-6 max-w-[13ch] font-display text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Personalised isn&apos;t a theme. <span className="font-serif font-normal italic tracking-[-0.01em]">It&apos;s the whole thing.</span>
            </h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-muted">
              Most vendors call a logo upload “customisation”. We design and configure everything around your school.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {ITEMS.map(([h, p], i) => (
              <Reveal as="li" key={h} delay={(i % 2) * 90} className="border-t border-line py-5">
                <span className="font-serif text-[18px] italic text-school">0{i + 1}</span>
                <h3 className="mt-1.5 font-display text-[16.5px] font-semibold tracking-[-0.01em]">{h}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
