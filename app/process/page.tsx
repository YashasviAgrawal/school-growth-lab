import type { Metadata } from "next";
import { Process } from "@/components/sections/Process";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How School Growth Lab takes a school from first call to launched website, ERP and apps.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <main className="pt-16">
      <Process />
      <Cta />
    </main>
  );
}
