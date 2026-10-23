"use client";

import * as I from "@/components/ui/Icons";
import { Crest } from "@/components/mocks/Frames";
import { useSchool } from "@/components/mocks/SchoolContext";

/* Filled, full-colour classroom objects for the hero collage. Anything that
   should feel branded reads the --school-* colours, so it re-dresses with the
   rest of the page when a different school is picked. */

type P = { className?: string };

/** Spiral exercise book with the school's crest on the label. */
export function Notebook() {
  const { school } = useSchool();
  return (
    <div className="relative h-[172px] w-[136px] rounded-[5px_16px_16px_5px] bg-gradient-to-br from-school to-school-deep shadow-lift ring-1 ring-black/10">
      <div className="absolute inset-y-3 -left-[7px] flex flex-col justify-between">
        {Array.from({ length: 9 }).map((_, i) => (
          <i key={i} className="block h-[6px] w-[16px] rounded-full bg-gradient-to-b from-[#f4f4f7] to-[#9b9ba6] shadow-[0_1px_1px_rgb(0_0_0/.35)]" />
        ))}
      </div>
      <div className="absolute inset-x-4 top-7 rounded-md bg-white px-2 pb-2.5 pt-2 text-center shadow-[0_1px_2px_rgb(0_0_0/.12)]">
        <span className="flex justify-center">
          <Crest size={20} />
        </span>
        <b className="mt-1 block truncate text-[11px] font-semibold leading-tight text-ink">{school.short}</b>
        <span className="block text-[8.5px] font-medium uppercase tracking-[0.16em] text-muted">Mathematics</span>
        <i className="mx-auto mt-2 block h-px w-4/5 bg-ink/15" />
        <i className="mx-auto mt-2 block h-px w-4/5 bg-ink/15" />
      </div>
      <i className="absolute inset-y-0 right-5 w-[6px] bg-school-accent/90 shadow-[0_0_0_1px_rgb(0_0_0/.06)]" />
      <span className="absolute bottom-3 left-4 text-[9px] font-medium tracking-wide text-white/60">Grade 7A</span>
    </div>
  );
}

export const Pencil = ({ className }: P) => (
  <svg viewBox="0 0 200 30" className={className} aria-hidden="true">
    <rect x="0" y="4" width="22" height="22" rx="6" fill="#ff9fb4" />
    <rect x="18" y="3" width="18" height="24" rx="2" fill="#cfd2dc" />
    <path d="M23 3v24M28 3v24M33 3v24" stroke="#a9adb9" strokeWidth="1.2" />
    <rect x="36" y="4" width="128" height="22" fill="#f5c542" />
    <rect x="36" y="4" width="128" height="7" fill="#ffd970" />
    <rect x="36" y="19" width="128" height="7" fill="#e3a91f" />
    <path d="M164 4 190 15 164 26z" fill="#f2d2a2" />
    <path d="M164 4q5 3.7 0 7.3q5 3.7 0 7.4q5 3.6 0 7.3z" fill="#f5c542" />
    <path d="M183 12 198 15 183 18z" fill="#3a3a44" />
    <text x="62" y="18.5" fontSize="8" fontWeight="600" letterSpacing="1.5" fill="#8a6408">
      SGL · HB
    </text>
  </svg>
);

/** Fountain pen in the school's colours with an accent-coloured nib. */
export const FountainPen = ({ className }: P) => (
  <svg viewBox="0 0 200 28" className={className} aria-hidden="true">
    <path d="M11 3h63v22H11a11 11 0 0 1 0-22z" className="fill-school-deep" />
    <rect x="6" y="7" width="56" height="3" rx="1.5" fill="#fff" opacity=".18" />
    <rect x="16" y="0.5" width="44" height="5" rx="2.5" className="fill-school-accent" />
    <rect x="66" y="3" width="8" height="22" className="fill-school-accent" />
    <rect x="74" y="5" width="76" height="18" className="fill-school" />
    <rect x="76" y="8" width="70" height="3" rx="1.5" fill="#fff" opacity=".2" />
    <path d="M150 6 170 9v10l-20 3z" fill="#24242c" />
    <path d="M170 8.5Q186 10 198 14 186 18 170 19.5z" className="fill-school-accent" />
    <path d="M181 14h17" className="stroke-school-deep" strokeWidth="1" />
    <circle cx="180" cy="14" r="1.8" className="fill-school-deep" />
  </svg>
);

