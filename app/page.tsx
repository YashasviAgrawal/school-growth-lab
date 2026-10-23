import { Hero, Showcase } from "@/components/sections/Hero";
import { Boards } from "@/components/sections/Boards";
import { Problem } from "@/components/sections/Problem";
import { Products } from "@/components/sections/Products";
import { Personalised } from "@/components/sections/Personalised";
import { Stats } from "@/components/sections/Stats";
import { Why } from "@/components/sections/Why";
import { Quote } from "@/components/sections/Quote";
import { Cta } from "@/components/sections/Cta";
import { CONTACT } from "@/lib/schools";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "School Growth Lab",
  description: "Brand-first digital growth for schools. Websites, ERP and apps designed for schools that care about their brand.",
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <Hero />
        <Showcase />
        <Boards />
        <Problem />
        <Products />
        <Personalised />
        <Stats />
        <Why />
        <Quote />
        <Cta />
      </main>
    </>
  );
}
