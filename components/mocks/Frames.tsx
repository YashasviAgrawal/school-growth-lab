"use client";

import type { CSSProperties, ReactNode } from "react";
import * as I from "@/components/ui/Icons";
import { useSchool } from "./SchoolContext";

/* ---------- crest & illustration ---------- */

export function Crest({ size = 30 }: { size?: number }) {
  const { school } = useSchool();
  return (
    <svg viewBox="0 0 32 36" width={size} height={size * 1.125} aria-hidden="true" className="shrink-0">
      <path
        d="M16 1.5 29.5 6v10.6c0 8.7-6 14.6-13.5 17.9C8.5 31.2 2.5 25.3 2.5 16.6V6z"
        className="fill-school-deep stroke-school-accent"
        strokeWidth="1.3"
      />
      <path d="M16 4.6 26.7 8.2v8.3c0 7-4.7 11.8-10.7 14.6C10 28.3 5.3 23.5 5.3 16.5V8.2z" className="fill-none stroke-white/15" strokeWidth=".8" />
      <text
        x="16"
        y="21.2"
        textAnchor="middle"
        className="fill-school-accent"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12.5 }}
      >
        {school.initials}
      </text>
    </svg>
  );
}

/** Rounded app icon tile in the school's colours. */
export function AppIcon({ size = 56, radius }: { size?: number; radius?: number }) {
  return (
    <span
      className="grid place-items-center bg-gradient-to-br from-school to-school-deep shadow-[inset_0_0_0_1px_rgb(255_255_255/.14)]"
      style={{ width: size, height: size, borderRadius: radius ?? size * 0.235 }}
    >
      <Crest size={size * 0.48} />
    </span>
  );
}

export function SchoolBuilding({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden="true">
      <circle cx="272" cy="38" r="22" className="fill-school-accent" />
      <rect x="0" y="150" width="320" height="20" className="fill-white/15" />
      {/* trees */}
      <circle cx="28" cy="122" r="14" className="fill-white/25" />
      <rect x="26.5" y="128" width="3" height="22" className="fill-white/40" />
      <circle cx="298" cy="126" r="11" className="fill-white/25" />
      <rect x="296.5" y="130" width="3" height="20" className="fill-white/40" />
      {/* wings */}
      <rect x="52" y="82" width="74" height="68" rx="3" className="fill-white/90" />
      <rect x="194" y="82" width="74" height="68" rx="3" className="fill-white/90" />
      {/* tower */}
      <rect x="126" y="58" width="68" height="92" className="fill-white" />
      <path d="M120 60 160 24l40 36z" className="fill-white" />
      <circle cx="160" cy="76" r="10" className="fill-school" />
      <path d="M160 70v6l4 3" className="stroke-white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M149 150v-20a11 11 0 0 1 22 0v20z" className="fill-school" />
      {/* windows */}
      {[64, 88, 206, 230].map((x) => (
        <g key={x}>
          <rect x={x} y="94" width="10" height="16" rx="5" className="fill-school/75" />
          <rect x={x + 14} y="94" width="10" height="16" rx="5" className="fill-school/75" />
          <rect x={x} y="122" width="10" height="16" rx="5" className="fill-school/75" />
          <rect x={x + 14} y="122" width="10" height="16" rx="5" className="fill-school/75" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- device frames ---------- */

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex h-[46px] items-end justify-between px-7 pb-1.5 text-[12.5px] font-semibold ${dark ? "text-white" : "text-ink"}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg width="17" height="11" viewBox="0 0 17 11" aria-hidden="true" className="fill-current">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11" aria-hidden="true">
          <rect x=".5" y=".5" width="20" height="10" rx="3" className="fill-none stroke-current opacity-40" />
          <rect x="2" y="2" width="15" height="7" rx="1.6" className="fill-current" />
          <rect x="21.5" y="3.5" width="1.6" height="4" rx=".8" className="fill-current opacity-40" />
        </svg>
      </span>
    </div>
  );
}

/** iPhone-style frame on a 300 × 620 canvas. Scale it with a CSS transform from outside. */
export function Phone({
  children,
  className = "",
  style,
  darkStatus = false,
  screenClass = "bg-[#f6f6f4]",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  darkStatus?: boolean;
  screenClass?: string;
}) {
  return (
    <div className={`relative h-[620px] w-[300px] rounded-[50px] bg-[#111114] p-[10px] shadow-device ${className}`} style={style}>
      <div className="absolute inset-[3px] rounded-[47px] ring-1 ring-white/10" aria-hidden="true" />
      <div className={`relative h-full w-full overflow-hidden rounded-[41px] ${screenClass}`}>
        <div className="absolute left-1/2 top-[11px] z-30 h-[27px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        <StatusBar dark={darkStatus} />
        {children}
        <div className="absolute bottom-2 left-1/2 z-30 h-[4.5px] w-[112px] -translate-x-1/2 rounded-full bg-ink/80" />
      </div>
    </div>
  );
}

export function Browser({
  url,
  children,
  className = "",
  style,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`overflow-hidden rounded-[18px] bg-white shadow-device ring-1 ring-ink/5 ${className}`} style={style}>
      <div className="flex h-10 items-center gap-2 border-b border-line bg-[#f5f4f1] px-4">
        <i className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
        <i className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
        <i className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        <div className="mx-auto flex h-6 w-[46%] items-center justify-center gap-1.5 rounded-md bg-white text-[11px] text-muted ring-1 ring-line">
          <I.Lock size={10} />
          <span className="truncate">{url}</span>
        </div>
        <span className="w-[45px]" />
      </div>
      {children}
    </div>
  );
}

/** Small floating notification card used across the page. */
export function Toast({
  title,
  sub,
  icon,
  className = "",
  style,
}: {
  title: string;
  sub: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift ring-1 ring-ink/5 backdrop-blur ${className}`}
      style={style}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-school text-white">{icon ?? <I.Rupee size={17} />}</span>
      <span className="min-w-0">
        <b className="block truncate text-[13.5px] font-semibold text-ink">{title}</b>
        <span className="block truncate text-[12px] text-muted">{sub}</span>
      </span>
    </div>
  );
}
