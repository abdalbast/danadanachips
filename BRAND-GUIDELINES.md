# Dana Dana Chips - Brand Guidelines

## Overview
Dana Dana is a vibrant, playful popcorn/puff snack brand that brings joy and flavour to every moment. Our brand embodies fun, family-friendly values with a distinctly Kurdish heritage, serving communities across the UK and Kurdistan.

---

## 1. Brand Identity

### Brand Name
**Dana Dana** (ده‌نه‌ دانه‌ in Kurdish)

### Tagline
**"Puff. Crunch. Repeat."**

### Brand Personality
- **Playful & Fun**: Character-driven packaging with smiley faces and whimsical elements
- **Inclusive**: Multilingual (English, Arabic, Central Kurdish) with RTL support
- **Bold**: Confident use of vibrant colours and dynamic typography
- **Family-Friendly**: Approachable, safe, and welcoming to all ages
- **Authentic**: Proud Kurdish heritage with halal certification

### Brand Voice
- Energetic and enthusiastic
- Warm and welcoming
- Playful without being childish
- Confident and bold
- Culturally inclusive

---

## 2. Logo

### Primary Logo
![Dana Dana Logo](/Logo.jpg)

**File**: `Logo.jpg`

### Logo Specifications
- **Style**: Bold, script-style lettering with 3D effect
- **Colours**: Yellow/gold primary text with red accents
- **Elements**: 
  - "Dana Dana" in stylised script font
  - "POPCORN" banner in red ribbon
  - Black outlines for contrast and depth
  - Drop shadow for 3D effect
- **Treatment**: Dynamic, energetic, slightly tilted for movement

### Logo Usage
- **Minimum Size**: 60px height for digital, 20mm for print
- **Clear Space**: Maintain minimum clear space equal to the height of "POPCORN" banner on all sides
- **Backgrounds**: Works best on white, light grey, or transparent backgrounds
- **Do Not**: 
  - Stretch or distort
  - Change colours
  - Rotate beyond intended angle
  - Add effects or filters
  - Place on busy backgrounds without sufficient contrast

---

## 3. Colour Palette

### Primary Colours

#### Flame Red
- **Hex**: `#e5322d`
- **Usage**: Primary CTA buttons, brand accent, packaging highlights
- **Emotion**: Energy, excitement, heat, passion

#### Corn Gold/Yellow
- **Hex**: `#ffc83a`
- **Usage**: Logo, packaging primary, headlines, accents
- **Emotion**: Joy, warmth, deliciousness, optimism

#### Zesty Orange
- **Hex**: `#ff7a1a`
- **Usage**: Secondary accent, gradients, packaging variants
- **Emotion**: Boldness, flavour, vibrancy

### Secondary Colours

#### Mint Green
- **Hex**: `#30d7b4`
- **Usage**: Halal certification badges, success states, "light" flavour variants
- **Emotion**: Freshness, trust, certification

#### Ink Black
- **Hex**: `#0c0c0c`
- **Usage**: Headings, body text, outlines, contrast
- **Emotion**: Sophistication, clarity, boldness

### Neutral Colours

#### Pure White
- **Hex**: `#ffffff`
- **Usage**: Backgrounds, negative space, packaging highlights

#### Soft Grey
- **Hex**: `#f5f5f5`
- **Usage**: Section backgrounds, subtle dividers

#### Medium Grey
- **Hex**: `#6b7280`
- **Usage**: Secondary text, disabled states

### Colour Combinations
- **High Energy**: Flame Red + Corn Gold on white
- **Fun & Friendly**: Corn Gold + Zesty Orange on white
- **Trust & Quality**: Mint Green + Ink Black on white
- **Bold Statement**: Flame Red + Ink Black on Corn Gold

---

## 4. Typography

### Display Font: Bungee
**Usage**: Headlines, large display text, hero sections, promotional materials

```css
font-family: 'Bungee', cursive;
font-weight: 400;
```

