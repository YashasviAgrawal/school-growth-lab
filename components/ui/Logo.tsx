import { useId } from "react";

/* The Living Crest: a school crest with a growth line rising through it and a
   spark breaking out of its corner. The spark stays orange in every colourway;
   the crest itself can wear ink, white, or the current school's colours. */

const SHIELD =
  "M20 3.2c4.9 2.1 10.2 3 15.3 3.1 1.2 0 2.2 1 2.2 2.2V20c0 10.4-6.8 17.6-16.3 21.3-.8.3-1.6.3-2.4 0C9.3 37.6 2.5 30.4 2.5 20V8.5c0-1.2 1-2.2 2.2-2.2C9.8 6.2 15.1 5.3 20 3.2z";
const INNER = "M20 7.4c3.9 1.6 8.1 2.4 12.2 2.6V20c0 8.1-5.1 13.9-12.2 17.1C12.9 33.9 7.8 28.1 7.8 20V10c4.1-.2 8.3-1 12.2-2.6z";
const LINE = "M10.4 32.2c4-.1 6-2.9 7.6-6.9 2-4.9 4.4-11.7 12.4-13.8";
const TWINKLE = "M27.2.6Q27.2 3 29.6 3 27.2 3 27.2 5.4 27.2 3 24.8 3 27.2 3 27.2.6z";

type Tone = "ink" | "light" | "school";

const SHIELD_STOPS: Record<Tone, [string, string]> = {
  ink: ["#2b2b33", "#0b0b0f"],
  light: ["#ffffff", "#e4e4ea"],
  school: ["var(--school-primary)", "var(--school-deep)"],
};

export function LogoMark({ size = 30, tone = "ink", animate = false }: { size?: number; tone?: Tone; animate?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // Below 24px the inner outline and twinkle turn to noise, so the mark simplifies itself.
  const detail = size >= 24;
  const [lineFrom, lineTo] = tone === "light" ? ["#0b0b0f", "#3d3d48"] : ["#ffffff", "#ffd3b3"];
  return (
    <svg viewBox="0 0 40 44" width={size} height={size * 1.1} aria-hidden="true" className={`crest shrink-0 overflow-visible ${animate ? "crest-intro" : ""}`}>
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: SHIELD_STOPS[tone][0] }} />
          <stop offset="1" style={{ stopColor: SHIELD_STOPS[tone][1] }} />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={lineFrom} />
          <stop offset="1" stopColor={lineTo} />
        </linearGradient>
        <radialGradient id={`${id}b`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#ffc89c" />
          <stop offset="0.55" stopColor="#ff8a3d" />
          <stop offset="1" stopColor="#e2600f" />
        </radialGradient>
      </defs>
      <path d={SHIELD} fill={`url(#${id}s)`} />
      {detail && <path d={INNER} fill="none" stroke={tone === "light" ? "rgb(11 11 15 / .1)" : "rgb(255 255 255 / .14)"} strokeWidth=".8" />}
      <g className="crest-line-in">
        <path className="crest-line" d={LINE} fill="none" stroke={`url(#${id}l)`} strokeWidth="3.4" strokeLinecap="round" pathLength={1} />
      </g>
      <g className="crest-ball-in">
        <g className="crest-ball">
          <circle cx="33.4" cy="9.6" r="4.6" fill={`url(#${id}b)`} />
          <circle cx="32" cy="8.1" r="1.2" fill="#fff" opacity=".75" />
        </g>
      </g>
      {detail && (
        <g className="crest-twinkle-in">
          <path className="crest-twinkle" d={TWINKLE} fill="#ff8a3d" />
        </g>
      )}
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-[-0.02em] text-ink ${className}`}>
      School Growth <span className="font-serif font-normal italic tracking-normal">Lab</span>
    </span>
  );
}
