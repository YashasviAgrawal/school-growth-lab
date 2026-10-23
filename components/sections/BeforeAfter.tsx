"use client";

import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Browser } from "@/components/mocks/Frames";
import { SiteHome } from "@/components/mocks/Sites";
import { useSchool } from "@/components/mocks/SchoolContext";
import { FitScale } from "@/components/ui/FitScale";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clamp, useInView, useReducedMotion } from "@/lib/motion";

/* ---------------------------------------------------------------
   BEFORE / AFTER — drag the handle between a dated template-style
   school site and the brand-first one. The split lives in a CSS
   variable (--x, 0–100) so dragging never re-renders the mocks.
---------------------------------------------------------------- */

export function BeforeAfter() {
  const { school } = useSchool();
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const seen = useInView(box, { once: true, threshold: 0.45 });

  const setX = (v: number) => {
    const x = clamp(v, 0, 100);
    box.current?.style.setProperty("--x", x.toFixed(2));
    handle.current?.setAttribute("aria-valuenow", String(Math.round(x)));
  };
  const getX = () => parseFloat(box.current?.style.getPropertyValue("--x") || "50");
  const fromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setX(((e.clientX - r.left) / r.width) * 100);
  };

  // A one-time sweep the first time it's seen, so visitors know it can be dragged.
  useEffect(() => {
    if (!seen || reduced) return;
    const keys = [50, 24, 76, 50];
    const dur = 2600;
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (touched.current) return;
      t0 ||= t;
      const k = Math.min(1, (t - t0) / dur) * (keys.length - 1);
      const i = Math.min(keys.length - 2, Math.floor(k));
      const f = k - i;
      const e = f < 0.5 ? 2 * f * f : 1 - (-2 * f + 2) ** 2 / 2;
      setX(keys[i] + (keys[i + 1] - keys[i]) * e);
      if (k < keys.length - 1) raf = requestAnimationFrame(tick);
    };
    const start = window.setTimeout(() => (raf = requestAnimationFrame(tick)), 450);
    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [seen, reduced]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key];
    if (step === undefined && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    touched.current = true;
    setX(e.key === "Home" ? 0 : e.key === "End" ? 100 : getX() + (step ?? 0));
  };

  return (
    <section id="before-after" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <SectionLabel>Before &amp; after</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Most school websites look like this. <span className="font-serif font-normal italic tracking-[-0.01em]">Yours won&apos;t.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-muted">
            Drag the handle. Same school, same information. One came from a template, the other was designed for the school.
          </p>
        </Reveal>

        <Reveal variant="scale" className="mx-auto mt-12 max-w-[1040px]">
          <div
            ref={box}
            onPointerDown={(e) => {
              touched.current = true;
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              fromPointer(e);
            }}
            onPointerMove={(e) => dragging.current && fromPointer(e)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[18px] shadow-device ring-1 ring-ink/5"
            style={{ "--x": 50 } as CSSProperties}
          >
            <FitScale width={860} height={550}>
              <div className="relative h-[550px] w-[860px]">
                <Browser url={`www.${school.domain}`} className="absolute inset-x-0 top-0">
                  <div className="h-[510px] overflow-hidden">
                    <SiteHome />
                  </div>
                </Browser>
                <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--x) * 1%) 0 0)" }}>
                  <Browser url={`${school.domain}/index.php?page=home`} className="absolute inset-x-0 top-0">
                    <OldSite />
                  </Browser>
                </div>
              </div>
            </FitScale>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-[12%] z-10 rounded-full bg-ink/85 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur"
              style={{ opacity: "clamp(0, (var(--x) - 16) / 10, 1)" }}
            >
              Before · a typical template
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-[12%] z-10 rounded-full bg-school px-3 py-1.5 text-[12px] font-semibold text-white"
              style={{ opacity: "clamp(0, (84 - var(--x)) / 10, 1)" }}
            >
              After · designed for {school.short}
            </span>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-10 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(11_11_15/.12),0_0_24px_rgb(11_11_15/.3)]"
              style={{ left: "calc(var(--x) * 1%)" }}
            />
            <button
              ref={handle}
              type="button"
              role="slider"
              aria-label="Compare the template website with the designed one"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={50}
              onKeyDown={onKey}
              className="absolute top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lift ring-1 ring-ink/10 transition-[scale] duration-300 hover:scale-110"
              style={{ left: "calc(var(--x) * 1%)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const TICKER = "★ ADMISSIONS OPEN FOR SESSION 2027-28 !!! ★ Download admission form (PDF, 4.2 MB) ★ Annual result declared, see notice board ★ ";

/** A deliberately dated, template-style school homepage. 860px-wide canvas, 510px tall. */
function OldSite() {
  const { school } = useSchool();
  return (
    <div className="h-[510px] overflow-hidden bg-[#dcdcdc] text-[13px] text-black" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <div className="flex items-center gap-3 border-b-4 border-[#ffcc00] bg-gradient-to-b from-[#3a6fd8] to-[#0b2f8a] px-4 py-3 text-white">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-white bg-[#ffcc00] text-[10px] font-bold text-[#0b2f8a]">LOGO</span>
        <span className="min-w-0">
          <b className="block truncate text-[26px] font-bold uppercase tracking-wide [text-shadow:2px_2px_0_#000]">{school.name}</b>
          <span className="text-[12px] italic text-[#ffff99]">(Affiliated to CBSE, New Delhi) · Recognised by Govt.</span>
        </span>
      </div>
      <div className="flex bg-[#0b2f8a] text-[12px] text-white">
        {["HOME", "ABOUT US", "ACADEMICS", "ADMISSION", "GALLERY", "DOWNLOADS", "CONTACT US"].map((l) => (
          <span key={l} className="border-r border-[#4a6fc0] px-3 py-1.5 font-bold">
            {l}
          </span>
        ))}
      </div>
      <div className="overflow-hidden whitespace-nowrap bg-[#ffff99] py-1 text-[12.5px] font-bold text-[#cc0000]">
        <span className="inline-block animate-marquee [animation-duration:18s]">
          {TICKER}
          {TICKER}
        </span>
      </div>
      <div className="grid grid-cols-[160px_1fr_190px] gap-2 p-2">
        <ul className="border border-[#999] bg-white p-2 text-[12.5px] leading-[1.9] text-[#0000ee] underline">
          {["Principal's Desk", "Managing Committee", "Fee Structure", "Uniform", "Transfer Certificate", "Mandatory Disclosure", "Alumni", "Photo Gallery"].map((l) => (
            <li key={l}>» {l}</li>
          ))}
        </ul>
        <div className="border border-[#999] bg-white p-3">
          <b className="block text-center text-[22px] font-bold text-[#cc0000]" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
            Welcome To Our School Website !!
          </b>
          <div className="mt-2 grid h-[140px] place-items-center border-2 border-dashed border-[#999] bg-[#eee] text-[12px] text-[#888]">[ image not found ]</div>
          <p className="mt-2 text-justify text-[12px] leading-snug">
            {school.name} was established with the aim of providing quality education to all students. Our school has well qualified staff and good
            infrastructure. We focus on all round development of the child. For more information please contact the school office during working hours.
          </p>
          <p className="mt-1.5 text-[11px] text-[#cc0000]">Last updated on: 14/03/2019</p>
        </div>
        <div className="space-y-2">
          <div className="border border-[#999] bg-white">
            <b className="block bg-[#cc0000] px-2 py-1 text-[12px] text-white">NOTICE BOARD</b>
            <ul className="space-y-1 p-2 text-[11.5px] text-[#0000ee] underline">
              {["Holiday List 2019", "Exam Date Sheet", "Fee Circular (scanned)"].map((n, i) => (
                <li key={n}>
                  {n}{" "}
                  {i === 0 && <span className="inline-block animate-pulse rounded-sm bg-[#cc0000] px-1 text-[9px] font-bold text-white">NEW</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[#999] bg-white p-2 text-center text-[11px]">
            Visitor Counter
            <span className="mt-1 flex justify-center gap-0.5">
              {"004231".split("").map((d, i) => (
                <span key={i} className="bg-black px-1 font-mono text-[13px] text-[#33ff33]">
                  {d}
                </span>
              ))}
            </span>
          </div>
          <p className="text-center text-[10px] italic text-[#555]">Best viewed in Internet Explorer at 1024×768</p>
        </div>
      </div>
    </div>
  );
}
