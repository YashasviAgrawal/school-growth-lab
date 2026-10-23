"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import * as I from "@/components/ui/Icons";
import { AppIcon, Toast } from "@/components/mocks/Frames";
import { useSchool } from "@/components/mocks/SchoolContext";
import { FitScale } from "@/components/ui/FitScale";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clamp, stickyProgress, useInView, useInterval, useMediaQuery, useReducedMotion, useScrollFrame } from "@/lib/motion";

/* ---------------------------------------------------------------
   ERP TOUR — on large screens the stage pins while you scroll: the
   laptop lid opens, the school's crest boots up, then each feature
   step swaps the screen to that module. Scroll progress drives the
   --open / --boot / --shift / --sp variables styled in globals.css.
   Smaller screens get the same story played once, then auto-cycled.
---------------------------------------------------------------- */

const STEPS = [
  { nav: "Dashboard", title: "Your whole school, at a glance", body: "Students, staff, fees and attendance on one live dashboard." },
  { nav: "Fees", title: "Fees, tracked to the rupee", body: "Every payment, receipt and pending amount, class by class. Reminders go out on their own." },
  { nav: "Attendance", title: "Attendance in one tap", body: "Teachers mark it on their phone. The office sees it live and parents get an alert." },
  { nav: "Timetable", title: "Timetables that build themselves", body: "Set the rules once. Clashes and substitutions are handled for you." },
];

const STICK_TOP = 84; // keep in sync with lg:top-[84px] on the stage
const FEAT = 0.3; // scroll progress where the feature steps begin
const STEP_LEN = (1 - FEAT) / STEPS.length;
const CYCLE_MS = 4200;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 3;

