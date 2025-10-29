# Demo Setup - Mock Data Configuration

## Changes Made

### 1. **Removed Sanity Dependency**
- Replaced Sanity CMS integration with mock data for demo purposes
- Created `lib/mock-data.ts` with sample products, retailers, UGC content, promos, and site settings

### 2. **Updated Type Definitions**
- Modified `lib/types.ts` to use simple string types for images instead of Sanity image types
- Removed dependency on `@sanity/image-url` types

### 3. **Updated Query Functions**
- Modified `lib/sanity.queries.ts` to return mock data instead of querying Sanity
- All query functions now work with local mock data
- Added simulated async behaviour for realistic loading states

### 4. **Created Store Locator**
- Built complete store locator page at `/[locale]/store-locator`
- Created interactive mock map component with store markers
- Added search and filter functionality by country and keyword
- Includes 8 mock retailers across UK and Kurdistan

### 5. **Added Placeholder Assets**
- Created SVG-based placeholder images for:
  - Products
  - Promotional banners
  - UGC/social content
  - General placeholders

## Mock Data Included

### Products (6 flavours)
1. **Spicy Chilli** - Heat Level 3, Big Puff
2. **Cheese & Onion** - Heat Level 0, Light Puff
3. **BBQ Blast** - Heat Level 1, Big Puff
4. **Salt & Vinegar** - Heat Level 0, Light Puff
5. **Sour Cream & Chive** - Heat Level 0, Extra Puffy
6. **Sweet Paprika** - Heat Level 1, Big Puff

### Retailers (8 locations)
- **UK**: Tesco, Sainsbury's, Asda, Morrisons, Co-op, Waitrose (London, Manchester, Birmingham, Leeds, Bristol)
- **Kurdistan**: Erbil City Centre Market, Baghdad Central Store

### Store Locator Features
- 📍 Interactive mock map with clickable markers
- 🔍 Search by store name, city, or address
- 🌍 Filter by country (UK / Kurdistan)
- 📱 Responsive design for mobile and desktop
- 🗺️ Get directions links to Google Maps
- 🌐 Store website links where available
- 📞 Phone numbers and opening hours

## Running the Application

```bash
# Start development server
npm run dev
```

The application will run at:
- **Homepage**: http://localhost:3000
- **Products**: http://localhost:3000/en/products
- **Store Locator**: http://localhost:3000/en/store-locator
- **Quiz**: http://localhost:3000/en/quiz
- **About**: http://localhost:3000/en/about

## Features Working in Demo Mode

✅ Product catalogue with filtering and sorting
✅ Product detail pages with nutrition info
✅ Interactive quiz for flavour recommendations
✅ Store locator with map and search
✅ Multi-language support (EN/AR/CKB)
✅ UGC wall display
✅ Active promotions
✅ Contact forms
✅ Responsive navigation

## Note on Sanity Studio

The Sanity Studio route (`/studio`) will still exist but won't function without proper Sanity credentials. This is intentional for the demo and can be re-enabled later by:

1. Creating a Sanity project at [sanity.io](https://www.sanity.io/)
2. Adding credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```
3. Reverting the changes to use the original Sanity queries

## Next Steps for Production

When ready to move from demo to production:

1. **Set up Sanity CMS** and restore original query functions
2. **Add Google Maps API** key for real map functionality
3. **Upload actual product images** and brand assets
4. **Configure real retailer locations** with accurate geocoding
5. **Set up analytics** (Google Analytics, Hotjar, etc.)
6. **Deploy to Vercel** or your preferred hosting platform
7. **Set up Sanity webhook** for automatic revalidation

---

**Built for Demo** | Dana Dana Chips | 2025


