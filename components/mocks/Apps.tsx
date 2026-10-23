"use client";

import * as I from "@/components/ui/Icons";
import { AppIcon, Crest } from "./Frames";
import { useSchool } from "./SchoolContext";

function AppHeader({ label }: { label: string }) {
  const { school } = useSchool();
  return (
    <div className="flex items-center gap-2.5 px-5 pb-3 pt-1.5">
      <Crest size={28} />
      <div className="leading-tight">
        <b className="block text-[13.5px] font-semibold text-ink">{school.short}</b>
        <span className="text-[10.5px] text-muted">{label}</span>
      </div>
      <span className="relative ml-auto grid h-8 w-8 place-items-center rounded-full bg-white text-ink shadow-card">
        <I.Bell size={14} />
        <i className="absolute right-[7px] top-[7px] h-[6px] w-[6px] rounded-full bg-school-accent ring-2 ring-white" />
      </span>
    </div>
  );
}

function TabBar({ items }: { items: { label: string; icon: React.ReactNode }[] }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-line bg-white/95 pb-7 pt-2.5 backdrop-blur">
      {items.map((it, i) => (
        <span key={it.label} className={`flex flex-col items-center gap-1 text-[10px] font-medium ${i === 0 ? "text-school" : "text-faint"}`}>
          {it.icon}
          {it.label}
        </span>
      ))}
    </div>
  );
}

function Ring({ value }: { value: number }) {
  const c = 2 * Math.PI * 15;
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true">
      <circle cx="19" cy="19" r="15" fill="none" strokeWidth="5" className="stroke-school/15" />
      <circle
        cx="19"
        cy="19"
        r="15"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-school"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        transform="rotate(-90 19 19)"
      />
    </svg>
  );
}

export function ParentApp() {
  return (
    <>
      <AppHeader label="Parent App" />
      <div className="space-y-2.5 px-4">
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-school to-school-deep p-4 text-white">
          <i className="absolute -right-8 -top-10 h-32 w-32 rounded-full border-[14px] border-white/5" aria-hidden="true" />
          <i className="absolute right-4 top-4 h-2 w-2 rounded-full bg-school-accent" aria-hidden="true" />
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-[12px] font-semibold">AS</span>
            <span>
              <b className="block text-[14.5px] font-semibold">Aarav Sharma</b>
              <span className="text-[11px] text-white/75">Grade 5 · Section B · Roll 12</span>
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/12 px-3 py-2 text-[11px]">
            <I.Check size={12} /> Checked in at 7:52 AM
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-[18px] bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0/.04)]">
            <div className="flex items-center justify-between text-[11px] text-muted">
              Attendance <I.ClipboardCheck size={12} className="text-school" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Ring value={96} />
              <b className="text-[19px] font-semibold text-ink">96%</b>
            </div>
          </div>
          <div className="rounded-[18px] bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0/.04)]">
            <div className="flex items-center justify-between text-[11px] text-muted">
              School bus <I.Bus size={12} className="text-school" />
            </div>
            <b className="mt-1.5 block text-[19px] font-semibold text-ink">6 min</b>
            <span className="text-[10.5px] leading-tight text-muted">Route 4 · Park Street</span>
          </div>
        </div>
        <div className="rounded-[18px] bg-white p-3.5 shadow-[0_1px_2px_rgb(0_0_0/.04)]">
          <div className="flex items-center justify-between text-[11px] text-muted">
            Term 2 fees · due 15 Nov
            <span className="rounded-full bg-school-soft px-2 py-0.5 text-[10px] font-semibold text-school">Due soon</span>
          </div>
          <b className="mt-1 block text-[22px] font-semibold tracking-tight text-ink">₹12,500</b>
          <span className="mt-2.5 flex h-10 items-center justify-center rounded-xl bg-school text-[13px] font-semibold text-white">Pay with UPI</span>
        </div>
        <div className="rounded-[18px] bg-white p-3.5 text-[11.5px] shadow-[0_1px_2px_rgb(0_0_0/.04)]">
          <span className="text-[11px] text-muted">Today&apos;s homework</span>
          <p className="mt-1.5"><b className="text-school">Maths</b> · Fractions worksheet, page 42</p>
          <p className="mt-1"><b className="text-school">Science</b> · Draw a plant cell</p>
        </div>
      </div>
      <TabBar
        items={[
          { label: "Home", icon: <I.Home size={17} /> },
          { label: "Fees", icon: <I.Wallet size={17} /> },
          { label: "Chat", icon: <I.Chat size={17} /> },
          { label: "Profile", icon: <I.User size={17} /> },
        ]}
      />
    </>
  );
}

