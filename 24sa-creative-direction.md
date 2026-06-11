# 24 Seven Agencies — Creative Direction Guide
### For use alongside `24sa-brand.css` when building any website in the 24SA brand system.

---

## Brand Essence

24 Seven Agencies is a house of leading creative and marketing agencies — Futureman, SketchDeck, and Markacy — powered by 24 Seven's worldwide talent network. The brand line is **"Better beats big."**

The visual identity sits at the intersection of **editorial sophistication** and **creative energy**. It should feel like the cover of a high-end design annual — confident, warm, textured — while conveying the dynamism of three distinct agencies working as one.

The brand does NOT feel like a tech startup. It does NOT feel like a corporate consulting firm. It does NOT feel like a SaaS product page. It feels like a creative powerhouse that also happens to be incredibly well-organized.

---

## Exact Brand Specs

### Fonts

| Role | Font | Weight | Style | Notes |
|---|---|---|---|---|
| Headlines | **Instrument Serif** | Regular (400) | Normal + *Italic* | Italic used for emphasis/highlights — this is the signature |
| Body text | **Rethink Sans** | Regular (400) | Normal | Clean, modern, legible |
| Labels/UI | **Rethink Sans** | Medium–Bold (500–700) | Normal | Uppercase, wide tracking for eyebrows and buttons |

**Google Fonts import:**
```
Instrument Serif: 400, 400 italic
Rethink Sans: 400, 500, 600, 700 (normal + italic)
```

**Critical rules:**
- Instrument Serif is ALWAYS used at `font-weight: 400` (regular). Never bold. The elegance comes from the font's natural shape, not from heaviness.
- Italic is the primary emphasis tool, not bold. Headlines use *italic highlights* on key words or phrases to create visual interest.
- Rethink Sans handles everything that isn't a headline: body copy, navigation, buttons, labels, captions, metadata, form elements.
- The "tagline" pattern — one-word serif italic phrases ending with a period (*"Experience."*, *"Create."*, *"Perform."*) — is a core brand motif. Use it for section labels, pull quotes, or CTAs.

### Colors

| Name | Hex | CSS Variable | Usage |
|---|---|---|---|
| **Experience Yellow** | `#FFD400` | `--futureman-yellow` | Futureman accent, energy moments |
| **Create Blue** | `#C0D8FF` | `--sketchdeck-blue` | SketchDeck accent, calm authority |
| **Perform Orange** | `#FF5E2E` | `--markacy-orange` | Markacy accent, impact/urgency |
| **Agencies Off-White** | `#F3EEE7` | `--24sa-off-white` | Primary text on dark, light backgrounds |
| **Agencies Pure Black** | `#000000` | `--24sa-black` | Primary backgrounds, text on light |

**Extended palette (in the CSS):**
| Role | Hex | Variable |
|---|---|---|
| Warm dark (surfaces) | `#0A0908` | `--warm-dark` |
| Warm surface | `#121110` | `--warm-surface` |
| Warm card | `#1A1816` | `--warm-card` |
| Muted text on dark | `#8A857D` | `--muted-text` |
| Subtle border | `rgba(243,238,231, 0.08)` | `--warm-border` |

**Color temperature rules:**
- Text on dark backgrounds is ALWAYS `#F3EEE7` (off-white), never pure `#FFFFFF`. Pure white feels clinical and digital. Off-white feels editorial and human.
- Light section backgrounds are ALWAYS `#F3EEE7`, never `#FAFAFA` or `#F5F5F5`.
- Muted text uses warm grays (`#8A857D`), not cool/blue grays.
- Card and surface backgrounds use warm darks (`#1A1816`), not cool darks like `#1a1a2e` or `#0E0E14`.
- Every page should feel like it has a slight warmth to it. If you screenshot the site and desaturate it, the grays should still feel warm.

### Textures

**Film grain** is a DEFINING visual element — not a subtle hint.
- Applied via CSS `::after` pseudo-element with SVG noise pattern
- Opacity: **~35%** with `mix-blend-mode: overlay`
- Applied to every dark section using the `.grain` class
- The effect should make dark backgrounds feel like a physical surface — matte black paper with visible tooth
- On mobile, reduce to ~20% for performance

