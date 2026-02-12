---
title: "feat: Build swim.art Custom Site with Fourthwall Merch Integration"
type: feat
date: 2026-02-12
---

# Build swim.art Custom Site with Fourthwall Merch Integration

## Overview

Build a complete artist website for SWIM (swim.art) as a Next.js App Router project deployed on Vercel. The merch section is powered by Fourthwall's Storefront API using their official vercel-commerce starter as the foundation. The site includes music, shows, merch, and about sections under one codebase with a dark, cinematic, editorial design language.

## Problem Statement

SWIM currently uses Squarespace, which limits customization and doesn't integrate with Fourthwall merch. A custom Next.js site provides full creative control, better performance, and native Fourthwall integration for end-to-end merch sales.

## Proposed Solution

Fork the Fourthwall vercel-commerce starter, restructure for an artist site with custom pages (music, shows, about), restyle with a dark editorial design system, and deploy to Vercel.

## Technical Approach

### Architecture

- **Framework**: Next.js 14+ (App Router, Server Components, Server Actions)
- **Styling**: Tailwind CSS 3.x (pure — no component libraries)
- **Language**: TypeScript (strict mode)
- **Hosting**: Vercel (hobby tier)
- **Merch Backend**: Fourthwall Storefront API
- **Font**: Inter (Google Fonts)
- **Package Manager**: pnpm

### Applicable Skills & Requirements

| Skill | Key Requirements |
|-------|-----------------|
| `base.md` | Max 20 lines/function, max 200 lines/file, max 3 params, TDD mandatory |
| `react-web.md` | Test-first development, functional components, explicit props interfaces |
| `typescript.md` | Strict mode, no `any`, named exports, no enums |
| `site-architecture.md` | robots.txt, sitemap, meta tags, security headers, AI bot config |
| `ui-web.md` | WCAG 2.1 AA, 4.5:1 contrast, 44px touch targets, focus states |
| `web-content.md` | Schema markup (MusicGroup, Event), Open Graph, SEO |
| `security.md` | .gitignore secrets, .env.example, no secrets in NEXT_PUBLIC_ |
| `commit-hygiene.md` | Atomic commits <400 lines, commit after each stable point |
| `playwright-testing.md` | E2E tests, dead link detection, page object model |

### Implementation Phases

#### Phase 1: Foundation (Fork, Restructure, Config)

**Tasks:**
1. Clone Fourthwall vercel-commerce starter
2. Remove `.git`, init fresh repo
3. Restructure `app/` routes to match target architecture
4. Configure Tailwind with dark editorial color system
5. Set up Inter font via `next/font/google`
6. Configure `next.config.js` (image domains, security headers)
7. Create `.env.example` with all required variables
8. Create `.gitignore` with secrets patterns
9. Set up TypeScript strict config
10. Push to `swimakaswim/swim` on GitHub

**Files:**
- `tailwind.config.js` — custom colors, fonts, animations
- `next.config.js` — image domains, security headers
- `tsconfig.json` — strict mode
- `.env.example` — documented env vars
- `.env.local` — local dev (empty values)
- `.gitignore` — secrets, node_modules, .next
- `app/globals.css` — base styles, custom scrollbar, selection color
- `package.json` — updated scripts, dependencies

**Success Criteria:**
- `pnpm dev` runs without errors
- TypeScript strict mode passes
- Tailwind config compiles
- Git repo initialized and pushed

**Estimated Effort:** S

---

#### Phase 2: Layout Shell (Nav, Footer, Root Layout)

**Tasks:**
1. Build root `app/layout.tsx` with dark theme, font, providers
2. Build `components/layout/Navbar.tsx` — sticky, transparent → dark on scroll
3. Build `components/layout/Footer.tsx` — social links, booking email
4. Build `components/layout/MobileMenu.tsx` — hamburger → fullscreen overlay
5. Build `components/ui/Container.tsx` — max-w-7xl wrapper
6. Build `components/ui/Button.tsx` — shared button variants
7. Integrate cart provider from Fourthwall starter (graceful when no token)

