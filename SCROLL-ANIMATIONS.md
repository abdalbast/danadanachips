# Progressive Scroll Experience Documentation

This document explains the scroll animation system implemented in the Dana Dana Chips website.

## Overview

The scroll animation system provides:
- ✨ Smooth scrolling with inertia (via Lenis)
- 🎯 Section reveals on scroll entry
- 📌 Pinned sections with content progression
- 🌊 Parallax effects for depth
- ✍️ Split text typography animations
- 🎴 Organic card/grid animations
- ⚡ GPU-optimised performance
- ♿ Full accessibility support

## Components

### 1. SmoothScrollProvider

Wraps your application to enable smooth scrolling.

```tsx
import { SmoothScrollProvider } from '@/components/scroll';

export default function Layout({ children }) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}
```

**Features:**
- Smooth inertia scrolling at 1.2 damping
- Respects native wheel/trackpad behaviour
- Automatically disabled with `prefers-reduced-motion`

### 2. RevealSection

Animates sections as they enter the viewport.

```tsx
import { RevealSection } from '@/components/scroll';

<RevealSection delay={0.2}>
  <h2>This content will fade and slide up</h2>
</RevealSection>
```

**Props:**
- `delay`: Number - Animation delay in seconds (default: 0)
- `threshold`: Number - Viewport intersection threshold (default: 0.2)
- `once`: Boolean - Animate only once (default: true)

**Behaviour:**
- Triggers when section is 15-25% from bottom of viewport
- Animates only once (no replay on reverse scroll)
- Y-axis slide: 40px → 0
- Duration: 0.7s with custom easing

### 3. StaggerChildren & StaggerItem

Create staggered animations for lists or grids.

```tsx
import { StaggerChildren, StaggerItem } from '@/components/scroll';

<StaggerChildren staggerDelay={0.1}>
  <StaggerItem>
    <Card>Item 1</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>Item 2</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>Item 3</Card>
  </StaggerItem>
</StaggerChildren>
```

**Props:**
- `staggerDelay`: Number - Delay between children (default: 0.1s)
- `childDelay`: Number - Initial delay before first child (default: 0)

**Stagger timing:** 80-150ms between items

### 4. PinnedSection

Pin a section whilst scrolling through it.

```tsx
import { PinnedSection, PinnedContent } from '@/components/scroll';
import { useIsMobile } from '@/lib/hooks/use-media-query';

function HeroSection() {
  const isMobile = useIsMobile();
  
  return (
    <PinnedSection pinDuration={1.8} isMobile={isMobile}>
      {({ scrollYProgress }) => (
        <>
          <PinnedContent 
            scrollYProgress={scrollYProgress}
            startProgress={0}
            endProgress={0.5}
          >
            <h1>First Content</h1>
          </PinnedContent>
          
          <PinnedContent 
            scrollYProgress={scrollYProgress}
            startProgress={0.5}
            endProgress={1}
          >
            <h1>Second Content</h1>
          </PinnedContent>
        </>
      )}
    </PinnedSection>
  );
}
```

**Props:**
- `pinDuration`: Number - Height multiplier (e.g., 1.8 = 180vh) (default: 1.8)
- `isMobile`: Boolean - Reduces duration on mobile (default: false)

**Behaviour:**
- Pins section for 60-90% of viewport scroll
- Advances inner content whilst section stays fixed
- Automatically reduces duration under 768px
- Provides scroll progress for custom animations

### 5. ParallaxElement

Create parallax scrolling effects.

```tsx
import { ParallaxElement, ParallaxImage, ParallaxBackground } from '@/components/scroll';
import { useIsMobile } from '@/lib/hooks/use-media-query';

function Section() {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Foreground parallax (6-12% Y movement) */}
      <ParallaxElement speed={0.12} type="foreground" isMobile={isMobile}>
        <img src="/hero.jpg" alt="Hero" />
      </ParallaxElement>
      
      {/* Background parallax (12-18% Y movement) */}
      <ParallaxBackground speed={0.15} isMobile={isMobile}>
        <div className="bg-gradient-to-b from-flame to-zesty" />
      </ParallaxBackground>
      
      {/* Convenience component */}
      <ParallaxImage 
        src="/product.jpg" 
        alt="Product" 
        speed={0.1}
        isMobile={isMobile}
      />
    </>
  );
}
```

**Props:**
- `speed`: Number - Parallax multiplier (default: 0.1)
- `direction`: 'up' | 'down' - Movement direction (default: 'up')
- `type`: 'foreground' | 'background' - Effect strength
- `isMobile`: Boolean - Reduces to 4-6% on mobile

**Behaviour:**
- Foreground: Translates 6-12% on Y-axis, scales 0.98→1.0
- Background: Translates 12-18% on Y-axis
- Clamped to 4-6% on mobile (<768px)
- Disabled with `prefers-reduced-motion`

### 6. SplitText & SplitWords

Animate typography by lines or words.

```tsx
import { SplitText, SplitWords } from '@/components/scroll';

// Animate by lines
<SplitText 
  as="h1" 
  className="font-display text-5xl font-black"
  delay={0.2}
  stagger={0.1}
>
  {`First line of text
Second line of text
Third line of text`}
</SplitText>

// Animate by words
<SplitWords 
  as="p"
  delay={0.3}
  stagger={0.03}
>
  This sentence will animate word by word
</SplitWords>
```

**Props:**
- `as`: HTML element type (default: 'p')
- `delay`: Number - Initial delay (default: 0)
- `stagger`: Number - Delay between lines/words

