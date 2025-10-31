# GitHub Pages Deployment Guide

## Overview
Your Dana Dana Chips website is now configured to automatically deploy to GitHub Pages using GitHub Actions.

## What's Been Set Up

### 1. GitHub Actions Workflow
- **File:** `.github/workflows/deploy.yml`
- **Triggers:** Automatically runs on pushes to `main` or `master` branch
- **Process:**
  - Builds the Next.js static site
  - Configures the correct `basePath` for GitHub Pages
  - Uploads the build to GitHub Pages
  - Deploys automatically

### 2. Static Export Configuration
- **File:** `next.config.ts`
- Static export enabled with `output: 'export'`
- Dynamic `basePath` detection (only applies in CI environment)
- Trailing slashes enabled for better GitHub Pages compatibility

### 3. Jekyll Bypass
- **File:** `public/.nojekyll`
- Prevents GitHub Pages from processing files with Jekyll
- Ensures `_next` directory is accessible

## Deployment Steps

### Step 1: Commit and Push Changes
```bash
cd dana-dana-chips
git add .
git commit -m "feat: add GitHub Pages deployment workflow"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository: `https://github.com/abdalbast/danadanachips`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Source:** GitHub Actions
4. Save the settings

### Step 3: Trigger Deployment
The workflow will automatically run on your next push, or you can:
1. Go to **Actions** tab in your repository
2. Select "Deploy Next.js to GitHub Pages" workflow
3. Click **Run workflow** → **Run workflow**

### Step 4: Access Your Site
Once deployed, your site will be available at:
- **Main URL:** `https://abdalbast.github.io/danadanachips/`
- **English:** `https://abdalbast.github.io/danadanachips/en/`
- **Arabic:** `https://abdalbast.github.io/danadanachips/ar/`
- **Kurdish:** `https://abdalbast.github.io/danadanachips/ckb/`

## Troubleshooting

### 404 Errors
If you see 404 errors:
1. Verify GitHub Pages is enabled and set to "GitHub Actions"
2. Check that the workflow completed successfully in the Actions tab
3. Ensure the repository name matches (currently set to use `GITHUB_REPOSITORY` env variable)

### Workflow Fails
If the workflow fails:
1. Check the Actions tab for error logs
2. Ensure Node.js 20 is compatible with all dependencies
3. Verify `package-lock.json` is committed

### Routing Issues
The site uses:
- **Default locale:** Kurdish (`ckb`)
- **Middleware:** Automatically redirects `/` to `/ckb/`
- **Locale prefix:** Always included in URLs

### Base Path Issues
If assets aren't loading:
1. The `basePath` is automatically set to `/danadanachips` in CI
2. Check `next.config.ts` ensures `GITHUB_REPOSITORY` is being read correctly
3. Verify images use relative paths or Next.js Image component

## Local Development vs Production

### Local Development
- Run: `npm run dev`
- URL: `http://localhost:3000`
- No `basePath` applied
- Locales: `/en/`, `/ar/`, `/ckb/`

### GitHub Pages Production
- URL: `https://abdalbast.github.io/danadanachips/`
- `basePath`: `/danadanachips`
- Full URLs: `https://abdalbast.github.io/danadanachips/en/`

## Custom Domain (Optional)

To use a custom domain like `www.danadanachips.com`:

1. Add a `CNAME` file to the `public/` directory:
   ```bash
   echo "www.danadanachips.com" > public/CNAME
   ```

2. Configure DNS with your domain provider:
   - Add a `CNAME` record pointing to `abdalbast.github.io`

3. In GitHub Settings → Pages:
   - Add your custom domain
   - Enable "Enforce HTTPS"

4. Update `next.config.ts`:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     trailingSlash: true,
     // Remove basePath for custom domain
     basePath: '',
     assetPrefix: '',
     // ... rest of config
   };
   ```

## Environment Variables

If you need environment variables for production:
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add secrets (e.g., `NEXT_PUBLIC_SANITY_PROJECT_ID`)
3. Reference in workflow:
   ```yaml
   - name: Build with Next.js
     run: npm run build
     env:
       NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
   ```

## Monitoring

- **Build Status:** Check the Actions tab for real-time build logs
- **Deployment Status:** Green checkmark indicates successful deployment
- **Build Time:** Typically 2-5 minutes

## Next Steps

1. ✅ Commit the GitHub Actions workflow
2. ✅ Enable GitHub Pages in repository settings
3. ✅ Push changes to trigger first deployment
4. ⏳ Wait for deployment (check Actions tab)
5. 🎉 Visit your live site!

## Support

If you encounter issues:
- Check GitHub Actions logs for detailed error messages
- Verify all paths are relative (no hardcoded URLs)
- Ensure all dependencies are in `package.json`
- Test the build locally: `npm run build`

