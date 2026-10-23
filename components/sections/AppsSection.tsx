"use client";

import { useEffect, useRef, useState } from "react";
import * as I from "@/components/ui/Icons";
import { AppIcon, Browser, Phone } from "@/components/mocks/Frames";
import { ParentApp, TeacherApp } from "@/components/mocks/Apps";
import { ErpDashboard } from "@/components/mocks/Sites";
import { useSchool } from "@/components/mocks/SchoolContext";
import { FitScale } from "@/components/ui/FitScale";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useInterval, useInView, useReducedMotion } from "@/lib/motion";

const TABS = [
  {
    id: "parent",
    label: "Parent App",
    title: "Everything about their child, in your school's hands.",
    body: "Parents open your app, not a vendor's, every time they check attendance, pay fees or read a circular.",
    points: ["Daily attendance & instant alerts", "One-tap fee payment with UPI", "Homework, diary & circulars", "Report cards & progress", "Live school bus tracking", "Leave requests & teacher chat"],
  },
  {
    id: "teacher",
    label: "Teacher App",
    title: "Less paperwork. More teaching.",
    body: "Everything a teacher needs between periods, designed to be finished in seconds.",
    points: ["One-tap class attendance", "Homework & class diary", "Marks entry & report cards", "Timetable & substitutions", "Class announcements", "Leave & payslips"],
  },
  {
    id: "management",
    label: "Management",
    title: "Your whole school, at a glance.",
    body: "Principals and trustees see fees, admissions, attendance and staff live, from any device.",
    points: ["Live fee collection & dues", "Admissions pipeline", "Attendance trends", "Staff & payroll overview", "Custom reports & exports", "Role-based access control"],
  },
];

const STORY_MS = 6500;

export function AppsSection() {
  const { school } = useSchool();
  const reduced = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const inView = useInView(section, { once: false, threshold: 0.35, rootMargin: "0px" });
  const playing = auto && inView && !reduced;
  useInterval(() => setTab((t) => (t + 1) % TABS.length), STORY_MS, playing);

  useEffect(() => {
    const el = bar.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[tab];
    if (!el || !ind.current) return;
    ind.current.style.width = `${el.offsetWidth}px`;
    ind.current.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [tab]);

  const t = TABS[tab];

  return (
    <section ref={section} id="apps" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="text-center">
          <SectionLabel>Parent &amp; Teacher apps</SectionLabel>
          <h2 className="mx-auto mt-6 font-display text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Three apps. Each one <br className="hidden sm:block" />
            <span className="font-serif font-normal italic tracking-[-0.01em]">unmistakably yours.</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <div
            ref={bar}
            role="tablist"
            aria-label="Apps"
            className="relative flex gap-1 rounded-full border border-line bg-white p-1.5 shadow-card"
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              setAuto(false);
              const next = (tab + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
              setTab(next);
              bar.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
            }}
          >
            <span ref={ind} aria-hidden="true" className="absolute left-0 top-1.5 h-[calc(100%-12px)] overflow-hidden rounded-full bg-ink transition-[transform,width] duration-500 ease-out-expo">
              {playing && <i key={tab} className="absolute inset-x-4 bottom-[5px] h-[2px] origin-left rounded-full bg-white/60" style={{ animation: `progress ${STORY_MS}ms linear both` }} />}
            </span>
            {TABS.map((x, i) => (
              <button
                key={x.id}
                role="tab"
                id={`tab-${x.id}`}
                aria-selected={tab === i}
                aria-controls={`panel-${x.id}`}
                tabIndex={tab === i ? 0 : -1}
                onClick={() => {
                  setAuto(false);
                  setTab(i);
                }}
                className={`relative z-10 h-10 rounded-full px-4 text-[14px] font-medium transition-colors duration-300 sm:px-5 ${tab === i ? "text-white" : "text-body hover:text-ink"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>

        <div id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div key={t.id} className="word-in" style={{ animationDelay: "0ms" }}>
            <h3 className="max-w-[18ch] font-display text-[clamp(1.8rem,1.3rem+1.8vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em]">{t.title}</h3>
            <p className="mt-4 max-w-[44ch] text-[16.5px] leading-relaxed text-muted">{t.body}</p>
            <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15px] text-body">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-school/10 text-school">
                    <I.Check size={12} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            {t.id === "parent" && (
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-5 shadow-card">
                <AppIcon size={44} />
                <span>
                  <b className="block text-[14px] font-semibold text-ink">{school.name}</b>
                  <span className="text-[12.5px] text-muted">Published as your school&apos;s own app on the App Store and Google Play.</span>
                </span>
              </div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-school-soft via-white to-[#f3eefc] p-6 sm:p-10">
            <div className="relative aspect-[5/6] sm:aspect-[6/5]">
              {TABS.map((x, i) => (
                <div
                  key={x.id}
                  aria-hidden={tab !== i}
                  className={`absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-out-expo ${
                    tab === i ? "opacity-100 blur-0" : `pointer-events-none opacity-0 blur-[6px] ${i > tab ? "translate-x-8" : "-translate-x-8"}`
                  }`}
                >
                  <FitScale contain width={x.id === "management" ? 900 : 320} height={x.id === "management" ? 560 : 640}>
                    <div className="flex h-full items-center justify-center">
                      {x.id === "parent" && (
                        <Phone>
                          <ParentApp />
                        </Phone>
                      )}
                      {x.id === "teacher" && (
                        <Phone>
                          <TeacherApp />
                        </Phone>
                      )}
                      {x.id === "management" && (
                        <Browser url={`erp.${school.domain}`} className="w-[880px]">
                          <ErpDashboard />
                        </Browser>
                      )}
                    </div>
                  </FitScale>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