**Characteristics**: Bold, playful, attention-grabbing, urban energy

### Body Font: Inter
**Usage**: Paragraphs, UI elements, navigation, product descriptions

```css
font-family: 'Inter', sans-serif;
font-weight: 400 | 500 | 600 | 700;
```

**Characteristics**: Clean, modern, highly readable, professional

### Arabic/Kurdish Typography
**Recommended**: System defaults or Cairo for enhanced readability

```css
font-family: 'Cairo', sans-serif;
```

**Direction**: RTL (Right-to-Left) for Arabic and Central Kurdish

### Type Scale
```
Display: 48-72px (Bungee)
H1: 36-48px (Bungee or Inter Bold)
H2: 30-36px (Inter Bold)
H3: 24-30px (Inter Semi-Bold)
H4: 20-24px (Inter Semi-Bold)
Body: 16-18px (Inter Regular/Medium)
Small: 14px (Inter Regular)
Caption: 12px (Inter Regular)
```

---

## 5. Packaging & Product Photography

### Packaging Design Principles

#### Character-Driven
- Each flavour/product has its own character expression
- Use of emoji-like faces (smiling, winking, moustaches)
- Characters are integrated into the product itself (e.g., puff snack as nose)

#### Colour Coding by Flavour
- **Original**: Orange/Gold gradient backgrounds
- **Ring**: Bright blue backgrounds
- **Spicy Variants**: Red/maroon gradients
- Each variant maintains Dana Dana logo consistency

#### Typography Hierarchy
1. **Dana Dana Logo**: Top centre, most prominent
2. **Product Variant**: Below logo (e.g., "ORIGINAL", "RING")
3. **Multilingual Descriptors**: Arabic/Kurdish beneath English
4. **Weight/Size**: Bottom corner with pricing badge if applicable
5. **Legal/Certification**: Bottom footer

### Photography Style

#### Product Shots
- **Clean, bright backgrounds**: White or light grey
- **Floating effect**: Subtle drop shadow for depth
- **Sharp focus**: Product in crisp detail
- **3/4 angle**: Package slightly angled for dimension
- **Natural lighting**: Bright, no harsh shadows

#### Lifestyle Context
- **Floating snacks**: Individual puffs shown around package
- **Dynamic poses**: Slight tilt, movement suggested
- **Contextual elements**: Cheese for cheese flavour, peppers for spicy, etc.
- **Hands-free**: Focus on product, minimal human elements

#### Social Media & UGC
- **Vibrant backgrounds**: Maroon, red, or branded colours
- **Multilingual text overlays**: Kurdish, Arabic, English
- **Playful compositions**: Products bursting, spinning, floating
- **High energy**: Bold typography, light effects, dynamic layouts

---

## 6. Visual Elements & Iconography

### Heat Level Indicators
Use flame icons to indicate spice levels:
- **0 Flames**: No heat (mild flavours)
- **1 Flame**: Mild warmth
- **2 Flames**: Medium spice
- **3 Flames**: Hot & spicy