**Radial light sweep** creates atmospheric depth on hero/feature sections:
- A soft, warm radial gradient centered in the section
- Uses off-white at very low opacity (`rgba(243,238,231, 0.07)`)
- Applied via the `.glow` class
- Should feel like a spotlight on a stage — reinforcing the "performance" and "experience" themes

### Shapes

**Ellipses / Ovals** are a signature graphic motif — NOT rounded rectangles.
- Thin-stroked ovals (`1px solid rgba(243,238,231, 0.12)`) used as containers
- The overlapping ellipse stack (three ovals arranged vertically with slight overlap) is a brand pattern for showing the three agencies
- Use ellipses for featured graphic moments, stat callouts, or logo containers
- Standard content cards can still use `border-radius: 0.75rem` — reserve the ellipse treatment for signature moments

**Flowing orbit lines** — thin curved strokes (often in yellow) that arc across compositions, connecting images or text elements. Seen in the "Experience" hero treatment. These add energy and movement.

---

## Typography Hierarchy

Every section should follow this three-layer pattern:

```
[EYEBROW]
  Font:     Rethink Sans
  Size:     ~0.7rem (var(--text-xs))
  Weight:   Medium (500)
  Style:    Uppercase
  Tracking: 0.16em (var(--tracking-widest))
  Color:    Muted (#8A857D on dark, #6B665E on light)

[HEADLINE]
  Font:     Instrument Serif
  Size:     Large — varies by section (var(--text-display) to var(--text-hero))
  Weight:   Regular (400) — NEVER bold
  Style:    Normal, with italic on key words/phrases for emphasis
  Tracking: -0.02em (var(--tracking-tight))
  Color:    Off-white on dark (#F3EEE7), Pure black on light (#000000)

[BODY]
  Font:     Rethink Sans
  Size:     ~1rem–1.15rem (var(--text-base))
  Weight:   Regular (400)
  Style:    Normal
  Leading:  1.65 (var(--leading-relaxed))
  Color:    Slightly muted off-white on dark, slightly muted black on light
```

**What NOT to do:**
- Don't use Instrument Serif for body copy, labels, navigation, or small text.
- Don't use Instrument Serif in all-caps. The brand always uses title case or sentence case for serif headlines.
- Don't make Instrument Serif bold. It's only used at weight 400.
- Don't use Instrument Serif below ~24px. At small sizes, switch to Rethink Sans.
- Don't use Inter, Helvetica, Arial, Playfair Display, Georgia, or any other font. The brand fonts are Instrument Serif and Rethink Sans exclusively.

---

## Layout & Spacing

### Generous Whitespace

The brand uses dramatic amounts of whitespace. Headlines float in vast dark fields. Cards have generous padding. Nothing feels cramped.

- Section padding: `var(--space-32)` (8rem / 128px) vertically — minimum. Go larger on hero sections.
- Content max-width: `var(--container-narrow)` (680px) for text-heavy sections, `var(--container-xl)` (1280px) for grids.
- Card padding: `var(--space-8)` (2rem) internally.
- Between sections: no visible borders or heavy dividers. The shift from dark to light (or the change in content density) IS the separator.

### Grid System

Simple, symmetric grids — mostly 2-column and 3-column. Cards are generously sized with `border-radius: var(--radius-lg)` (0.75rem).

**Key layout patterns from the brand:**

1. **The Agency Row** — 3-column grid with colored header cards (yellow, blue, orange), each containing: agency logo, italic tagline, image, and service list. Used for the "who we are" section.

2. **The Split** — Left side has text (headline + capability list), right side has an image grid. Used for individual agency detail sections. Works well for service/capability pages.

3. **The Timeline** — Horizontal process bars in brand colors (yellow, blue, orange) showing cross-agency collaboration phases. Used for "how we work" sections.

4. **The Ellipse Stack** — Three overlapping thin-stroked ovals, each containing an agency logo. Used for the brand identity/relationship graphic.

### No Complex Layouts

