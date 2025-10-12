# Shortcode Nesting Fix

## Issue: HTML Showing as Plain Text

### Problem
When using nested shortcodes (e.g., `steps` inside `section`), the HTML from the inner shortcode was being displayed as plain text instead of rendered HTML.

**Screenshot shows:**
```
<li>
  <strong>Tell us what you need.</strong>
  <div class="note">Describe goals or roles.</div>
</li>
```

Instead of a properly styled numbered list.

---

## Root Cause

Hugo processes shortcodes from the **inside out**:

1. **Inner shortcode renders first** → `steps` outputs HTML
2. **Outer shortcode receives that HTML** → `section` gets the HTML as `.Inner`
3. **Problem:** `markdownify` in section was **escaping the HTML**

```html
<!-- section.html (BEFORE - BROKEN) -->
<div class="section-body">{{ .Inner | markdownify }}</div>
```

The `markdownify` function:
- Converts markdown to HTML
- **Escapes any existing HTML** to prevent XSS
- Treats HTML tags as literal text

---

## Solution

**Remove `markdownify` from shortcodes that might contain nested shortcodes:**

```html
<!-- section.html (AFTER - FIXED) -->
<div class="section-body">{{ .Inner }}</div>
```

Hugo has already processed any shortcodes in `.Inner`, so we just output it directly.

---

## Files Fixed

### 1. `layouts/shortcodes/section.html`
**Before:**
```html
<div class="section-body">{{ .Inner | markdownify }}</div>
```

**After:**
```html
<div class="section-body">{{ .Inner }}</div>
```

### 2. `layouts/shortcodes/card.html`
**Before:**
```html
<div class="card-body">{{ .Inner | markdownify }}</div>
```

**After:**
```html
<div class="card-body">{{ .Inner }}</div>
```

---

## Trade-off: Markdown in Shortcodes

### What We Lose
With `.Inner` (no markdownify), plain markdown won't be converted:

```markdown
{{< section title="Test" >}}
This **bold** won't work
This [link](https://example.com) won't work
{{< /section >}}
```

### What We Gain
Nested shortcodes work properly:

```markdown
{{< section title="Process" >}}
{{< steps items="Step 1|Step 2" notes="Note 1|Note 2" >}}
{{< cta text="Button" href="/link/" >}}
{{< /section >}}
```

---

## Workaround for Markdown

If you need markdown inside a section, use HTML directly:

```markdown
{{< section title="Test" >}}
This <strong>bold</strong> works
This <a href="https://example.com">link</a> works
{{< /section >}}
```

Or create a separate paragraph outside the shortcode:

```markdown
## Test

This **bold** and [link](https://example.com) work.

{{< section title="Features" >}}
{{< card title="Feature 1" >}}Content{{< /card >}}
{{< /section >}}
```

---

## Hugo Shortcode Processing Order

### Example:
```markdown
{{< section title="Steps" >}}
Text here.
{{< steps items="A|B" notes="1|2" >}}
{{< cta text="Click" href="/link/" >}}
{{< /section >}}
```

### Processing Order:
1. ✅ Hugo processes `steps` → Outputs `<ol class="steps"><li>...</li></ol>`
2. ✅ Hugo processes `cta` → Outputs `<a class="btn">Click</a>`
3. ✅ Hugo processes `section`:
   - `.Inner` contains: `Text here. <ol class="steps">...</ol> <a class="btn">...</a>`
   - Without `markdownify`: Outputs HTML as-is ✅
   - With `markdownify`: Escapes HTML → Shows tags as text ❌

---

## Best Practices

### ✅ DO: Use HTML in shortcodes that might nest others
```html
<!-- section.html -->
<div>{{ .Inner }}</div>
```

### ❌ DON'T: Use markdownify on potentially nested content
```html
<!-- section.html -->
<div>{{ .Inner | markdownify }}</div>  <!-- BREAKS NESTING -->
```

### ✅ DO: Use markdownify only for leaf shortcodes (no nesting)
```html
<!-- quote.html -->
<blockquote>{{ .Inner | markdownify }}</blockquote>
```

### ✅ DO: Document which shortcodes support markdown
In comments:
```html
<!-- section.html - Supports nested shortcodes, no markdown conversion -->
<!-- quote.html - Converts markdown, no nested shortcodes supported -->
```

---

## Current Shortcode Capabilities

| Shortcode | Markdown Support | Nested Shortcodes | Use Case |
|-----------|------------------|-------------------|----------|
| `hero` | ❌ (params only) | N/A | Page headers |
| `section` | ❌ | ✅ | Content wrappers |
| `card` | ❌ | ✅ | Feature cards |
| `cta` | ❌ (params only) | N/A | Buttons |
| `steps` | ❌ (params only) | N/A | Process flows |
| `pods-table` | ❌ (HTML table) | N/A | Pricing table |
| `casestudy-list` | ❌ (generated) | N/A | Auto list |

**Note:** All use plain `.Inner` to support nesting except where not applicable.

---

## Testing

After this fix, verify:

- [ ] Homepage "From intro to impact" section shows **numbered list** (not HTML tags)
- [ ] Steps have **circular numbered badges** (1, 2, 3, 4)
- [ ] Each step has **bold text** and gray note below
- [ ] "Schedule a 15-Minute Intro Call" button appears **styled**
- [ ] Card grids render properly
- [ ] Section backgrounds/spacing work

---

## Alternative Solutions (Not Used)

### Option 1: Conditional Markdownify
```html
{{ if (findRE "{{<" .Inner) }}
  {{ .Inner }}
{{ else }}
  {{ .Inner | markdownify }}
{{ end }}
```
**Rejected:** Too complex, fragile.

### Option 2: Different Shortcodes
Create `section-md` (with markdown) and `section` (without).
**Rejected:** Confusing for content authors.

### Option 3: Custom Render Hook
Use Hugo's markdown render hooks.
**Rejected:** Overcomplicated for this use case.

---

## Status: ✅ FIXED

The steps shortcode (and all nested shortcodes) should now render properly with full styling.

**Last Updated:** 2025-01-12
**Related Issue:** HTML showing as plain text in nested shortcodes
