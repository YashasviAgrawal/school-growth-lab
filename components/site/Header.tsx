"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as I from "@/components/ui/Icons";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { useScrollFrame } from "@/lib/motion";

const LINKS = [
  { href: "/websites", label: "Websites" },
  { href: "/erp", label: "School ERP" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const active = LINKS.find((l) => pathname.startsWith(l.href))?.href ?? null;

  useScrollFrame((y) => setSolid(y > 24));

  useEffect(() => setOpen(false), [pathname]);

  // Slide the grey pill under the hovered (or active) link, the way wajo.ai's nav does.
  useEffect(() => {
    const target = hover ?? active;
    const nav = navRef.current;
    const p = pill.current;
    if (!nav || !p) return;
    const a = target ? nav.querySelector<HTMLAnchorElement>(`a[href="${target}"]`) : null;
    if (!a) {
      p.style.opacity = "0";
      return;
    }
    p.style.opacity = "1";
    p.style.width = `${a.offsetWidth}px`;
    p.style.transform = `translateX(${a.offsetLeft}px)`;
  }, [hover, active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+12px)] z-50 px-3 sm:px-4">
      <div
        className={`mx-auto flex h-[58px] max-w-[1040px] items-center justify-between gap-4 rounded-full border pl-3 pr-2 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 sm:pl-4 ${
          solid
            ? "border-line bg-white/85 shadow-[0_10px_30px_-12px_rgb(11_11_15/0.18)]"
            : "border-white/60 bg-white/55 shadow-[0_1px_0_rgb(11_11_15/0.03)]"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="School Growth Lab, home">
          <LogoMark size={28} animate />
          <Wordmark className="text-[15.5px]" />
        </Link>

        <nav
          ref={navRef}
          aria-label="Main"
          className="relative hidden items-center md:flex"
          onMouseLeave={() => setHover(null)}
        >
          <span
            ref={pill}
            aria-hidden="true"
            className="absolute left-0 top-0 h-full rounded-full bg-ink/[0.06] opacity-0 transition-[transform,width,opacity] duration-300 ease-out-expo"
          />
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "page" : undefined}
              onMouseEnter={() => setHover(l.href)}
              onFocus={() => setHover(l.href)}
              className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                active === l.href ? "text-ink" : "text-body hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="#contact"
            className="group hidden h-[42px] items-center gap-1.5 rounded-full bg-ink pl-5 pr-4 text-[14px] font-semibold text-white transition-transform duration-300 hover:-translate-y-px sm:inline-flex"
          >
            Book a demo
            <I.ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            className="grid h-[42px] w-[42px] place-items-center rounded-full text-ink hover:bg-ink/5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <I.Close size={20} /> : <I.Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mx-auto mt-2 max-w-[1040px] origin-top overflow-hidden rounded-3xl border border-line bg-white/95 shadow-lift backdrop-blur-xl transition-all duration-500 ease-out-expo md:hidden ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="grid p-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-4 py-3.5 text-[16px] font-medium text-ink hover:bg-ink/5 ${active === l.href ? "bg-ink/5" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="m-2 flex h-12 items-center justify-center gap-1.5 rounded-full bg-ink text-[15px] font-semibold text-white"
          >
            Book a demo <I.ArrowRight size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}
