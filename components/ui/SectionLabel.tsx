export function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={
        dark
          ? "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60"
          : "inline-flex items-center rounded-full border border-line bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-body shadow-[0_1px_0_rgb(11_11_15/0.03)]"
      }
    >
      {children}
    </span>
  );
}
