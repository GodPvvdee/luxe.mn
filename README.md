# Luxe Commerce

A premium, production-grade e-commerce starter built with **Next.js 15 App Router**, **React 19**, **TypeScript**, **Tailwind CSS**, **shadcn-style** components, **Framer Motion**, **Prisma + PostgreSQL**, **NextAuth**, **Stripe**, and **Zustand**.

The design language is inspired by Apple, Nike, and Shopify-grade storefronts — minimal, luxurious, animated, accessible, and responsive on every device.

---

## ✨ Features

- **Storefront**: home, product list, product detail, cart, checkout, wishlist
- **Account**: login, register, forgot password, profile, orders
- **Admin**: dashboard, products, orders, customers, categories, analytics, settings
- **State**: Zustand stores for cart, wishlist, recently viewed, and preferences (currency, locale) — all persisted to `localStorage`
- **Auth**: NextAuth credentials + Google + GitHub providers, route protection via middleware
- **Payments**: Stripe Checkout session + webhook handler stubs
- **Database**: Prisma schema for users, products, categories, orders, reviews, addresses, wishlist, promos
- **i18n**: minimal in-house dictionary scaffold (English / Spanish / French / Japanese) — easily swappable for `next-intl`
- **Currency**: live currency switcher (USD / EUR / GBP / JPY) with a tiny FX table
- **UI**:
  - Dark mode (system / light / dark) via `next-themes`
  - Glassmorphism, gradient overlays, soft shadows, smooth Framer Motion entrances
  - Skeleton loaders, toast notifications (Sonner), debounced search hook
  - Breadcrumbs, sticky filters, sortable grids, image gallery, hover previews
  - Recently viewed carousel and personalized recommendations
- **SEO**: dynamic metadata, OpenGraph, `sitemap.xml`, `robots.txt`, semantic markup
- **A11y**: focus rings, ARIA labels, color-contrast aware tokens

---

## 🗂 Project Structure

```
e-commerce/
├── prisma/
│   ├── schema.prisma          # Postgres schema
│   └── seed.ts                # Seeds categories, products, admin user, promos
├── public/                    # Static assets (favicon, etc.)
├── src/
│   ├── app/
│   │   ├── (storefront)
│   │   │   ├── page.tsx                  # Home
│   │   │   ├── products/page.tsx         # Listing
│   │   │   ├── products/[slug]/page.tsx  # Detail
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── checkout/success/page.tsx
│   │   │   ├── wishlist/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # Overview
│   │   │   ├── products/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── customers/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── auth/register/route.ts
│   │   │   ├── products/route.ts
│   │   │   ├── products/[slug]/route.ts
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhooks/stripe/route.ts
│   │   │   └── newsletter/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/                # shadcn-style primitives
│   │   ├── layout/            # Navbar, Footer, Breadcrumbs
│   │   ├── home/              # Hero, Featured, Categories, Flash sale, Bestsellers, Testimonials, Newsletter
│   │   ├── product/           # Card, Gallery, Info, Filters, Sort, Grid, Reviews, RelatedProducts, RecentlyViewed
│   │   ├── cart/              # Drawer, Summary
│   │   ├── auth/              # AuthCard, SocialButtons
│   │   ├── account/           # AccountNav
│   │   ├── admin/             # Sidebar, Topbar, Stat cards, Charts
│   │   └── providers/         # Theme, Toast, NextAuth providers
│   ├── hooks/                 # use-debounce, use-mounted, use-media-query
│   ├── lib/                   # utils, prisma, auth, stripe, currency, i18n, mock-data, validators, types
│   ├── store/                 # cart, wishlist, recent, preferences
│   ├── types/                 # next-auth.d.ts
│   └── middleware.ts          # Route protection
├── .env.example
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
# or
npm install
```

### 2. Configure environment

Copy the example and fill in your secrets:

```bash
cp .env.example .env
```

Generate a NextAuth secret:

```bash
openssl rand -base64 32
```

### 3. Set up the database (optional for the demo)

The storefront ships with **mock data** in `src/lib/mock-data.ts`, so it runs immediately without a database. To enable real persistence (orders, accounts, reviews), point `DATABASE_URL` at a Postgres instance and run:

```bash
pnpm db:generate     # Generate Prisma client
pnpm db:push         # Push schema to your database
pnpm db:seed         # Seed categories, products, admin user, promos
```

