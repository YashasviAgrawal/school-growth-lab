import { LogoMark } from "@/components/ui/Logo";
import { WordReveal } from "@/components/ui/WordReveal";

export function Quote() {
  return (
    <section aria-label="From the founder" className="relative py-20 sm:py-32">
      <figure className="mx-auto max-w-[940px] px-5 text-center sm:px-8">
        <WordReveal
          as="blockquote"
          start={0.92}
          end={0.4}
          className="font-serif text-[clamp(1.9rem,1.1rem+3vw,3.4rem)] italic leading-[1.14] tracking-[-0.01em]"
          parts={[{ t: "“We don't sell software to schools. We build each school its own digital identity, and we stay to help it grow.”" }]}
        />
        <figcaption className="mt-8 inline-flex items-center gap-2.5 text-[14px] text-muted">
          <LogoMark size={22} /> Founder, School Growth Lab
        </figcaption>
      </figure>
    </section>
  );
}
