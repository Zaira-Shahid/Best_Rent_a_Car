# Best Rent a Car

Premium car rental website for Best Rent a Car — built with Next.js App Router, TypeScript, and Tailwind CSS. Designs converted from Google Stitch into responsive production pages.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Yarn

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `yarn dev` — development server (Turbopack)
- `yarn build` — production build
- `yarn start` — production server
- `yarn lint` — ESLint

## Brand guidelines

| Role | Hex | Usage |
|------|-----|--------|
| Primary | `#000B1D` | Header, footer, heroes, headings |
| Secondary | `#04C4E3` | Links, icons, accents, Call Us |
| Accent / CTA | `#BFF52C` | Book Now, WhatsApp, primary CTAs |
| Background | `#F8F9FA` | Page background, cards, forms |

- Headings: **Sora**
- Body: **Inter**
- Style: modern, premium, clean, fully responsive

Tokens live in `src/lib/brand.ts` and `src/app/globals.css`.

## Stitch screens (full UI)

These pages use full Stitch-based layouts:

| Page | URL |
|------|-----|
| Home | `/` |
| About | `/about` |
| City Services | `/city-services` |
| Hotel Transfer | `/services/hotel-transfer` |
| Executive Car Rental | `/services/executive-car-rental` |
| Wedding Car Rental | `/services/wedding-car-rental` |
| Daily Car Rental | `/services/daily-car-rental` |
| Reviews | `/reviews` |
| Terms & Conditions | `/terms` |
| Contact Us | `/contact` |
| Booking Policy | `/booking-policy` |
| Blog | `/blog` |
| FAQ | `/faq` |

## Other routes

- `/cars` + `/cars/[slug]` — fleet listing and car detail
- `/categories/[slug]` — economy, sedan, SUV, luxury, hiace
- `/services` + remaining service slugs (airport, corporate, weekly, monthly)
- `/rent-a-car/[slug]` — city SEO pages (31 cities)
- `/blog/[slug]` — blog categories
- `/privacy`

## Features

- Responsive layout (mobile → desktop)
- Car cards with **WhatsApp**, **Call Us**, and **Inquiry** actions
- Inquiry modal (opens WhatsApp with booking details)
- Sticky header with desktop + mobile navigation
- Service detail pages with fleet, includes, audience, FAQs
- Blog, FAQ accordion, reviews, legal/policy pages

## Folder structure

```text
src/
  app/                    # App Router pages
  components/
    ui/                   # Button, Container, Section, Logo…
    layout/               # Header, Footer, SiteShell
    shared/               # PageHero, CtaBanner…
    home/                 # Home sections
    cars/                 # CarCard, InquireModal, CarGridSection
    services/             # Stitch service page layouts + fleet grid
    city/                 # City Services content
    contact/              # Contact form
    faq/                  # FAQ accordion
  data/                   # Cars, cities, services, service-details, nav
  lib/                    # Brand + helpers
  types/                  # Shared TypeScript types
```

## Deploy

Built for Vercel. Push to `main` and connect the GitHub repo, or run:

```bash
yarn build
yarn start
```

# Best_Rent_a_Car
