import type { Metadata } from "next";
import { ErpTour } from "@/components/sections/ErpTour";
import { Erp } from "@/components/sections/Erp";
import { AppsSection } from "@/components/sections/AppsSection";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  title: "School ERP & Apps",
  description: "A fully personalised school ERP with Parent and Teacher apps on iOS and Android, built for one school only.",
  alternates: { canonical: "/erp" },
};

export default function ErpPage() {
  return (
    <main className="pt-16">
      <ErpTour />
      <Erp />
      <AppsSection />
      <Cta />
    </main>
  );
}
