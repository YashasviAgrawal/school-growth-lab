"use client";

import * as I from "@/components/ui/Icons";
import { Crest, SchoolBuilding } from "./Frames";
import { article, useSchool } from "./SchoolContext";

export function SiteNav({ compact = false }: { compact?: boolean }) {
  const { school } = useSchool();
  return (
    <div className="flex h-[60px] items-center gap-3 border-b border-line px-6">
      <Crest size={28} />
      <span className="leading-tight">
        <b className="block text-[13.5px] font-semibold text-ink">{school.name}</b>
        <span className="text-[10.5px] text-muted">
          {school.board} · {school.city}
        </span>
      </span>
      <nav className="ml-auto flex items-center gap-5 text-[11.5px] text-body">
        {!compact && (
          <>
            <span>About</span>
            <span>Academics</span>
            <span>Admissions</span>
            <span>Campus Life</span>
            <span>Contact</span>
          </>
        )}
        <span className="rounded-full bg-school px-4 py-2 font-semibold text-white">Apply now</span>
      </nav>
    </div>
  );
}

/** School homepage: hero, notices, events and results. Designed on an 860px-wide canvas. */
export function SiteHome() {
  const { school } = useSchool();
  return (
    <div className="bg-white">
      <SiteNav />
      <div className="relative mx-5 mt-5 h-[290px] overflow-hidden rounded-[22px] bg-gradient-to-br from-school to-school-deep p-9 text-white">
        <span className="rounded-full bg-white/15 px-3 py-1 text-[11px]">Admissions open · 2027–28</span>
        <h4 className="mt-5 font-serif text-[52px] font-normal italic leading-none tracking-[-0.01em] text-white">{school.motto}</h4>
        <p className="mt-3 max-w-[320px] text-[13px] leading-relaxed text-white/80">
          Nursery to Grade 12 in the heart of {school.city}. A school where every child is known.
        </p>
        <div className="mt-5 flex gap-2.5 text-[12px] font-semibold">
          <span className="rounded-full bg-school-accent px-4 py-2.5 text-school-deep">Book a campus visit</span>
          <span className="rounded-full px-4 py-2.5 ring-1 ring-white/40">Explore academics</span>
        </div>
        <SchoolBuilding className="absolute bottom-0 right-4 w-[330px]" />
      </div>
      <div className="mx-5 my-4 grid grid-cols-3 gap-3 pb-1">
        <div className="rounded-2xl bg-school-soft p-4">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-school">
            <I.Bell size={12} /> Notices
          </span>
          <p className="mt-2.5 text-[12px] text-ink">Annual Day rehearsal schedule</p>
          <p className="mt-1.5 text-[12px] text-ink">PTM for Grades 6–8 on Saturday</p>
        </div>
        <div className="rounded-2xl bg-school-soft p-4">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-school">
            <I.Calendar size={12} /> Events
          </span>
          <div className="mt-2.5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-center leading-none text-school">
              <span>
                <b className="block text-[16px]">14</b>
                <span className="text-[8.5px] font-semibold">NOV</span>
              </span>
            </span>
            <span className="text-[12px] text-ink">Children&apos;s Day Carnival</span>
          </div>
        </div>
        <div className="rounded-2xl bg-school-deep p-4 text-white">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-school-accent">
            <I.Trophy size={12} /> Results 2026
          </span>
          <b className="mt-1.5 block font-serif text-[32px] font-normal italic leading-none">98.4%</b>
          <span className="text-[11px] text-white/75">Board results, first division</span>
        </div>
      </div>
    </div>
  );
}

