"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import * as I from "@/components/ui/Icons";
import { useSchool } from "@/components/mocks/SchoolContext";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useInterval, useInView, useReducedMotion } from "@/lib/motion";

const MODULES: [string, string, ReactNode][] = [
  ["Admissions & Enquiries", "From first enquiry to enrolment, every lead tracked.", <I.UserPlus key="a" size={17} />],
  ["Student Information", "One complete profile for every child.", <I.IdCard key="b" size={17} />],
  ["Exams & Report Cards", "Your grading system, your report card design.", <I.FileText key="c" size={17} />],
  ["Timetable", "Clash-free schedules and substitutions.", <I.Clock key="d" size={17} />],
  ["Homework & Diary", "Assignments and class notes, sent home instantly.", <I.NotebookPen key="e" size={17} />],
  ["Transport & Live Tracking", "Routes, stops and live bus location for parents.", <I.Bus key="f" size={17} />],
  ["HR & Payroll", "Staff records, leave and salary in one place.", <I.Users key="g" size={17} />],
  ["Library & Inventory", "Books, assets and stock, always accounted for.", <I.Library key="h" size={17} />],
  ["Reports & Analytics", "Your whole school, on one dashboard.", <I.BarChart key="i" size={17} />],
];

function Feature({ visual, icon, title, body, delay }: { visual: ReactNode; icon: ReactNode; title: string; body: string; delay: number }) {
  return (
    <Reveal delay={delay} className="flex flex-col rounded-[28px] border border-line bg-white p-3 shadow-card transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift">
      <div className="h-[210px] overflow-hidden rounded-[20px] bg-school-soft/70 p-5">{visual}</div>
      <div className="px-3 pb-3 pt-5">
        <h3 className="flex items-center gap-2 font-display text-[18px] font-semibold tracking-[-0.015em]">
          <span className="text-school">{icon}</span>
          {title}
        </h3>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{body}</p>
      </div>
    </Reveal>
  );
}

function FeesVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref);
  const bars = [38, 52, 46, 62, 56, 72, 66, 92];
  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <span>
          <span className="text-[12px] text-muted">Collected this term</span>
          <b className="block font-display text-[26px] font-semibold tracking-tight text-ink">₹1.84 Cr</b>
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-school shadow-[0_1px_2px_rgb(0_0_0/.05)]">UPI · Cards</span>
      </div>
      <div className="mt-auto flex h-[96px] items-end gap-2">
        {bars.map((h, i) => (
          <i
            key={i}
            className={`block flex-1 origin-bottom rounded-t-[6px] transition-transform duration-[900ms] ease-out-expo ${i === bars.length - 1 ? "bg-school" : "bg-school/30"}`}
            style={{ height: `${h}%`, transform: on ? "scaleY(1)" : "scaleY(0.08)", transitionDelay: `${i * 70}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

const CLASS = ["AK", "DS", "RM", "IP", "VJ", "AN", "KB", "SR", "TM", "YG", "NH", "PL"];

function AttendanceVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-muted">Grade 7A · Period 1</span>
        <b className="font-semibold text-school">33 / 34 present</b>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-2">
        {CLASS.map((c, i) => {
          const absent = c === "SR";
          return (
            <span
              key={c}
              className={`grid aspect-square place-items-center rounded-full text-[10.5px] font-semibold transition-[background-color,color,transform] duration-500 ${
                absent ? "bg-white text-red-500 ring-1 ring-red-300" : on ? "bg-school text-white" : "bg-white text-faint"
              }`}
              style={{ transitionDelay: on ? `${200 + i * 90}ms` : "0ms", transform: on ? "scale(1)" : "scale(.9)" }}
            >
              {c}
            </span>
          );
        })}
      </div>
      <span
        className="mt-auto flex items-center gap-1.5 text-[12px] font-medium text-body transition-opacity duration-500"
        style={{ opacity: on ? 1 : 0, transitionDelay: on ? "1400ms" : "0ms" }}
      >
        <span className="grid h-4 w-4 place-items-center rounded-full bg-mint text-white">
          <I.Check size={10} />
        </span>
        Parents notified instantly
      </span>
    </div>
  );
}

function CircularsVisual() {
  const { school } = useSchool();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: false });
  const [n, setN] = useState(0);
  const msgs = [
    ["2m", "Annual Day rehearsal moved to 3 PM"],
    ["1h", "PTM for Grades 6–8 this Saturday"],
    ["3h", "Winter uniform from Monday, 18 November"],
    ["1d", "Term 2 fee instalment due by 15 November"],
  ];
  useInterval(() => setN((v) => v + 1), 2600, on && !reduced);
  const visible = [0, 1, 2].map((k) => ({ key: n + k, msg: msgs[(n + k) % msgs.length] })).reverse();
  return (
    <div ref={ref} className="relative h-full">
      {visible.map(({ key, msg }, slot) => {
        const depth = 2 - slot; // 0 = front
        return (
          <div
            key={key}
            className="absolute inset-x-0 top-0 flex items-start gap-2.5 rounded-2xl bg-white p-3 shadow-[0_6px_18px_-10px_rgb(11_11_15/.25)] transition-all duration-700 ease-out-expo"
            style={{ transform: `translateY(${depth * 62}px) scale(${1 - depth * 0.04})`, opacity: depth > 1 ? 0.55 : 1, zIndex: 10 - depth } as CSSProperties}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-school text-white">
              <I.Bell size={13} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between text-[10.5px] text-muted">
                {school.short}
                <span>{msg[0]}</span>
              </span>
              <b className="block truncate text-[12.5px] font-semibold text-ink">{msg[1]}</b>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Erp() {
  return (
    <section id="erp" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <SectionLabel>School ERP</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Everything your school runs on. <span className="font-serif font-normal italic tracking-[-0.01em]">Wearing your colours.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[50ch] text-[17px] leading-relaxed text-muted">
            One connected platform for management, teachers and parents, configured to your fee structures, grading system and daily routines.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Feature delay={0} visual={<FeesVisual />} icon={<I.Rupee size={17} />} title="Fees & Online Payments" body="UPI, cards and net banking with automatic receipts." />
          <Feature delay={100} visual={<AttendanceVisual />} icon={<I.ClipboardCheck size={17} />} title="Attendance" body="One tap for teachers, instant alerts for parents." />
          <Feature delay={200} visual={<CircularsVisual />} icon={<I.Megaphone size={17} />} title="Circulars & Notifications" body="Reach every parent in seconds, in your voice." />
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(([t, d, icon], i) => (
            <Reveal
              as="li"
              key={t}
              delay={(i % 3) * 80}
              className="group rounded-[24px] border border-line bg-white p-5 shadow-[0_1px_2px_rgb(11_11_15/.04)] transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-transparent hover:shadow-lift"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-school-soft text-school transition-colors duration-300 group-hover:bg-school group-hover:text-white">
                {icon}
              </span>
              <h3 className="mt-4 font-display text-[16.5px] font-semibold tracking-[-0.01em]">{t}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">{d}</p>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-center text-[15px] text-muted">
          Start with what you need and add more as you grow.{" "}
          <a href="#contact" className="font-semibold text-ink underline-offset-4 hover:underline">
            Book a demo →
          </a>
        </p>
      </div>
    </section>
  );
}
