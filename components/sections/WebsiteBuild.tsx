"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import * as I from "@/components/ui/Icons";
import { Browser, Crest, Phone, SchoolBuilding } from "@/components/mocks/Frames";
import { SiteMobile } from "@/components/mocks/Sites";
import { useSchool } from "@/components/mocks/SchoolContext";
import { FitScale } from "@/components/ui/FitScale";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clamp, stickyProgress, useInView, useInterval, useMediaQuery, useReducedMotion, useScrollFrame } from "@/lib/motion";

/* ---------------------------------------------------------------
   WEBSITE BUILD — a school site assembles itself in four stages:
   wireframe, brand, story, live. On large screens the stage pins
   and scroll drives the stages; elsewhere they auto-advance. A
   "designer" cursor moves to whatever is being worked on.
---------------------------------------------------------------- */

const BUILD = [
  { title: "Structure first", body: "Every page is mapped around what parents look for: admissions, fees, notices and results." },
  { title: "Your brand, everywhere", body: "Your crest, colours and type set the tone on every page. Never a theme, never a template." },
  { title: "Your story, told well", body: "Your motto, your campus and your achievements, written to win parents over." },
  { title: "Live, fast and found", body: "Launched on your own domain, quick on every phone and set up to rank in local search." },
];

const STICK_TOP = 84; // keep in sync with lg:top-[84px] on the stage
const CYCLE_MS = 3600;

