# Dana Dana Chips - Project Structure

## Overview
This project is a multi-language (EN/AR/CKB) Next.js 14 website with Sanity CMS integration for Dana Dana Chips, featuring atomic design patterns, internationalization, and modern UX.

## Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **CMS:** Sanity Studio v3
- **Animations:** Framer Motion
- **Internationalization:** next-intl
- **Maps:** Google Maps API
- **Icons:** Lucide React

## Directory Structure

```
dana-dana-chips/
├── app/                                  # Next.js App Router
│   ├── [locale]/                        # Internationalized routes
│   │   ├── layout.tsx                   # Locale-specific layout with i18n
│   │   ├── page.tsx                     # Home page
│   │   ├── products/
│   │   │   ├── page.tsx                # Products listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Product detail page (PDP)
│   │   ├── quiz/
│   │   │   ├── page.tsx                # Quiz flow
│   │   │   └── results/
│   │   │       └── page.tsx            # Quiz results with product recommendations
│   │   ├── store-locator/
│   │   │   └── page.tsx                # Store locator with Google Maps
│   │   ├── about/
│   │   │   └── page.tsx                # About page
│   │   ├── promos/
│   │   │   └── page.tsx                # Promotions listing
│   │   ├── contact/
│   │   │   └── page.tsx                # Contact form
│   │   └── wholesale/
│   │       └── page.tsx                # Wholesale enquiries
│   ├── api/
│   │   └── contact/
│   │       └── route.ts                # Contact form API endpoint
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx                # Sanity Studio route (/studio)
│   ├── layout.tsx                       # Root layout (minimal)
│   ├── globals.css                      # Global styles with Tailwind & brand colours
│   ├── robots.ts                        # robots.txt generator
│   ├── sitemap.ts                       # Dynamic sitemap generator
│   └── favicon.ico
│
├── components/
│   ├── layout/
│   │   ├── navigation.tsx              # Main navigation with mobile menu
│   │   └── footer.tsx                  # Footer with social links
│   └── ui/
│       ├── atoms/                      # Atomic Design: Smallest components
│       │   ├── heat-chip.tsx           # Heat level indicator (0-3 flames)
│       │   ├── halal-badge.tsx         # Halal certification badge
│       │   └── language-switch.tsx     # Language selector (EN/AR/CKB)
│       ├── molecules/                  # Atomic Design: Composed components
│       │   ├── product-card.tsx        # Product card with image, heat, CTA
│       │   ├── reel-card.tsx           # UGC reel card with play overlay
│       │   ├── store-card.tsx          # Retailer card with directions
│       │   ├── filter-bar.tsx          # Product filtering controls
│       │   └── newsletter-form.tsx     # Email subscription form
│       ├── organisms/                  # Atomic Design: Complex sections
│       │   ├── hero-puff-burst.tsx     # Animated hero with puff burst
│       │   ├── ugc-wall.tsx            # UGC grid with lightbox modal
│       │   └── product-grid.tsx        # Filterable product grid
│       └── [shadcn components]         # button, card, badge, dialog, tabs, etc.
│
├── lib/
│   ├── sanity.client.ts                # Sanity client configuration
│   ├── sanity.queries.ts               # GROQ queries & image URL builder
│   ├── quiz-logic.ts                   # Quiz scoring & product matching
│   ├── types.ts                        # TypeScript type definitions
│   └── utils.ts                        # Utility functions (cn, etc.)
│
├── messages/                            # i18n translation files
│   ├── en.json                         # English translations
│   ├── ar.json                         # Arabic translations (RTL)
│   └── ckb.json                        # Central Kurdish translations (RTL)
│
├── sanity/
│   ├── schemas/
│   │   ├── product.ts                  # Product schema (localized)
│   │   ├── retailer.ts                 # Retailer/store schema
│   │   ├── ugc.ts                      # UGC content schema
│   │   ├── promo.ts                    # Promotions schema
│   │   ├── settings.ts                 # Site settings schema
│   │   └── index.ts                    # Schema export
│   ├── sanity.config.ts                # Sanity Studio configuration
│   └── sanity.cli.ts                   # Sanity CLI configuration
│
├── public/                              # Static assets
│   └── fonts/                          # Custom fonts (if needed)
│
├── i18n.ts                             # i18n configuration (locales, direction)
├── middleware.ts                       # Locale detection & routing
├── next.config.ts                      # Next.js configuration (images, i18n)
├── tailwind.config.ts                  # Tailwind configuration (theme extension)
├── tsconfig.json                       # TypeScript configuration
├── components.json                     # shadcn/ui configuration
└── package.json                        # Dependencies & scripts
```