**Files:**
- `app/layout.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/MobileMenu.tsx`
- `components/ui/Container.tsx`
- `components/ui/Button.tsx`

**Success Criteria:**
- Nav renders with links (Music, Shows, Merch, SWIM center, cart icon)
- Footer renders with social links and emails
- Mobile hamburger menu works
- Cart icon shows (empty state when no token)
- Dark theme applied site-wide

**Estimated Effort:** M

---

#### Phase 3: Homepage

**Tasks:**
1. Build `app/page.tsx` — homepage with all sections
2. Build `components/home/Hero.tsx` — full-viewport image with CTA overlay
3. Build `components/home/FeaturedMusic.tsx` — album art cards with streaming links
4. Build `components/home/FilmPromo.tsx` — OTHERSIDE EP film promo block
5. Build `components/home/PhotoGallery.tsx` — image gallery/carousel
6. Build `components/home/ShowsPreview.tsx` — next 2-3 upcoming shows

**Files:**
- `app/page.tsx`
- `components/home/Hero.tsx`
- `components/home/FeaturedMusic.tsx`
- `components/home/FilmPromo.tsx`
- `components/home/PhotoGallery.tsx`
- `components/home/ShowsPreview.tsx`

**Content (hardcoded):**
- Hero: "NEW MOON" title, "LISTEN NOW" CTA → `https://ffm.to/swimnewmoon`
- Film: "OTHERSIDE EP FILM", text 'otherside' to (737) 530-3352
- Music: NEW MOON → `https://ffm.to/swimnewmoon`, DEAD & BURIED → `https://ffm.to/deadandburied`
- Show: 11/15/2025, SWIM & FRIENDS VOL 1, Saturn ATX, 9pm

**Success Criteria:**
- Homepage renders all sections in scroll order
- Hero is full-viewport with overlay text
- All CTAs link correctly
- Mobile responsive at 390px

**Estimated Effort:** M

---

#### Phase 4: Content Pages (Music, Shows, About)

**Tasks:**
1. Build `app/music/page.tsx` — releases with artwork and streaming links
2. Build `app/shows/page.tsx` — show listings with ticket links
3. Build `app/about/page.tsx` — bio, press, contact info
4. Build `components/shows/ShowCard.tsx` — individual show listing

**Files:**
- `app/music/page.tsx`
- `app/shows/page.tsx`
- `app/about/page.tsx`
- `components/shows/ShowCard.tsx`

**Content (hardcoded):**
- Music: Spotify embed placeholder, release cards
- Shows: Saturn ATX show, booking email
- About: Bio placeholder, press/booking contacts

**Success Criteria:**
- All three pages render correctly
- Navigation works between all pages
- Mobile responsive
- Proper meta tags on each page

**Estimated Effort:** S

---

#### Phase 5: Merch Integration (Fourthwall)

**Tasks:**
1. Adapt `lib/fourthwall/` from starter (keep API client, types, reshape)
2. Build `app/merch/page.tsx` — product grid from collection
3. Build `app/merch/[handle]/page.tsx` — product detail with variants
4. Build `components/merch/ProductGrid.tsx` — grid of product cards
5. Build `components/merch/ProductCard.tsx` — product thumbnail
6. Build `components/merch/ProductDetail.tsx` — full product view
7. Build `components/merch/VariantSelector.tsx` — size/color picker
8. Build `components/merch/AddToCart.tsx` — add to cart with loading
9. Build `components/merch/CartDrawer.tsx` — slide-out cart panel
10. Build `components/merch/CartItem.tsx` — line item in cart
11. Build `components/merch/Price.tsx` — formatted price display
12. Implement graceful degradation (show "merch coming soon" when no token)
13. Set up ISR with revalidate 3600 + webhook for on-demand revalidation

