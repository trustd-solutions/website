# Calendly Integration Documentation

## Overview

All contact forms and CTAs across the TrustD Solutions website have been replaced with Calendly popup widget links for streamlined meeting booking.

---

## Calendly Configuration

**Calendly URL:** `https://calendly.com/lucas-trustd?hide_gdpr_banner=1`

**Widget Type:** Popup widget (opens in modal overlay)

**Script Sources:**

- CSS: `https://assets.calendly.com/assets/external/widget.css`
- JS: `https://assets.calendly.com/assets/external/widget.js`

---

## Implementation

### 1. New Shortcode: `calendly-cta.html`

**Location:** `layouts/shortcodes/calendly-cta.html`

**Purpose:** Reusable CTA button that opens Calendly popup

**Usage:**

```markdown
{{< calendlycta text="Book a Call" >}}
{{< calendlycta text="Let's Talk!" >}}
{{< calendlycta text="Schedule a Meeting" >}}
```

**Note:** Shortcode name is `calendlycta` (no hyphen) for Hugo compatibility.

**Code:**

```html
<a
  href=""
  onclick="Calendly.initPopupWidget({url: 'https://calendly.com/lucas-trustd?hide_gdpr_banner=1'});return false;"
  class="btn btn-primary"
  style="display: inline-block; margin: 1rem 0;"
>
  {{ .Get "text" }}
</a>
```

---

### 2. Header Navigation

**Location:** `layouts/partials/header.html`

**"Let's Talk!" Button:**

- Opens Calendly popup widget
- Available on all pages
- Styled with `.getstarted` class

**Code:**

```html
<a
  class="getstarted"
  href=""
  onclick="Calendly.initPopupWidget({url: 'https://calendly.com/lucas-trustd?hide_gdpr_banner=1'});return false;"
  >Let's Talk!</a
>
```

---

### 3. Pages Updated

All pages now include Calendly CSS/JS in frontmatter and use `calendly-cta` shortcode:

#### Homepage (`content/_index.md`)

**Calendly CTAs:**

- "Talk to Us About Pods" (after pods table) - `{{< calendlycta >}}`
- "Schedule a 15-Minute Intro Call" (after steps) - `{{< calendlycta >}}`
- "Book a Call" (final CTA) - `{{< calendlycta >}}`

#### Services (`content/services/_index.md`)

**Calendly CTAs:**

- "Get DevOps Help"
- "Hire Software Engineers"
- "Add QA Support"
- "Build Your Data Stack"
- "Talk to Us About Pods"
- "Get in Touch"

#### About (`content/about.md`)

**Calendly CTAs:**

- "Work With Us" (hero CTA, links to /contact/)
- "Start the Conversation" (final CTA)

#### Contact (`content/contact.md`)

**Completely redesigned:**

- Removed contact form
- Added large Calendly CTA button
- Kept email fallback: hello@trustd.solutions
- 3-step process explanation

#### Case Studies (`content/case-studies/_index.md`)

**Calendly CTAs:**

- "Start the Conversation" (final CTA)

---

## Required Code in Each Page

All pages using Calendly must include this after frontmatter:

```html
<!-- Calendly CSS -->
<link
  href="https://assets.calendly.com/assets/external/widget.css"
  rel="stylesheet"
/>
<script
  src="https://assets.calendly.com/assets/external/widget.js"
  type="text/javascript"
  async
></script>
```

**Pages with Calendly integration:**

- ✅ `content/_index.md`
- ✅ `content/about.md`
- ✅ `content/contact.md`
- ✅ `content/services/_index.md`
- ✅ `content/case-studies/_index.md`
- ✅ `layouts/partials/header.html`

---

## User Experience Flow

### Current Flow:

1. User clicks any "Book a Call" / "Let's Talk!" button
2. Calendly popup opens in modal overlay
3. User selects date/time
4. User fills in details (name, email)
5. Meeting booked → Confirmation email sent
6. Popup closes, user stays on page

### Previous Flow (Removed):

1. User clicks "Contact" link
2. Navigates to contact page
3. Fills out multi-field form
4. Submits form
5. Redirects to thank you page
6. Wait for email response

**Benefits of Calendly:**

- ✅ Instant booking (no wait for response)
- ✅ Automatic calendar integration
- ✅ Fewer steps to conversion
- ✅ No form abandonment
- ✅ Better user experience
- ✅ Automated reminders

---

## Contact Page Changes

### Before:

- Long contact form with multiple fields:
  - Name, Email, Company
  - Service type dropdown
  - Message textarea
  - Timeline dropdown
- Netlify Forms integration
- Thank you page redirect

### After:

- Simple Calendly CTA button
- 3-step process explanation
- Email fallback for those who prefer it
- Cleaner, more focused design

**Why Changed:**

- Reduces friction in booking process
- Eliminates form spam
- Provides instant confirmation
- Better conversion rates
- No need to manage form submissions

---

## Styling

### Calendly CTA Button

- Class: `btn btn-primary`
- Inline style: `display: inline-block; margin: 1rem 0;`
- Inherits from existing button styles in `custom.css`

### Popup Modal