/** Admissions-led landing variant used on the product card. */
export function SiteAbout() {
  const { school } = useSchool();
  return (
    <div className="bg-white">
      <SiteNav compact />
      <div className="px-8 pb-8 pt-8">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-school">Admissions 2027–28</span>
        <h4 className="mt-3 font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
          Curious minds.
          <br />
          <span className="font-serif font-normal italic tracking-normal text-school">{school.motto}</span>
        </h4>
        <p className="mt-3 max-w-[330px] text-[13px] leading-relaxed text-muted">
          {article(school.board)} {school.board} school in {school.city} where academics, arts and sport grow together.
        </p>
        <div className="mt-5 flex gap-2.5 text-[12px] font-semibold">
          <span className="rounded-full bg-school px-4 py-2.5 text-white">Enquire now</span>
          <span className="rounded-full px-4 py-2.5 text-ink ring-1 ring-line">Virtual tour →</span>
        </div>
        <div className="mt-7 flex gap-8">
          {[
            ["1998", "Established"],
            ["2,400", "Students"],
            ["40 acre", "Green campus"],
          ].map(([v, l]) => (
            <span key={l}>
              <b className="block font-display text-[22px] font-semibold tracking-tight text-ink">{v}</b>
              <span className="text-[11px] text-muted">{l}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteNotices() {
  const rows = [
    ["12 Nov", "Annual Day 2026: dress rehearsal schedule", "Circular"],
    ["10 Nov", "Winter uniform from Monday, 18 November", "Notice"],
    ["08 Nov", "Inter-house science fair: results announced", "Achievement"],
    ["05 Nov", "Term 2 fee instalment due by 15 November", "Fees"],
  ];
  return (
    <div className="bg-white">
      <SiteNav />
      <div className="grid grid-cols-[1.45fr_1fr] gap-6 p-7">
        <div>
          <h4 className="font-display text-[26px] font-semibold tracking-tight text-ink">Notices &amp; circulars</h4>
          <p className="mt-1 text-[11.5px] text-muted">Updated by the school office, live on the website and in the Parent App.</p>
          <div className="mt-4 divide-y divide-line rounded-2xl ring-1 ring-line">
            {rows.map(([d, t, tag]) => (
              <div key={t} className="flex items-center gap-3 px-4 py-3 text-[12px]">
                <span className="w-12 shrink-0 font-semibold text-school">{d}</span>
                <span className="min-w-0 flex-1 truncate text-ink">{t}</span>
                <span className="rounded-full bg-school-soft px-2 py-0.5 text-[10px] font-semibold text-school">{tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl bg-school-deep p-5 text-white">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-school-accent">Upcoming</span>
            <b className="mt-1 block font-serif text-[24px] font-normal italic leading-tight">Children&apos;s Day Carnival</b>
            <span className="text-[11px] text-white/75">Thursday, 14 November · Main ground</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={`aspect-square rounded-xl ${i % 3 === 1 ? "bg-school/70" : i % 2 ? "bg-school/45" : "bg-school-accent/55"}`} />
            ))}
          </div>
          <span className="block text-[10.5px] text-muted">Gallery · Science fair 2026</span>
        </div>
      </div>
    </div>
  );
}

export function SiteAdmissions() {
  const { school } = useSchool();
  return (
    <div className="bg-white">
      <SiteNav />
      <div className="grid grid-cols-[1.1fr_1fr] gap-8 p-8">
        <div>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-school">Admissions 2027–28</span>
          <h4 className="mt-2 font-display text-[28px] font-semibold leading-[1.08] tracking-tight text-ink">
            Begin your child&apos;s journey at {school.short}.
          </h4>
          <ol className="mt-5 space-y-3 text-[12.5px] text-ink">
            {["Submit an enquiry", "Visit our campus", "Interaction & assessment", "Confirm admission"].map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-school-soft text-[10.5px] font-semibold text-school">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-lift ring-1 ring-line">
          <b className="text-[14.5px] font-semibold text-ink">Admission enquiry</b>
          <span className="block text-[11px] text-muted">We&apos;ll call you back within a day.</span>
          {[
            ["Parent's name", "Neha Sharma"],
            ["Mobile number", "+91 98•••• ••210"],
            ["Applying for", "Grade 3"],
          ].map(([l, v]) => (
            <label key={l} className="mt-3 block text-[10.5px] text-muted">
              {l}
              <span className="mt-1 flex h-9 items-center rounded-lg px-3 text-[12px] text-ink ring-1 ring-line">{v}</span>
            </label>
          ))}
          <span className="mt-4 flex h-10 items-center justify-center rounded-full bg-school text-[12.5px] font-semibold text-white">Submit enquiry</span>
          <span className="mt-2.5 flex items-center justify-center gap-1.5 text-[10.5px] text-muted">
            <I.WhatsApp size={12} className="text-[#25d366]" /> Or chat with admissions on WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}

/** Mobile version of the school site, shown inside a <Phone>. */
export function SiteMobile() {
  const { school } = useSchool();
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 py-2">
        <Crest size={24} />
        <b className="text-[13px] font-semibold text-ink">{school.short}</b>
        <I.Menu size={16} className="ml-auto text-ink" />
      </div>
      <div className="relative mt-1 h-[200px] overflow-hidden rounded-[20px] bg-gradient-to-br from-school to-school-deep p-4 text-white">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px]">Admissions open</span>
        <b className="mt-3 block font-serif text-[30px] font-normal italic leading-none">{school.motto}</b>
        <SchoolBuilding className="absolute bottom-0 right-0 w-[200px]" />
      </div>
      <div className="mt-3 flex gap-2">
        <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-school text-[13px] font-semibold text-white">Apply now</span>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink ring-1 ring-line">
          <I.Phone size={15} />
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["Admissions", "Fee structure", "Notices", "Gallery"].map((l) => (
          <span key={l} className="rounded-xl bg-school-soft px-3 py-2.5 text-[11.5px] font-semibold text-school">
            {l}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0/.05)]">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-school text-center leading-none text-white">
          <span>
            <b className="block text-[14px]">14</b>
            <span className="text-[8px] font-semibold">NOV</span>
          </span>
        </span>
        <span className="text-[12px] text-ink">Children&apos;s Day Carnival</span>
      </div>
    </div>
  );
}

/** Principal's dashboard for the Management tab. 900px-wide canvas. */
export function ErpDashboard() {
  const { school } = useSchool();
  const bars = [44, 56, 50, 70, 64, 78, 68, 84, 76, 96];
  const months = ["A", "M", "J", "J", "A", "S", "O", "N", "D", "J"];
  const funnel: [string, number, number][] = [
    ["Enquiries", 342, 100],
    ["Campus visits", 188, 55],
    ["Applications", 121, 35],
    ["Enrolled", 86, 25],
  ];
  const nav: [string, React.ReactNode][] = [
    ["Dashboard", <I.LayoutGrid key="a" size={13} />],
    ["Admissions", <I.UserPlus key="b" size={13} />],
    ["Students", <I.Users key="c" size={13} />],
    ["Fees", <I.Rupee key="d" size={13} />],
    ["Attendance", <I.ClipboardCheck key="e" size={13} />],
    ["Exams", <I.FileText key="f" size={13} />],
    ["Circulars", <I.Megaphone key="g" size={13} />],
    ["Reports", <I.BarChart key="h" size={13} />],
    ["Settings", <I.Settings key="i" size={13} />],
  ];
  return (
    <div className="grid h-[520px] grid-cols-[176px_1fr] bg-white">
      <aside className="border-r border-line bg-[#fafaf8] p-3.5">
        <div className="mb-4 flex items-center gap-2">
          <Crest size={24} />
          <span className="leading-tight">
            <b className="block text-[12px] font-semibold text-ink">{school.short}</b>
            <span className="text-[9.5px] text-muted">School ERP</span>
          </span>
        </div>
        {nav.map(([l, ic], i) => (
          <span
            key={l}
            className={`mb-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11.5px] ${i === 0 ? "bg-school-soft font-semibold text-school" : "text-body"}`}
          >
            {ic}
            {l}
          </span>
        ))}
      </aside>
      <div className="p-5">
        <div className="flex items-end justify-between">
          <span>
            <span className="text-[10.5px] text-muted">Tuesday, 12 November</span>
            <b className="block font-display text-[19px] font-semibold tracking-tight text-ink">Good morning, Principal</b>
          </span>
          <span className="flex gap-2 text-[10.5px]">
            <span className="flex items-center gap-1.5 rounded-full bg-[#f4f4f2] px-3 py-1.5 text-muted">
              <I.Search size={11} /> Search students, staff…
            </span>
            <span className="rounded-full bg-school-soft px-3 py-1.5 font-semibold text-school">Term 2 · 2026–27</span>
          </span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2.5">
          <div className="rounded-2xl bg-gradient-to-br from-school to-school-deep p-3.5 text-white">
            <span className="text-[10px] text-white/70">Fees collected</span>
            <b className="block font-display text-[22px] font-semibold">₹1.84 Cr</b>
            <span className="text-[10px] text-school-accent">78% of term</span>
          </div>
          {[
            ["Admission enquiries", "342", "+18% vs last year"],
            ["Attendance today", "94.2%", "1,912 of 2,030"],
            ["Staff present", "126 / 131", "5 on leave"],
          ].map(([l, v, s]) => (
            <div key={l} className="rounded-2xl bg-[#f6f6f4] p-3.5">
              <span className="text-[10px] text-muted">{l}</span>
              <b className="block font-display text-[22px] font-semibold text-ink">{v}</b>
              <span className="text-[10px] text-muted">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
          <div className="rounded-2xl p-4 ring-1 ring-line">
            <div className="flex justify-between text-[11.5px]">
              <b className="font-semibold text-ink">Fee collection</b>
              <span className="text-muted">Apr – Jan</span>
            </div>
            <div className="mt-3 flex h-[150px] items-end gap-2.5">
              {bars.map((h, i) => (
                <span key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <i
                    className={`sgl-bar block w-full rounded-t-md ${i === bars.length - 1 ? "bg-school" : "bg-school/30"}`}
                    style={{ height: `${h}%`, ["--i" as string]: i } as React.CSSProperties}
                  />
                  <span className="text-[9px] text-muted">{months[i]}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-4 ring-1 ring-line">
            <b className="text-[11.5px] font-semibold text-ink">Admissions 2027–28</b>
            {funnel.map(([l, v, w]) => (
              <div key={l} className="mt-3">
                <div className="flex justify-between text-[10.5px]">
                  <span className="text-body">{l}</span>
                  <b className="text-ink">{v}</b>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-school/10">
                  <i className="block h-full rounded-full bg-school" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
