"use client";

import { useRef } from "react";
import * as I from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useInView } from "@/lib/motion";

const ROWS = [
  ["App listed under your school's name", "Yes", "Vendor's name & logo"],
  ["Custom design in your brand", "Every screen", "Logo swap, at best"],
  ["Website, ERP and apps from one team", "Yes", "Rarely"],
  ["Configured to your workflows", "Fees, grading, houses, terms", "You adapt to theirs"],
  ["Onboarding & staff training", "Dedicated, on-site or online", "Self-serve videos"],
  ["Who owns your school's data", "Your school", "Varies by contract"],
];

export function Why() {
  const table = useRef<HTMLDivElement>(null);
  const on = useInView(table, { threshold: 0.25 });
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <Reveal className="text-center">
          <SectionLabel>Why School Growth Lab</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Built for you, <span className="font-serif font-normal italic tracking-[-0.01em]">not for everyone.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-relaxed text-muted">
            Off-the-shelf ERPs are built to be sold to every school. We build for one school at a time.
          </p>
        </Reveal>

        <div ref={table} className="mt-14 hidden overflow-x-auto rounded-[28px] border border-line bg-white shadow-card sm:block">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
            <caption className="sr-only">School Growth Lab compared with an off-the-shelf school ERP</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[40%] px-6 py-5 font-medium text-muted">
                  Feature
                </th>
                <th scope="col" className="relative w-[32%] overflow-hidden bg-ink px-6 py-5 font-semibold text-white">
                  <span className="flex items-center gap-2">
                    <LogoMark size={20} tone="light" /> School Growth Lab
                  </span>
                  {on && (
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: "shimmer 1.6s .4s cubic-bezier(.16,1,.3,1) both" }} />
                  )}
                </th>
                <th scope="col" className="px-6 py-5 font-medium text-muted">
                  Off-the-shelf ERP
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([f, us, them], i) => (
                <tr
                  key={f}
                  className="border-t border-line transition-[opacity,transform] duration-700 ease-out-expo"
                  style={{ opacity: on ? 1 : 0.001, transform: on ? "none" : "translateY(10px)", transitionDelay: `${150 + i * 90}ms` }}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-ink">
                    {f}
                  </th>
                  <td className="bg-ink px-6 py-4 text-white">
                    <span className="flex items-center gap-2.5">
                      <I.Check size={15} className="shrink-0 text-mint" />
                      {us}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    <span className="flex items-center gap-2.5">
                      <I.Minus size={14} className="shrink-0 text-faint" />
                      {them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-12 grid gap-3 sm:hidden">
          {ROWS.map(([f, us, them], i) => (
            <Reveal as="li" key={f} delay={i * 60} className="overflow-hidden rounded-3xl border border-line bg-white">
              <p className="px-5 pb-3 pt-4 font-display text-[16px] font-semibold text-ink">{f}</p>
              <p className="flex items-center gap-2.5 bg-ink px-5 py-3 text-[14.5px] text-white">
                <I.Check size={15} className="shrink-0 text-mint" />
                <span><span className="sr-only">School Growth Lab: </span>{us}</span>
              </p>
              <p className="flex items-center gap-2.5 px-5 py-3 text-[14px] text-muted">
                <I.Minus size={14} className="shrink-0 text-faint" />
                <span><span className="text-faint">Off-the-shelf: </span>{them}</span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
