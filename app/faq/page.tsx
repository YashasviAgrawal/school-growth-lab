import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about School Growth Lab websites, ERP and apps.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="pt-16">
        <Faq />
        <Cta />
      </main>
    </>
  );
}
