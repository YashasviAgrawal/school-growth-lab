"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import * as I from "@/components/ui/Icons";
import { Browser, Phone } from "@/components/mocks/Frames";
import { ParentApp, TeacherApp } from "@/components/mocks/Apps";
import { SiteAbout, SiteMobile } from "@/components/mocks/Sites";
import { useSchool } from "@/components/mocks/SchoolContext";
import { FitScale } from "@/components/ui/FitScale";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

function SpotCard({ children, href, label, title, body, cta, delay }: { children: ReactNode; href: string; label: string; title: string; body: string; cta: string; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Reveal delay={delay} variant="scale">
      <Link
        ref={ref}
        href={href}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="group relative block overflow-hidden rounded-[32px] border border-line bg-white shadow-card transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift"
        style={{ "--mx": "70%", "--my": "20%" } as CSSProperties}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklab, var(--school-primary) 10%, transparent), transparent 65%)" }}
        />
        <div className="relative h-[clamp(240px,30vw,340px)] overflow-hidden bg-gradient-to-b from-school-soft to-white">
          <div className="absolute inset-x-0 top-6 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.02]">{children}</div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative z-20 border-t border-line p-7 sm:p-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
          <h3 className="mt-2.5 font-display text-[clamp(1.4rem,1.1rem+1vw,1.75rem)] font-semibold leading-tight tracking-[-0.025em]">{title}</h3>
          <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-muted">{body}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-ink">
            {cta}
            <I.ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Products() {
  const { school } = useSchool();
  return (
    <section id="products" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="text-center">
          <SectionLabel>What we do</SectionLabel>
          <h2 className="mx-auto mt-6 font-display text-[clamp(2.2rem,1.3rem+3.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Two products.
            <br />
            <span className="font-serif font-normal italic tracking-[-0.01em]">One brand.</span> Entirely yours.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <SpotCard
            href="/websites"
            label="School Websites"
            title="A website as distinguished as your campus."
            body="Dynamic, admissions-ready and designed around your identity, not a theme."
            cta="Explore websites"
            delay={0}
          >
            <FitScale width={720} height={470}>
              <div className="relative h-full">
                <Browser url={`www.${school.domain}`} className="absolute left-[34px] top-0 w-[540px]">
                  <SiteAbout />
                </Browser>
                <div className="absolute right-[30px] top-[64px] origin-top-right scale-[0.62]">
                  <Phone screenClass="bg-white">
                    <SiteMobile />
                  </Phone>
                </div>
              </div>
            </FitScale>
          </SpotCard>

          <SpotCard
            href="/erp"
            label="School ERP & Apps"
            title="Run your school in your own colours."
            body="Admissions, fees, attendance, exams and communication, with Parent and Teacher apps designed in your brand."
            cta="Explore the ERP"
            delay={120}
          >
            <FitScale width={720} height={470}>
              <div className="relative h-full">
                <div className="absolute left-[150px] top-[40px] origin-top-left scale-[0.66]">
                  <Phone>
                    <TeacherApp />
                  </Phone>
                </div>
                <div className="absolute left-[345px] top-0 origin-top-left scale-[0.74]">
                  <Phone>
                    <ParentApp />
                  </Phone>
                </div>
              </div>
            </FitScale>
          </SpotCard>
        </div>

        <Reveal as="p" className="mx-auto mt-8 max-w-[44ch] text-center text-[15px] text-muted">
          Better together: one design language, from your homepage to your parents&apos; home screen.
        </Reveal>
      </div>
    </section>
  );
}