- No masonry grids
- No asymmetric layouts
- No sidebar-heavy layouts
- Keep it clean, centered, and rhythmic

---

## Color Usage Rules

### Accent Colors — Restraint is Key

The three accent colors (yellow, blue, orange) are powerful. Use them sparingly.

**Rule of thumb:** Never use more than one accent color per section. Let the accent punctuate, not dominate. The primary visual story is always **black + off-white + grain**, with color as a strategic interruption.

**When all three appear together:** Contain them within strong geometric shapes (cards, bars, ellipses) against a black background. The "What sets us apart?" and "Agency Row" patterns show this — vivid color blocks against darkness.

### Dark Sections (the dominant look)
- Background: `#000000` with `.grain` texture
- Text: `#F3EEE7` (off-white)
- Muted text: `#8A857D`
- Borders: `rgba(243,238,231, 0.08)`
- Cards: `#1A1816` background with `1px` warm border

### Light Sections (the contrast break)
- Background: `#F3EEE7` (off-white)
- Text: `#000000` (pure black)
- Muted text: `#6B665E`
- Borders: `rgba(0,0,0, 0.06)`
- Cards: white or very light warm tone

---

## Interaction & Motion

### Philosophy: Confident, Not Flashy

The brand is assured and understated. Animations support the content — they never compete with it.

### Scroll Reveals
- Fade-up: `24px` translateY, `600ms` duration
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — smooth deceleration
- Stagger children by `80ms` each
- Use the `.reveal` and `.reveal-stagger` classes from the brand CSS

### Hover States
- Cards: 3px lift, shadow expansion, subtle border brightening
- Links: Color shift (to accent or off-white)
- Buttons: Fill inversion (outline → solid, or solid → outline)
- Ellipses: Border opacity increases
- Nav links: Color transition, no underline animation needed

### Things to AVOID
- Bouncy or springy easing curves
- Parallax scrolling
- Color-shifting or animated gradients
- 3D card flips or perspective transforms on content
- Loading spinners or progress bars
- Any animation that draws attention to itself over the content
- Hover effects that move content more than 4px

### Acceptable "Big Moments" (one per page max)
- A hero section with an ambient canvas animation (floating nodes, orbiting elements)
- A flowing orbit line SVG animation
- A slow, subtle rotation on the ellipse stack

---

## Photography & Image Treatment

### On Dark Backgrounds
Images should be vivid and high-contrast, appearing as "windows" into color against the dark grainy canvas. Full-bleed image grids with no borders — images pop against the black. The brand materials show real event photos, real products, real work (BravoCon, Charlotte FC, Coach Coffee Shop).

### On Light Backgrounds
Natural and warm. No heavy filters or processing. Real photography preferred over illustrations or stock.

### On Colored Backgrounds (Yellow, Blue, Orange)
Black text, high contrast. The Futureman yellow section in the brand materials uses bold black sans-serif for the logo and serif for case study headlines against the pure yellow field.

### Placeholder Strategy
When real images aren't available, use gradient fills matching the project's palette, or use the dark grainy texture itself. Never use generic gray placeholder boxes.

---

## Content Voice

The copy tone across the brand materials:

- **Direct and declarative.** Periods end statements — even one-word taglines.
- **Confident but not arrogant.** "Better beats big." "Impact over ego."
- **Action-oriented.** "Experience. Create. Perform." — verbs, not adjectives.
- **Warm and human.** "3 agencies. 35 years of combined experience. Backed by 24 Seven talent."
- **No jargon.** No "synergies," no "leveraging paradigms." Plain, powerful language.

---

## The 30-Second Test

If someone sees ANY 24SA website for 3 seconds and looks away, they should remember:

1. **Dark, warm, and textured** — the heavy grain is unmistakable
2. **Beautiful Instrument Serif headlines** — editorial, italic highlights, never bold
3. **A feeling of creative confidence** — this agency knows exactly what it's doing

If the site could be mistaken for a fintech dashboard, a SaaS product page, or a corporate consulting firm's website, the creative direction has drifted. Pull it back toward **grain, warmth, ellipses, and Instrument Serif italic.**
