# TrustD Solutions - Quick Start Guide

## What's New

The TrustD Solutions website has been completely restructured with:

✅ **5 Core Pages** - Homepage, Services, About, Contact, Case Studies
✅ **7 Lightweight Shortcodes** - Reusable components for consistent design
✅ **3 New Case Studies** - Healthtech, Fintech, Insuretech examples
✅ **Complete SEO Setup** - Open Graph, JSON-LD, meta tags
✅ **Mobile-Responsive CSS** - All new components work on any device

---

## Quick Commands

```bash
# Start development server
hugo server -D

# Build for production
hugo --gc --minify

# Output goes to: public/
```

---

## New Shortcodes - Quick Reference

### Hero Section
```markdown
{{< hero
  title="Main Headline"
  subtitle="Supporting text"
  primary_text="Primary Button" primary_href="/contact/"
  secondary_text="Secondary Button" secondary_href="/services/"
>}}
```

### Content Section
```markdown
{{< section title="Section Title" >}}
Your content here...
{{< /section >}}

<!-- Centered version -->
{{< section title="Centered Title" center=true >}}
Centered content...
{{< /section >}}
```

### Card (for grids)
```markdown
<div class="card-grid">
  {{< card title="Card 1" >}}Content{{< /card >}}
  {{< card title="Card 2" >}}Content{{< /card >}}
  {{< card title="Card 3" >}}Content{{< /card >}}
</div>
```

### Engineering Pods Table
```markdown
{{< pods-table >}}
```
Shows Launch Pod, Scale Pod, Ops Pod with pricing.

### Process Steps
```markdown
{{< steps
  items="Step 1|Step 2|Step 3|Step 4"
  notes="Note 1|Note 2|Note 3|Note 4"
>}}
```

### CTA Button
```markdown
{{< cta text="Button Text" href="/contact/" >}}
```

### Case Study List (auto-generates)
```markdown
{{< casestudy-list >}}
```

---

## Page Structure

### Homepage (`content/_index.md`)
- Hero with embedded teams messaging
- Service cards (DevOps, Software, QA, Data)
- Why choose TrustD
- Engineering pods pricing
- Process steps
- CTAs throughout

### Services (`content/services/_index.md`)
- Individual service sections with descriptions
- CTAs per service
- Pods table
- Final conversion section

### About (`content/about.md`)
- Mission, story, model
- How we work
- Leadership bios
- Company values table

### Contact (`content/contact.md`)
- Process explanation
- Comprehensive form with:
  - Name, email, company
  - Service type dropdown
  - Message textarea
  - Timeline selector
- Email fallback

### Case Studies (`content/case-studies/`)
- Index page with metrics table
- 3 case studies: healthtech-devops, fintech-pod, insuretech-modernization
- Auto-listing via shortcode

---

## To-Do Before Launch

1. **Create OG Image**
   - Location: `static/img/og-default.jpg`
   - Size: 1200x630px
   - Add TrustD branding

2. **Configure Contact Form**
   - Netlify Forms: Already set up (deploy to Netlify)
   - OR Formspree: Replace action URL in `contact.md`

3. **Update About Page**
   - Add real partner name and bio
   - Replace `[Partner Name]` placeholder

4. **Verify Email**
   - Confirm `hello@trustd.solutions` is correct
   - Update in contact.md and head.html if needed

5. **Test Build**
   ```bash
   hugo server -D
   # Visit http://localhost:1313
   # Check all pages load
   # Test navigation
   # Verify shortcodes render
   ```

---

## File Locations

### Content Files
```
content/_index.md              → Homepage
content/about.md               → About page
content/contact.md             → Contact page
content/services/_index.md     → Services page
content/case-studies/_index.md → Case studies index
content/case-studies/*.md      → Individual case studies
```

### Shortcodes
```
layouts/shortcodes/hero.html
layouts/shortcodes/section.html
layouts/shortcodes/card.html
layouts/shortcodes/pods-table.html
layouts/shortcodes/steps.html
layouts/shortcodes/cta.html
layouts/shortcodes/casestudy-list.html
```

### Styles
```
static/assets/css/custom.css   → All shortcode styles
static/assets/css/style.css    → Original theme styles
```

### Config
```
config.toml                    → Site config, menus, params
layouts/partials/head.html     → SEO meta tags, OG, JSON-LD
```

---

## Adding a New Case Study

1. Create file: `content/case-studies/your-project.md`

2. Use this template:
```markdown
---
title: "Project Title"
client_type: "Industry/Company Stage"
engagement: "Team composition or role"
summary: "One-line outcome summary."
images: ["/img/og-default.jpg"]
---

**Challenge**
Describe the problem...

**What We Did**
- Bullet point
- Bullet point
- Bullet point

**Outcome**
- Result 1
- Result 2
- Result 3
```

3. It will automatically appear in the case studies grid.

---

## SEO Features

✅ Dynamic page titles: "Page Title | TrustD Solutions"
✅ Meta descriptions from frontmatter
✅ Open Graph tags for social sharing
✅ JSON-LD Organization schema
✅ Default OG image fallback
✅ robots.txt enabled

Test with:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Customization

### Change Primary Color
Edit `static/assets/css/custom.css`:
```css
:root {
  --primary-color: #your-color;
  --primary-dark: #your-darker-color;
}
```

### Update Pods Pricing
Edit `layouts/shortcodes/pods-table.html`

### Modify Navigation
Edit `config.toml` menu section

### Change Default Description
Edit `config.toml` params.description

---

## Troubleshooting

**Shortcode not rendering?**
- Check for typos in shortcode name
- Ensure closing `{{< /section >}}` tags match
- Verify quote types (use straight quotes, not curly)

**Form not submitting?**
- For Netlify: Ensure deployed to Netlify
- For Formspree: Update action URL with your endpoint
- Check browser console for errors

**CSS not loading?**
- Verify `custom.css` exists in `static/assets/css/`
- Check `layouts/partials/head.html` includes the CSS link
- Clear browser cache

**Case studies not showing?**
- Verify files are in `content/case-studies/` directory
- Check frontmatter has `title` and `summary`
- Ensure files have `.md` extension

---

## Support

📖 Full details: See `IMPLEMENTATION.md`
🏗️ Hugo docs: https://gohugo.io/documentation/
💬 Questions: Review shortcode implementations in `layouts/shortcodes/`
