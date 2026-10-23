"use client";

import { useRef } from "react";
import * as I from "@/components/ui/Icons";
import { DoodleBus, DoodleCap, DoodlePencil } from "@/components/ui/Doodles";
import { CONTACT } from "@/lib/schools";
import { useScrollFrame } from "@/lib/motion";

export function Cta() {
  const box = useRef<HTMLDivElement>(null);

  // Doodles and confetti drift at different depths as the card passes (wajo-style ghosts).
  useScrollFrame((_, vh) => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const rel = r.top + r.height / 2 - vh / 2;
    el.querySelectorAll<HTMLElement>("[data-depth]").forEach((n) => {
      n.style.transform = `translate3d(0, ${(rel * Number(n.dataset.depth)).toFixed(1)}px, 0)`;
    });
  });

  return (
    <section id="contact" className="relative px-3 py-10 sm:px-8 sm:py-16">
      <div ref={box} className="relative isolate mx-auto max-w-[1180px] overflow-hidden rounded-[40px] border border-white bg-white/60 px-6 py-20 text-center shadow-card sm:py-28">
        <div className="aurora -z-10 opacity-90" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          <span data-depth="0.12" className="absolute left-[9%] top-[18%] block h-5 w-5 rotate-12 rounded-[3px] bg-mint" />
          <span data-depth="0.22" className="absolute right-[11%] top-[22%] block h-4 w-4 -rotate-12 rounded-[3px] bg-spark" />
          <span data-depth="0.18" className="absolute bottom-[18%] left-[18%] block h-4 w-4 rotate-45 rounded-[3px] bg-sun" />
          <span data-depth="0.26" className="absolute bottom-[14%] right-[20%] block h-3.5 w-3.5 rotate-6 rounded-[3px] bg-lilac" />
          <span data-depth="0.1" className="absolute left-[6%] top-[46%] block w-[92px] text-ink"><DoodleCap className="w-full" /></span>
          <span data-depth="0.2" className="absolute right-[5%] top-[50%] block w-[104px] text-ink"><DoodleBus className="w-full" /></span>
          <span data-depth="0.16" className="absolute right-[24%] top-[8%] block w-[56px] text-ink"><DoodlePencil className="w-full" /></span>
        </div>

        <h2 className="mx-auto max-w-[17ch] font-display text-[clamp(2.2rem,1.3rem+3.6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          Give your school the digital presence <span className="font-serif font-normal italic tracking-[-0.01em]">it has earned.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-[17px] leading-relaxed text-body">
          Book a 30-minute demo. We&apos;ll show you your school&apos;s website and app, in your colours, before you commit to anything.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={CONTACT.demoMail}
            className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-ink pl-7 pr-6 text-[15.5px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(11_11_15/0.55)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book a free demo <I.ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center gap-2 rounded-full border border-line bg-white px-6 text-[15.5px] font-semibold text-ink transition-colors hover:bg-paper-2"
          >
            <I.WhatsApp size={17} className="text-[#25d366]" /> Chat on WhatsApp
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-muted">
          <a href={CONTACT.phoneHref} className="inline-flex items-center gap-1.5 hover:text-ink">
            <I.Phone size={14} /> {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 hover:text-ink">
            <I.Mail size={14} /> {CONTACT.email}
          </a>
          <a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
            <I.MapPin size={14} /> {CONTACT.city}
          </a>
        </div>
      </div>
    </section>
  );
}
