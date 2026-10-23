import { Marquee } from "@/components/ui/Marquee";

const BOARDS = ["CBSE", "ICSE", "IB", "Cambridge IGCSE", "State Boards", "Pre-schools", "K–12 school groups", "Day & boarding schools"];

export function Boards() {
  return (
    <section aria-label="Built for every kind of school" className="py-16 sm:py-20">
      <p className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted">Built for every kind of school</p>
      <Marquee items={BOARDS} label="Boards and school types we work with" />
    </section>
  );
}