**Files:**
- `lib/fourthwall/index.ts` (adapted from starter)
- `lib/fourthwall/types.ts` (adapted from starter)
- `lib/fourthwall/reshape.ts` (adapted from starter)
- `app/merch/page.tsx`
- `app/merch/[handle]/page.tsx`
- `app/api/revalidate/route.ts`
- `components/merch/ProductGrid.tsx`
- `components/merch/ProductCard.tsx`
- `components/merch/ProductDetail.tsx`
- `components/merch/VariantSelector.tsx`
- `components/merch/AddToCart.tsx`
- `components/merch/CartDrawer.tsx`
- `components/merch/CartItem.tsx`
- `components/merch/Price.tsx`
- `components/cart/cart-context.tsx` (adapted from starter)
- `components/cart/actions.ts` (adapted from starter)

**Key API Integration:**
- Products: `GET /v1/collections/{slug}/products?storefront_token=ptkn_...&currency=USD`
- Cart create: `POST /v1/carts?storefront_token=ptkn_...`
- Cart add: `POST /v1/carts/{cartId}/add`
- Cart remove: `POST /v1/carts/{cartId}/remove`
- Checkout redirect: `https://{NEXT_PUBLIC_FW_CHECKOUT}/checkout/?cartCurrency=USD&cartId={cartId}`

**Graceful Degradation:**
- If `NEXT_PUBLIC_FW_STOREFRONT_TOKEN` is empty/missing:
  - Merch page shows styled "Merch coming soon" message
  - Cart icon appears but shows empty state
  - No errors thrown, console warning only

**Success Criteria:**
- Products render in grid when API token provided
- Product detail page shows variants, images, add-to-cart
- Cart drawer opens/closes, shows items, totals
- Checkout button redirects to Fourthwall hosted checkout
- Graceful "coming soon" when no token
- ISR works with 1-hour revalidation
- Webhook endpoint invalidates cache on-demand

**Estimated Effort:** L

---

#### Phase 6: SEO, Accessibility, Polish

**Tasks:**
1. Add proper meta tags and Open Graph for each page
2. Create `app/robots.ts` — dynamic robots.txt with AI bot config
3. Create `app/sitemap.ts` — dynamic sitemap generation
4. Add structured data (MusicGroup schema for artist, Event schema for shows)
5. Ensure heading hierarchy, alt text, keyboard navigation, focus states
6. Add subtle scroll fade-in animations (Intersection Observer)
7. Add loading skeletons / fade-in transitions
8. Verify WCAG 2.1 AA compliance (4.5:1 contrast on dark backgrounds)

**Files:**
- `app/robots.ts`
- `app/sitemap.ts`
- Each page's `metadata` export updated
- `components/ui/FadeIn.tsx` (scroll animation wrapper)

**Success Criteria:**
- Lighthouse performance 90+
- All pages have unique meta titles/descriptions
- Open Graph tags render correctly
- Schema markup validates
- Keyboard navigation works across all interactive elements
- No accessibility violations in axe audit

**Estimated Effort:** M

---

#### Phase 7: Testing & Deployment

**Tasks:**
1. Set up Playwright for E2E testing
2. Write E2E tests: all pages render, navigation works, mobile responsive
3. Write dead link detection test
4. Write merch graceful degradation test
5. Verify `pnpm dev` works with empty env vars
6. Verify `pnpm build` succeeds
7. Install Vercel CLI, link project
8. Deploy to Vercel
9. Configure custom domain (swim.art) — post-deploy

**Files:**
- `playwright.config.ts`
- `e2e/tests/navigation.spec.ts`
- `e2e/tests/homepage.spec.ts`
- `e2e/tests/merch.spec.ts`
- `e2e/tests/links.spec.ts`

**Success Criteria:**
- All E2E tests pass
- Build succeeds with zero TypeScript errors
- Site deployed to Vercel preview URL
- All pages accessible and responsive
- Cart works end-to-end when API token provided

**Estimated Effort:** M

## Acceptance Criteria

### Functional Requirements

- [x] Homepage renders all sections (hero, music, film promo, shows, gallery)
- [x] Music page shows releases with streaming links
- [x] Shows page lists upcoming shows with venue/ticket info
- [x] About page shows bio and contact information
- [x] Merch page displays Fourthwall products in grid (or "coming soon")
- [x] Product detail pages show variants, images, pricing
- [x] Cart drawer works (add, remove, quantity, totals)
- [x] Checkout redirects to Fourthwall hosted checkout
- [x] All pages navigate correctly
- [ ] Mobile responsive at 390px, 768px, 1024px, 1440px

