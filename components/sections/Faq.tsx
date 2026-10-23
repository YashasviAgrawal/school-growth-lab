"use client";

import { useState } from "react";
import * as I from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT } from "@/lib/schools";
import { FAQS } from "@/lib/content";



export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1000px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,1.3rem+3vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Questions principals <span className="font-serif font-normal italic tracking-[-0.01em]">ask us.</span>
          </h2>
          <p className="mt-4 max-w-[30ch] text-[15.5px] leading-relaxed text-muted">Didn&apos;t find your question? We reply within one working day.</p>
          <a
            href={`mailto:${CONTACT.email}?subject=A%20question%20about%20School%20Growth%20Lab`}
            className="group mt-6 inline-flex h-11 items-center gap-1.5 rounded-full border border-line bg-white px-5 text-[14px] font-semibold text-ink shadow-[0_1px_2px_rgb(11_11_15/.05)] transition-colors hover:bg-paper-2"
          >
            Ask us anything <I.ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[17px] font-medium tracking-[-0.01em] text-ink"
                  >
                    {q}
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo ${
                        isOpen ? "rotate-45 bg-ink text-white" : "bg-ink/[0.05] text-ink"
                      }`}
                    >
                      <I.Plus size={15} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[58ch] pb-6 pr-12 text-[15.5px] leading-relaxed text-muted">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
