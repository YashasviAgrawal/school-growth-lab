import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import { SchoolProvider } from "@/components/mocks/SchoolContext";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const description =
  "School Growth Lab designs brand-first websites and fully personalised school ERPs with Parent and Teacher apps on iOS and Android, built for one school only. Yours.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://schoolgrowthlab.vercel.app"),
  title: {
    default: "School Growth Lab · Brand-first websites, ERP & apps for schools",
    template: "%s · School Growth Lab",
  },
  description,
  keywords: ["school website", "school ERP", "parent app", "teacher app", "school management software India", "CBSE school ERP"],
  openGraph: {
    type: "website",
    siteName: "School Growth Lab",
    locale: "en_IN",
    title: "School Growth Lab · Brand-first websites, ERP & apps for schools",
    description,
  },
  twitter: { card: "summary_large_image", title: "School Growth Lab", description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#faf9f6", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${interTight.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available so scroll reveals may start hidden; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {/* Lives in the layout so the chosen school's colours carry across pages. */}
        <SchoolProvider>
          <Header />
          {children}
          <Footer />
        </SchoolProvider>
      </body>
    </html>
  );
}
