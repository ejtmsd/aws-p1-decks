# Microsite Build Spec

Reference for Claude Code when building a new proposal microsite in this system.

---

## Input files

Every project folder contains three files. Read all three before generating any code.

1. **`{agency}-brand.css`** — Design system with tokens, components, scroll animation classes, and responsive breakpoints. Link as an external stylesheet. Use its variables and classes directly — do not invent new tokens or override its values unless adding page-specific accents.
2. **`{agency}-creative-direction.md`** — Visual rules, anti-patterns, typography hierarchy, animation specs, color temperature rules, and brand identity constraints. Follow every rule listed. The anti-pattern sections are as important as the positive direction.
3. **`{Client}_Proposal_Site_Content.md`** — Exact copy, section structure, layout notes, and interaction hints. Use the copy verbatim. Do not paraphrase, summarize, or add filler text.

---

## Technical constraints

- **Single `index.html` file** linking to the brand CSS externally
- **Page-specific style overrides** go in an embedded `<style>` block in `<head>`, introduced with a comment header naming the project
- **GSAP + ScrollTrigger** loaded from CDN (`cdnjs.cloudflare.com`) — the only external JS dependency
- **Google Fonts** loaded via `<link>` with `rel="preconnect"` for both `fonts.googleapis.com` and `fonts.gstatic.com`
- **All JavaScript** in a single `<script>` block before `</body>`
- **No npm, no build tools, no frameworks, no additional JS libraries**
- **Vanilla HTML/CSS/JS only** — the site must work the moment the file is opened in a browser

---

## HTML structure pattern

Follow this structure exactly, matching the two existing sites (`index.html`, `aws-keynote-demos.html`):

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset/viewport>
  <title>
  <link preconnect> (Google Fonts, cdnjs)
  <link preload> (Google Fonts stylesheet)
  <link stylesheet> (Google Fonts)
  <link stylesheet> ({agency}-brand.css)
  <style> page-specific overrides </style>
</head>
<body>
  <!-- Password gate (if needed) -->
  <!-- Navigation -->
  <!-- Sections 1–N, each wrapped with semantic comments -->
  <!-- Footer -->
  <script> all JS: GSAP ScrollTrigger init, lightbox, lazy video, nav scroll, password gate </script>
</body>
</html>
```

---

## Page-specific `<style>` block conventions

- Define a `:root` block with accent color aliases mapped to brand CSS variables (e.g., `--accent: var(--futureman-yellow)`)
- Add `--accent-dim` and `--accent-glow` as lower-opacity variants for borders and backgrounds
- Component styles specific to this page (password gate, lightbox, carousel, pricing table, etc.)
- Section-specific layout overrides
- Responsive overrides at `1024px`, `768px`, `480px` matching the brand CSS breakpoints

---

## Standard features to implement

- **Scroll-triggered reveals** using `.reveal` and `.reveal-stagger` classes from brand CSS, initialized via GSAP ScrollTrigger
- **Lightbox/carousel** for portfolio items with keyboard navigation (Arrow keys, Escape) and click-outside-to-close
- **Lazy-loaded video embeds** using IntersectionObserver — inject iframe only when visible
- **Smooth anchor scrolling** from nav links to section IDs
- **`prefers-reduced-motion`** media query disabling all animations
- **Semantic HTML** with descriptive comments at each section boundary (e.g., `<!-- ═══ SECTION 3: HOW WE WORK ═══ -->`)
- **Password gate** (optional) — simple text input overlay, unlocks on correct passphrase, persists via sessionStorage

---

## Asset directory structure

```
{project-name}/
  {agency}-brand.css
  {agency}-creative-direction.md
  {Client}_Proposal_Site_Content.md
  index.html
  logos/
  slide-shots/
  headshots/
  covers/
  {portfolio-client-1}/
  {portfolio-client-2}/
```

Image paths in HTML should be relative (e.g., `covers/okta-1.jpg`, `salesforce/opt/slide-1.jpg`).

---

## Do NOT

- Add npm packages or build tools
- Use external JS besides GSAP
- Generate placeholder or lorem ipsum text — all copy comes from the content spec
- Use fonts not specified in the creative direction guide
- Override brand CSS token values — extend with page-specific tokens instead
- Use `h-screen` — use `min-height: 100vh` or `min-height: 100dvh`
- Add features not described in the content spec unless explicitly asked

---

## QA checklist

After generating the site, verify:

- [ ] Renders correctly at 1440px, 768px, and 375px
- [ ] All sections present in content spec order with verbatim copy
- [ ] All image paths resolve (no broken references)
- [ ] Fonts load correctly (check headline serif + body sans)
- [ ] GSAP scroll reveals fire on scroll
- [ ] Nav links scroll to correct sections
- [ ] Lightbox opens, navigates, and closes (click + keyboard)
- [ ] `prefers-reduced-motion` disables animations
- [ ] No console errors
- [ ] `<title>` tag set with project-specific title
