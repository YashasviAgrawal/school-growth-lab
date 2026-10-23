import type { Metadata } from "next";
import { WebsiteBuild } from "@/components/sections/WebsiteBuild";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Websites } from "@/components/sections/Websites";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  title: "School Websites",
  description: "Brand-first school websites designed around your school's colours, story and admissions.",
  alternates: { canonical: "/websites" },
};

export default function WebsitesPage() {
  return (
    <main className="pt-16">
      <WebsiteBuild />
      <BeforeAfter />
      <Websites />
      <Cta />
    </main>
  );
}
