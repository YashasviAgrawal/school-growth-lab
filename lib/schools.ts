export type School = {
  id: string;
  short: string;
  name: string;
  initials: string;
  board: string;
  city: string;
  motto: string;
  domain: string;
  primary: string;
  deep: string;
  accent: string;
  soft: string;
};

/** Demo schools shown across the page. Pick one and every mock re-dresses itself. */
export const SCHOOLS: School[] = [
  {
    id: "northstar",
    short: "Northstar",
    name: "Northstar International School",
    initials: "NS",
    board: "IB · Cambridge",
    city: "Bengaluru",
    motto: "Reach beyond",
    domain: "northstarschool.in",
    primary: "#1d3a8a",
    deep: "#0d1d4d",
    accent: "#d4a843",
    soft: "#eef1fa",
  },
  {
    id: "saffron",
    short: "Saffron Hills",
    name: "Saffron Hills Academy",
    initials: "SH",
    board: "CBSE",
    city: "Pune",
    motto: "Rise with light",
    domain: "saffronhills.in",
    primary: "#c2410c",
    deep: "#6b2106",
    accent: "#f4b942",
    soft: "#fdf1e8",
  },
  {
    id: "kaveri",
    short: "Kaveri Valley",
    name: "Kaveri Valley School",
    initials: "KV",
    board: "ICSE",
    city: "Mysuru",
    motto: "Rooted. Rising.",
    domain: "kaverivalley.in",
    primary: "#17694a",
    deep: "#0a3826",
    accent: "#8fd1a8",
    soft: "#ebf6f0",
  },
  {
    id: "banyan",
    short: "Banyan Grove",
    name: "Banyan Grove Academy",
    initials: "BG",
    board: "CBSE",
    city: "Jaipur",
    motto: "Grow together",
    domain: "banyangrove.in",
    primary: "#7a1f45",
    deep: "#420e24",
    accent: "#f0a6bd",
    soft: "#f9edf2",
  },
];

export type Palette = Pick<School, "primary" | "deep" | "accent" | "soft"> & { id: string; label: string };

/** Colourways a visitor can pick for their own school in the hero. */
export const PALETTES: Palette[] = [
  { id: "navy", label: "Navy & gold", primary: "#1d3a8a", deep: "#0d1d4d", accent: "#d4a843", soft: "#eef1fa" },
  { id: "crimson", label: "Crimson & gold", primary: "#b4232a", deep: "#5c0f13", accent: "#f2c14e", soft: "#fcefef" },
  { id: "forest", label: "Forest & mint", primary: "#17694a", deep: "#0a3826", accent: "#8fd1a8", soft: "#ebf6f0" },
  { id: "saffron", label: "Saffron & sun", primary: "#c2410c", deep: "#6b2106", accent: "#f4b942", soft: "#fdf1e8" },
  { id: "plum", label: "Plum & gold", primary: "#5b2a86", deep: "#2e1347", accent: "#e7c56a", soft: "#f3eefa" },
  { id: "teal", label: "Teal & peach", primary: "#0f6e7a", deep: "#073b42", accent: "#f2b880", soft: "#e8f5f6" },
];

const MINOR = new Set(["of", "and", "&", "the", "for"]);

/** Turns whatever name a visitor types into a full demo school the mocks can render. */
export function makeSchool(raw: string, palette: Palette): School {
  const words = raw.trim().split(/\s+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1));
  if (!words.length) words.push("Your", "School");
  const name = words.join(" ");
  const core = words.length > 1 && words[0].toLowerCase() === "the" ? words.slice(1) : words;
  let short = core.slice(0, 2).join(" ");
  if (short.length > 18) short = core[0].slice(0, 18);
  const significant = words.map((w) => w.replace(/[^A-Za-z0-9]/g, "")).filter((w) => w && !MINOR.has(w.toLowerCase()));
  // An acronym name like "DAV" keeps its letters; otherwise take each word's first letter.
  const initials =
    (significant.length === 1 && significant[0] === significant[0].toUpperCase()
      ? significant[0]
      : significant.map((w) => w[0]).join("")
    )
      .slice(0, 3)
      .toUpperCase() || "S";
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 24) || "yourschool";
  return {
    id: "custom",
    short,
    name,
    initials,
    board: "CBSE",
    city: "India",
    motto: "Learn. Lead. Shine.",
    domain: `${slug}.in`,
    primary: palette.primary,
    deep: palette.deep,
    accent: palette.accent,
    soft: palette.soft,
  };
}

export const CONTACT = {
  email: "hello@schoolgrowthlab.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp:
    "https://wa.me/919876543210?text=Hi%20School%20Growth%20Lab%2C%20I%27d%20like%20a%20demo%20for%20my%20school.",
  city: "Bengaluru, India",
  maps: "https://www.google.com/maps/dir/?api=1&destination=Bengaluru%2C%20Karnataka%2C%20India",
  demoMail:
    "mailto:hello@schoolgrowthlab.com?subject=Demo%20request%20for%20our%20school&body=School%20name%3A%0ACity%3A%0AStudent%20strength%3A%0APreferred%20time%20for%20a%2030-minute%20demo%3A",
};
