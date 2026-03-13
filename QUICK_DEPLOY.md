# 🚀 Quick Deployment Commands

## Step 1: Test Build Locally

```bash
# Navigate to project
cd d:\COURSES\2025\ \&\ 2026\SEM\ TWO\WEB\ TECHNOLOGY\Projects\mid-term\umukomisiyoneri\umukomisiyoneri

# Install dependencies (if not done)
npm install

# Build the project
npm run build

# Preview the build
npm run preview
```

Then visit: http://localhost:4173

## Step 2: Push to GitHub

```bash
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Add Netlify configuration files for deployment"

# Push to GitHub
git push origin main
```

## Step 3: Redeploy on Netlify

Option A: **Automatic** (if GitHub connected)
- Just wait 2-3 minutes after push
- Netlify will auto-build and deploy

Option B: **Manual Trigger**
1. Go to https://app.netlify.com
2. Click your site: **umukomisiyoneri**
3. Click **Deploys** tab
4. Click **Trigger deploy** → **Deploy site**

## Step 4: Verify Deployment

```bash
# Visit your live site
https://umukomisiyoneri.netlify.app

# Check if it loads
# Test navigation
# Open DevTools (F12) to check for errors
```

## Troubleshooting Commands

```bash
# If build fails locally, check for errors
npm run build

# Clear node_modules and reinstall
rm -r node_modules
npm install

# Check if dist folder exists
dir dist

# Check git status
git status

# View recent commits
git log --oneline -5
```

## Files That Were Added

```
netlify.toml          ← Main Netlify config
public/_redirects     ← Routing config
vite.config.js        ← Updated (build optimization)
```

## Expected Output

After `npm run build`:
```
✓ 1234 modules transformed
dist/index.html                    12.5 kB
dist/assets/main-abc123.js        456.7 kB
dist/assets/style-def456.css       89.2 kB
```

After deployment on Netlify:
```
✓ Build complete
✓ Deploy successful
✓ Site live at: https://umukomisiyoneri.netlify.app
```

## Common Issues & Fixes

### Issue: "dist folder not found"
```bash
# Solution: Run build first
npm run build
```

### Issue: "Module not found"
```bash
# Solution: Reinstall dependencies
npm install
```

### Issue: "Port 4173 already in use"
```bash
# Solution: Kill process or use different port
npm run preview -- --port 4174
```

### Issue: Git push fails
```bash
# Solution: Pull latest changes first
git pull origin main
git push origin main
```

## Deployment Timeline

| Step | Time | Action |
|------|------|--------|
| 1 | 1 min | Run `npm run build` |
| 2 | 1 min | Run `git push` |
| 3 | 2-3 min | Netlify builds |
| 4 | 1 min | Verify deployment |
| **Total** | **~5-7 min** | **Live!** |

## Success Checklist

- [ ] `npm run build` completes without errors
- [ ] `dist` folder created with files
- [ ] `git push` succeeds
- [ ] Netlify shows green checkmark
- [ ] Site loads at netlify.app URL
- [ ] Navigation works (no 404 errors)
- [ ] All features work (login, booking, etc.)

## Need Help?

1. **Check Netlify Logs**: https://app.netlify.com → Your Site → Deploys → View deploy log
2. **Check GitHub**: https://github.com/gabinniyonizeye/umukomosoiyoneri-rental_connection_platform-
3. **Local Testing**: Run `npm run preview` to test locally first

---

**Ready to deploy?** Run these commands in order:
```bash
npm run build
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

Then wait 2-3 minutes and visit: https://umukomisiyoneri.netlify.app 🎉
