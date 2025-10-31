# GitHub Pages Deployment

## Overview

This document explains how the GitHub Pages deployment works and how to configure it.

## How It Works

### 1. GitHub Actions Workflow

The `.github/workflows/deploy.yml` workflow automatically:
- Builds the Next.js app with static export enabled
- Sets environment variables for GitHub Pages (`GITHUB_ACTIONS=true`, `NODE_ENV=production`)
- Configures the correct `basePath` based on repository name
- Deploys the static files to GitHub Pages

### 2. Configuration

#### `next.config.ts`
- Conditionally enables `output: 'export'` when `GITHUB_ACTIONS=true`
- Automatically sets `basePath` and `assetPrefix` based on repository name
- Only applies in CI environment, so local development works normally

#### `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`
- Uses conditional dynamic rendering:
  - `force-static` during GitHub Actions build (for static export)
  - `force-dynamic` during local development (allows server-side features)
- Uses `generateStaticParams()` to pre-generate all locale routes

#### `i18n.ts`
- Handles locale resolution during static generation
- Falls back to default locale if `requestLocale` is undefined (during build)

### 3. Static Generation Process

During GitHub Actions build:
1. `generateStaticParams()` provides all locales: `['en', 'ar', 'ckb']`
2. Next.js pre-generates routes for each locale: `/en/`, `/ar/`, `/ckb/`
3. `getMessages({ locale })` is called with explicit locale from params
4. Static HTML files are generated in `out/` directory
5. Files are deployed to GitHub Pages

## Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Source:** GitHub Actions
4. Save the settings

### Step 2: Push Changes

The workflow automatically runs on push to `main` or `master` branch:

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### Step 3: Verify Deployment

1. Go to **Actions** tab in your repository
2. Wait for the workflow to complete (green checkmark)
3. Visit your site at: `https://<username>.github.io/<repository-name>/`

## Troubleshooting

### Build Fails with "headers()" Error

**Cause:** `getMessages()` is trying to use headers during static generation.

**Solution:** Ensure `getMessages({ locale })` is called with explicit locale parameter:
```typescript
const messages = await getMessages({ locale });
```

### Routes Return 404

**Cause:** `generateStaticParams()` might not be returning all locales.

**Solution:** Verify `generateStaticParams()` returns all locales:
```typescript
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
```

### Assets Not Loading

**Cause:** Incorrect `basePath` configuration.

**Solution:** Ensure `GITHUB_REPOSITORY` environment variable is set in workflow:
```yaml
env:
  GITHUB_REPOSITORY: ${{ github.repository }}
```

### Development Mode Breaks

**Cause:** Static export enabled in development.

**Solution:** Configuration already handles this - static export only enabled when `GITHUB_ACTIONS=true`.

## Environment Variables

The workflow automatically sets:
- `NODE_ENV=production`
- `GITHUB_ACTIONS=true`
- `GITHUB_REPOSITORY=${{ github.repository }}`

These are used by `next.config.ts` to:
- Enable static export
- Set correct basePath
- Configure asset paths

## Custom Domain

To use a custom domain:

1. Add `CNAME` file to `public/` directory:
   ```bash
   echo "www.yourdomain.com" > public/CNAME
   ```

2. Configure DNS:
   - Add CNAME record pointing to `<username>.github.io`

3. Update `next.config.ts` to disable basePath for custom domain:
   ```typescript
   // Only set basePath for GitHub Pages project pages
   ...(isCI && repo && !process.env.CUSTOM_DOMAIN
     ? {
         basePath: `/${repo}`,
         assetPrefix: `/${repo}/`,
       }
     : {}),
   ```

4. In GitHub Pages settings, add your custom domain

## Notes

- Static export means no server-side features (API routes, middleware at runtime)
- All routes are pre-generated at build time
- Middleware redirects won't work - use client-side redirects or static redirects
- Images must be optimized and included in the build output

## References

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions for Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)
- [Next-Intl Static Generation](https://next-intl-docs.vercel.app/docs/usage/static-rendering)