export function WebsiteBuild() {
  const reduced = useReducedMotion();
  const desk = useMediaQuery("(min-width: 1024px)");
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const inView = useInView(section, { once: false, threshold: 0.2, rootMargin: "0px" });

  const sync = () => {
    const sec = section.current;
    const st = stage.current;
    if (!desk || !sec || !st) return;
    const rel = stickyProgress(sec, st, STICK_TOP) * BUILD.length;
    const current = Math.min(BUILD.length - 1, Math.floor(rel));
    st.style.setProperty("--sp", clamp(rel - current).toFixed(4));
    setStep(current);
  };
  useScrollFrame(sync);
  useEffect(sync, [desk]);

  useInterval(() => setStep((s) => (s + 1) % BUILD.length), CYCLE_MS, !desk && auto && inView && !reduced);

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
    const top = sec.getBoundingClientRect().top + window.scrollY - STICK_TOP + ((i + 0.06) / BUILD.length) * range;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={section} id="website-build" aria-labelledby="website-build-h" className="relative px-3 pb-6 pt-4 sm:px-6 lg:h-[360vh] lg:p-0">
      <div
        ref={stage}
        className="relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-line bg-white/70 px-5 pb-8 pt-12 shadow-card sm:rounded-[40px] sm:px-10 lg:sticky lg:top-[84px] lg:grid lg:h-[min(calc(100svh-100px),800px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:content-center lg:gap-x-12 lg:px-12 lg:py-10"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_30%,transparent_75%)]"
          style={{ backgroundImage: "radial-gradient(rgb(11 11 15 / .09) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(700px 500px at 75% 45%, color-mix(in oklab, var(--school-primary) 12%, transparent), transparent 70%)" }}
        />

        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <SectionLabel>How it&apos;s made</SectionLabel>
          <h2
            id="website-build-h"
            className="mt-5 font-display text-[clamp(2rem,1.2rem+2.6vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
          >
            Watch your website <span className="font-serif font-normal italic tracking-[-0.01em]">build itself.</span>
          </h2>
          <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed text-muted">From a blank page to a live, admissions-ready site, in your colours from the first pixel.</p>
        </div>

        <div className="relative mt-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center" aria-hidden="true">
          <BuildStage step={step} />
        </div>

        <div className="mt-8 grid gap-1.5 lg:col-start-1 lg:row-start-2 lg:mt-7 lg:self-start">
          {BUILD.map((s, i) => {
            const on = i === step;
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-current={on ? "step" : undefined}
                className={`relative w-full rounded-2xl py-3.5 pl-6 pr-4 text-left transition-[background-color,box-shadow] duration-500 ${
                  on ? "bg-white shadow-card ring-1 ring-line" : "hover:bg-white/60"
                }`}
              >
                <span className="absolute inset-y-3.5 left-0 w-[3px] overflow-hidden rounded-full bg-ink/10">
                  {on && (
                    <i
                      key={step}
                      className="step-bar block h-full w-full rounded-full bg-school"
                      style={desk ? undefined : auto && !reduced ? { animation: `progress-y ${CYCLE_MS}ms linear both` } : undefined}
                    />
                  )}
                </span>
                <span className="flex items-baseline gap-3">
                  <span className="font-serif text-[18px] italic leading-none text-muted">0{i + 1}</span>
                  <span className="min-w-0">
                    <b className={`block font-display text-[17px] font-semibold tracking-[-0.01em] transition-colors ${on ? "text-ink" : "text-body"}`}>{s.title}</b>
                    <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <span className="overflow-hidden">
                        <span className="block pt-1.5 text-[14.5px] leading-relaxed text-muted">{s.body}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- the stage: browser, designer cursor, phone and scores ---------- */

const CURSOR: [number, number][] = [
  [430, 300],
  [62, 112],
  [118, 262],
  [470, 62],
];
const ACTIONS = ["Mapping pages", "Applying your colours", "Writing your story", "Publishing"];

function BuildStage({ step }: { step: number }) {
  const { school } = useSchool();
  const live = step >= 3;
  const [x, y] = CURSOR[step];
  return (
    <FitScale width={900} height={600}>
      <div className="relative h-full w-full">
        <div
          className={`absolute right-[40px] top-0 z-30 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-semibold text-ink shadow-lift ring-1 ring-line transition-[opacity,transform] duration-700 ease-out-expo ${
            live ? "opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <i className="h-2 w-2 animate-ping-soft rounded-full bg-mint text-mint" />
          Live on {school.domain}
        </div>

        <Browser url={live ? `www.${school.domain}` : `preview.${school.domain}`} className="absolute left-[20px] top-[40px] w-[860px]">
          <BuildSite step={step} />
        </Browser>

        <div
          className={`absolute -bottom-[10px] -right-[6px] z-20 origin-bottom-right scale-[0.62] transition-[translate,opacity] duration-1000 ease-out-expo ${
            live ? "opacity-100" : "translate-y-24 opacity-0"
          }`}
        >
          <Phone screenClass="bg-white">
            <SiteMobile />
          </Phone>
        </div>

        <div
          className={`absolute bottom-[30px] left-0 z-20 flex gap-5 rounded-2xl bg-white px-5 py-4 shadow-lift ring-1 ring-line transition-[opacity,translate] delay-200 duration-1000 ease-out-expo ${
            live ? "opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {(
            [
              ["Speed", 98],
              ["SEO", 100],
              ["Access", 97],
            ] as const
          ).map(([label, value]) => (
            <Score key={label} label={label} value={value} on={live} />
          ))}
        </div>

        <div className="pointer-events-none absolute left-0 top-0 z-40 transition-transform duration-[1200ms] ease-out-expo" style={{ transform: `translate(${x}px, ${y}px)` }}>
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M3 2l7 19 2.5-8L21 10z" fill="#ff8a3d" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span className="-mt-1 ml-4 inline-block whitespace-nowrap rounded-full rounded-tl-none bg-spark px-2.5 py-1 text-[11px] font-semibold text-white shadow-card">
            Ananya · {ACTIONS[step]}…
          </span>
        </div>
      </div>
    </FitScale>
  );
}

function Score({ label, value, on }: { label: string; value: number; on: boolean }) {
  return (
    <span className="flex flex-col items-center gap-1.5">
      <span className="relative grid h-[58px] w-[58px] place-items-center">
        <svg viewBox="0 0 60 60" className="absolute inset-0 -rotate-90">
          <circle cx="30" cy="30" r="25" fill="none" stroke="#e7f7ee" strokeWidth="6" />
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#1f9d55"
            strokeWidth="6"
            strokeLinecap="round"
            pathLength={100}
            style={{ strokeDasharray: 100, strokeDashoffset: on ? 100 - value : 100, transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1) .4s" }}
          />
        </svg>
        <b className="text-[16px] font-semibold text-[#1f8a55]">{value}</b>
      </span>
      <span className="text-[10.5px] font-medium text-muted">{label}</span>
    </span>
  );
}

/** Crossfades a wireframe placeholder into the real thing, in place. */
function Swap({ on, from, to }: { on: boolean; from: ReactNode; to: ReactNode }) {
  return (
    <span className="grid [&>*]:col-start-1 [&>*]:row-start-1">
      <span className={`transition-[opacity,scale] duration-500 ease-out-expo ${on ? "scale-95 opacity-0" : ""}`}>{from}</span>
      <span className={`transition-[opacity,translate,filter] duration-700 ease-out-expo ${on ? "delay-150" : "translate-y-2 opacity-0 blur-[4px]"}`}>{to}</span>
    </span>
  );
}

const Bar = ({ w, h = 9, tone = "sk" }: { w: number; h?: number; tone?: string }) => (
  <i className={`block rounded-full ${tone}`} style={{ width: w, height: h }} />
);

const Blueprint = ({ show, children, className = "" }: { show: boolean; children: ReactNode; className?: string }) => (
  <span
    className={`absolute z-10 rounded-md border border-dashed border-[#5b8def] bg-white/80 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#5b8def] transition-opacity duration-500 ${
      show ? "opacity-100" : "opacity-0"
    } ${className}`}
  >
    {children}
  </span>
);

/** The school homepage at each build stage. 860px-wide canvas, like the other site mocks. */
function BuildSite({ step }: { step: number }) {
  const { school } = useSchool();
  const wire = step === 0;
  const brand = step >= 1;
  const story = step >= 2;
  const onHero = brand ? "bg-white/20" : "sk";
  return (
    <div className="relative h-[510px] bg-white">
      <div className="relative flex h-[60px] items-center gap-3 border-b border-line px-6">
        <Blueprint show={wire} className="left-[250px] top-[19px]">
          Navigation
        </Blueprint>
        <Swap on={brand} from={<i className="sk block h-[31px] w-[28px] rounded-[9px]" />} to={<Crest size={28} />} />
        <Swap
          on={brand}
          from={
            <span className="flex flex-col gap-1.5">
              <Bar w={150} />
              <Bar w={90} h={7} />
            </span>
          }
          to={
            <span className="block leading-tight">
              <b className="block text-[13.5px] font-semibold text-ink">{school.name}</b>
              <span className="text-[10.5px] text-muted">
                {school.board} · {school.city}
              </span>
            </span>
          }
        />
        <nav className="ml-auto flex items-center gap-5 text-[11.5px] text-body">
          {["About", "Academics", "Admissions", "Campus Life", "Contact"].map((l) => (
            <Swap key={l} on={brand} from={<Bar w={50} h={8} />} to={<span>{l}</span>} />
          ))}
          <span className={`rounded-full px-4 py-2 font-semibold transition-colors duration-700 ${brand ? "bg-school text-white" : "sk text-transparent"}`}>Apply now</span>
        </nav>
      </div>

      <div className="relative mx-5 mt-5 h-[290px] overflow-hidden rounded-[22px] bg-[#f1efea]">
        <div
          className="absolute inset-0 bg-gradient-to-br from-school to-school-deep transition-[clip-path] duration-[1100ms] ease-out-expo"
          style={{ clipPath: brand ? "circle(150% at 6% 8%)" : "circle(0% at 6% 8%)" }}
        />
        <Blueprint show={wire} className="right-4 top-4">
          Hero · admissions first
        </Blueprint>
        <div className="relative p-9 text-white">
          <Swap
            on={story}
            from={
              <span className="flex flex-col gap-3">
                <Bar w={150} h={20} tone={onHero} />
                <Bar w={380} h={40} tone={onHero} />
                <Bar w={260} h={40} tone={onHero} />
                <Bar w={300} h={10} tone={onHero} />
                <span className="mt-2 flex gap-2.5">
                  <Bar w={150} h={36} tone={onHero} />
                  <Bar w={140} h={36} tone={onHero} />
                </span>
              </span>
            }
            to={
              <span className="block">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px]">Admissions open · 2027–28</span>
                <b className="mt-5 block font-serif text-[52px] font-normal italic leading-none tracking-[-0.01em]">{school.motto}</b>
                <span className="mt-3 block max-w-[320px] text-[13px] leading-relaxed text-white/80">
                  Nursery to Grade 12 in the heart of {school.city}. A school where every child is known.
                </span>
                <span className="mt-5 flex gap-2.5 text-[12px] font-semibold">
                  <span className="rounded-full bg-school-accent px-4 py-2.5 text-school-deep">Book a campus visit</span>
                  <span className="rounded-full px-4 py-2.5 ring-1 ring-white/40">Explore academics</span>
                </span>
              </span>
            }
          />
        </div>
        <SchoolBuilding
          className={`absolute bottom-0 right-4 w-[330px] transition-[translate,opacity] duration-1000 ease-out-expo ${story ? "opacity-100" : "translate-y-16 opacity-0"}`}
        />
      </div>

      <div className="mx-5 my-4 grid grid-cols-3 gap-3">
        <Card brand={brand} wire={wire} label="Notices" story={story} tone="soft">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-school">
            <I.Bell size={12} /> Notices
          </span>
          <span className="mt-2.5 block text-[12px] text-ink">Annual Day rehearsal schedule</span>
          <span className="mt-1.5 block text-[12px] text-ink">PTM for Grades 6–8 on Saturday</span>
        </Card>
        <Card brand={brand} wire={wire} label="Events" story={story} tone="soft">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-school">
            <I.Calendar size={12} /> Events
          </span>
          <span className="mt-2.5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-center leading-none text-school">
              <span>
                <b className="block text-[16px]">14</b>
                <span className="text-[8.5px] font-semibold">NOV</span>
              </span>
            </span>
            <span className="text-[12px] text-ink">Children&apos;s Day Carnival</span>
          </span>
        </Card>
        <Card brand={brand} wire={wire} label="Results" story={story} tone="deep">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-school-accent">
            <I.Trophy size={12} /> Results 2026
          </span>
          <b className="mt-1.5 block font-serif text-[32px] font-normal italic leading-none text-white">98.4%</b>
          <span className="text-[11px] text-white/75">Board results, first division</span>
        </Card>
      </div>
    </div>
  );
}

function Card({ brand, wire, story, label, tone, children }: { brand: boolean; wire: boolean; story: boolean; label: string; tone: "soft" | "deep"; children: ReactNode }) {
  return (
    <div
      className={`relative h-[112px] rounded-2xl p-4 transition-colors duration-700 ${
        !brand ? "bg-[#f6f5f1] ring-1 ring-line" : tone === "deep" ? "bg-school-deep" : "bg-school-soft"
      }`}
    >
      <Blueprint show={wire} className="right-3 top-3">
        {label}
      </Blueprint>
      <Swap
        on={story}
        from={
          <span className="flex flex-col gap-2.5">
            <Bar w={80} h={8} tone={brand && tone === "deep" ? "bg-white/20" : "sk"} />
            <Bar w={170} tone={brand && tone === "deep" ? "bg-white/20" : "sk"} />
            <Bar w={140} tone={brand && tone === "deep" ? "bg-white/20" : "sk"} />
          </span>
        }
        to={<span className="block">{children}</span>}
      />
    </div>
  );
}
