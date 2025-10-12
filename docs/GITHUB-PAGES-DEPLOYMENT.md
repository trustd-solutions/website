# GitHub Pages Deployment Guide

## Overview

The TrustD Solutions website is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `master` branch triggers a build and deployment.

---

## 🚀 Automatic Deployment

### How It Works

1. **Push to master branch**
   ```bash
   git push origin master
   ```

2. **GitHub Actions triggers automatically**
   - Workflow: `.github/workflows/merge-to-master.yaml`
   - Hugo builds the site
   - Deploys to GitHub Pages

3. **Site goes live**
   - Usually takes 1-3 minutes
   - Check Actions tab for build status

---

## ⚙️ Configuration

### GitHub Pages Settings

**Required settings in your repository:**

1. Go to **Settings** → **Pages**
2. **Source:** GitHub Actions
3. **Branch:** Not needed (Actions handles it)
4. **Custom domain:** (Optional) Add `trustd.solutions`

### Workflow Configuration

**File:** `.github/workflows/merge-to-master.yaml`

**Key settings:**
- Hugo Version: `0.128.0`
- Build command: `hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"`
- Output directory: `./public`
- Permissions: `contents: read`, `pages: write`, `id-token: write`

---

## 🔧 Manual Deployment

### Trigger Workflow Manually

1. Go to repository on GitHub
2. Click **Actions** tab
3. Select **"Deploy Hugo site to Pages"** workflow
4. Click **"Run workflow"** button
5. Select branch: `master`
6. Click **"Run workflow"**

### Monitor Deployment

1. **Actions tab** shows workflow runs
2. Click on a workflow run to see:
   - Build logs
   - Deploy status
   - Any errors

---

## 🌐 Custom Domain Setup

### Add Custom Domain

1. **In repository settings:**
   - Settings → Pages → Custom domain
   - Enter: `trustd.solutions`
   - Save

2. **DNS Configuration:**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

3. **Add www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

4. **Update config.toml:**
   ```toml
   baseURL = "https://trustd.solutions/"
   ```

5. **Enable HTTPS:**
   - Settings → Pages → "Enforce HTTPS" ✓

---

## 📋 Pre-Deployment Checklist

### Before Pushing to Master

- [ ] Test locally: `hugo server`
- [ ] Build succeeds: `hugo --gc --minify`
- [ ] No console errors
- [ ] All images load
- [ ] All links work
- [ ] Calendly buttons functional
- [ ] Mobile responsive
- [ ] Check diagnostics: No Hugo errors

### After Deployment

- [ ] Wait for Actions to complete (1-3 min)
- [ ] Visit site URL
- [ ] Test all pages load
- [ ] Click all navigation links
- [ ] Test Calendly popup on multiple pages
- [ ] Check mobile view
- [ ] Verify OG image (share on social media)

---

## 🐛 Troubleshooting

### Build Fails

**Check Actions logs:**
1. Actions tab → Failed workflow
2. Click "build" job
3. Review error messages

**Common issues:**
- **Syntax errors in markdown:** Check shortcode syntax
- **Missing files:** Ensure all referenced files exist
- **Config errors:** Verify `config.toml` syntax

### Site Not Updating

**Possible causes:**
1. **Build failed:** Check Actions tab
2. **Cache issue:** Hard refresh browser (Cmd/Ctrl + Shift + R)
3. **DNS not propagated:** Wait 24-48 hours for custom domain
4. **Wrong branch:** Ensure pushed to `master`

### 404 Errors

**If pages show 404:**
1. Check file exists in `content/` directory
2. Verify frontmatter is correct
3. Ensure no typos in URLs
4. Check `config.toml` baseURL setting

### Custom Domain Not Working

**Steps to fix:**
1. Verify DNS records are correct
2. Wait for DNS propagation (24-48 hours)
3. Check GitHub Pages settings
4. Ensure HTTPS is enabled
5. Clear browser cache

---

## 📊 Monitoring

### Check Build Status

**GitHub Actions Badge:**
Add to README.md:
```markdown
![Deploy Status](https://github.com/yourusername/repo/actions/workflows/merge-to-master.yaml/badge.svg)
```