export function ErpTour() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const desk = useMediaQuery("(min-width: 1024px)");
  const [phase, setPhase] = useState(0); // 0 dark · 1 booting · 2 app
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const seen = useInView(section, { once: true, threshold: 0.25 });
  const inView = useInView(section, { once: false, threshold: 0.1, rootMargin: "0px" });

  // Large screens: the whole story is a function of scroll position.
  const sync = () => {
    const sec = section.current;
    const st = stage.current;
    if (!desk || !sec || !st) return;
    const p = stickyProgress(sec, st, STICK_TOP);
    const rel = (p - FEAT) / STEP_LEN;
    const current = Math.min(STEPS.length - 1, Math.max(0, Math.floor(rel)));
    const shift = reduced ? 1 : easeOut(clamp((p - 0.24) / 0.1));
    st.style.setProperty("--open", (reduced ? 1 : easeInOut(clamp(p / 0.16))).toFixed(4));
    st.style.setProperty("--boot", clamp((p - 0.1) / 0.14).toFixed(4));
    st.style.setProperty("--shift", shift.toFixed(4));
    st.style.setProperty("--sp", clamp(rel - current).toFixed(4));
    if (list.current) list.current.style.pointerEvents = shift > 0.5 ? "" : "none";
    setPhase(reduced || p >= 0.25 ? 2 : p >= 0.1 ? 1 : 0);
    setStep(current);
  };
  useScrollFrame(sync);
  useEffect(sync, [desk, reduced]);

  // Smaller screens: open and boot once when the section is first seen.
  useEffect(() => {
    const st = stage.current;
    if (desk || !seen || !st) return;
    if (list.current) list.current.style.pointerEvents = "";
    st.style.setProperty("--shift", "0");
    st.style.setProperty("--open", "1");
    if (reduced) {
      st.style.setProperty("--boot", "1");
      setPhase(2);
      return;
    }
    const boot = window.setTimeout(() => {
      setPhase(1);
      st.style.setProperty("--boot", "1");
    }, 700);
    const app = window.setTimeout(() => setPhase(2), 1900);
    return () => {
      window.clearTimeout(boot);
      window.clearTimeout(app);
    };
  }, [desk, seen, reduced]);

  useInterval(() => setStep((s) => (s + 1) % STEPS.length), CYCLE_MS, !desk && phase === 2 && auto && inView && !reduced);

  const go = (i: number) => {
    if (!desk) {
      setAuto(false);
      setStep(i);
      return;
    }
    const sec = section.current;
    const st = stage.current;
    if (!sec || !st) return;
    const range = sec.offsetHeight - st.offsetHeight;
    const top = sec.getBoundingClientRect().top + window.scrollY - STICK_TOP + (FEAT + (i + 0.08) * STEP_LEN) * range;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={section} id="erp-tour" aria-labelledby="erp-tour-h" className="relative px-3 pb-6 pt-4 sm:px-6 lg:h-[400vh] lg:p-0">
      <div
        ref={stage}
        className="tour relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[32px] bg-ink px-5 pb-6 pt-12 sm:rounded-[40px] sm:px-10 sm:pb-10 lg:sticky lg:top-[84px] lg:h-[min(calc(100svh-100px),800px)] lg:p-0"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 520px at 50% -10%, color-mix(in oklab, var(--school-primary) 60%, transparent), transparent 70%), radial-gradient(600px 420px at 12% 105%, rgb(255 138 61 / .14), transparent 70%)",
          }}
        />

        <div className="tour-head text-center">
          <SectionLabel dark>The ERP</SectionLabel>
          <h2
            id="erp-tour-h"
            className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2rem,1.2rem+2.6vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white lg:max-w-none"
          >
            Your whole school. <span className="font-serif font-normal italic tracking-[-0.01em]">One screen.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/60">
            Fees, attendance, timetables and teachers, run from one place your office already understands.
          </p>
        </div>

        <div className="tour-laptop relative mx-auto mt-10 w-full max-w-[600px] lg:mt-0 lg:max-w-none" aria-hidden="true">
          <Laptop>
            <Screen phase={phase} step={step} />
          </Laptop>
        </div>

        <div ref={list} className="tour-list mt-8 grid gap-2.5 lg:mt-0">
          {STEPS.map((s, i) => {
            const on = i === step;
            return (
              <button
                key={s.nav}
                type="button"
                onClick={() => go(i)}
                aria-current={on ? "step" : undefined}
                className={`relative w-full overflow-hidden rounded-2xl border py-4 pl-6 pr-4 text-left transition-[background-color,border-color,opacity] duration-500 ${
                  on ? "border-white/15 bg-white/[0.07]" : "border-white/[0.06] opacity-50 hover:opacity-80"
                }`}
              >
                <span className="absolute inset-y-4 left-0 w-[3px] overflow-hidden rounded-full bg-white/10">
                  {on && (
                    <i
                      key={step}
                      className="step-bar block h-full w-full rounded-full bg-white"
                      style={desk ? undefined : auto && !reduced ? { animation: `progress-y ${CYCLE_MS}ms linear both` } : undefined}
                    />
                  )}
                </span>
                <span className="flex items-baseline gap-3">
                  <span className="text-[12px] font-semibold tabular-nums text-white/40">0{i + 1}</span>
                  <span>
                    <b className="block font-display text-[17px] font-semibold tracking-[-0.01em] text-white">{s.title}</b>
                    <span className="mt-1 block text-[14px] leading-relaxed text-white/60">{s.body}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="tour-hint pointer-events-none absolute inset-x-0 bottom-[2.5%] hidden justify-center lg:flex" aria-hidden="true">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            Scroll to open
            <span className="animate-float [animation-duration:1.8s]">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- the laptop ---------- */

// Keys laid out on the deck's trapezoid (viewBox units), so rows widen toward the front edge.
const KEYS = (() => {
  const keys: { x: number; y: number; w: number }[] = [];
  for (let r = 0; r < 5; r++) {
    const y = 9 + r * 10.5;
    const left = 70 - 0.7 * (y + 4);
    const right = 930 + 0.7 * (y + 4);
    const start = left + (right - left) * 0.1;
    const end = right - (right - left) * 0.1;
    const units = r === 4 ? [1, 1, 1, 1.3, 5.6, 1.3, 1, 1, 1] : Array<number>(14).fill(1);
    const gap = 5;
    const unit = (end - start - gap * (units.length - 1)) / units.reduce((a, b) => a + b, 0);
    let x = start;
    for (const u of units) {
      keys.push({ x, y, w: unit * u });
      x += unit * u + gap;
    }
  }
  return keys;
})();

function Laptop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative [perspective:2400px] [perspective-origin:50%_20%]">
        <div className="tour-lid relative mx-auto w-[86%]">
          <div className="relative rounded-t-[16px] rounded-b-[3px] bg-[#0c0c10] px-[1.7%] pb-[2.4%] pt-[1.7%] ring-1 ring-white/10">
            <i className="absolute left-1/2 top-[0.8%] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#2a2a31]" />
            <div className="relative overflow-hidden rounded-[3px] bg-black">
              <FitScale width={960} height={600}>
                {children}
              </FitScale>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/.07),transparent_38%)]" />
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1000 112" className="relative block w-full">
          <defs>
            <linearGradient id="tour-deck" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#dcdee3" />
              <stop offset="1" stopColor="#c3c6cd" />
            </linearGradient>
            <linearGradient id="tour-lip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#aeb1b9" />
              <stop offset="1" stopColor="#85888f" />
            </linearGradient>
          </defs>
          <path d="M70 0H930L1000 100H0Z" fill="url(#tour-deck)" />
          <path d="M70 0H930L932 3H68Z" fill="#9fa2aa" />
          <path d="M144 6H856L889 63H111Z" fill="#b2b5bd" opacity=".55" />
          {KEYS.map((k, i) => (
            <rect key={i} x={k.x} y={k.y} width={k.w} height="8" rx="1.6" fill="#1c1e25" />
          ))}
          <path d="M338 68H662L669 94H331Z" fill="#d2d5db" stroke="#b7bac2" strokeWidth="1" />
          <path d="M0 100H1000V104Q1000 112 990 112H10Q0 112 0 104Z" fill="url(#tour-lip)" />
          <rect x="440" y="100" width="120" height="4" rx="2" fill="#777a82" />
        </svg>
      </div>
      <div className="absolute inset-x-[6%] -bottom-[3%] -z-10 h-[9%] rounded-[50%] bg-black/70 blur-2xl" />
    </>
  );
}

