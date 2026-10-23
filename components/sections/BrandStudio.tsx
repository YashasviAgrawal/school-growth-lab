"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import * as I from "@/components/ui/Icons";
import { AppIcon } from "@/components/mocks/Frames";
import { useSchool } from "@/components/mocks/SchoolContext";
import { CONTACT, PALETTES } from "@/lib/schools";
import { useReducedMotion } from "@/lib/motion";

/* ---------------------------------------------------------------
   BRAND STUDIO — the hero's pitch. A visitor types their school's
   name and picks colours; the headline, collage, website and apps
   across the whole page re-brand themselves live. "Make it mine"
   then plays a short build sequence and hands over a personal CTA.
---------------------------------------------------------------- */

const EXAMPLES = ["St. Joseph's Convent School", "Green Valley Public School", "Little Flower High School"];
const IDLE_PLACEHOLDER = "Type your school's name";
const STEP_MS = 560;

export function BrandStudio({ onTyping }: { onTyping?: (typing: boolean) => void }) {
  const { brand, setBrand, custom } = useSchool();
  const reduced = useReducedMotion();
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState(IDLE_PLACEHOLDER);
  const [step, setStep] = useState(-1);
  const name = brand?.name ?? "";
  const palette = PALETTES[brand?.palette ?? 0];

  // Typewriter placeholder cycling example names until the visitor starts typing.
  useEffect(() => {
    if (reduced || focused || name) return;
    let ex = 0;
    let ch = 0;
    let dir = 1;
    let timer = 0;
    const tick = () => {
      const word = EXAMPLES[ex];
      ch += dir;
      setPlaceholder(`e.g. ${word.slice(0, ch)}`);
      let wait = dir > 0 ? 55 : 22;
      if (dir > 0 && ch >= word.length) {
        dir = -1;
        wait = 1700;
      } else if (dir < 0 && ch <= 0) {
        dir = 1;
        ex = (ex + 1) % EXAMPLES.length;
        wait = 350;
      }
      timer = window.setTimeout(tick, wait);
    };
    timer = window.setTimeout(tick, 2200);
    return () => {
      window.clearTimeout(timer);
      setPlaceholder(IDLE_PLACEHOLDER);
    };
  }, [reduced, focused, name]);

  const steps = custom
    ? [`Crest drawn for ${custom.short}`, `${palette.label} on every screen`, `Website ready at ${custom.domain}`, "Parent & Teacher apps branded"]
    : [];
  const done = step >= steps.length && steps.length > 0;

  useEffect(() => {
    if (step < 0 || step >= 4) return;
    const t = window.setTimeout(() => setStep(step + 1), reduced ? 0 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [step, reduced]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      input.current?.focus();
      return;
    }
    input.current?.blur();
    setStep(0);
  };

  const focus = (v: boolean) => {
    setFocused(v);
    onTyping?.(v);
  };

  const demoMail =
    custom &&
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Demo request for ${custom.name}`)}&body=${encodeURIComponent(
      `School name: ${custom.name}\nCity:\nStudent strength:\nPreferred time for a 30-minute demo:`,
    )}`;

  return (
    <div className="mx-auto w-full max-w-[660px]">
      <form
        onSubmit={submit}
        className={`flex flex-col gap-2 rounded-[28px] border border-white bg-white/85 p-2 shadow-[0_24px_60px_-28px_rgb(11_11_15/.4)] ring-1 backdrop-blur-xl transition-[box-shadow,ring-color] duration-300 sm:flex-row sm:items-center sm:rounded-full ${
          focused ? "ring-school/40" : "ring-ink/5"
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 pl-1">
          <span className={`shrink-0 rounded-[11px] shadow-card transition-transform duration-500 ease-spring ${focused ? "-rotate-6 scale-105" : ""}`}>
            <AppIcon size={42} />
          </span>
          <input
            ref={input}
            value={name}
            onChange={(e) => {
              const v = e.target.value.slice(0, 48);
              setBrand({ name: v, palette: brand?.palette ?? 0 });
              if (!v.trim()) setStep(-1);
            }}
            onFocus={() => focus(true)}
            onBlur={() => focus(false)}
            placeholder={placeholder}
            aria-label="Your school's name"
            autoComplete="organization"
            enterKeyHint="go"
            className="h-11 min-w-0 flex-1 bg-transparent text-[16px] font-medium text-ink outline-none placeholder:text-faint focus-visible:outline-none"
          />
          {brand && (
            <button
              type="button"
              aria-label="Clear and start over"
              onClick={() => {
                setBrand(null);
                setStep(-1);
                input.current?.focus();
              }}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <I.Close size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pl-2 sm:justify-end sm:pl-0">
          <div role="group" aria-label="School colours" className="flex items-center gap-1.5">
            {PALETTES.map((p, i) => {
              const on = brand?.palette === i;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-label={p.label}
                  aria-pressed={on}
                  title={p.label}
                  onClick={() => setBrand({ name, palette: i })}
                  className={`h-[22px] w-[22px] rounded-full ring-offset-2 ring-offset-white transition-transform duration-300 ease-spring hover:scale-115 ${
                    on ? "scale-110 ring-2 ring-ink" : "ring-1 ring-black/10"
                  }`}
                  style={{ background: `linear-gradient(135deg, ${p.primary} 50%, ${p.accent} 50%)` }}
                />
              );
            })}
          </div>
          <button
            type="submit"
            className="group inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-school pl-5 pr-4 text-[14.5px] font-semibold text-white shadow-[0_10px_24px_-10px_var(--school-primary)] transition-transform duration-300 hover:-translate-y-px"
          >
            Make it mine
            <I.ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </form>

      <div className="relative mt-5 min-h-[92px]" aria-live="polite">
        {step < 0 ? (
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-[14.5px] text-muted">
              <span className="font-serif text-[18px] italic text-ink">Try it.</span> Type your school&apos;s name and watch this whole page
              re-brand itself, live.
            </p>
            <a href="#contact" className="group inline-flex items-center gap-1 text-[14px] font-semibold text-ink underline-offset-4 hover:underline">
              or book a free demo
              <I.ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        ) : (
          <>
            <ul className="flex flex-wrap justify-center gap-2">
              {steps.slice(0, step + 1).map((s, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-ink shadow-card"
                  style={{ animation: reduced ? undefined : "toast-in .5s var(--ease-out-expo) both" }}
                >
                  {i < step ? (
                    <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-school text-white">
                      <I.Check size={11} />
                    </span>
                  ) : (
                    <i className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-school/20 border-t-school" />
                  )}
                  {s}
                </li>
              ))}
            </ul>

            {done && custom && (
              <div className="relative mt-5 flex flex-wrap justify-center gap-3" style={{ animation: reduced ? undefined : "toast-in .6s var(--ease-out-expo) both" }}>
                {!reduced && <Burst />}
                <a
                  href={demoMail ?? "#contact"}
                  className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-ink pl-7 pr-6 text-[15.5px] font-semibold text-white shadow-[0_14px_30px_-12px_rgb(11_11_15/0.55)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Book {custom.short}&apos;s free demo
                  <I.ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#showcase"
                  className="inline-flex h-[52px] items-center gap-2 rounded-full border border-line bg-white px-6 text-[15.5px] font-semibold text-ink shadow-[0_1px_2px_rgb(11_11_15/.05)] transition-colors hover:bg-paper-2"
                >
                  See it live
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const BURST_COLORS = ["#4fd18b", "#ff8a3d", "#b9a7ff", "#f5c542", "#8fb8ff", "var(--school-primary)"];

/** A one-off confetti pop when the build finishes. */
function Burst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const dist = 120 + ((i * 37) % 90);
        return (
          <i
            key={i}
            className="absolute block h-2.5 w-2.5 rounded-[2px]"
            style={
              {
                background: BURST_COLORS[i % BURST_COLORS.length],
                "--dx": `${Math.cos(angle) * dist}px`,
                "--dy": `${Math.sin(angle) * dist * 0.6}px`,
                "--rot": `${(i * 67) % 360}deg`,
                animation: `burst 1.1s cubic-bezier(.16,1,.3,1) ${(i % 4) * 30}ms both`,
              } as CSSProperties
            }
          />
        );
      })}
    </span>
  );
}