export const Ruler = ({ className }: P) => (
  <svg viewBox="0 0 220 40" className={className} aria-hidden="true">
    <rect x="1" y="1" width="218" height="38" rx="5" fill="#bfe8d3" fillOpacity=".94" stroke="#7cc4a1" strokeWidth="1.5" />
    <rect x="4" y="30" width="212" height="5" rx="2" fill="#fff" opacity=".35" />
    <g stroke="#2f6b52" strokeWidth="1">
      {Array.from({ length: 41 }).map((_, i) => (
        <path key={i} d={`M${10 + i * 5} 2v${i % 4 === 0 ? 13 : i % 2 === 0 ? 9 : 5}`} />
      ))}
    </g>
    <g fill="#2f6b52" fontSize="7.5" fontWeight="600" textAnchor="middle">
      {Array.from({ length: 11 }).map((_, i) => (
        <text key={i} x={10 + i * 20} y="26">
          {i}
        </text>
      ))}
    </g>
  </svg>
);

/** Three stacked books (the middle one in school colours) with an apple on top. */
export const BookStack = ({ className }: P) => (
  <svg viewBox="0 0 140 120" className={className} aria-hidden="true">
    <rect x="6" y="92" width="128" height="24" rx="4" fill="#ff8a3d" />
    <rect x="20" y="92" width="6" height="24" fill="#e06c22" />
    <rect x="112" y="96" width="18" height="16" rx="1.5" fill="#fff4e6" />
    <path d="M114 100h14M114 104h14M114 108h14" stroke="#f0d3b0" strokeWidth="1" />

    <rect x="14" y="70" width="114" height="22" rx="4" className="fill-school" />
    <rect x="18" y="74" width="16" height="14" rx="1.5" fill="#fff" />
    <path d="M20 78h12M20 82h12" stroke="#e3e3ea" strokeWidth="1" />
    <rect x="96" y="70" width="5" height="22" className="fill-school-accent" />
    <rect x="104" y="70" width="5" height="22" className="fill-school-accent" />

    <rect x="2" y="50" width="122" height="20" rx="4" fill="#4fd18b" />
    <rect x="40" y="55" width="40" height="10" rx="2" fill="#fff" opacity=".7" />
    <rect x="104" y="53" width="16" height="14" rx="1.5" fill="#f2fff8" />

    <path
      d="M62 24c-6-4-20-4-20 10 0 10 8 16 14 16 3 0 4-1 6-1s3 1 6 1c6 0 14-6 14-16 0-14-14-14-20-10z"
      fill="#ef4444"
    />
    <ellipse cx="51" cy="31" rx="3.5" ry="5.5" fill="#fff" opacity=".45" transform="rotate(-20 51 31)" />
    <path d="M62 24c0-5 1-8 4-11" fill="none" stroke="#7a4a24" strokeWidth="3" strokeLinecap="round" />
    <path d="M65 16c4-7 12-8 17-5-3 6-11 8-17 5z" fill="#4fd18b" />
  </svg>
);

const TODO: [string, boolean][] = [
  ["Fee reminders", true],
  ["Bus 4 on time", true],
  ["Annual Day photos", false],
];

export function StickyNote() {
  return (
    <div className="relative w-[150px] rounded-[3px] bg-gradient-to-b from-[#fff3a8] to-[#fde68a] px-4 pb-4 pt-5 shadow-[0_18px_30px_-16px_rgb(11_11_15/.45),0_2px_4px_rgb(11_11_15/.08)]">
      <i className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 bg-white/55 shadow-[0_1px_2px_rgb(0_0_0/.08)]" />
      <b className="font-serif text-[20px] font-normal italic leading-none text-ink">Today</b>
      <ul className="mt-2.5 space-y-1.5 text-[11.5px] leading-tight text-body">
        {TODO.map(([t, done]) => (
          <li key={t} className="flex items-center gap-1.5">
            <span className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border border-ink/40 ${done ? "bg-ink text-white" : ""}`}>
              {done && <I.Check size={9} />}
            </span>
            <span className={done ? "line-through decoration-ink/40" : ""}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const PaperPlane = ({ className }: P) => (
  <svg viewBox="0 0 170 80" className={className} aria-hidden="true">
    <path
      d="M4 70C30 66 34 40 60 46s36 14 56-18"
      fill="none"
      stroke="#0b0b0f"
      strokeWidth="1.6"
      strokeDasharray="4 6"
      strokeLinecap="round"
      opacity=".35"
    />
    <path d="M164 6 149 50 140 31 120 22z" fill="#fff" stroke="#0b0b0f" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M164 6 140 31 149 50z" fill="#e8ebf6" stroke="#0b0b0f" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
