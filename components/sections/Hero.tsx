"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as I from "@/components/ui/Icons";
import { DoodleArrow } from "@/components/ui/Doodles";
import { BookStack, FountainPen, Notebook, PaperPlane, Pencil, Ruler, StickyNote } from "@/components/ui/Stationery";
import { Toss } from "@/components/ui/Toss";
import { BrandStudio } from "@/components/sections/BrandStudio";
import { AppIcon, Browser, Phone, Toast } from "@/components/mocks/Frames";
import { ParentApp, TeacherApp } from "@/components/mocks/Apps";
import { SiteHome } from "@/components/mocks/Sites";
import { useSchool } from "@/components/mocks/SchoolContext";
import { FitScale } from "@/components/ui/FitScale";
import { lerp, progressOf, useInterval, useInView, useReducedMotion, useScrollFrame } from "@/lib/motion";

/* ---------------------------------------------------------------
   HERO — centred statement with a wajo-style floating collage of
   classroom objects and product fragments. Everything drifts with
   the pointer, disperses at different depths as you scroll, and
   can be picked up and tossed around the stage.
---------------------------------------------------------------- */

const LINE_1 = ["isn't", "a", "template."];
const ROTATING = ["app", "website", "ERP"];

const stagger = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

function useCollageMotion(stage: React.RefObject<HTMLDivElement | null>, glow: React.RefObject<HTMLDivElement | null>) {
  const reduced = useReducedMotion();
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useScrollFrame((y) => {
    scroll.current = y;
  });

  useEffect(() => {
    const el = stage.current;
    if (!el || reduced) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const top = el.closest("section")?.offsetTop ?? 0;
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
      if (glow.current) glow.current.style.opacity = "1";
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const loop = () => {
      cur.current.x = lerp(cur.current.x, target.current.x, 0.06);
      cur.current.y = lerp(cur.current.y, target.current.y, 0.06);
      const vh = window.innerHeight;
      const y = scroll.current;
      if (y < vh * 1.4) {
        const fade = Math.max(0, 1 - y / (vh * 0.7));
        for (const it of items) {
          const d = Number(it.dataset.depth);
          const tx = cur.current.x * d * -46;
          const ty = cur.current.y * d * -34 - y * d * 0.9;
          it.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
          it.style.opacity = fade.toFixed(3);
        }
        // A soft pool of the school's colour trails the cursor.
        const g = glow.current;
        if (g && fine) {
          g.style.setProperty("--gx", `${((cur.current.x + 0.5) * window.innerWidth).toFixed(0)}px`);
          g.style.setProperty("--gy", `${((cur.current.y + 0.5) * vh + y - top).toFixed(0)}px`);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [stage, glow, reduced]);
}

/** Cycles through words in place, easing its width so the line re-centres smoothly. */
function RotatingWord({ words, ms = 2600 }: { words: string[]; ms?: number }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [width, setWidth] = useState<number>();
  const box = useRef<HTMLSpanElement>(null);

  useInterval(
    () => {
      setPrev(i);
      setI((i + 1) % words.length);
    },
    ms,
    !reduced,
  );

  useEffect(() => {
    const el = box.current?.querySelector<HTMLElement>(`[data-word="${i}"]`);
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [i]);

  return (
    <span ref={box} className="relative inline-block whitespace-nowrap transition-[width] duration-700 ease-out-expo" style={{ width }}>
      <span className="invisible">{words[i]}</span>
      {words.map((word, k) => (
        <span
          key={word}
          data-word={k}
          aria-hidden={k !== i}
          className={`absolute left-0 top-0 text-school transition-[opacity,transform,filter] duration-700 ease-out-expo ${
            k === i ? "opacity-100 blur-0" : k === prev ? "-translate-y-[0.45em] opacity-0 blur-[6px]" : "translate-y-[0.45em] opacity-0 blur-[6px]"
          }`}
        >
          {word}
        </span>
      ))}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-[0.04em] left-0 h-[0.2em] w-full text-spark" aria-hidden="true">
        <path
          key={i}
          d="M3 8C30 3 60 11 92 6s70-4 105 2"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ strokeDasharray: 1, ["--len" as string]: 1, animation: "draw .9s var(--ease-out-expo) .25s both" } as CSSProperties}
        />
      </svg>
    </span>
  );
}

function Confetti({ className, color, size = 18, rot = 0, i = 0 }: { className: string; color: string; size?: number; rot?: number; i?: number }) {
  return (
    <span
      className={`pop-in absolute block rounded-[3px] ${className}`}
      style={{ width: size, height: size, background: color, transform: `rotate(${rot}deg)`, ["--i" as string]: i, ["--r" as string]: `${rot}deg` } as CSSProperties}
    />
  );
}

export function Hero() {
  const { school, custom } = useSchool();
  const stage = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [tossed, setTossed] = useState(false);
  const [typing, setTyping] = useState(false);
  const grab = () => setTossed(true);
  useCollageMotion(stage, glow);
  let w = 0;

  return (
    <section id="top" className="relative isolate overflow-hidden pt-[92px]">
      <div className="aurora -z-10" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(520px circle at var(--gx, 50%) var(--gy, 40%), color-mix(in oklab, var(--school-primary) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div ref={stage} data-stage className="relative mx-auto min-h-[600px] max-w-[1320px] px-5 sm:px-8 lg:min-h-[700px]">
        {/* ---- floating, tossable collage (decorative) ---- */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden="true">
          {/* left */}
          <div data-depth="0.5" className="absolute left-[2.5%] top-[5%] origin-top-left scale-[.6] will-change-transform lg:scale-[.78]">
            <Toss rot={-8} onGrab={grab}>
              <div className="pop-in" style={stagger(1)}>
                <div className="animate-float [animation-duration:7s]">
                  <Notebook />
                </div>
              </div>
            </Toss>
          </div>

          <div data-depth="0.3" className="absolute left-[calc(2.5%+124px)] top-[6%] hidden will-change-transform lg:block">
            <div className="pop-in" style={stagger(9)}>
              <div className={`flex items-start gap-1 text-muted transition-opacity duration-700 ${tossed ? "opacity-0" : ""}`}>
                <DoodleArrow className="mt-1.5 w-[30px]" />
                <span className="font-serif text-[15.5px] italic leading-[1.1]">
                  psst… pick us up
                  <br />
                  and toss us around
                </span>
              </div>
            </div>
          </div>

          <div data-depth="0.75" className="absolute left-[1.5%] top-[48%] hidden w-[140px] will-change-transform lg:block">
            <Toss rot={28} onGrab={grab}>
              <div className="pop-in drop-shadow-[0_12px_10px_rgb(11_11_15/.2)]" style={stagger(3)}>
                <Pencil className="w-full" />
              </div>
            </Toss>
          </div>

          <div data-depth="0.25" className="absolute bottom-[9%] left-[9%] hidden origin-bottom-left scale-[.8] will-change-transform xl:block">
            <Toss rot={-2} onGrab={grab}>
              <div className="pop-in" style={stagger(5)}>
                <div className="w-[214px] rounded-[22px] bg-white p-4 shadow-lift ring-1 ring-ink/5">
                  <div className="flex items-center justify-between text-[12px] text-muted">
                    School bus · Route 4 <I.Bus size={14} className="text-school" />
                  </div>
                  <b className="mt-1 block font-display text-[30px] font-semibold tracking-tight text-ink">6 min</b>
                  <span className="text-[12px] text-muted">Park Street stop</span>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-school/15">
                    <i className="block h-full w-[68%] rounded-full bg-school" />
                  </div>
                </div>
              </div>
            </Toss>
          </div>

          <div data-depth="0.6" className="absolute bottom-[2%] left-[25%] hidden w-[160px] will-change-transform lg:block">
            <Toss rot={-5} onGrab={grab}>
              <div className="pop-in drop-shadow-[0_10px_10px_rgb(11_11_15/.15)]" style={stagger(7)}>
                <Ruler className="w-full" />
              </div>
            </Toss>
          </div>

          {/* top centre */}
          <div data-depth="0.85" className="absolute left-[31%] top-[2%] w-[96px] will-change-transform lg:w-[112px]">
            <Toss onGrab={grab}>
              <div className="pop-in" style={stagger(2)}>
                <div className="animate-float [animation-duration:5s]">
                  <PaperPlane className="w-full" />
                </div>
              </div>
            </Toss>
          </div>

          {/* right */}
          <div data-depth="0.6" className="absolute right-[22%] top-[1%] hidden w-[90px] will-change-transform lg:block">
            <Toss rot={-3} onGrab={grab}>
              <div className="pop-in drop-shadow-[0_14px_12px_rgb(11_11_15/.2)]" style={stagger(4)}>
                <BookStack className="w-full" />
              </div>
            </Toss>
          </div>

          <div data-depth="0.35" className="absolute right-[3%] top-[11%] origin-top-right scale-[.72] will-change-transform lg:right-[4%] lg:scale-[.84]">
            <Toss rot={3} onGrab={grab}>
              <div className="pop-in" style={stagger(2)}>
                <Toast className="animate-float" title="Fee received · ₹12,500" sub={`Receipt sent from ${school.short}`} />
              </div>
            </Toss>
          </div>

          <div data-depth="0.45" className="absolute right-[2.5%] top-[35%] hidden origin-top-right scale-[.8] will-change-transform xl:block">
            <Toss rot={6} onGrab={grab}>
              <div className="pop-in" style={stagger(6)}>
                <StickyNote />
              </div>
            </Toss>
          </div>

          <div data-depth="0.42" className="absolute bottom-[12%] right-[8%] hidden origin-bottom-right scale-[.8] will-change-transform xl:block">
            <Toss rot={2} onGrab={grab}>
              <div className="pop-in" style={stagger(4)}>
                <div className="w-[236px] rounded-[22px] bg-white p-4 shadow-lift ring-1 ring-ink/5">
                  <span className="text-[12px] text-muted">Grade 7A · Period 1</span>
                  <b className="mt-0.5 block font-display text-[22px] font-semibold tracking-tight text-ink">33 / 34 present</b>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <i key={i} className={`h-[15px] w-[15px] rounded-full ${i === 7 ? "bg-white ring-1 ring-red-300" : "bg-school"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Toss>
          </div>

          <div data-depth="0.7" className="absolute bottom-[3%] right-[24%] hidden w-[130px] will-change-transform lg:block">
            <Toss rot={-10} onGrab={grab}>
              <div className="pop-in drop-shadow-[0_12px_10px_rgb(11_11_15/.22)]" style={stagger(8)}>
                <FountainPen className="w-full" />
              </div>
            </Toss>
          </div>

          <div data-depth="0.9" className="absolute left-[3%] top-[38%]"><Confetti className="" color="#4fd18b" size={14} rot={12} i={2} /></div>
          <div data-depth="0.3" className="absolute left-[45%] top-[10%]"><Confetti className="" color="#ff8a3d" size={12} rot={-8} i={4} /></div>
          <div data-depth="0.6" className="absolute right-[36%] top-[5%]"><Confetti className="" color="#b9a7ff" size={10} rot={20} i={5} /></div>
          <div data-depth="0.8" className="absolute right-[2%] top-[62%]"><Confetti className="" color="#f5c542" size={14} rot={-14} i={3} /></div>
          <div data-depth="0.45" className="absolute bottom-[6%] left-[48%]"><Confetti className="" color="#8fb8ff" size={10} rot={30} i={6} /></div>
        </div>

        {/* ---- mobile mini collage ---- */}
        <div className="pointer-events-none absolute inset-x-0 top-2 h-24 md:hidden" aria-hidden="true">
          <div className="pop-in absolute left-5 top-2 -rotate-6" style={stagger(1)}>
            <AppIcon size={46} />
          </div>
          <div className="absolute right-4 top-5 w-[80px] rotate-[18deg]">
            <Pencil className="pop-in w-full" />
          </div>
          <Confetti className="right-[30%] top-14" color="#ff8a3d" size={10} rot={-8} i={3} />
          <Confetti className="left-[30%] top-3" color="#4fd18b" size={10} rot={14} i={4} />
        </div>

        {/* ---- statement ---- */}
        <div className="relative z-10 mx-auto flex max-w-[1060px] flex-col items-center pb-10 pt-24 text-center md:pt-24 lg:pt-28">
          <span className="word-in inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-[13px] font-medium text-body shadow-[0_1px_2px_rgb(11_11_15/.04)] backdrop-blur">
            <i className="h-[7px] w-[7px] animate-ping-soft rounded-full bg-spark text-spark" />
            Now onboarding for 2027–28 admissions
          </span>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,1.1rem+4.7vw,5.3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
            <span className="block">
              {/* Becomes the visitor's own school as they type below. */}
              <span className="word-in" style={stagger(w++)}>
                {custom ? <span style={{ color: custom.primary }}>{custom.short}</span> : "Your school"}
                {typing && (
                  <i
                    aria-hidden="true"
                    className="ml-1 inline-block h-[0.78em] w-[0.07em] translate-y-[0.06em] animate-[blink_1s_steps(1)_infinite] rounded-full bg-school"
                  />
                )}
                &nbsp;
              </span>
              {LINE_1.map((word) => (
                <span key={`a${w}`} className="word-in" style={stagger(w++)}>
                  {word}&nbsp;
                </span>
              ))}
            </span>
            <span className="block font-serif font-normal italic tracking-[-0.01em] text-[1.06em]">
              <span className="word-in" style={stagger(w++)}>
                Your&nbsp;
              </span>
              <span className="word-in" style={stagger(w++)}>
                <RotatingWord words={ROTATING} />
                &nbsp;
              </span>
              {["shouldn't", "be", "either."].map((word) => (
                <span key={`b${w}`} className="word-in" style={stagger(w++)}>
                  {word}&nbsp;
                </span>
              ))}
            </span>
          </h1>

          <p className="word-in mt-7 max-w-[34rem] text-[clamp(1.05rem,0.95rem+0.4vw,1.25rem)] leading-[1.6] text-body" style={{ ["--i" as string]: 10 } as CSSProperties}>
            We design a brand-first website and a fully personalised ERP, with Parent and Teacher apps on iOS and Android, made for one school
            only. Yours.
          </p>

          <div className="word-in relative z-30 mt-9 w-full" style={stagger(11)}>
            <BrandStudio onTyping={setTyping} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SHOWCASE — pick a school (story-style auto-advance), and the
   website + both apps re-dress live. The stage grows into place
   on scroll, like the film card on wajo.ai.
---------------------------------------------------------------- */

const STORY_MS = 4800;

const TOASTS = (short: string) => [
  { title: "Fee received · ₹12,500", sub: `Receipt sent from ${short}`, icon: <I.Rupee size={17} /> },
  { title: "Bus arrives in 6 min", sub: "Route 4 · Park Street stop", icon: <I.Bus size={17} /> },
  { title: "Attendance submitted", sub: "Grade 7A · 32 / 34 present", icon: <I.ClipboardCheck size={17} /> },
  { title: "Annual Day rehearsal moved to 3 PM", sub: short, icon: <I.Megaphone size={17} /> },
];

export function Showcase() {
  const { schools, index, setIndex, school, custom } = useSchool();
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(section, { once: false, threshold: 0.25, rootMargin: "0px" });
  const [auto, setAuto] = useState(true);
  const [toast, setToast] = useState(0);
  const chips = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);

  // Once a visitor has made their own school, keep it on screen instead of cycling demos.
  const playing = auto && inView && !reduced && !custom;
  useInterval(() => setIndex((index + 1) % schools.length), STORY_MS, playing);
  useInterval(() => setToast((t) => t + 1), 2800, inView && !reduced);

  // sliding black indicator under the active chip
  useEffect(() => {
    const wrap = chips.current;
    const el = wrap?.querySelectorAll<HTMLButtonElement>("button")[index];
    if (!el || !ind.current) return;
    ind.current.style.width = `${el.offsetWidth}px`;
    ind.current.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [index, schools]);

  // grow-into-place on scroll
  useScrollFrame((_, vh) => {
    const el = stage.current;
    if (!el || reduced) return;
    const p = progressOf(el, vh, 1.05, 0.35);
    el.style.transform = `translate3d(0, ${((1 - p) * 60).toFixed(1)}px, 0) scale(${(0.9 + 0.1 * p).toFixed(4)})`;
    el.querySelectorAll<HTMLElement>("[data-lift]").forEach((n) => {
      n.style.translate = `0 ${((1 - p) * Number(n.dataset.lift)).toFixed(1)}px`;
    });
  });

  const toasts = TOASTS(school.short);
  const t = toasts[toast % toasts.length];

  return (
    <section ref={section} id="showcase" aria-label="See it in your colours" className="relative -mt-4 pb-6">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center px-4 sm:px-8">
        <p className="text-[13px] font-medium text-muted">Try it. Pick a school:</p>
        <div
          ref={chips}
          role="group"
          aria-label="Demo schools"
          className="relative mt-3 flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-white/90 p-1.5 shadow-card backdrop-blur [scrollbar-width:none]"
        >
          <span ref={ind} aria-hidden="true" className="absolute left-0 top-1.5 h-[calc(100%-12px)] rounded-full bg-ink transition-[transform,width] duration-500 ease-out-expo">
            {playing && <i key={index} className="absolute inset-x-4 bottom-[5px] h-[2px] origin-left rounded-full bg-white/60" style={{ animation: `progress ${STORY_MS}ms linear both` }} />}
          </span>
          {schools.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === index}
              onClick={() => {
                setAuto(false);
                setIndex(i);
              }}
              className={`relative z-10 flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-medium transition-colors duration-300 ${
                i === index ? "text-white" : "text-body hover:text-ink"
              }`}
            >
              <span
                className="h-[14px] w-[14px] rounded-full ring-1 ring-white/40"
                style={{ background: `linear-gradient(135deg, ${s.primary} 50%, ${s.accent} 50%)` }}
              />
              {s.short}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1240px] px-3 sm:px-6">
        <div ref={stage} className="origin-top will-change-transform">
          <FitScale width={640} height={700} className="sm:hidden">
            <div className="relative h-full w-full">
              <Browser url={`www.${school.domain}`} className="absolute left-0 top-0 w-[860px] origin-top-left scale-[0.62]">
                <SiteHome />
              </Browser>
              <div className="absolute right-0 top-[120px] z-10 origin-top-right scale-[0.92]">
                <Phone>
                  <ParentApp />
                </Phone>
              </div>
              <div className="absolute left-[16px] top-[520px] z-20 w-[330px]">
                <div key={toast} style={{ animation: reduced ? undefined : "toast-in .6s cubic-bezier(.16,1,.3,1) both" }}>
                  <Toast title={t.title} sub={t.sub} icon={t.icon} />
                </div>
              </div>
            </div>
          </FitScale>
          <FitScale width={1180} height={760} className="hidden sm:block">
            <div className="relative h-full w-full">
              <div data-lift="40" className="absolute right-[150px] top-[6px] z-20">
                <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-2.5 pr-5 shadow-lift ring-1 ring-ink/5">
                  <AppIcon size={46} />
                  <span>
                    <b className="block text-[14px] font-semibold text-ink">{school.short}</b>
                    <span className="text-[12px] text-muted">On the App Store &amp; Google Play</span>
                  </span>
                </div>
              </div>

              <Browser url={`www.${school.domain}`} className="absolute left-[170px] top-[54px] w-[860px]">
                <SiteHome />
              </Browser>

              <div data-lift="90" className="absolute left-[34px] top-[180px] z-10 origin-top-left scale-[0.92]">
                <Phone>
                  <ParentApp />
                </Phone>
              </div>

              <div data-lift="130" className="absolute right-[26px] top-[250px] z-10 origin-top-right scale-[0.8]">
                <Phone>
                  <TeacherApp />
                </Phone>
              </div>

              <div data-lift="60" className="absolute left-[300px] top-[560px] z-20 w-[330px]">
                <div key={toast} style={{ animation: reduced ? undefined : "toast-in .6s cubic-bezier(.16,1,.3,1) both" }}>
                  <Toast title={t.title} sub={t.sub} icon={t.icon} />
                </div>
              </div>
            </div>
          </FitScale>
        </div>

        <ul className="mx-auto mt-6 flex max-w-[860px] flex-wrap justify-center gap-x-7 gap-y-2 text-[14px] text-body">
          {["Your name on the App Store & Play Store", "Your colours on every screen", "One team for website, ERP and apps"].map((x) => (
            <li key={x} className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-school/10 text-school">
                <I.Check size={12} />
              </span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