**Behaviour:**
- **Lines:** Animate from Y: 28px, stagger: 0.08-0.12s
- **Words:** Animate from Y: 24px, stagger: 0.03s
- Duration: 0.6-0.8s with power2.out easing
- Opacity: 0 → 1

### 7. AnimatedCard & AnimatedGrid

Organic card animations with random jitter.

```tsx
import { AnimatedCard, AnimatedGrid, GridItem } from '@/components/scroll';

// Individual cards
<AnimatedCard index={0} delay={0.1}>
  <ProductCard product={product1} />
</AnimatedCard>

// Grid with automatic stagger
<AnimatedGrid columns={3}>
  <GridItem>
    <ProductCard product={product1} />
  </GridItem>
  <GridItem>
    <ProductCard product={product2} />
  </GridItem>
  <GridItem>
    <ProductCard product={product3} />
  </GridItem>
</AnimatedGrid>
```

**Props (AnimatedCard):**
- `index`: Number - Card position for stagger calculation
- `delay`: Number - Base delay before animation

**Behaviour:**
- Fade and slide up from Y: 32px
- Random jitter: ±40ms for organic feel
- Base stagger: 80ms between cards
- GPU-optimised with `translateZ(0)`

## Accessibility

All animations respect accessibility preferences:

### prefers-reduced-motion

When users have reduced motion enabled:
- Smooth scrolling disabled (falls back to native)
- Parallax effects disabled
- All animations replaced with instant fades
- Duration: 0.01ms (essentially instant)

### Focus States

- All interactive elements maintain visible focus states
- No scroll hijacking or trap
- Native keyboard navigation preserved

## Performance Optimisations

### CSS

```css
/* Applied automatically via globals.css */
[data-animated="true"] {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### JavaScript

- GPU-friendly transforms only (translate, scale, rotate)
- Throttled scroll observers via Framer Motion
- Lazy-loaded media via browser native loading
- `content-visibility: auto` on images

### Best Practices

1. **Add `data-animated="true"` to animated containers:**
   ```tsx
   <div data-animated="true">
     <AnimatedCard>...</AnimatedCard>
   </div>
   ```

2. **Use intersection observers, not scroll listeners**
   - All components use `useInView` from Framer Motion
   - Automatically throttled and optimised

3. **Lazy load images:**
   ```tsx
   <img src="/product.jpg" loading="lazy" alt="Product" />
   ```

## Responsive Behaviour

### Mobile (<768px)

- Pin durations reduced (max 1.4x viewport height)
- Parallax strength reduced to 4-6%
- Multi-column staggers collapse to single-column
- Faster animations (slight duration reduction)

### Tablet (768px - 1024px)

- Moderate parallax effects (8-10%)
- Standard pin durations
- Grid animations maintained

### Desktop (>1024px)

- Full parallax effects (12-18%)
- Extended pin durations (up to 2x viewport height)
- Rich multi-layer animations

## Usage Examples

### Example 1: Hero Section

```tsx
import { RevealSection, SplitText } from '@/components/scroll';

export function Hero() {
  return (
    <RevealSection className="min-h-screen flex items-center justify-center">
      <SplitText 
        as="h1" 
        className="font-display text-7xl font-black text-center"
        stagger={0.1}
      >
        {`Taste the Pop
Love the Crunch`}
      </SplitText>
    </RevealSection>
  );
}
```

### Example 2: Product Grid

```tsx
import { AnimatedGrid, GridItem } from '@/components/scroll';

export function ProductGrid({ products }) {
  return (
    <AnimatedGrid columns={3} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <GridItem key={product.id}>
          <ProductCard product={product} />
        </GridItem>
      ))}
    </AnimatedGrid>
  );
}
```

### Example 3: Parallax Hero

```tsx
import { ParallaxBackground, RevealSection } from '@/components/scroll';
import { useIsMobile } from '@/lib/hooks/use-media-query';

export function ParallaxHero() {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      <ParallaxBackground speed={0.15} isMobile={isMobile}>
        <div className="absolute inset-0 bg-gradient-to-br from-flame to-zesty opacity-20" />
      </ParallaxBackground>
      
      <RevealSection className="relative z-10 flex items-center justify-center min-h-screen">
        <h1>Content on top</h1>
      </RevealSection>
    </section>
  );
}
```

## Testing

### Test Reduced Motion

```bash
# Mac: System Preferences → Accessibility → Display → Reduce motion
# Windows: Settings → Ease of Access → Display → Show animations
# Or via DevTools:
```

In Chrome DevTools:
1. Open Command Menu (Cmd/Ctrl + Shift + P)
2. Type "reduced motion"
3. Select "Emulate CSS prefers-reduced-motion"

### Test Performance

1. Open Chrome DevTools Performance tab
2. Record while scrolling
3. Check for:
   - FPS staying above 60
   - No long tasks (>50ms)
   - Low CPU usage during scroll

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Opera: Full support

## Troubleshooting

### Animations not triggering

- Check that component is wrapped in `SmoothScrollProvider`
- Verify section has enough content to scroll
- Check `margin` prop for intersection observer

### Janky scroll performance

- Add `data-animated="true"` to containers
- Reduce parallax speed values
- Check for heavy JavaScript on scroll
- Profile with DevTools Performance tab

### Reduced motion not working

- Clear browser cache
- Check OS-level setting
- Verify media query: `(prefers-reduced-motion: reduce)`

---

Built with ❤️ using Framer Motion & Lenis

