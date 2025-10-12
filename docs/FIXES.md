# Syntax Error Fixes - Hugo Build Issues

## Issues Found and Fixed

### 1. Deprecated Configuration Key

**Error:**
```
ERROR deprecated: site config key paginate was deprecated in Hugo v0.128.0 and subsequently removed. Use pagination.pagerSize instead.
```

**Fix in `config.toml`:**
```toml
# OLD (removed):
paginate = 10

# NEW:
[pagination]
  pagerSize = 10
```

---

### 2. Shortcode Syntax Errors

**Error:**
```
unrecognized character in shortcode action: U+003E '>'. Note: Parameters with non-alphanumeric args must be quoted
```

**Root Cause:**
Stray `>` characters and incorrect line breaks in shortcode declarations caused by the markdown rendering during file creation.

**Files Fixed:**
- `content/_index.md`
- `content/about.md`
- `content/contact.md`
- `content/services/_index.md`
- `content/case-studies/_index.md`

---

## Correct Shortcode Syntax

### ✅ CORRECT: Hero Shortcode
```markdown
{{< hero
  title="Page Title"
  subtitle="Page subtitle text"
  primary_text="Button Text" primary_href="/contact/"
  secondary_text="Secondary Button" secondary_href="/services/"
>}}
```

### ❌ INCORRECT: What Was Generated Initially
```markdown
{{< hero
title="Page Title"
subtitle="Page subtitle text"
primary_text="Button Text" primary_href="/contact/"

> }}
```

**Problems:**
1. No indentation for parameters (causes parsing issues)
2. Empty line before closing `>}}`
3. Stray `>` on separate line
4. Missing closing `>` before `}}`

---

## Examples of Fixed Sections

### Homepage (_index.md)

**Before:**
```markdown
{{< steps
items="Step 1|Step 2|Step 3"
notes="Note 1|Note 2|Note 3"

> }}
> {{< cta text="Button" href="/link/" >}}
> {{< /section >}}
```

**After:**
```markdown
{{< steps
  items="Step 1|Step 2|Step 3"
  notes="Note 1|Note 2|Note 3"
>}}
{{< cta text="Button" href="/link/" >}}
{{< /section >}}
```

### About Page

**Before:**
```markdown
- Item 1
- Item 2
- Item 3
  {{< /section >}}
```

**After:**
```markdown
- Item 1
- Item 2
- Item 3
{{< /section >}}
```

---

## Validation

After these fixes, the Hugo build should complete successfully:

```bash
hugo server --port 1313 --bind 0.0.0.0
```

Expected output:
```
Watching for changes...
Start building sites...
Built in XX ms
```

---

## Prevention Tips

When editing Hugo shortcodes:

1. **Always use proper indentation** for shortcode parameters
2. **No empty lines** between parameters and closing `>}}`
3. **Consistent spacing** - use 2 spaces for indentation
4. **Close on same line** - `>}}` should be on the last parameter line or its own line
5. **No markdown quote syntax** - Avoid `>` at the start of lines inside shortcodes

### Template for Multi-Parameter Shortcodes
```markdown
{{< shortcode-name
  param1="value1"
  param2="value2"
  param3="value3"
>}}
```

### Template for Single-Parameter Shortcodes
```markdown
{{< shortcode-name param="value" >}}
```

---

## All Files Corrected

- ✅ `config.toml` - Fixed pagination config
- ✅ `content/_index.md` - Fixed hero and steps shortcodes
- ✅ `content/about.md` - Fixed hero shortcode and section formatting
- ✅ `content/contact.md` - Fixed hero shortcode
- ✅ `content/services/_index.md` - Fixed hero shortcode
- ✅ `content/case-studies/_index.md` - Fixed hero shortcode

Site should now build without errors!
