# School Growth Lab — website

The School Growth Lab landing page, rebuilt in **Next.js (App Router) + Tailwind CSS v4** with the same content and visual identity as the current site, refined spacing and typography, and motion patterns borrowed from wajo.ai.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Node 18.18+ (Node 20 or 22 recommended).

## Deploy to Vercel

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Or push to GitHub and import the repo at vercel.com/new — no settings needed.
Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://schoolgrowthlab.com`) in Vercel so canonical URLs and the share image use your real domain.

## What moves, and where it lives

| Effect | Inspired by | File |
|---|---|---|
| Headline words rise in on load; collage pops in with a spring | wajo hero | `components/sections/Hero.tsx`, `app/globals.css` (`.word-in`, `.pop-in`) |
| Floating collage (app icon, toasts, doodles, confetti) drifts with the pointer and disperses at 3 depths on scroll | wajo hero collage | `Hero.tsx` → `useCollageMotion` |
| Product stage grows into place as you scroll | wajo film card | `Hero.tsx` → `Showcase` |
| School picker and app tabs auto-advance with a story progress bar until clicked | wajo "meets you where you are" tabs | `Showcase`, `AppsSection.tsx` |
| Rotating notification toast and stacked circulars feed | wajo "Fo working now" | `Showcase`, `Erp.tsx` → `CircularsVisual` |
| Words light from grey to ink as you read | wajo "Meet Fo" fade | `components/ui/WordReveal.tsx` |
| Sticky scrollytelling for the four website pages | — | `Websites.tsx` |
| Bars grow, attendance ticks in, count-ups, shimmer on the comparison column | — | `Erp.tsx`, `Stats.tsx`, `Why.tsx` |
| Nav pill slides to the hovered/active section | wajo nav | `components/site/Header.tsx` |
| Footer wordmark rises at the end of the page | — | `components/site/Footer.tsx` |

All scroll effects share one `requestAnimationFrame` ticker (`lib/motion.ts`) and write transforms directly, so scrolling never re-renders React. Everything respects `prefers-reduced-motion`, and content is fully visible without JavaScript.

No animation library is used — only React, Next.js and Tailwind.

## Editing content

- **Contact details, WhatsApp link, demo email** → `lib/schools.ts` (`CONTACT`)
- **Demo schools and their colours** → `lib/schools.ts` (`SCHOOLS`)
- **FAQ** → `lib/content.ts`
- **Section copy** → the matching file in `components/sections/`
- **Colours, fonts, shadows** → `@theme` in `app/globals.css`
- **Favicon / share image** → `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.png`

The phone number `+91 98765 43210` is carried over from the current site — replace it with the real one before launch.

## Structure

```
app/            layout (fonts, metadata), page, global styles, icons, OG image
components/
  site/         Header, Footer
  sections/     one file per page section
  mocks/        product mocks: school website pages, Parent/Teacher apps, ERP dashboard, device frames
  ui/           Reveal, WordReveal, CountUp, Marquee, FitScale, Doodles, Icons, Logo
lib/            motion hooks, schools + contact data, FAQ copy
```