Default seeded admin: **admin@luxe.dev / admin1234**.

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 💳 Stripe Setup (Optional)

1. Get your test keys from [dashboard.stripe.com](https://dashboard.stripe.com).
2. Paste them in `.env`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

3. For local webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Without Stripe credentials, the checkout falls back to a simulated success flow that still clears the cart and shows the confirmation page — great for demos.

---

## 🔐 Social Login

Out of the box NextAuth ships with credentials + Google + GitHub. The OAuth providers are **opt-in**: they only attach if the corresponding `*_CLIENT_ID` / `*_CLIENT_SECRET` env vars are set. No configuration → just credentials login.

---

## 🌍 Currency & Internationalization

- Currency switcher in the navbar persists to `localStorage` and converts prices on the fly via `src/lib/currency.ts`. Replace the static rate table with a live FX provider (Open Exchange Rates, Frankfurter, etc.) in production.
- Translations live in `src/lib/i18n.ts` as a flat dictionary — minimal by design. Swap in [`next-intl`](https://next-intl-docs.vercel.app/) when you need plural rules, format negotiation, or message extraction.

---

## 📦 Deployment (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add environment variables from `.env.example`.
4. Provision a Postgres instance ([Neon](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres](https://vercel.com/storage/postgres)). Paste the connection string into `DATABASE_URL`.
5. Add a Vercel build hook for Prisma:
   - **Build Command:** `prisma generate && next build`
6. After the first deploy, run `pnpm db:push` from your local machine with the production `DATABASE_URL` (or use Prisma migrations).
7. Add the deployed URL to your OAuth provider redirects and update `NEXTAUTH_URL`.

---

## 🧠 Best Practices Baked In

- **Server Components by default**, client components only where interactivity is needed.
- **Streaming** with React Suspense for the products grid.
- **`next/image`** with `remotePatterns` for automatic format / size optimization.
- **`next/font`** for self-hosted, preloaded Google fonts with `display: swap`.
- **Route-level metadata** + dynamic OpenGraph images per product.
- **Zod** validation on every API route boundary.
- **Persistent stores** via `zustand/middleware/persist` with safe SSR (`useMounted` hook avoids hydration mismatches).
- **Tailwind tokens via CSS variables** — every color, radius, and shadow is themable.
- **A11y-first**: keyboard focus, ARIA labels, semantic landmarks, contrast-safe palette.

---

## ⚡ Performance Tips

- Replace mock product fetches with real Prisma queries cached via `unstable_cache` or `fetch` with `revalidate`.
- Use Vercel Edge Middleware for geolocation-based currency defaults.
- Pre-render the most popular product pages with `generateStaticParams` (already wired up).
- Run [Lighthouse](https://pagespeed.web.dev/) before launch — the home page is targeted at LCP < 2.0s.
- Add `loading="lazy"` on below-the-fold images (handled automatically by `next/image`).

---

## 🛠 Useful Scripts

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # Lint
pnpm db:generate      # Prisma generate
pnpm db:push          # Prisma db push
pnpm db:migrate       # Create + run migration (dev)
pnpm db:seed          # Seed mock data
pnpm db:studio        # Open Prisma Studio
```

---

## 📝 What's Real vs. Mocked

This starter is **runnable** out of the box, but a few pieces are clearly marked as stubs so you can swap them for production wiring:

| Feature                    | Status                                                                 |
| -------------------------- | ---------------------------------------------------------------------- |
| Storefront UI              | Fully implemented                                                      |
| Cart / wishlist / recently | Real (Zustand + localStorage)                                          |
| Currency / locale          | Real (client-side)                                                     |
| Auth UI                    | Real — backend depends on `DATABASE_URL`                               |
| Product data               | Mock — swap `src/lib/mock-data.ts` for Prisma queries when DB is ready |
| Checkout                   | Stripe-ready; falls back to simulated success without credentials      |
| Reviews / orders pages     | Static demo content — wire to Prisma when DB is connected              |
| Admin dashboard            | Demo dashboard with realistic charts and tables                        |

Replacing the mocks is a small, mechanical task — every component reads from typed helpers in `src/lib/`, so you only change the data source, not the UI.

---

## 🪪 License

MIT — use, fork, ship.