### Analytics

**Recommended tools:**
- Google Analytics
- Plausible Analytics
- GitHub traffic (Insights → Traffic)

---

## 🔄 Workflow Details

### Build Job

1. **Install Hugo CLI** (v0.128.0)
2. **Install Dart Sass**
3. **Checkout code** (with submodules)
4. **Setup Pages** (get base URL)
5. **Install dependencies** (if package-lock.json exists)
6. **Build with Hugo**
   - Environment: production
   - Minify: enabled
   - Base URL: from Pages config
7. **Upload artifact** (./public directory)

### Deploy Job

1. **Wait for build** to complete
2. **Deploy to GitHub Pages**
3. **Set environment URL**

---

## 🚦 Deployment Environments

### Development
- **Branch:** Any feature branch
- **Test locally:** `hugo server`
- **URL:** http://localhost:1313

### Staging (Optional)
- **Branch:** `develop` or `staging`
- **Can add separate workflow** for staging deploys
- **URL:** Could use separate GitHub Pages site

### Production
- **Branch:** `master`
- **Auto-deploys** on push
- **URL:** https://trustd.solutions (or yourusername.github.io)

---

## 📝 Workflow Customization

### Change Hugo Version

Edit `.github/workflows/merge-to-master.yaml`:
```yaml
env:
  HUGO_VERSION: 0.150.1  # Change version here
```

### Add Build Steps

Add after "Install Node.js dependencies":
```yaml
- name: Custom build step
  run: |
    # Your commands here
```

### Notify on Deploy

Add after deploy job:
```yaml
- name: Notify on success
  if: success()
  run: |
    # Send notification (Slack, email, etc.)
```

---

## 🔐 Security

### Permissions

**Workflow uses minimal permissions:**
- `contents: read` - Read repository code
- `pages: write` - Deploy to Pages
- `id-token: write` - OIDC authentication

### Secrets

**No secrets needed for basic deployment.**

**If adding integrations:**
1. Settings → Secrets and variables → Actions
2. Add required secrets
3. Reference in workflow: `${{ secrets.SECRET_NAME }}`

---

## 📈 Performance

### Build Time

**Typical build:** 30-60 seconds
- Hugo build: ~5-10 seconds
- Upload/deploy: ~20-40 seconds

**Optimization tips:**
- Use `hugo --gc` to clean cache
- Minify assets: `hugo --minify`
- Optimize images before committing

### Site Performance

**GitHub Pages benefits:**
- Global CDN
- Free HTTPS
- Fast static serving
- Automatic caching

---

## 🎯 Best Practices

### Git Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-page
   ```

2. **Make changes and test**
   ```bash
   hugo server
   ```

3. **Commit changes**
   ```bash
   git add .
   git commit -m "Add new page"
   ```

4. **Push to feature branch**
   ```bash
   git push origin feature/new-page
   ```

5. **Create Pull Request**
   - Review changes
   - Test in PR preview (if configured)
   - Merge to master

6. **Auto-deploys to production**

### Content Updates

**For quick content changes:**
1. Edit markdown files
2. Commit to master
3. Push - auto-deploys

**For major changes:**
1. Use feature branch
2. Test thoroughly
3. PR review
4. Merge to master

---

## 🆘 Support Resources

- **GitHub Pages docs:** https://docs.github.com/en/pages
- **Hugo docs:** https://gohugo.io/documentation/
- **GitHub Actions docs:** https://docs.github.com/en/actions
- **Workflow file:** `.github/workflows/merge-to-master.yaml`

---

## ✅ Quick Reference

### Deploy Site
```bash
git add .
git commit -m "Update site"
git push origin master
# Auto-deploys in 1-3 minutes
```

### Check Status
- GitHub → Actions tab
- Watch workflow run
- Green checkmark = success

### Rollback
```bash
git revert HEAD
git push origin master
# Previous version auto-deploys
```

---

**Last Updated:** 2025-01-12  
**Deployment Method:** GitHub Pages + GitHub Actions  
**Status:** Production Ready