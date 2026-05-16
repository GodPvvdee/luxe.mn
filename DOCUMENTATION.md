# Luxe Commerce — Дэлгэрэнгүй Документац

Энэхүү бичиг баримт нь **Luxe Commerce** төслийн архитектур, ашигласан технологи, файлын бүтэц, ажиллах зарчим болон хэрхэн ажиллуулах талаар бүрэн тайлбарыг өгнө.

---

## Агуулга

1. [Танилцуулга](#1-танилцуулга)
2. [Технологийн стек](#2-технологийн-стек)
3. [Системийн архитектур](#3-системийн-архитектур)
4. [Файлын бүтэц](#4-файлын-бүтэц)
5. [Хуудаснууд](#5-хуудаснууд)
6. [State Management — Zustand](#6-state-management--zustand)
7. [Authentication — NextAuth](#7-authentication--nextauth)
8. [Stripe төлбөр](#8-stripe-төлбөр)
9. [Prisma + PostgreSQL](#9-prisma--postgresql)
10. [Олон хэл, валютын дэмжлэг](#10-олон-хэл-валютын-дэмжлэг)
11. [Дизайн систем](#11-дизайн-систем)
12. [Хэрхэн ажиллуулах вэ?](#12-хэрхэн-ажиллуулах-вэ)
13. [Production-д deploy хийх](#13-production-д-deploy-хийх)
14. [Хөгжүүлэлтийн зөвлөгөө](#14-хөгжүүлэлтийн-зөвлөгөө)

---

## 1. Танилцуулга

**Luxe Commerce** нь Apple, Nike, Shopify-н Premium брэндийн загвараар хийсэн орчин үеийн e-commerce вэб платформ юм.

### Юу хийдэг вэ?
- Бүтээгдэхүүнийг үзүүлэх, шүүх, эрэмбэлэх
- Сагсанд нэмэх, хүслийн жагсаалт хадгалах
- Гишүүнчлэл бүртгүүлэх, нэвтрэх
- Төлбөр хийх (Stripe-аар)
- Захиалгын түүх харах
- Админ панелаас бүтээгдэхүүн, захиалга, хэрэглэгчдийг удирдах
- Олон хэл, олон валютаар ажиллах

### Хэнд зориулагдсан вэ?
- E-commerce бизнес эрхлэгчид
- Жижиг, дунд хэмжээний онлайн дэлгүүр эзэмшигчид
- Хөгжүүлэгчид (template-байдлаар ашиглах)

---

## 2. Технологийн стек

### Frontend
| Технологи | Үүрэг | Яагаад? |
|-----------|-------|---------|
| **Next.js 15** | React-н full-stack framework | App Router, Server Components, SSR/SSG, дотоод API |
| **React 19** | UI сан | Component-based, declarative, шуурхай |
| **TypeScript** | Хатуу төрлийн систем | Алдаа цөөн, IDE автомат гүйцэтгэл сайн |
| **Tailwind CSS** | Utility-first CSS | Хурдан загвар, цэвэр markup |
| **shadcn/ui** | Component library | Radix UI + Tailwind, өөрчилж болдог |
| **Framer Motion** | Animation сан | Гөлгөр шилжилт, micro-interaction |
| **lucide-react** | Icon багц | Хөнгөн, цэвэр иконнууд |
| **next-themes** | Харанхуй/Гэрэлтэй горим | OS-н тохиргоонд таарна |
| **sonner** | Toast мэдэгдэл | Энгийн, гоё харагдацтай |

### State Management
| Технологи | Үүрэг |
|-----------|-------|
| **Zustand** | Жижиг, хурдан state менежмент (Redux-н хялбар хувилбар) |
| **localStorage** | Сагс, wishlist, тохиргоог хадгална (persist middleware-р) |

### Backend
| Технологи | Үүрэг |
|-----------|-------|
| **Next.js API Routes** | REST endpoint-ууд (`/api/*`) |
| **Prisma ORM** | Database ORM, type-safe SQL |
| **PostgreSQL** | Гол database |
| **NextAuth** | Authentication (JWT, OAuth) |
| **bcryptjs** | Нууц үг hash хийх |
| **Zod** | Input validation |
| **Stripe** | Төлбөрийн системm |

### Хэрэгсэл
| Технологи | Үүрэг |
|-----------|-------|
| **react-hook-form** | Маягтыг (форм) удирдах |
| **@hookform/resolvers** | Zod + react-hook-form холбоо |
| **recharts** | График (админ панелд) |
| **clsx + tailwind-merge** | Tailwind class нэгтгэгч |

---

## 3. Системийн архитектур

```
┌─────────────────────────────────────────────────────────────┐
│                      БРАУЗЕР (Client)                       │
│                                                             │
│  React Components  ──►  Zustand Stores  ──►  localStorage   │
│        │                                                    │
│        ▼                                                    │
│   fetch() / Server Action                                   │
└────────┬────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Vercel)                  │
│                                                             │
│   ┌──────────────────┐    ┌──────────────────────────────┐  │
│   │ Server Components│    │   API Routes (/api/*)        │  │
│   │ (SSR, RSC)       │    │   - /api/auth/*              │  │
│   │                  │    │   - /api/products/*          │  │
│   │ Шууд DB рүү      │    │   - /api/checkout            │  │
│   │ ханддаг          │    │   - /api/webhooks/stripe     │  │
│   └────────┬─────────┘    └──────────┬───────────────────┘  │
│            │                         │                      │
│            └──────────┬──────────────┘                      │
│                       ▼                                     │
│              ┌─────────────────┐                            │
│              │  Prisma Client  │                            │
│              └────────┬────────┘                            │
└───────────────────────┼─────────────────────────────────────┘
                        │
                        ▼
              ┌─────────────────┐         ┌──────────────┐
              │   PostgreSQL    │         │    Stripe    │
              └─────────────────┘         └──────────────┘
```

### Үндсэн зарчим
- **Server Components default-р ажилладаг.** Client component гэж заавал `"use client"` зааж өгөх ёстой.
- **Static хуудаснууд** (бүтээгдэхүүний дэлгэрэнгүй, эх хуудас) build хийх үед урьдчилан үүсгэгдэнэ.
- **Dynamic үйлдэл** (сагс, нэвтрэх) нь client дээр ажиллана.
- **API Route-ууд** нь зөвхөн өгөгдлийн валидаци, бизнес-логик, гадаад үйлчилгээний (Stripe г.м.) интеграцид хэрэглэгдэнэ.

---

## 4. Файлын бүтэц

```
e-commerce/
├── prisma/                     # ДАТАБАЗ-ИЙН ТОДОРХОЙЛОЛТ
│   ├── schema.prisma           # User, Product, Order г.м. table-уудын схем
│   └── seed.ts                 # Жишээ өгөгдөл оруулдаг script
│
├── public/                     # Статик файлууд (favicon, лого)
│
├── src/
│   ├── app/                    # NEXT.JS APP ROUTER (бүх хуудас энд)
│   │   ├── layout.tsx          # Root layout — навбар, футэр, провайдер
│   │   ├── page.tsx            # Эх хуудас (/)
│   │   ├── globals.css         # Tailwind + CSS хувьсагчид (өнгөний загвар)
│   │   ├── loading.tsx         # Suspense fallback skeleton
│   │   ├── not-found.tsx       # 404 хуудас
│   │   ├── robots.ts           # robots.txt (SEO)
│   │   ├── sitemap.ts          # sitemap.xml (SEO)
│   │   │
│   │   ├── products/           # /products (бүтээгдэхүүний жагсаалт)
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx # /products/phantom-runner-x1
│   │   │
│   │   ├── cart/page.tsx       # Сагс
│   │   ├── checkout/           # Төлбөрийн урсгал
│   │   │   ├── page.tsx
│   │   │   └── success/page.tsx
│   │   │
│   │   ├── login/page.tsx      # Нэвтрэх
│   │   ├── register/page.tsx   # Бүртгүүлэх
│   │   ├── forgot-password/    # Нууц үг сэргээх
│   │   │
│   │   ├── profile/page.tsx    # Профайл
│   │   ├── orders/page.tsx     # Захиалгын түүх
│   │   ├── wishlist/page.tsx   # Хүслийн жагсаалт
│   │   │
│   │   ├── admin/              # АДМИН ПАНЕЛЬ
│   │   │   ├── layout.tsx      # Sidebar + topbar
│   │   │   ├── page.tsx        # Хяналтын самбар
│   │   │   ├── products/       # Бүтээгдэхүүн удирдах
│   │   │   ├── orders/         # Захиалга
│   │   │   ├── customers/      # Хэрэглэгч
│   │   │   ├── categories/     # Ангилал
│   │   │   ├── analytics/      # Хэрэгцээ-сан
│   │   │   └── settings/       # Тохиргоо
│   │   │
│   │   └── api/                # ДОТООД API
│   │       ├── auth/[...nextauth]/route.ts  # NextAuth handler
│   │       ├── auth/register/route.ts       # Бүртгүүлэх POST
│   │       ├── products/route.ts            # GET бүтээгдэхүүний жагсаалт
│   │       ├── products/[slug]/route.ts     # GET нэг бүтээгдэхүүн
│   │       ├── checkout/route.ts            # Stripe checkout session үүсгэх
│   │       ├── webhooks/stripe/route.ts     # Stripe webhook
│   │       └── newsletter/route.ts          # И-мэйл бүртгэл
│   │
│   ├── components/             # КОМПОНЕНТ САН
│   │   ├── ui/                 # Үндсэн UI (Button, Card, Input г.м.)
│   │   ├── layout/             # Навбар, футэр, breadcrumb
│   │   ├── home/               # Эх хуудасны секцүүд
│   │   ├── product/            # Бүтээгдэхүүний картууд, gallery
│   │   ├── cart/               # Сагсны drawer & summary
│   │   ├── auth/               # AuthCard, SocialButtons
│   │   ├── account/            # AccountNav
│   │   ├── admin/              # Sidebar, charts, stat cards
│   │   └── providers/          # Theme, Toast, Auth providers
│   │
│   ├── hooks/                  # ТУЛГУУР HOOK
│   │   ├── use-debounce.ts     # Input-ыг хойшлуулах
│   │   ├── use-mounted.ts      # SSR/CSR mismatch шийдэх
│   │   └── use-media-query.ts  # Дэлгэцийн хэмжээ шалгах
│   │
│   ├── lib/                    # ҮЙЛЧИЛГЭЭНИЙ ЛОГИК
│   │   ├── utils.ts            # cn(), formatPrice() г.м.
│   │   ├── prisma.ts           # Prisma client (singleton)
│   │   ├── auth.ts             # NextAuth тохиргоо
│   │   ├── stripe.ts           # Stripe SDK холболт
│   │   ├── currency.ts         # Валютын хөрвүүлэлт
│   │   ├── i18n.ts             # Хэлний толь бичиг
│   │   ├── mock-data.ts        # Жишээ бүтээгдэхүүний өгөгдөл
│   │   ├── validators.ts       # Zod-ийн схем (форм)
│   │   └── types.ts            # TypeScript-ийн үндсэн төрлүүд
│   │
│   ├── store/                  # ZUSTAND STATE
│   │   ├── cart.ts             # Сагс
│   │   ├── wishlist.ts         # Хүслийн жагсаалт
│   │   ├── recent.ts           # Сүүлд үзсэн бараа
│   │   └── preferences.ts      # Хэл, валют
│   │
│   ├── types/                  # TypeScript declaration
│   │   └── next-auth.d.ts      # NextAuth-ын төрлийг өргөтгөнө
│   │
│   └── middleware.ts           # Route хамгаалалт (/admin, /profile)
│
├── .env                        # Орчны хувьсагч (нууц)
├── .env.example                # Жишээ env
├── components.json             # shadcn тохиргоо
├── next.config.ts              # Next.js тохиргоо
├── package.json                # Dependency-үүд
├── postcss.config.mjs          # PostCSS
├── tailwind.config.ts          # Tailwind тохиргоо
├── tsconfig.json               # TypeScript тохиргоо
├── README.md                   # Гарын авлага (English)
└── DOCUMENTATION.md            # Энэхүү файл
```

---

## 5. Хуудаснууд

### Storefront (хэрэглэгчийн талд)

| URL | Файл | Тайлбар |
|-----|------|---------|
| `/` | `app/page.tsx` | Эх хуудас — Hero, онцлох бараа, ангилал, флаш хямдрал, шилдэг борлуулагч, сэтгэгдэл, мэдээллийн захидал |
| `/products` | `app/products/page.tsx` | Бүтээгдэхүүний жагсаалт + шүүлтүүр + эрэмбэлэлт |
| `/products/[slug]` | `app/products/[slug]/page.tsx` | Бүтээгдэхүүний дэлгэрэнгүй + gallery + сэтгэгдэл + холбоотой бараа |
| `/cart` | `app/cart/page.tsx` | Сагсны хуудас |
| `/checkout` | `app/checkout/page.tsx` | Төлбөрийн форм |
| `/checkout/success` | `app/checkout/success/page.tsx` | Захиалга баталгаажсан хуудас |
| `/wishlist` | `app/wishlist/page.tsx` | Хүслийн жагсаалт |
| `/login` | `app/login/page.tsx` | Нэвтрэх |
| `/register` | `app/register/page.tsx` | Бүртгүүлэх |
| `/forgot-password` | `app/forgot-password/page.tsx` | Нууц үг сэргээх |
| `/profile` | `app/profile/page.tsx` | Профайл засах |
| `/orders` | `app/orders/page.tsx` | Захиалгын түүх |

### Admin (зөвхөн ADMIN role)

| URL | Файл | Тайлбар |
|-----|------|---------|
| `/admin` | `app/admin/page.tsx` | Орлого, захиалгын тойм + графикууд |
| `/admin/products` | `app/admin/products/page.tsx` | Бүтээгдэхүүн удирдах |
| `/admin/orders` | `app/admin/orders/page.tsx` | Захиалга удирдах |
| `/admin/customers` | `app/admin/customers/page.tsx` | Хэрэглэгчийн жагсаалт |
| `/admin/categories` | `app/admin/categories/page.tsx` | Ангилал удирдах |
| `/admin/analytics` | `app/admin/analytics/page.tsx` | Аналитик графикууд |
| `/admin/settings` | `app/admin/settings/page.tsx` | Дэлгүүрийн тохиргоо |

---

## 6. State Management — Zustand

Сагс, хүслийн жагсаалт, сүүлд үзсэн бараа, валют/хэлний тохиргоог **Zustand** ашиглан удирддаг. Бүх state нь автоматаар `localStorage`-д хадгалагдана (`zustand/middleware/persist`).

### `src/store/cart.ts`
```typescript
const useCart = create<CartState>()(persist((set, get) => ({
  items: [],
  add: (item, qty = 1) => { /* ... */ },
  remove: (lineId) => { /* ... */ },
  setQty: (lineId, qty) => { /* ... */ },
  applyPromo: (code) => { /* промо код */ },
  subtotal: () => get().items.reduce(/* ... */),
}), { name: "luxe-cart" }));
```

Хэрэглээ:
```tsx
const { items, add, remove } = useCart();
```

### Бусад store-ууд
- `wishlist.ts` — toggle, has, remove
- `recent.ts` — сүүлд үзсэн бараа (хамгийн ихдээ 10)
- `preferences.ts` — `currency`, `locale` тохиргоо

---

## 7. Authentication — NextAuth

`/api/auth/[...nextauth]/route.ts` нь NextAuth-н бүх route-г барина.

### Дэмждэг нэвтрэлтийн арга:
1. **Credentials** — и-мэйл + нууц үг (bcryptjs hash)
2. **Google OAuth** — `GOOGLE_CLIENT_ID` тохируулсан үед нээгдэнэ
3. **GitHub OAuth** — `GITHUB_CLIENT_ID` тохируулсан үед нээгдэнэ

### JWT Session
Хэрэглэгч нэвтэрсэний дараа JWT token-д `id` ба `role` гэсэн талбарууд хадгалагдана. Энэ нь `useSession()` хук-аар client-ээс, `getServerSession()`-аар server-ээс уншигдана.

### Route хамгаалалт (`src/middleware.ts`)
```typescript
matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*"]
```
- `/admin/*` — зөвхөн `ADMIN` role-той хүн орно
- `/profile/*`, `/orders/*` — зөвхөн нэвтэрсэн хэрэглэгч

### Үүсгэх
```bash
# .env-д нэмнэ:
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 8. Stripe төлбөр

### Урсгал
1. Хэрэглэгч `/checkout` дээр форм бөглөнө
2. `POST /api/checkout` рүү сагсны барааг илгээнэ
3. Server нь Stripe Checkout Session үүсгэж `url` буцаана
4. Браузер `session.url` рүү redirect хийгдэнэ
5. Stripe-н хуудсан дээр төлбөр хийгдэнэ
6. Амжилттай төлсөн бол `/checkout/success` рүү буцаагдана
7. Stripe webhook `/api/webhooks/stripe` рүү event илгээнэ
8. Webhook нь захиалгын статусыг `PAID` болгоно

### Тохиргоо
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Локал webhook test
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Demo горим
Хэрэв Stripe-н түлхүүр тохируулаагүй бол `/checkout` нь симуляц мод дээр ажилладаг — захиалга баталгаажуулна, сагсыг цэвэрлэнэ, амжилттай хуудас руу шилжүүлнэ.

---

## 9. Prisma + PostgreSQL

### Database схем (хэсэгчилсэн)

```prisma
model User {
  id       String @id @default(cuid())
  email    String @unique
  password String?
  role     Role   @default(USER)
  orders   Order[]
  reviews  Review[]
  wishlist WishlistItem[]
}

model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  price       Decimal
  stock       Int
  images      String[]
  sizes       String[]
  colors      String[]
  category    Category @relation(fields: [categoryId], references: [id])
  reviews     Review[]
}

model Order {
  id      String      @id @default(cuid())
  user    User        @relation(fields: [userId], references: [id])
  status  OrderStatus @default(PENDING)
  total   Decimal
  items   OrderItem[]
}
```

### Командууд
```bash
npm run db:generate    # Prisma Client үүсгэх
npm run db:push        # Схемийг database руу нийлүүлэх (development)
npm run db:migrate     # Migration үүсгэх (production)
npm run db:seed        # Жишээ өгөгдөл оруулах
npm run db:studio      # Prisma Studio нээх (GUI)
```

### Хэрэглэгч жишээ
```typescript
import { prisma } from "@/lib/prisma";

const products = await prisma.product.findMany({
  where: { onSale: true },
  include: { category: true },
  orderBy: { createdAt: "desc" },
  take: 10,
});
```

---

## 10. Олон хэл, валютын дэмжлэг

### Хэл (i18n)

`src/lib/i18n.ts`-д хэлний толь бичиг байна:
```typescript
export const dictionaries = {
  mn: { "nav.shop": "Дэлгүүр", "cart.empty": "Сагс хоосон байна" },
  en: { "nav.shop": "Shop", "cart.empty": "Your cart is empty" },
  // ...
};
```

Том хэмжээний production-д `next-intl` ашиглахыг зөвлөе.

### Валют (`src/lib/currency.ts`)

```typescript
export const currencies = [
  { code: "MNT", label: "Монгол төгрөг", symbol: "₮", rate: 3500 },
  { code: "USD", label: "US Dollar", symbol: "$", rate: 1 },
  // ...
];
```

`convert(USD_amount, "MNT")` нь USD-г төгрөг рүү хөрвүүлнэ.

Хэрэглэгч navbar-аас валют сэлгэх боломжтой, тохиргоо `localStorage`-д хадгалагдана.

---

## 11. Дизайн систем

### Өнгөний загвар (Design Tokens)
Бүх өнгө `globals.css`-д CSS хувьсагчаар тодорхойлогдсон:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
  --primary: 240 6% 10%;
  /* ... */
}

.dark { /* харанхуй горимд reload */ }
```

### Typography
- **Sans**: Inter (үндсэн)
- **Display**: Playfair Display (гарчигт, гоё харагдацтай)

`next/font/google` ашиглан server-side preload хийгдэнэ.

### Component зарчим
- **Atomic** — `src/components/ui/` дотор Button, Card, Input г.м.
- **Composed** — `src/components/product/`, `home/` зэрэгт бизнес-логиктой
- **Variant-driven** — `class-variance-authority` (cva) ашиглаж variant үүсгэдэг

### Animation
- **Framer Motion** — entrance, hover, layout animations
- **Tailwind keyframes** — shimmer, marquee г.м.

### Responsive
- Mobile-first (default), `md:` (768px), `lg:` (1024px), `xl:` (1280px) breakpoint-ууд

---

## 12. Хэрхэн ажиллуулах вэ?

### Шаардлагатай зүйлс
- **Node.js 20+** ([nodejs.org](https://nodejs.org)-аас татах)
- **npm** (Node-той хамт ирдэг) эсвэл **pnpm**
- **PostgreSQL** (заавал биш — demo mock data-аар ажиллана)

### 1. Dependency суулгах
```bash
cd /Users/admin/Desktop/web/e-commerce
npm install --legacy-peer-deps
```

> **Тайлбар:** `--legacy-peer-deps` нь React 19 болон зарим багцын peer dependency-ийн зөрчилийг тойрох зорилготой. Production-д шилжихдээ peer-ийг шинэчилнэ.

### 2. Орчны хувьсагч тохируулах
```bash
cp .env.example .env
```

`.env` файлыг засаад дараах хувьсагчдыг бөглөнө:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/luxe"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"

# Заавал биш:
STRIPE_SECRET_KEY=sk_test_...
GOOGLE_CLIENT_ID=...
```

### 3. (Заавал биш) Database бэлдэх
Хэрэв жинхэнэ DB хэрэглэх бол:
```bash
npm run db:generate
npm run db:push
npm run db:seed   # Жишээ өгөгдөл оруулах
```

Үгүй бол `mock-data.ts` дахь өгөгдлөөр шууд ажиллана.

### 4. Dev сервер асаах
```bash
npm run dev
```

Энэ нь `http://localhost:3000` дээр серверийг асаана. Hot Module Replacement (HMR) идэвхтэй — файлд өөрчлөлт хийхэд автоматаар reload хийгдэнэ.

### 5. Production build шалгах
```bash
npm run build
npm run start
```

### Серверийг зогсоох
```bash
lsof -ti:3000 | xargs kill
```

### Зарим командын лавлагаа

| Команд | Үйлдэл |
|--------|--------|
| `npm run dev` | Хөгжүүлэлтийн сервер |
| `npm run build` | Production build |
| `npm run start` | Production сервер |
| `npm run lint` | ESLint шалгалт |
| `npm run db:generate` | Prisma Client үүсгэх |
| `npm run db:push` | Database руу schema нийлүүлэх |
| `npm run db:migrate` | Migration үүсгэх |
| `npm run db:seed` | Жишээ өгөгдөл оруулах |
| `npm run db:studio` | Prisma Studio (GUI) |

---

## 13. Production-д deploy хийх

### Vercel дээр (зөвлөмж)
1. GitHub дээр repo үүсгэж push хийнэ.
2. [vercel.com/new](https://vercel.com/new) дээр import хийнэ.
3. Environment variable-уудыг нэмнэ (DATABASE_URL, NEXTAUTH_SECRET, STRIPE_*).
4. Build command: `prisma generate && next build`
5. Postgres үүсгэх:
   - [Neon](https://neon.tech) (зөвлөмж — үнэгүй tier)
   - [Supabase](https://supabase.com)
   - [Vercel Postgres](https://vercel.com/storage/postgres)
6. Deploy хийсний дараа production URL-аа Stripe webhook, OAuth-н redirect URL-уудад нэмнэ.

### Self-hosted (VPS, Docker)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate && npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## 14. Хөгжүүлэлтийн зөвлөгөө

### Шинэ бүтээгдэхүүн нэмэх
1. `src/lib/mock-data.ts`-д шинэ бүтээгдэхүүн нэмэх (demo).
2. Эсвэл `/admin/products`-аас (production DB-той үед) нэмэх.

### Шинэ хуудас нэмэх
`src/app/<folder>/page.tsx` файл үүсгэхэд автоматаар route үүснэ:
```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>Бидний тухай</div>;
}
```
→ `/about` URL-аар нэвтэрнэ.

### Шинэ компонент нэмэх
- UI primitive бол `src/components/ui/` дотор
- Бизнес компонент бол `src/components/<feature>/` дотор

### Шинэ хэл нэмэх (жишээ нь Орос)
```typescript
// src/lib/i18n.ts
export const dictionaries = {
  mn: { /* ... */ },
  ru: {
    "nav.shop": "Магазин",
    "cart.empty": "Корзина пуста",
    // ...
  },
};
```

### Шинэ валют нэмэх
```typescript
// src/lib/currency.ts
export const currencies = [
  // ...
  { code: "CNY", label: "Хятадын юань", symbol: "¥", rate: 7.2 },
];
```

### Алдааны лог
- Browser console-д JS алдаа
- `npm run dev` асаасан terminal-д server log
- Production-д [Sentry](https://sentry.io) холбохыг зөвлөе

### Performance
- `next/image` — бүх зураг automatic optimize
- `next/font` — fonts preload, swap
- `generateStaticParams` — статик хуудас build үед үүсгэх
- React Suspense + streaming — суурь хуудас эхэлж ачааллах

### Хамгаалалт
- `.env` файлыг **хэзээ ч** git-д commit хийхгүй
- Production-д `NEXTAUTH_SECRET`-ыг урт, санамсаргүй (`openssl rand -base64 32`) болгох
- Stripe webhook-н signature заавал шалгах (хийгдсэн байгаа)
- Input бүрийг Zod-оор валидац хийх (хийгдсэн)

### Туслах материал
- [Next.js баримт](https://nextjs.org/docs)
- [Prisma баримт](https://www.prisma.io/docs)
- [Tailwind баримт](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Stripe Docs](https://stripe.com/docs)

---

## Тусламж хэрэгтэй юу?

Энэхүү код бол **template** — өөрийн бизнест тохируулан өөрчилж болно. Хэрэв алдаа гарвал:
1. Терминалд гарсан алдааны мэдэгдлийг анхааралтай уншина.
2. Browser-н console-г шалгана (DevTools → Console).
3. `.next` фолдерыг устгаад `npm run dev`-ийг дахин ажиллуулна:
   ```bash
   rm -rf .next && npm run dev
   ```
4. Dependency-ийг шинээр суулгана:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

Амжилт хүсье! 🚀
