# Dana Dana Chips Website

A modern, multi-language (EN/AR/CKB) Next.js website for Dana Dana Chips, featuring product catalogue, interactive quiz, and store locator.

## 🚀 Features

- ✅ **Multi-language Support** (English, Arabic, Central Kurdish) with RTL
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
- **Animations:** Framer Motion
- **Internationalization:** next-intl
- **Icons:** Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory (optional):

```env
# Google Maps (optional for store locator)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 📁 Project Structure

See [structure.md](./structure.md) for detailed project architecture and file organization.

## 🐛 Troubleshooting

If you encounter 404/500 errors with locale routes, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions, especially regarding Next.js static export compatibility with next-intl.

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

The website currently uses mock data stored in `/lib/mock-data.ts`. To add or modify content:

1. Edit `/lib/mock-data.ts` to add/modify:
   - **Products:** Flavours with images, heat levels, ingredients
   - **Retailers:** Store locations with addresses and coordinates
   - **UGC:** Social media content
   - **Promos:** Limited-time offers
   - **Site Settings:** Social links, contact info, halal certification

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

Add environment variables from `.env.local` to your Vercel project settings (if using Google Maps).

### GitHub Pages (Automated)

The website is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Setup:**
1. Enable GitHub Pages in repository Settings → Pages → Source: **GitHub Actions**
2. Push to `main` or `master` branch - deployment happens automatically!

**How it works:**
- GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys
- Configuration is handled automatically - no manual changes needed
- `basePath` is set automatically based on repository name
- Static export is enabled only during CI build (development remains dynamic)

**See [GITHUB-PAGES-DEPLOYMENT.md](./GITHUB-PAGES-DEPLOYMENT.md) for detailed setup instructions and troubleshooting.**

## 📊 Performance

- **Lighthouse Scores (Target):**
  - Performance: ≥ 90
  - Accessibility: ≥ 95
  - SEO: 100
  - LCP: < 1s on 4G

- **Optimization Techniques:**
  - Image optimization via next/image
  - Static site generation for fast loading
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
