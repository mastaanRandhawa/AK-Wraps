# AK Wraps & Customs — Marketing Website

Phase 1 public marketing site for AK Wraps & Customs, an automotive vinyl wrap and customization shop in Delta, BC.

## Project structure

```
AK-Wraps/
├── frontend/          # React SPA (Vite)
│   ├── public/        # Static assets + icons
│   └── src/
│       ├── app/       # App shell, router, lazy routes
│       ├── config/    # Site metadata, routes
│       ├── content/   # Static copy & media URLs
│       ├── components/
│       ├── hooks/
│       └── pages/
├── assets/            # Brand icons (copied to public on build)
└── requirements.md    # Full WRD specification
```

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — navy `#051747`, page `#f0f4f8`, Inter typography
- **shadcn/Radix** — accordion, dialog, button
- **React Router** — multi-page routing with GitHub Pages `basename`

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
cd frontend
npm run build
npm run preview
```

Production builds use `base: /AK-Wraps/` for GitHub Pages.

## Phase 1 pages

| Route | Description |
|-------|-------------|
| `/` | Home — video hero, typewriter intro, FAQs, portfolio, reviews, wrapper CTA |
| `/services` | Service categories, pricing, wrapper promo |
| `/about` | Company story, map, business partners |
| `/wrapper` | Interactive wrap customizer (vehicle, color, finish) |
| `/book-now` | Booking stub (Phase 2 will add auth + form) |

## Design system

Colors and typography follow `requirements.md`:

- **Primary:** `#051747`
- **Page background:** `#f0f4f8`
- **Footer:** `#0b2241`
- **Font:** Inter (100–900)

## Phase 2 (planned)

Authentication, online booking, reviews, admin dashboard, and live API feeds.