## Key Features

### 1. **Internationalization (i18n)**
- **Locales:** English (`en`), Arabic (`ar`), Central Kurdish (`ckb`)
- **RTL Support:** Automatic direction switching for Arabic & Kurdish
- **Dynamic Routes:** All pages support `[locale]` parameter
- **Translations:** Managed via `messages/*.json` files

### 2. **Sanity CMS Integration**
- **Studio Access:** `/studio` route for content management
- **Schemas:** Product, Retailer, UGC, Promo, Settings
- **Image Optimization:** Sanity CDN with `next/image`
- **ISR:** Incremental Static Regeneration (60s revalidation)

### 3. **Atomic Design Pattern**
- **Atoms:** HeatChip, HalalBadge, LanguageSwitch
- **Molecules:** ProductCard, ReelCard, StoreCard, FilterBar, NewsletterForm
- **Organisms:** HeroPuffBurst, UGCWall, ProductGrid

### 4. **Product Features**
- **Filtering:** Puff type, heat level, size, halal certification
- **Sorting:** Name (A-Z), Heat level
- **Heat Levels:** 0 (No Heat) → 3 (Hot) with flame indicators
- **Halal Badge:** All products certified

### 5. **Quiz Flow**
- **Questions:** Crunch preference, heat level, mood/occasion
- **Logic:** Matches user answers → product attributes
- **Results:** Recommended products + store locator CTA

### 6. **Performance Optimizations**
- **Image Optimization:** WebP/AVIF via Sanity + next/image
- **Font Optimization:** next/font with display: swap
- **ISR:** Product pages revalidate every 60s
- **Code Splitting:** Automatic via Next.js App Router

### 7. **SEO & Analytics**
- **Dynamic Metadata:** Per-page SEO titles/descriptions
- **Sitemap:** Auto-generated from Sanity content
- **Robots.txt:** Disallows `/studio` and `/api`
- **Structured Data:** (TODO: JSON-LD for Products)

## Brand Colours (Tailwind Extensions)
```css
--color-flame: #e5322d     /* Primary CTA, brand accent */
--color-zesty: #ff7a1a     /* Secondary accent */
--color-corn: #ffc83a      /* Tertiary accent */
--color-mint: #30d7b4      /* Halal badge, success */
--color-ink: #0c0c0c       /* Headings, dark text */
```

## Typography
- **Display Font:** Bungee (headlines, logo)
- **Body Font:** Inter (paragraphs, UI)
- **Arabic/Kurdish Font:** (System defaults, Cairo for web fonts if needed)

## Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

## Development Workflow
1. **Content Management:** Access `/studio` to add products, retailers, UGC
2. **Testing Locales:** Switch between `/en`, `/ar`, `/ckb` routes
3. **RTL Testing:** Arabic & Kurdish automatically apply `dir="rtl"`
4. **Quiz Testing:** Complete quiz flow to verify product matching logic

## Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure Sanity webhooks to trigger ISR revalidation
4. Custom domain: `www.danadanachips.com`

## Future Enhancements
- [ ] Google Maps integration for store locator
- [ ] Analytics (Plausible or GA4)
- [ ] Newsletter integration (Mailchimp/ConvertKit)
- [ ] Contact form email service (Resend/SendGrid)
- [ ] JSON-LD structured data for products
- [ ] Wholesale page with media kit download
- [ ] Store locator with geolocation
- [ ] UGC lightbox with Instagram embed
- [ ] Promo listings page
- [ ] Product search functionality
- [ ] Customer reviews/ratings

## Notes
- **No E-commerce:** This is a retailer directory, not a transactional site
- **Manual UGC:** Instagram content curated manually (no API automation initially)
- **Placeholder Images:** Replace with actual product photos
- **Translations:** All three languages fully supported throughout