/* ---------- what's on the screen ---------- */

function Screen({ phase, step }: { phase: number; step: number }) {
  const { school } = useSchool();
  return (
    <div className="relative h-[600px] w-[960px] overflow-hidden bg-[#08080b]">
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black transition-opacity duration-500 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
        <span className="rounded-[26px] shadow-[0_0_70px_-8px_var(--school-primary)]">
          <AppIcon size={104} />
        </span>
        <b className="font-display text-[24px] font-semibold tracking-[-0.02em] text-white">{school.name}</b>
        <span className="h-[5px] w-[240px] overflow-hidden rounded-full bg-white/15">
          <i className="tour-boot block h-full w-full rounded-full bg-white" />
        </span>
      </div>
      <div className={`absolute inset-0 transition-opacity duration-700 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>{phase >= 2 && <ErpApp step={step} />}</div>
    </div>
  );
}

const NAV: [string, ReactNode][] = [
  ["Dashboard", <I.LayoutGrid key="d" size={14} />],
  ["Students", <I.Users key="s" size={14} />],
  ["Fees", <I.Wallet key="f" size={14} />],
  ["Attendance", <I.ClipboardCheck key="a" size={14} />],
  ["Timetable", <I.Clock key="t" size={14} />],
  ["Exams & Results", <I.FileText key="e" size={14} />],
  ["Transport", <I.Bus key="b" size={14} />],
  ["Announcements", <I.Megaphone key="n" size={14} />],
  ["Reports", <I.BarChart key="r" size={14} />],
];

const card = "rounded-2xl border border-line bg-white";
const rise = (i: number): CSSProperties => ({ animation: `pane-in .6s var(--ease-out-expo) ${i * 60}ms both` });

function ErpApp({ step }: { step: number }) {
  const { school } = useSchool();
  const active = STEPS[step].nav;
  return (
    <div className="flex h-full w-full bg-[#f7f7f5] text-[13px] text-body">
      <aside className="flex w-[196px] shrink-0 flex-col border-r border-line bg-white px-3 py-4">
        <div className="flex items-center gap-2 px-1.5">
          <AppIcon size={30} />
          <span className="min-w-0 leading-tight">
            <b className="block truncate text-[13px] font-semibold text-ink">{school.short}</b>
            <span className="text-[10.5px] text-muted">School ERP</span>
          </span>
        </div>
        <nav className="mt-5 space-y-0.5">
          {NAV.map(([label, icon]) => (
            <span
              key={label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] font-medium transition-colors duration-500 ${
                label === active ? "bg-school text-white" : "text-body"
              }`}
            >
              {icon}
              {label}
            </span>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-school-soft p-3 text-[11px] text-school">
          <b className="block text-[12px]">Session 2026–27</b>
          Term 2 · Week 8
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <b className="font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">{active}</b>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-[190px] items-center gap-2 rounded-lg border border-line bg-white px-2.5 text-[11.5px] text-faint">
              <I.Search size={13} /> Search students, staff…
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white text-muted">
              <I.Bell size={14} />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-school text-[11px] font-semibold text-white">RK</span>
          </div>
        </div>
        <div key={step} className="mt-4 min-h-0 flex-1">
          {step === 0 ? <Dashboard /> : step === 1 ? <Fees /> : step === 2 ? <Attendance /> : <Timetable />}
        </div>
      </div>
    </div>
  );
}