**Colour**: Use Flame Red (#e5322d) for flame icons

### Halal Certification Badge
- **Shape**: Circular or crescent badge
- **Colour**: Mint Green (#30d7b4)
- **Placement**: Top corner or near product name
- **Icon**: Crescent and star or "Halal Certified" text
- **Body**: "HMC-2024-001 - Halal Monitoring Committee"

### Puff Type Icons
Visual indicators for texture/type:
- **Big Puffs**: Large circle icon
- **Light & Airy**: Cloud icon
- **Extra Puffy**: Starburst icon
- **Ring**: Circle with hole icon

### Icon Style
- **Stroke-based**: 2px strokes, rounded caps
- **Friendly curves**: No sharp edges
- **Consistent sizing**: 24px standard, 16px small, 32px large
- **Colour**: Ink Black or Flame Red on light backgrounds

---

## 7. UI/UX Patterns

### Buttons

#### Primary Button (CTA)
```css
background: #e5322d (Flame Red)
color: #ffffff
border-radius: 8px
padding: 12px 24px
font-weight: 600
hover: opacity 80%
```

#### Secondary Button
```css
background: transparent
color: #e5322d
border: 2px solid #e5322d
border-radius: 8px
padding: 12px 24px
font-weight: 600
```

### Cards
- **Background**: White with subtle shadow
- **Border Radius**: 12px
- **Padding**: 20-24px
- **Hover**: Subtle lift with increased shadow

### Navigation
- **Sticky header**: Always visible on scroll
- **Logo**: Left-aligned, 48px height
- **Links**: Horizontal on desktop, dropdown menu on mobile
- **Language Switcher**: Right corner, prominent
- **Mobile Menu**: Full-screen overlay with animation

### Spacing
- **Base Unit**: 4px
- **Common Increments**: 8px, 12px, 16px, 24px, 32px, 48px, 64px

---

## 8. Animation & Motion

### Brand Animation Principles
- **Playful Bounce**: Elements enter with slight bounce
- **Smooth Transitions**: 300-400ms ease-in-out
- **Puff Burst Effect**: Hero sections feature popcorn bursting animation
- **Hover Effects**: Gentle lift (translateY: -4px), scale (1.05)

### Framer Motion Variants
```javascript
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}
```

### Loading States
- **Spinner**: Rotating Dana Dana logo or flame icon
- **Skeleton**: Soft grey placeholders with shimmer
- **Progress**: Flame Red progress bar

---

## 9. Tone & Messaging

### Key Messages
1. **"Authentic Kurdish Flavour"**: Heritage and cultural pride
2. **"100% Halal Certified"**: Trust and inclusivity
3. **"Puff. Crunch. Repeat."**: Addictive, enjoyable, fun
4. **"Family Snacking, Elevated"**: Quality for all ages

### Copywriting Style
- **Headlines**: Bold, punchy, 3-7 words
- **Body**: Friendly, conversational, benefit-driven
- **CTAs**: Action-oriented ("Find Your Flavour", "Discover Stores", "Take the Quiz")
- **Product Descriptions**: Sensory language (crispy, zesty, fiery, smooth)

### Multilingual Considerations
- **English**: Primary language, neutral British English
- **Arabic**: Formal Modern Standard Arabic for wider reach
- **Central Kurdish (Sorani)**: Authentic to brand heritage, builds trust in Kurdish communities

---

## 10. Social Media & Digital Presence

### Instagram
- **Feed Aesthetic**: Vibrant, playful, colour-coordinated
- **Content Mix**: 
  - Product shots (40%)
  - Lifestyle/UGC (30%)
  - Promotions/announcements (20%)
  - Behind-the-scenes/brand story (10%)
- **Hashtags**: #DanaDana #DanaDanaChips #PuffCrunchRepeat #HalalSnacks #KurdishPride

### TikTok
- **Content Types**: 
  - Flavour challenges
  - ASMR crunching sounds
  - Quick recipes/snack hacks
  - Community engagement (duets, trends)
- **Music**: Upbeat, energetic, culturally diverse

### Facebook
- **Community Building**: Store locator updates, customer stories, event announcements
- **Engagement**: Polls, contests, flavour votes
- **Support**: Customer service, wholesale enquiries

### YouTube
- **Long-form Content**: Brand story, factory tours, recipe videos, taste tests
- **Series Ideas**: "Flavour of the Month", "Snack Time Stories"

---

## 11. Accessibility

### Colour Contrast
- **Text on White**: Use Ink Black (#0c0c0c) for WCAG AAA compliance
- **Text on Flame Red**: Use White (#ffffff)
- **Ensure 4.5:1 ratio minimum** for body text
- **Ensure 3:1 ratio minimum** for large text (18px+)

### Typography
- **Minimum Body Size**: 16px for readability
- **Line Height**: 1.5-1.7 for body text
- **Letter Spacing**: Slight increase for all-caps headings

### Interactive Elements
- **Focus States**: Visible outline (2px solid Flame Red)
- **Touch Targets**: Minimum 44x44px for mobile
- **Alt Text**: Descriptive for all images
- **ARIA Labels**: Proper labelling for screen readers

### RTL Support
- **Automatic Direction**: `dir="rtl"` for Arabic/Kurdish
- **Mirrored Layouts**: Icons, navigation flow reverse for RTL
- **Testing**: Always test both LTR and RTL experiences

---

## 12. Print & Packaging Standards

### Packaging Materials
- **Finish**: Glossy laminate for vibrancy
- **Material**: Food-safe metallised film
- **Print Method**: Rotogravure for high detail

### Colour Specifications (Print)
- **Flame Red**: CMYK 0/90/90/0 | Pantone 485 C
- **Corn Gold**: CMYK 0/20/85/0 | Pantone 123 C
- **Zesty Orange**: CMYK 0/60/90/0 | Pantone 1505 C
- **Mint Green**: CMYK 65/0/45/0 | Pantone 3252 C
- **Ink Black**: CMYK 75/68/67/90 | Pantone Black 6 C

### Packaging Sizes
- **50g**: Small snack pack
- **150g**: Family sharing size
- **1000g**: Party/bulk size

### Legal Requirements
- Nutritional information
- Ingredients list (multilingual)
- Allergen warnings
- Halal certification number
- Country of origin
- Best before date
- Barcode

---

## 13. Brand Applications

### Website
- **URL**: www.danadanachips.com
- **Design**: Modern, responsive, multilingual (EN/AR/CKB)
- **Key Features**: Product catalogue, quiz, store locator, UGC wall, contact forms
- **CMS**: Sanity for easy content management

### Email Marketing
- **Header**: Dana Dana logo on white or Flame Red
- **Layout**: Single column, mobile-first
- **CTA Buttons**: Large, prominent, Flame Red
- **Footer**: Social links, unsubscribe, contact info

### Point-of-Sale (POS)
- **Shelf Wobblers**: Flame Red with "NEW" or "HOT"
- **Standees**: Life-size packaging cutouts
- **Display Boxes**: Branded corrugated displays

### Merchandise (Future)
- **T-shirts**: Logo on Corn Gold or white background
- **Tote Bags**: Oversized logo, reusable eco-friendly material
- **Stickers**: Individual character faces, Dana Dana logo

---

## 14. Do's and Don'ts

### ✅ DO
- Use vibrant, energetic colours
- Embrace playful, character-driven visuals
- Maintain multilingual inclusivity
- Prioritise mobile-first design
- Feature halal certification prominently
- Use high-quality, bright product photography
- Keep layouts clean and uncluttered
- Test in both LTR and RTL directions

### ❌ DON'T
- Use dull, muted colours
- Take the brand too seriously or formally
- Neglect Arabic/Kurdish translations
- Use low-resolution images
- Hide or minimise halal certification
- Overcomplicate designs
- Use harsh, aggressive imagery
- Forget accessibility standards

---

## 15. Contact & Resources

### Brand Guardians
- **Email**: branding@danadanachips.com
- **Wholesale**: wholesale@danadanachips.com

### Asset Library
- **Logo Files**: `/public/Logo.jpg`
- **Product Images**: `/public/*.jpg` (see file list)
- **Component Library**: `/components/ui/` (React components)

### External Resources
- **Fonts**: Google Fonts (Bungee, Inter)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **CMS**: Sanity Studio at `/studio`

---

## 16. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | October 2024 | Initial brand guidelines based on logo and product imagery |

---

**Last Updated**: October 29, 2025  
**Document Owner**: Dana Dana Marketing Team

---

*For questions, clarifications, or requests for brand assets, please contact branding@danadanachips.com*

