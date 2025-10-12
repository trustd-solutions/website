# TrustD Solutions Website

Modern, conversion-optimized website for TrustD Solutions - embedded engineering teams for fast-moving startups.

---

## 🚀 Quick Start

### Development
```bash
# Run development server
hugo server

# Run with drafts
hugo server -D

# Bind to network (access from other devices)
hugo server --port 1313 --bind 0.0.0.0
```

### Production Build
```bash
# Build optimized site
hugo --gc --minify

# Output directory: public/
```

---

## 📁 Project Structure

```
website/
├── archetypes/         # Content templates
├── content/            # Markdown content files
│   ├── _index.md       # Homepage
│   ├── about.md        # About page
│   ├── contact.md      # Contact page
│   ├── services/       # Services section
│   └── case-studies/   # Case studies section
├── layouts/            # HTML templates
│   ├── _default/       # Default layouts
│   ├── partials/       # Reusable components
│   └── shortcodes/     # Custom shortcodes
├── static/             # Static assets (CSS, JS, images)
│   ├── assets/         # Site assets
│   └── img/            # Images (including OG image)
├── docs/               # 📚 Complete documentation
├── public/             # Generated site (git-ignored)
└── config.toml         # Hugo configuration
```

---

## 📚 Documentation

**All documentation is in the [`docs/`](docs/) directory.**

### Quick Links
- **[Quick Start Guide](docs/QUICKSTART.md)** - Commands and shortcode reference
- **[Launch Checklist](docs/LAUNCH-READY.md)** - Deployment guide
- **[Implementation Guide](docs/IMPLEMENTATION.md)** - Technical details

### Full Documentation Index
See [docs/README.md](docs/README.md) for a complete list of all documentation files.

---

## 🎯 Site Features

- **5 Main Pages** - Homepage, Services, About, Contact, Case Studies
- **7 Custom Shortcodes** - Reusable components for consistent design
- **12+ Calendly CTAs** - Optimized for conversions
- **SEO Optimized** - Meta tags, Open Graph, JSON-LD
- **Mobile Responsive** - Mobile-first design
- **Fast Performance** - Static site generation

---

## 🛠️ Tech Stack

- **Hugo** v0.150.1+ (Static Site Generator)
- **Bootstrap 5** (CSS Framework)
- **Calendly** (Meeting Scheduler Integration)
- **HTML/CSS/JavaScript** (No build tools required)

---

## 📦 Key Components

### Shortcodes
- `hero` - Page headers with scroll indicator
- `section` - Content wrappers
- `card` - Feature/service cards
- `pods-table` - Engineering pods pricing
- `steps` - Numbered process flows
- `calendlycta` - Calendly popup buttons

### Pages
- **Homepage** - Embedded teams value proposition
- **Services** - DevOps, Software, QA, Data services
- **About** - Mission, team, values
- **Contact** - Calendly-focused booking
- **Case Studies** - Client success stories

---

## 🚢 Deployment

### GitHub Pages (Automated)

**Deployment is automatic via GitHub Actions:**
1. Push to `master` branch
2. GitHub Actions builds and deploys automatically
3. Site goes live at your GitHub Pages URL

**Workflow file:** `.github/workflows/merge-to-master.yaml`

**Manual deployment:**
- Repository → Actions → "Deploy Hugo site to Pages"
- Click "Run workflow"

**Configuration:**
- Hugo Version: 0.128.0
- Build: `hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"`
- Output: `./public` → GitHub Pages

---

## 📝 Content Management

### Adding a New Page
1. Create markdown file in `content/`
2. Add frontmatter (title, description, images)
3. Use shortcodes for structure
4. Build and test

### Using Shortcodes
See [docs/QUICKSTART.md](docs/QUICKSTART.md#new-shortcodes) for examples.

### Adding Case Studies
1. Create file in `content/case-studies/`
2. Include frontmatter (title, client_type, engagement, summary)
3. Add challenge, solution, outcome sections
4. Automatically appears in case study grid

---

## 🔧 Configuration

### Main Config
Edit `config.toml` for:
- Site title and description
- Navigation menu
- SEO parameters
- Base URL

### Calendly URL
Update in `layouts/shortcodes/calendlycta.html`:
```html
url: 'https://calendly.com/lucas-trustd?hide_gdpr_banner=1'
```

---

## 🎨 Styling

### Custom CSS
Main stylesheet: `static/assets/css/custom.css`

Includes styles for:
- Hero sections with scroll indicators
- Section layouts and spacing
- Service page styling
- Shortcode components
- Responsive breakpoints

---

## ✅ Status

**Production Ready** - All features complete and tested

- ✅ Content structure finalized
- ✅ Calendly integration complete
- ✅ SEO optimization done
- ✅ Mobile responsive
- ✅ OG image created
- ✅ Documentation complete

---

## 📞 Contact

**Website:** https://trustd.solutions  
**Email:** hello@trustd.solutions  
**Calendly:** https://calendly.com/lucas-trustd

---

## 📖 More Information

For detailed documentation, troubleshooting, and implementation guides, see the [docs/](docs/) directory.

**Last Updated:** 2025-01-12  
**Version:** 1.0  
**Hugo Version:** 0.150.1+extended