type Tone = "green" | "amber" | "red" | "brand";
const TONES: Record<Tone, string> = {
  green: "bg-[#e7f7ee] text-[#1f8a55]",
  amber: "bg-[#fff3df] text-[#b7791f]",
  red: "bg-[#fdeaea] text-[#c0392b]",
  brand: "bg-school-soft text-school",
};

function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${TONES[tone]}`}>{children}</span>;
}

const NOTICES: [string, string, string, Tone][] = [
  ["PTM for Grades 6–8 on Saturday", "Today · 9:10 AM", "High", "red"],
  ["Annual Day rehearsal moved to 3 PM", "Yesterday", "Update", "amber"],
  ["Winter uniform from Monday", "2 days ago", "Info", "brand"],
];

function Dashboard() {
  const stats: [string, string, string, ReactNode][] = [
    ["Students", "2,418", "+3.2% this term", <I.Users key="s" size={15} />],
    ["Teachers", "132", "6 on leave today", <I.User key="t" size={15} />],
    ["Fees collected", "₹1.84 Cr", "86% of term target", <I.Wallet key="f" size={15} />],
    ["Attendance today", "96.4%", "2,331 present", <I.ClipboardCheck key="a" size={15} />],
  ];
  const week: [string, number][] = [
    ["Mon", 94],
    ["Tue", 96],
    ["Wed", 92],
    ["Thu", 97],
    ["Fri", 95],
    ["Sat", 89],
  ];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-4 gap-3">
        {stats.map(([label, value, sub, icon], i) => (
          <div key={label} className={`${card} p-3.5`} style={rise(i)}>
            <span className="flex items-center justify-between text-[11.5px] text-muted">
              {label}
              <span className="text-school">{icon}</span>
            </span>
            <b className="mt-1.5 block font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">{value}</b>
            <span className="text-[10.5px] text-muted">{sub}</span>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.6fr_1fr] gap-3">
        <div className={`${card} flex flex-col p-4`} style={rise(4)}>
          <div className="flex items-center justify-between">
            <b className="text-[13px] font-semibold text-ink">Attendance this week</b>
            <span className="text-[10.5px] text-muted">All grades</span>
          </div>
          <div className="mt-3 flex flex-1 items-end gap-4 border-b border-line px-2">
            {week.map(([d, v], i) => (
              <div key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-[10px] font-semibold text-ink">{v}%</span>
                <i
                  className={`block w-full origin-bottom rounded-t-md ${i === 3 ? "bg-school" : "bg-school/35"}`}
                  style={{ height: `${(v - 80) * 4}%`, animation: `bar-grow .9s var(--ease-out-expo) ${250 + i * 70}ms both` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-4 px-2">
            {week.map(([d]) => (
              <span key={d} className="flex-1 text-center text-[10px] text-muted">
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className={`${card} p-4`} style={rise(5)}>
          <div className="flex items-center justify-between">
            <b className="text-[13px] font-semibold text-ink">Announcements</b>
            <span className="text-[10.5px] font-semibold text-school">View all</span>
          </div>
          <ul className="mt-3 space-y-2.5">
            {NOTICES.map(([t, when, tag, tone], i) => (
              <li key={t} className="rounded-xl border border-line p-2.5" style={rise(6 + i)}>
                <span className="flex items-center justify-between gap-2">
                  <b className="truncate text-[11.5px] font-semibold text-ink">{t}</b>
                  <Chip tone={tone}>{tag}</Chip>
                </span>
                <span className="mt-1 block text-[10px] text-muted">{when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const FEE_ROWS: [string, string, string, string, Tone, string][] = [
  ["Aarav Sharma", "7A", "₹42,500", "UPI", "green", "Paid"],
  ["Diya Nair", "5B", "₹38,000", "Card", "green", "Paid"],
  ["Kabir Mehta", "9C", "₹46,000", "—", "amber", "Pending"],
  ["Ishita Rao", "3A", "₹31,500", "Net banking", "green", "Paid"],
  ["Vihaan Gupta", "11B", "₹52,000", "—", "red", "Overdue"],
  ["Anaya Iyer", "7A", "₹42,500", "UPI", "green", "Paid"],
];

function Fees() {
  const top: [string, string, string][] = [
    ["Collected this term", "₹1.84 Cr", "86% of target"],
    ["Pending", "₹22.6 L", "14 families"],
    ["Paid online", "78%", "UPI · Cards · Net banking"],
  ];
  return (
    <div className="relative flex h-full flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {top.map(([label, value, sub], i) => (
          <div key={label} className={`${card} p-3.5`} style={rise(i)}>
            <span className="text-[11.5px] text-muted">{label}</span>
            <b className="mt-1 block font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">{value}</b>
            {i === 0 ? (
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-school/15">
                <i className="block h-full w-[86%] origin-left rounded-full bg-school" style={{ animation: "progress 1.2s var(--ease-out-expo) .3s both" }} />
              </span>
            ) : (
              <span className="text-[10.5px] text-muted">{sub}</span>
            )}
          </div>
        ))}
      </div>
      <div className={`${card} min-h-0 flex-1 p-4`} style={rise(3)}>
        <div className="flex items-center justify-between">
          <b className="text-[13px] font-semibold text-ink">Term 2 fees</b>
          <span className="flex items-center gap-1.5 rounded-lg bg-school px-3 py-1.5 text-[11px] font-semibold text-white">
            <I.Bell size={12} /> Remind 14 parents
          </span>
        </div>
        <table className="mt-3 w-full text-left text-[11.5px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.08em] text-muted">
              <th className="pb-2 font-medium">Student</th>
              <th className="pb-2 font-medium">Class</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Mode</th>
              <th className="pb-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {FEE_ROWS.map(([name, cls, amt, mode, tone, status], i) => (
              <tr key={name} className="border-t border-line" style={rise(4 + i)}>
                <td className="py-[7px]">
                  <span className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-school-soft text-[9px] font-semibold text-school">
                      {name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <span className="font-medium text-ink">{name}</span>
                  </span>
                </td>
                <td className="text-muted">{cls}</td>
                <td className="font-medium text-ink">{amt}</td>
                <td className="text-muted">{mode}</td>
                <td className="text-right">
                  <Chip tone={tone}>{status}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute bottom-3 right-3 w-[300px]" style={{ animation: "toast-in .7s var(--ease-out-expo) 1.2s both" }}>
        <Toast title="₹42,500 received · Aarav Sharma" sub="Receipt sent to parent automatically" icon={<I.Check size={16} />} />
      </div>
    </div>
  );
}

const KIDS = [
  "Aarav", "Diya", "Kabir", "Ishita", "Vihaan", "Anaya", "Reyansh", "Myra", "Arjun", "Saanvi",
  "Vivaan", "Aadhya", "Advik", "Kiara", "Ayaan", "Pari", "Atharv", "Navya", "Krish", "Riya",
  "Shaurya", "Ira", "Dhruv", "Tara", "Rudra", "Meher", "Ishaan", "Zara", "Yash", "Anvi",
];
const ABSENT = 18;

function Attendance() {
  return (
    <div className="grid h-full grid-cols-[1fr_250px] gap-3">
      <div className={`${card} flex flex-col p-4`} style={rise(0)}>
        <div className="flex items-center justify-between">
          <span>
            <b className="block text-[13px] font-semibold text-ink">Grade 7A · Period 1</b>
            <span className="text-[10.5px] text-muted">Monday, 14 October · Ms. Rao</span>
          </span>
          <Chip tone="green">Marked in 42 sec</Chip>
        </div>
        <div className="mt-3 grid flex-1 grid-cols-6 content-start gap-2">
          {KIDS.map((n, i) => {
            const absent = i === ABSENT;
            return (
              <div key={n} className={`flex flex-col items-center gap-1 rounded-xl border py-2 ${absent ? "border-red-200 bg-red-50" : "border-line bg-white"}`}>
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-[9.5px] font-semibold ${absent ? "bg-red-100 text-red-600" : "bg-school text-white"}`}
                  style={absent ? undefined : { animation: `mark .35s ease-out ${300 + i * 45}ms both` }}
                >
                  {n.slice(0, 2).toUpperCase()}
                </span>
                <span className={`text-[10px] font-medium ${absent ? "text-red-600" : "text-ink"}`}>{absent ? "Absent" : n}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className={`${card} flex flex-col items-center p-4 text-center`} style={rise(2)}>
          <span className="relative grid place-items-center">
            <svg viewBox="0 0 120 120" className="h-[112px] w-[112px] -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="12" className="text-school-soft" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                strokeWidth="12"
                strokeLinecap="round"
                pathLength={100}
                className="stroke-school"
                style={{ strokeDasharray: 100, strokeDashoffset: 3.3, ["--len" as string]: 100, animation: "draw 1.4s var(--ease-out-expo) .3s both" } as CSSProperties}
              />
            </svg>
            <b className="absolute font-display text-[24px] font-semibold tracking-[-0.02em] text-ink">97%</b>
          </span>
          <b className="mt-2 text-[13px] font-semibold text-ink">29 / 30 present</b>
          <span className="text-[10.5px] text-muted">Above the school average</span>
        </div>
        <div className={`${card} p-3.5`} style={rise(3)}>
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-red-100 text-[10px] font-semibold text-red-600">KR</span>
            <span className="leading-tight">
              <b className="block text-[12px] font-semibold text-ink">Krish is absent</b>
              <span className="text-[10.5px] text-muted">Parent alerted on app &amp; SMS</span>
            </span>
          </span>
          <span className="mt-2.5 flex items-center gap-1.5 text-[10.5px] font-medium text-[#1f8a55]" style={rise(8)}>
            <I.Check size={12} /> Delivered at 9:02 AM
          </span>
        </div>
        <div className={`${card} p-3.5`} style={rise(4)}>
          <b className="block text-[12px] font-semibold text-ink">Office sees it live</b>
          <span className="text-[10.5px] text-muted">58 of 64 classes marked</span>
          <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-school/15">
            <i className="block h-full w-[90%] origin-left rounded-full bg-school" style={{ animation: "progress 1.4s var(--ease-out-expo) .5s both" }} />
          </span>
        </div>
      </div>
    </div>
  );
}

