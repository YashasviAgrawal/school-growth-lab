"use client";

import { useRef } from "react";
import Link from "next/link";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { CONTACT } from "@/lib/schools";
import { clamp, useScrollFrame } from "@/lib/motion";

export function Footer() {
  const giant = useRef<HTMLDivElement>(null);

  // The oversized wordmark rises into place as the page reaches its end.
  useScrollFrame((_, vh) => {
    const el = giant.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const p = clamp((vh - r.top) / (r.height * 1.1));
    el.style.transform = `translate3d(0, ${(1 - p) * 40}%, 0)`;
    el.style.opacity = String(0.2 + p * 0.8);
  });

  const col = "text-[11px] font-medium uppercase tracking-[0.16em] text-faint";
  const link = "text-[14px] text-body transition-colors hover:text-ink";

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 pb-10 pt-16 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="group flex items-center gap-2.5">
            <LogoMark size={28} />
            <Wordmark className="text-[15px]" />
          </Link>
          <p className="mt-4 max-w-[30ch] text-[14px] leading-relaxed text-muted">
            Brand-first digital growth for schools. Websites, ERP and apps designed for schools that care about their brand.
          </p>
        </div>
        <div>
          <h4 className={col}>Products</h4>
          <ul className="mt-4 space-y-2.5">
            <li><Link className={link} href="/websites">School Websites</Link></li>
            <li><Link className={link} href="/erp">School ERP</Link></li>
            <li><Link className={link} href="/erp#apps">Parent App</Link></li>
            <li><Link className={link} href="/erp#apps">Teacher App</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={col}>Company</h4>
          <ul className="mt-4 space-y-2.5">
            <li><Link className={link} href="/process">Our process</Link></li>
            <li><Link className={link} href="/faq">FAQ</Link></li>
            <li><a className={link} href="#contact">Book a demo</a></li>
          </ul>
        </div>
        <div>
          <h4 className={col}>Get in touch</h4>
          <ul className="mt-4 space-y-2.5">
            <li><a className={link} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><a className={link} href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
            <li><a className={link} href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
            <li><a className={link} href={CONTACT.maps} target="_blank" rel="noopener noreferrer">{CONTACT.city}</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] overflow-hidden px-5 pb-6 sm:px-8" aria-hidden="true">
        <div
          ref={giant}
          className="select-none whitespace-nowrap text-center font-display text-[clamp(2.6rem,9.6vw,8.6rem)] font-semibold leading-[0.85] tracking-[-0.055em] text-ink/[0.07] will-change-transform"
        >
          School Growth <span className="font-serif font-normal italic tracking-[-0.02em]">Lab</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-2 border-t border-line px-5 pb-[calc(24px+env(safe-area-inset-bottom,0px))] pt-6 text-[12.5px] text-muted sm:px-8">
        <span>© 2026 School Growth Lab. All rights reserved.</span>
        <span>Made in India, for schools that care about their brand.</span>
      </div>
    </footer>
  );
}