### Non-Functional Requirements

- [ ] Lighthouse performance 90+
- [x] Zero TypeScript errors (strict mode)
- [x] WCAG 2.1 AA compliant (contrast, focus, alt text)
- [x] Proper SEO (meta tags, OG, sitemap, robots.txt)
- [x] Graceful degradation without API token
- [x] ISR with 1-hour revalidation + webhook invalidation
- [x] No unused dependencies
- [x] Dark mode only (no light mode toggle)

### Quality Gates

- [x] E2E tests pass
- [x] Build succeeds
- [ ] Deployed to Vercel
- [x] All commits atomic with clear messages

## Design Specifications

### Color System

```
background: #000000 (pure black)
foreground: #FFFFFF (white text)
muted: #888888 (secondary text)
accent: #FFFFFF (CTAs — white on black)
border: #222222 (subtle borders)
card: #0A0A0A (card backgrounds)
card-hover: #111111 (hover state)
```

### Typography

- Font: Inter (Google Fonts)
- Headings: uppercase, letter-spacing 0.1em+, bold/semibold
- Body: regular weight, line-height 1.6-1.8
- Hero titles: 4xl-6xl desktop, 2xl-3xl mobile

### Layout

- Full-bleed images (edge to edge)
- Content: max-w-7xl with generous padding
- Vertical spacing: py-20 to py-32 between sections
- No rounded corners on images (sharp, editorial)
- Mobile-first responsive

### Navigation

- Sticky top nav, transparent → dark backdrop on scroll
- Left: Music, Shows, Merch
- Center: "SWIM" (home link)
- Right: Cart icon with count badge
- Mobile: hamburger → fullscreen overlay

## Route Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Homepage
├── music/page.tsx          # Music releases
├── shows/page.tsx          # Tour dates
├── about/page.tsx          # Bio & contact
├── merch/
│   ├── page.tsx            # Product grid
│   └── [handle]/page.tsx   # Product detail
├── api/revalidate/route.ts # Webhook ISR
├── robots.ts               # SEO
└── sitemap.ts              # SEO
```

## Environment Variables

```bash
NEXT_PUBLIC_FW_STOREFRONT_TOKEN=""     # Fourthwall storefront token
NEXT_PUBLIC_FW_CHECKOUT=""              # Checkout domain
NEXT_PUBLIC_VERCEL_URL=""               # Deployed URL
NEXT_PUBLIC_FW_COLLECTION=""            # Collection handle
FOURTHWALL_WEBHOOK_SECRET=""            # Webhook HMAC secret
```

## Dependencies & Prerequisites

- Node.js >= 20
- pnpm >= 9
- GitHub account with push access to swimakaswim/swim
- Vercel account (free tier)
- Fourthwall account with storefront token (for merch testing)

## Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Fourthwall API unavailable | Merch page broken | Graceful "coming soon" fallback |
| Missing storefront token | Can't test merch | All other pages work independently |
| Next.js 15 canary instability | Build failures | Pin to stable Next.js 14.x instead |
| Image performance on hero | Slow LCP | Next/Image with priority, placeholder blur |

## References

### Fourthwall Integration
- Storefront API: `https://storefront-api.fourthwall.com/v1/`
- Auth: Query param `?storefront_token=ptkn_...`
- Checkout: `https://{domain}/checkout/?cartCurrency=USD&cartId={id}`
- Rate limit: 100 requests per 10-second window

### Current Site Reference
- https://swim.art (Squarespace — design reference)
- Dark/black backgrounds, white text, high-contrast editorial photography
- Minimal nav: Music | SWIM | Cart

### Starter Template
- https://github.com/FourthwallHQ/vercel-commerce
- 55 TypeScript source files
- Full cart system with optimistic updates
- ISR with webhook cache invalidation