const SUBJECTS: Record<string, [string, string]> = {
  Maths: ["var(--school-primary)", "Ms. Rao"],
  English: ["#5b8def", "Mr. Das"],
  Science: ["#2fb57a", "Ms. Iyer"],
  Hindi: ["#e0a100", "Mr. Verma"],
  Social: ["#8b6cf0", "Ms. Khan"],
  Computers: ["#f07a2e", "Mr. Paul"],
  PE: ["#e2557a", "Coach Singh"],
};
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PERIODS = ["8:00", "8:45", "9:30", "10:30", "11:15", "12:00"];
const TIMETABLE = [
  ["Maths", "English", "Maths", "Science", "Maths", "English"],
  ["English", "Science", "Hindi", "Maths", "Science", "Maths"],
  ["Science", "Maths", "Science", "English", "Hindi", "PE"],
  ["Hindi", "Social", "English", "Computers", "English", "Science"],
  ["Social", "Computers", "Social", "Social", "Computers", "Hindi"],
  ["PE", "Hindi", "Computers", "PE", "Social", "Social"],
];
const SUB_CELL = [2, 2]; // Wednesday, period 3 has a substitute today

function Timetable() {
  return (
    <div className={`${card} flex h-full flex-col p-4`} style={rise(0)}>
      <div className="flex items-center justify-between">
        <span>
          <b className="block text-[13px] font-semibold text-ink">Grade 7A · Week 8</b>
          <span className="text-[10.5px] text-muted">Generated from 42 rules · 0 manual edits</span>
        </span>
        <span className="flex gap-1.5">
          <Chip tone="green">✓ No clashes</Chip>
          <Chip tone="amber">1 substitution today</Chip>
        </span>
      </div>
      <div className="mt-3 grid flex-1 grid-cols-[46px_repeat(6,1fr)] grid-rows-[auto_repeat(6,1fr)] gap-1.5">
        <span />
        {DAYS.map((d) => (
          <span key={d} className="pb-0.5 text-center text-[10.5px] font-semibold text-muted">
            {d}
          </span>
        ))}
        {TIMETABLE.map((row, r) => (
          <Fragment key={r}>
            <span className="pt-1.5 text-[10px] tabular-nums text-muted">{PERIODS[r]}</span>
            {row.map((subject, c) => {
              const [color, teacher] = SUBJECTS[subject];
              const sub = r === SUB_CELL[0] && c === SUB_CELL[1];
              return (
                <span
                  key={c}
                  className={`relative flex flex-col justify-center rounded-lg border-l-[3px] px-2 ${sub ? "ring-2 ring-school-accent" : ""}`}
                  style={{
                    background: `color-mix(in oklab, ${color} 13%, white)`,
                    borderLeftColor: color,
                    animation: `pane-in .5s var(--ease-out-expo) ${(r + c) * 35}ms both`,
                  }}
                >
                  <b className="text-[11px] font-semibold text-ink">{subject}</b>
                  <span className="truncate text-[9.5px] text-muted">{sub ? "Mr. Menon · sub" : teacher}</span>
                  {sub && <i className="absolute right-1.5 top-1.5 h-1.5 w-1.5 animate-ping-soft rounded-full bg-school-accent text-school-accent" />}
                </span>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
