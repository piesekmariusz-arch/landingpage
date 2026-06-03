# ForecastFlow Landing Page — PRD

## Original problem statement
"Build a landing page: i need a landing page for my small business. i have a logo and some promotional materials and color pallete. i'd upload it on my own server under specific domain..."

Small B2B transport-engineering consultancy in Poland — ForecastFlow. Single-page, bilingual (PL/EN), static, to be self-hosted by the user.

## Architecture
- **Stack**: React 19 (CRA via Craco) + Tailwind + Framer Motion + lucide-react. No backend used (static landing).
- **Routing**: `react-router-dom` mounts `LandingPage` at `/`.
- **Fonts**: Outfit (headings), Manrope (body), IBM Plex Mono (technical labels/numbers) — all with `subset=latin,latin-ext` for Polish diacritics.
- **i18n**: simple `lang` state + `translations.js` dictionary. Persisted to `localStorage` under key `ff_lang`. Default = `pl`.
- **Assets** (served from `customer-assets.emergentagent.com`): brand SVG logo, freeway hero photo, EU project map PNG.

## User personas
- Polish public-sector procurement officers (cities, GDDKiA, transport authorities) sourcing transport studies & traffic forecasts.
- Private design consultancies & developers needing traffic-impact assessments or PTV training.
- European peers (UK/IE/Baltic) — served via the EN toggle.

## Core requirements (static)
- Sticky nav, smooth-scroll anchors, PL|EN switch in corner.
- Hero with motto + dual CTA over the freeway aerial photo (navy duotone overlay).
- Stats strip: 6 / 35 / 60+ / 102,240.
- About long-form, six-card services grid, EU project map, PTV trainings (Certified PTV Trainer badge + Visum/Vissim/Viswalk), contact (email/phone/LinkedIn), footer.
- Brand palette strictly: `#0d2745` navy (primary), `#27aae1` cyan (accent), `#656b80` slate (neutral).
- Polish-first content, English fully mirrored.

## What's been implemented — 2026-12-03
- `/app/frontend/src/pages/LandingPage.jsx` — all sections, navbar, mobile menu, language switcher, smooth scroll, motion fade-ups, hover micro-interactions, corner ticks, mono labels.
- `/app/frontend/src/i18n/translations.js` — full PL + EN dictionaries, `CONTACT` and `ASSETS` constants.
- `/app/frontend/src/App.js`, `App.css`, `index.css` — wired router, brand background, custom scrollbar, selection color.
- `/app/frontend/public/index.html` — Google Fonts (Outfit, Manrope, IBM Plex Mono + Latin Extended), Polish title/description meta.
- Mobile dropdown menu scroll bug fixed (defer scroll 400 ms after AnimatePresence close).
- Testing agent: **100% pass** on iteration 2 (5/5 mobile nav, 15/15 desktop/copy/links/i18n/persistence).

## Backlog / next priorities
- **P1** Self-hosting export: produce `yarn build` output for the user to drop on their own server; optionally swap the hosted CDN assets for local `/public` files so the page is fully self-contained.
- **P1** Real favicon + Open Graph image (currently still using the default Emergent favicon).
- **P2** Working contact form (currently mailto:) — would require backend + Resend/SendGrid.
- **P2** Light grain/noise overlay on dark sections + a thin "scroll progress" bar.
- **P2** Case-study / project detail pages (currently a single-page brochure).
- **P3** Cookie-consent banner if PostHog tracking remains enabled in production.
- **P3** Schema.org `Organization` + `LocalBusiness` JSON-LD for SEO.
