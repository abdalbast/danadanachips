# Dana Dana Chips Website

A modern, multi-language (EN/AR/CKB) Next.js website for Dana Dana Chips, featuring Sanity CMS integration, product catalogue, interactive quiz, and store locator.

## 🚀 Features

- ✅ **Multi-language Support** (English, Arabic, Central Kurdish) with RTL
- ✅ **Sanity CMS** for content management
- ✅ **Product Catalogue** with filtering and sorting
- ✅ **Interactive Quiz** to find your perfect puff flavour
- ✅ **Store Locator** (Google Maps integration ready)
- ✅ **UGC Wall** for social proof
- ✅ **Atomic Design** component architecture
- ✅ **Performance Optimized** with ISR and image optimization
- ✅ **SEO-friendly** with dynamic sitemaps and metadata
- ✅ **Accessibility** focused with WCAG AA compliance

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **CMS:** Sanity Studio v3
- **Animations:** Framer Motion
- **Internationalization:** next-intl
- **Icons:** Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Sanity project details

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access Sanity Studio.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Getting Sanity Credentials

1. Create a Sanity account at [sanity.io](https://www.sanity.io/)
2. Create a new project
3. Copy your Project ID and Dataset name
4. Generate an API token with read permissions

## 📁 Project Structure

See [structure.md](./structure.md) for detailed project architecture and file organization.

## 🌍 Internationalization

The website supports three languages:
- **English (en)** - Default, LTR
- **Arabic (ar)** - RTL
- **Central Kurdish (ckb)** - RTL

All routes are prefixed with locale: `/en/`, `/ar/`, `/ckb/`

## 🎨 Brand Colours

- **Flame Red** (`#E5322D`) - Primary CTA, brand accent
- **Zesty Orange** (`#FF7A1A`) - Secondary accent
- **Corn Puff Yellow** (`#FFC83A`) - Tertiary accent
- **Cool Mint** (`#30D7B4`) - Halal badge, success states
- **Ink Black** (`#0C0C0C`) - Headings, text

## 📝 Content Management

### Accessing Sanity Studio

1. Navigate to `/studio` on your deployed site
2. Log in with your Sanity credentials
3. Start adding content:
   - **Products:** Add flavours with images, heat levels, ingredients
   - **Retailers:** Add store locations with addresses and coordinates
   - **UGC:** Curate Instagram content manually
   - **Promos:** Create limited-time offers
   - **Settings:** Configure site-wide settings

### Content Types

- **Product:** Name (localized), flavour, heat level (0-3), puff type, sizes, halal certification, images, nutrition facts
- **Retailer:** Name, address, city, country, geocode, hours, phone, online URL
- **UGC Content:** Platform, media URL, thumbnail, caption (localized), author
- **Promo:** Title (localized), description, image, start/end dates, CTA
- **Site Settings:** Tagline, social media links, contact info, halal certification

## 🧪 Quiz Logic

The "Find Your Puff" quiz asks 3 questions:
1. **Crunch preference:** Light, Big, Extra Puffy
2. **Heat level:** Mild, Medium, Fire
3. **Mood/Occasion:** Movie night, Study fuel, On-the-go, Party

Answers are mapped to product attributes:
- Crunch → `puffType`
- Heat → `heatLevel` (0-3)
- Mood → Contextual message

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables in Vercel

Add the same variables from `.env.local` to your Vercel project settings.

### Sanity Webhook (ISR Revalidation)

1. In Sanity Studio, go to **API** → **Webhooks**
2. Create a new webhook pointing to: `https://your-domain.com/api/revalidate`
3. Select triggers: On create/update/delete for Product, Retailer, UGC, Promo

## 📊 Performance

- **Lighthouse Scores (Target):**
  - Performance: ≥ 90
  - Accessibility: ≥ 95
  - SEO: 100
  - LCP: < 1s on 4G

- **Optimization Techniques:**
  - Image optimization via Sanity CDN + next/image
  - ISR with 60s revalidation
  - Font optimization with next/font
  - Code splitting (automatic via Next.js)

## 🧑‍💻 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

© 2025 Dana Dana Chips. All rights reserved.

## 📞 Support

For questions or support, contact: info@danadanachips.com

---

Built with ❤️ in Kurdistan
