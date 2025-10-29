# Guide: Updating Placeholder Images with Real Instagram Content

## Overview
This guide will help you replace placeholder images with real content from Dana Dana Chips' Instagram page.

## Step 1: Download Images from Instagram

### Using Instagram Web Interface
1. Visit https://www.instagram.com/danadanachips/?hl=en
2. For each post you want to use:
   - Click on the post to open it
   - Right-click the image and select "Save Image As..."
   - Save to your computer with descriptive names

### Recommended Images to Download

#### Product Images (6 needed)
- Download high-quality photos of each flavour
- Save as: `spicy-chilli.jpg`, `cheese-onion.jpg`, `bbq-blast.jpg`, etc.

#### UGC Content (6 recommended)
- Download customer posts showing people enjoying the chips
- Save as: `ugc-1.jpg`, `ugc-2.jpg`, `ugc-3.jpg`, etc.
- Note the Instagram handle and caption for each

#### Brand/Promo Images (1-2 needed)
- Download promotional banners or campaign images
- Save as: `promo-summer.jpg`, etc.

## Step 2: Add Images to Project

### File Structure
```
dana-dana-chips/
└── public/
    ├── products/
    │   ├── spicy-chilli.jpg
    │   ├── cheese-onion.jpg
    │   ├── bbq-blast.jpg
    │   ├── salt-vinegar.jpg
    │   ├── sour-cream.jpg
    │   └── paprika.jpg
    ├── ugc/
    │   ├── post-1.jpg
    │   ├── post-2.jpg
    │   ├── post-3.jpg
    │   ├── post-4.jpg
    │   ├── post-5.jpg
    │   └── post-6.jpg
    └── brand/
        └── promo-summer.jpg
```

### Create Directories
```bash
cd public
mkdir -p products ugc brand
```

## Step 3: Update Mock Data

### Update Product Images
Open `lib/mock-data.ts` and update the `images` array for each product:

```typescript
// Before
images: ['/placeholder-product.jpg']

// After
images: ['/products/spicy-chilli.jpg']
```

### Update UGC Content
Update the `mediaUrl` and add real captions:

```typescript
// Before
{
  _id: 'u1',
  platform: 'instagram',
  mediaUrl: '/placeholder-ugc-1.jpg',
  caption: '🔥 Can\'t get enough of these spicy puffs! Perfect movie snack! #DanaDana',
  author: '@snacklover_uk'
}

// After
{
  _id: 'u1',
  platform: 'instagram',
  mediaUrl: '/ugc/post-1.jpg',
  caption: 'Real caption from Instagram post',
  author: '@actual_instagram_handle'
}
```

### Update Promo Images
```typescript
// Before
image: '/placeholder-promo.jpg'

// After
image: '/brand/promo-summer.jpg'
```

## Step 4: Optimise Images

### Recommended Image Specifications
- **Product images**: 800x800px, JPEG quality 85%
- **UGC images**: 1080x1080px, JPEG quality 80%
- **Promo banners**: 1200x600px, JPEG quality 85%

### Using Online Tools
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Resize and optimise

### Using Command Line (ImageMagick)
```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# Resize and optimise
convert input.jpg -resize 800x800 -quality 85 output.jpg
```

## Step 5: Update Social Media Links

If you notice the Instagram profile has specific campaign hashtags or features, update the mock data accordingly.

### Update Site Settings in `lib/mock-data.ts`:
```typescript
export const mockSiteSettings: SiteSettings = {
  // ... other settings
  socialMedia: {
    instagram: 'https://instagram.com/danadanachips',
    facebook: 'https://facebook.com/danadanachips',
    tiktok: 'https://tiktok.com/@danadanachips',
    // Update with real URLs
  }
}
```

## Quick Reference: Files to Update

1. **Product Images**: `lib/mock-data.ts` → `mockProducts` array → `images` property
2. **UGC Content**: `lib/mock-data.ts` → `mockUGC` array → `mediaUrl`, `caption`, `author`
3. **Promos**: `lib/mock-data.ts` → `mockPromos` array → `image` property
4. **Social Links**: `lib/mock-data.ts` → `mockSiteSettings` → `socialMedia`

## Testing

After updating:
1. Restart the development server: `npm run dev`
2. Visit http://localhost:3000
3. Check that all images load correctly
4. Verify captions and attributions are accurate

## Alternative: Using Instagram API (Advanced)

For automatic updates, consider:
1. Instagram Basic Display API (requires Facebook Developer account)
2. Third-party services like Instafeed.js
3. Manual scraping tools (use responsibly)

**Note**: Instagram's terms of service restrict automated scraping. Always download content manually or use official APIs.

## Troubleshooting

### Images Not Loading
- Check file paths are correct (case-sensitive)
- Ensure images are in the `public` folder
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Images Too Large
- Compress images before adding them
- Keep product images under 200KB each
- Use WebP format for better compression

### Attribution Issues
- Always credit the original Instagram poster
- Include their handle in the `author` field
- Consider reaching out for permission if reposting customer content

## Need Help?

If you need assistance updating the images, provide:
1. Downloaded image files
2. Instagram post URLs
3. Specific captions and credits

---

**Next Steps**: Once you've downloaded the images, let me know and I can help update the mock data file with the correct paths and real information!


