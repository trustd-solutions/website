# TrustD website

## Build and preview

- Use Hugo Extended 0.128.0 to match CI. Run `hugo server -D` to preview new pages: the default archetype sets `draft: true`, which excludes them from production.
- Check a production edit with `HUGO_ENVIRONMENT=production hugo --minify` and inspect the changed page under `public/`. There is no separate test or lint task. On pushes to `master`, `.github/workflows/merge-to-master.yaml` overrides the base URL with the GitHub Pages URL and deploys `public/`.

## Editing pages

- Edit page copy in the YAML front matter under `content/`. The layouts read named `.Params` fields and do not render the Markdown body. Pair `content/_index.md` with `layouts/_default/home.html`; the other pages select their template in that directory with `layout:`.
- The navigation links are hardcoded in `layouts/partials/header.html`. When changing the booking URL, update the header, `layouts/partials/cta.html` and the hero in `layouts/_default/home.html`.
- CSS and JS load directly from `static/assets/` via the `head.html` and `script.html` partials; there is no npm build step. The carousel controls live inline in `layouts/_default/baseof.html`.
