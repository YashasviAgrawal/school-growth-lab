"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { PALETTES, SCHOOLS, makeSchool, type School } from "@/lib/schools";

/** What a visitor typed into the hero: their school's name and a colourway. */
export type Brand = { name: string; palette: number };

type Ctx = {
  school: School;
  index: number;
  setIndex: (i: number) => void;
  schools: School[];
  brand: Brand | null;
  setBrand: (b: Brand | null) => void;
  /** The visitor's own school, once they've started making one. */
  custom: School | null;
};
const SchoolCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "sgl-brand";

/** Holds the demo school the visitor picked; exposes its palette as CSS variables to every mock. */
export function SchoolProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand | null>(null);
  const [index, setIndex] = useState(0);
  const custom = useMemo(() => (brand ? makeSchool(brand.name, PALETTES[brand.palette] ?? PALETTES[0]) : null), [brand]);
  const schools = useMemo(() => (custom ? [custom, ...SCHOOLS] : SCHOOLS), [custom]);
  const school = schools[Math.min(index, schools.length - 1)];

  // A returning visitor sees their own school again.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved.name === "string") setBrandState({ name: saved.name.slice(0, 48), palette: Number(saved.palette) || 0 });
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setBrand = useCallback((b: Brand | null) => {
    setBrandState(b);
    setIndex(0);
    try {
      if (b) localStorage.setItem(STORAGE_KEY, JSON.stringify(b));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(() => ({ school, index, setIndex, schools, brand, setBrand, custom }), [school, index, schools, brand, setBrand, custom]);
  const style = {
    "--school-primary": school.primary,
    "--school-deep": school.deep,
    "--school-accent": school.accent,
    "--school-soft": school.soft,
    transition:
      "--school-primary .7s cubic-bezier(.16,1,.3,1), --school-deep .7s cubic-bezier(.16,1,.3,1), --school-accent .7s cubic-bezier(.16,1,.3,1), --school-soft .7s cubic-bezier(.16,1,.3,1)",
  } as CSSProperties;
  return (
    <SchoolCtx.Provider value={value}>
      <div style={style}>{children}</div>
    </SchoolCtx.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolCtx);
  if (!ctx) throw new Error("useSchool must be used inside <SchoolProvider>");
  return ctx;
}

export const article = (word: string) => (/^[aeiouAEIOU]|^I[BC]|^IC/.test(word) ? "An" : "A");