- Styled by Calendly CSS (widget.css)
- Dark overlay background
- Centered modal with close button
- Responsive design
- Mobile-friendly

---

## Configuration Options

### Current Settings:

```javascript
Calendly.initPopupWidget({
  url: "https://calendly.com/lucas-trustd?hide_gdpr_banner=1",
});
```

### Available Options:

```javascript
Calendly.initPopupWidget({
  url: "https://calendly.com/lucas-trustd",
  prefill: {
    name: "User Name",
    email: "user@example.com",
    customAnswers: {
      a1: "answer",
    },
  },
  utm: {
    utmCampaign: "campaign",
    utmSource: "source",
    utmMedium: "medium",
  },
});
```

**Note:** Currently using basic configuration with GDPR banner hidden.

---

## Testing Checklist

- [ ] Homepage CTAs open Calendly popup
- [ ] Services page CTAs open Calendly popup
- [ ] About page CTA opens Calendly popup
- [ ] Contact page CTA opens Calendly popup
- [ ] Case studies page CTA opens Calendly popup
- [ ] Header "Let's Talk!" button opens Calendly popup
- [ ] Popup displays correct calendar (lucas-trustd)
- [ ] Popup closes on background click
- [ ] Popup closes on X button
- [ ] Mobile responsive behavior works
- [ ] No console errors
- [ ] Email fallback visible on contact page

---

## Maintenance

### Updating Calendly URL

To change the Calendly link site-wide:

1. **Update shortcode:** `layouts/shortcodes/calendly-cta.html`

   ```html
   onclick="Calendly.initPopupWidget({url: 'YOUR_NEW_URL'});return false;"
   ```

2. **Update header:** `layouts/partials/header.html`
   ```html
   onclick="Calendly.initPopupWidget({url: 'YOUR_NEW_URL'});return false;"
   ```

### Adding New CTA

To add a Calendly CTA to any page:

1. **Add Calendly scripts** to page frontmatter:

   ```html
   <link
     href="https://assets.calendly.com/assets/external/widget.css"
     rel="stylesheet"
   />
   <script
     src="https://assets.calendly.com/assets/external/widget.js"
     type="text/javascript"
     async
   ></script>
   ```

2. **Use shortcode** in content:
   ```markdown
   {{< calendlycta text="Your Button Text" >}}
   ```

**Important:** Use `calendlycta` (no hyphen) - Hugo has issues with hyphens in shortcode names.

---

## Analytics & Tracking

### Calendly Analytics

Calendly provides built-in analytics:

- Meeting bookings
- Conversion rates
- Popular time slots
- Cancellation rates

Access via: Calendly Dashboard → Analytics

### Adding UTM Parameters

To track which page/campaign drove bookings:

```javascript
Calendly.initPopupWidget({
  url: "https://calendly.com/lucas-trustd",
  utm: {
    utmSource: "website",
    utmMedium: "cta",
    utmCampaign: "homepage",
  },
});
```

---

## Troubleshooting

### Popup Not Opening

- Check browser console for errors
- Verify Calendly JS is loaded: `typeof Calendly !== 'undefined'`
- Check for ad blockers blocking widget.js
- Verify URL is correct: `https://calendly.com/lucas-trustd`

### Styling Issues

- Ensure widget.css is loading
- Check for CSS conflicts with `!important`
- Verify button inherits from `.btn` and `.btn-primary`

### Mobile Issues

- Test viewport meta tag is present
- Verify popup is responsive
- Check touch events work on mobile
- Test on actual devices, not just desktop browser

---

## Alternatives Considered

### Why Not Keep Contact Form?

- ❌ Requires form submission management
- ❌ Spam filtering needed
- ❌ Manual calendar coordination
- ❌ Slower response time
- ❌ More steps for user

### Why Not Inline Embed?

- ❌ Takes up vertical space
- ❌ Less flexible placement
- ❌ Harder to integrate with design

### Why Popup Widget?

- ✅ Clean, focused UX
- ✅ Works anywhere on site
- ✅ Doesn't disrupt page flow
- ✅ Mobile-friendly
- ✅ Easy to implement

---

## Troubleshooting Notes

### Shortcode Not Found Error

If you see `template for shortcode "calendly-cta" not found`:

- ✅ **Solution:** Shortcode must be named `calendlycta.html` (no hyphen)
- ✅ **Usage:** `{{< calendlycta text="..." >}}` (no hyphen)
- Hugo v0.150+ has issues with hyphens in shortcode names

---

## Future Enhancements

### Potential Improvements:

1. **UTM tracking** - Track which page/CTA converts best
2. **Prefill data** - Pass user data if authenticated
3. **Multiple event types** - Different meeting lengths for different CTAs
4. **Custom questions** - Gather specific info during booking
5. **Team routing** - Route to different team members
6. **Webhooks** - Trigger actions on booking (CRM integration, Slack notifications)

---

## Status: ✅ COMPLETE

All contact forms replaced with Calendly integration.
All CTAs updated across the site.
Header navigation updated.
Contact page redesigned.

**Last Updated:** 2025-01-12
**Calendly Account:** lucas-trustd
**Implementation:** Popup widget method