const CLASS = ["AK", "DS", "RM", "IP", "VJ", "AN", "KB", "SR", "TM", "YG", "NH", "PL", "ZQ", "MC", "OD"];

export function TeacherApp() {
  return (
    <>
      <AppHeader label="Teacher App" />
      <div className="px-5">
        <span className="text-[11.5px] text-muted">Good morning,</span>
        <b className="block font-display text-[21px] font-semibold tracking-tight text-ink">Ms. Iyer</b>
      </div>
      <div className="mx-4 mt-3 rounded-[20px] bg-white p-3.5 shadow-[0_1px_2px_rgb(0_0_0/.04)]">
        <div className="flex items-center justify-between">
          <b className="text-[13px] font-semibold text-ink">Grade 7A · Science</b>
          <span className="rounded-full bg-school-soft px-2 py-0.5 text-[10.5px] font-semibold text-school">32 / 34</span>
        </div>
        <span className="text-[10.5px] text-muted">Period 3 · 10:20 AM</span>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {CLASS.map((c) => (
            <span
              key={c}
              className={`grid aspect-square place-items-center rounded-full text-[10px] font-semibold ${
                c === "PL" ? "bg-white text-red-500 ring-1 ring-red-300" : "bg-school text-white"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
        <span className="mt-3 flex h-10 items-center justify-center rounded-xl bg-school text-[12.5px] font-semibold text-white">
          Submit attendance
        </span>
      </div>
      <div className="mx-4 mt-2.5 grid grid-cols-4 gap-2">
        {[
          ["Homework", <I.NotebookPen key="h" size={15} />],
          ["Marks", <I.FileText key="m" size={15} />],
          ["Notice", <I.Megaphone key="n" size={15} />],
          ["Timetable", <I.Calendar key="t" size={15} />],
        ].map(([label, icon]) => (
          <span key={label as string} className="flex flex-col items-center gap-1 rounded-2xl bg-white py-2.5 text-[9.5px] text-body shadow-[0_1px_2px_rgb(0_0_0/.04)]">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-school-soft text-school">{icon}</span>
            {label}
          </span>
        ))}
      </div>
      <div className="mx-4 mt-2.5 rounded-[18px] bg-white p-3 text-[11px] shadow-[0_1px_2px_rgb(0_0_0/.04)]">
        <span className="text-muted">Up next · 11:20 AM</span>
        <b className="block text-[13px] font-semibold text-ink">Grade 8C · Physics</b>
      </div>
      <TabBar
        items={[
          { label: "Today", icon: <I.Home size={17} /> },
          { label: "Classes", icon: <I.ClipboardCheck size={17} /> },
          { label: "Messages", icon: <I.Chat size={17} /> },
          { label: "Profile", icon: <I.User size={17} /> },
        ]}
      />
    </>
  );
}

/** A generic vendor ERP app — the "before" in the compare slider. */
export function VendorApp() {
  const tiles = ["Attendance", "Fees", "Homework", "Exams", "Timetable", "Notices", "Transport", "Library", "Gallery", "Leave", "Reports", "More"];
  return (
    <div className="absolute inset-0 flex flex-col bg-[#eef0f3] font-[Arial,Helvetica,sans-serif] text-[#2b2f36]">
      <div className="bg-[#2f6fde] px-5 pb-3 text-white">
        <div className="-mx-2 flex h-[46px] items-end pb-1.5 text-[12.5px] font-semibold">9:41</div>
        <b className="text-[14px]">VendorX ERP</b>
        <span className="block text-[10.5px] opacity-80">School ID: 004817</span>
      </div>
      <div className="mx-3 mt-3 border border-dashed border-[#d4b100] bg-[#fff6c8] px-3 py-2 text-[10.5px] text-[#6d5a00]">
        Upgrade to VendorX Premium for more features!
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 px-3">
        {tiles.map((t) => (
          <span key={t} className="flex flex-col items-center gap-1.5 border border-[#d6d9de] bg-white py-3 text-[9.5px]">
            <i className="h-5 w-5 bg-[#c9ced6]" />
            {t}
          </span>
        ))}
      </div>
      <div className="mx-3 mt-3 flex items-center justify-between border border-[#d6d9de] bg-white p-3 text-[11px]">
        <span>
          Fee due
          <b className="block text-[14px]">INR 12500.00</b>
        </span>
        <span className="bg-[#2f6fde] px-3 py-1.5 text-[10px] font-bold text-white">PAY NOW</span>
      </div>
      <span className="mt-auto pb-8 text-center text-[9.5px] text-[#8b919b]">Powered by VendorX Technologies</span>
    </div>
  );
}

/** Phone home screen with the school's own app installed. */
export function HomeScreen({ showNote = true }: { showNote?: boolean }) {
  const { school } = useSchool();
  const apps: [string, React.ReactNode][] = [
    ["Mail", <I.Mail key="a" size={18} />],
    ["Calendar", <I.Calendar key="b" size={18} />],
    ["Camera", <I.Camera key="c" size={18} />],
    ["Maps", <I.MapPin key="d" size={18} />],
    ["Music", <I.Music key="e" size={18} />],
    ["__school", null],
    ["News", <I.Newspaper key="f" size={18} />],
    ["Notes", <I.Star key="g" size={18} />],
    ["Reminders", <I.Bell key="h" size={18} />],
    ["Settings", <I.Settings key="i" size={18} />],
    ["Photos", <I.ImageIcon key="j" size={18} />],
    ["Search", <I.Search key="k" size={18} />],
  ];
  return (
    <div className="absolute inset-0 bg-[linear-gradient(160deg,#e3e0ff_0%,#f6e6f2_45%,#ffe8d6_100%)] pt-[62px]">
      <div className="grid grid-cols-4 gap-x-3 gap-y-4 px-6">
        {apps.map(([label, icon]) =>
          label === "__school" ? (
            <span key="school" className="sgl-app-icon flex flex-col items-center gap-1 text-[10px] font-semibold text-ink">
              <AppIcon size={54} />
              {school.short}
            </span>
          ) : (
            <span key={label} className="flex flex-col items-center gap-1 text-[10px] text-body">
              <span className="grid h-[54px] w-[54px] place-items-center rounded-[14px] bg-white/70 text-ink/70 shadow-[0_1px_2px_rgb(0_0_0/.05)]">
                {icon}
              </span>
              {label}
            </span>
          ),
        )}
      </div>
      <div
        className={`sgl-note mx-4 mt-6 rounded-[22px] bg-white/85 p-3.5 shadow-lift backdrop-blur transition-all duration-700 ${
          showNote ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <AppIcon size={20} radius={6} />
          {school.short}
          <span className="ml-auto font-normal normal-case tracking-normal">now</span>
        </div>
        <b className="mt-1.5 block text-[13.5px] font-semibold text-ink">Bus arrives in 6 min</b>
        <span className="text-[11.5px] text-muted">Route 4 · Park Street stop</span>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-school/15">
          <i className="block h-full w-[72%] rounded-full bg-school" />
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-6 grid grid-cols-4 gap-3 rounded-[26px] bg-white/55 p-3 backdrop-blur">
        {[<I.ClipboardCheck key="1" size={18} />, <I.Mail key="2" size={18} />, <I.Camera key="3" size={18} />, <I.Music key="4" size={18} />].map((ic, i) => (
          <span key={i} className="grid h-[50px] place-items-center rounded-[14px] bg-white/80 text-ink/70">
            {ic}
          </span>
        ))}
      </div>
    </div>
  );
}
