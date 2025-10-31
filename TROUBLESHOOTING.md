# Next.js Static Export & Next-Intl Compatibility Issue

## Issue Summary

When using `next-intl` with `output: 'export'` in Next.js config, the application fails to render locale routes, resulting in 404 or 500 errors.

## Symptoms

- Homepage returns 404 or 500 errors
- Locale routes (`/ckb/`, `/en/`, `/ar/`) fail to load
- Error messages indicating:
  - `Route /[locale] with dynamic = "error" couldn't be rendered statically because it used headers()`
  - `NEXT_HTTP_ERROR_FALLBACK;404`
- Translations not loading properly

## Root Cause

The conflict occurs because:

1. **Static Export Limitation**: `output: 'export'` in `next.config.ts` forces Next.js to generate static HTML files at build time
2. **Next-Intl Requirement**: `next-intl` uses server-side functions like `getMessages()` and `getTranslations()` which internally use `headers()` to access request context
3. **Incompatibility**: `headers()` cannot be used during static export because there's no server context at build time

## Technical Details

### Why It Happens

- `next-intl`'s `getMessages()` and `getTranslations()` functions need access to HTTP headers to determine the locale
- These functions are called during server-side rendering in locale layouts and pages
- `output: 'export'` tries to pre-render everything statically, but `headers()` requires a runtime server

### Error Flow

1. Next.js tries to statically render `/ckb/` route
2. Locale layout calls `getMessages()` which uses `headers()`
3. Next.js throws error: "couldn't be rendered statically because it used headers()"
4. Route fails with 404/500 error

## Solution

### Primary Fix: Conditional Static Export

Make `output: 'export'` conditional so it only applies in production/CI environments:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // Only use static export in production/CI
  ...(process.env.NODE_ENV === 'production' || isCI
    ? { output: 'export' }
    : {}),
  trailingSlash: true,
  // ... rest of config
};
```

### Required Dynamic Rendering Configuration

Set routes to use dynamic rendering:

```typescript
// app/[locale]/layout.tsx
export const dynamic = 'force-dynamic';

// app/[locale]/page.tsx
export const dynamic = 'force-dynamic';
```

### Additional Required Fixes

1. **Root Layout**: Must include `<html>` and `<body>` tags (Next.js requirement)
2. **Locale Layout**: Should not nest HTML tags; use script to set `lang`/`dir` attributes
3. **getMessages()**: Should be called without locale parameter (auto-resolved from context)
4. **Root Redirect**: Create a root page that redirects to default locale

## Implementation Checklist

- [ ] Set `output: 'export'` conditionally (production/CI only)
- [ ] Add `export const dynamic = 'force-dynamic'` to locale layout
- [ ] Add `export const dynamic = 'force-dynamic'` to locale pages
- [ ] Ensure root layout has `<html>` and `<body>` tags
- [ ] Verify locale layout doesn't nest HTML tags
- [ ] Create root redirect page if needed
- [ ] Test in development mode (should work without export)
- [ ] Test production build (export should work if using static data)

## Testing

### Development Mode
```bash
npm run dev
# Should work correctly - routes render dynamically
```

### Production Build
```bash
npm run build
# If output: 'export' is enabled, ensure all data is static
# If using dynamic features, keep export disabled
```

## Alternative Solutions

### Option 1: Remove Static Export (Recommended for Development)

If you need server-side features, remove `output: 'export'` entirely:

```typescript
const nextConfig: NextConfig = {
  // Remove output: 'export'
  trailingSlash: true,
  // ... rest of config
};
```

### Option 2: Use Static Data Only

If you must use `output: 'export'`:
- Pre-generate all translations at build time
- Use `generateStaticParams()` for all dynamic routes
- Ensure no server-side functions are called during render
- Use client-side data fetching instead

### Option 3: Hybrid Approach

- Use static export for production builds
- Keep dynamic rendering for development
- Pre-generate all locale routes at build time

## Prevention Guidelines

### ✅ DO

- Use conditional `output: 'export'` based on environment
- Set `dynamic = 'force-dynamic'` for routes using next-intl server functions
- Test both development and production builds
- Verify locale routing works before deploying

### ❌ DON'T

- Don't use `output: 'export'` with `dynamic = 'force-static'` and next-intl
- Don't call `getMessages({ locale })` with explicit locale (let it auto-resolve)
- Don't nest `<html>` and `<body>` tags in layouts
- Don't assume static export works with all server-side features

## Related Files

- `next.config.ts` - Configuration with conditional export
- `app/[locale]/layout.tsx` - Locale layout with dynamic rendering
- `app/[locale]/page.tsx` - Locale pages with dynamic rendering
- `middleware.ts` - Next-intl middleware configuration
- `i18n.ts` - Next-intl request configuration

## References

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Next-Intl Server Components](https://next-intl-docs.vercel.app/docs/getting-started/app-router/server-components)
- [Next.js Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)

## Date Documented

October 31, 2025

## Resolution Status

✅ Resolved - Conditional static export + dynamic rendering configuration

