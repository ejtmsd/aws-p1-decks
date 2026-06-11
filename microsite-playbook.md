# AI-Assisted Pitch Microsite Playbook

A step-by-step production guide for building client proposal microsites with Claude Code.

---

## Who this is for

Anyone on the team building a single-page proposal microsite for a prospective client. This playbook standardizes the workflow we developed on the AWS keynotes pitch project and makes it repeatable.

## The core idea

Three input files + Claude Code = production-ready microsite.

The quality of the output is determined almost entirely by the quality of these three files. Skip one or half-prepare one, and you'll spend twice as long iterating.

## The stack

- **Vanilla HTML/CSS/JavaScript** -- no framework, no build tools, no npm
- **GSAP + ScrollTrigger** loaded from CDN for scroll animations
- **Google Fonts** loaded via `<link>` in the `<head>`
- **Vercel** for static file hosting and deployment
- Everything ships as a single `index.html` + external CSS + asset folders

Why this stack: zero build complexity means Claude generates working code on the first pass. No bundler, no compiler, no dependency resolution issues. The site works the moment you open it in a browser.

---

## 1. The Three Input Files

### File 1: Brand CSS Design System

**Filename convention:** `{agency-code}-brand.css`
**Reference:** `24sa-brand.css` (1,039 lines) from the AWS project

**Purpose:** Gives Claude the exact visual vocabulary -- tokens, classes, and constraints -- so the generated markup uses real, consistent CSS rather than one-off inline styles.

**Anatomy -- what it should contain:**

1. **Design tokens in `:root`**
   - Brand colors with semantic aliases (e.g., `--futureman-yellow: #FFD400`, `--color-bg-dark: var(--24sa-black)`)
   - Extended neutral palette (surface, card, border, muted text colors)
   - Font stacks with fallbacks (`'Instrument Serif', 'Georgia', serif`)
   - Fluid type scale using `clamp()` -- at least 8 steps from `--text-xs` to `--text-hero`
   - Line heights (`--leading-none` through `--leading-relaxed`)
   - Letter spacing (`--tracking-tight` through `--tracking-widest`)
   - Spacing scale (`--space-1` through `--space-40`)
   - Border radius scale (`--radius-sm` through `--radius-pill`)
   - Shadow scale (sm, md, lg, xl) with warm-tinted black
   - Transition easing curves and durations
   - Container width tokens (narrow, md, lg, xl, 2xl)

2. **Reset & base styles** -- box-sizing, font smoothing, body defaults
3. **Typography classes** -- heading hierarchy (h1-h6), eyebrow/overline, tagline, text utilities
4. **Texture effects** -- `.grain` (film grain via SVG noise), `.glow` (radial light sweep)
5. **Signature shapes** -- brand-specific graphic motifs (ellipses, orbit lines, etc.)
6. **Layout system** -- `.container`, `.section`, `.grid` with responsive collapse
7. **Theme variants** -- `.theme-dark`, `.theme-light`, accent themes
8. **Components** -- `.card`, `.btn`, `.nav`, `.hero`, `.footer`
9. **Utility classes** -- text color, background, font family, spacing, alignment
10. **Scroll animations** -- `.reveal`, `.reveal-stagger` with CSS transitions
11. **Responsive breakpoints** -- progressive simplification at 1024px, 768px, 480px

**Every section should be commented with a clear header** (e.g., `/* --- 1. DESIGN TOKENS --- */`). Claude uses these comments to understand the file's structure.

**Why ~1,000 lines matters:** In the AWS build, Claude used exact variable names (`var(--text-hero)`, `var(--warm-card)`, `var(--space-32)`) throughout the generated HTML. A thin CSS file with only a few tokens produces generic output. The more specific the vocabulary, the more specific the result.

#### Preparation checklist

- [ ] All colors as CSS custom properties with semantic aliases
- [ ] Fluid type scale using `clamp()` with at least 8 size steps
- [ ] Spacing scale (at least `--space-1` through `--space-40`)
- [ ] Border radius, shadow, and transition token scales
- [ ] Container width tokens
- [ ] Base component classes: cards, buttons, nav, hero, footer, grids
- [ ] Scroll reveal classes (`.reveal` with default opacity/transform)
- [ ] Responsive breakpoints with collapse behavior
- [ ] Every section commented with a clear header
- [ ] File tested: drops into a blank HTML page and renders base styles correctly

---

### File 2: Creative Direction Guide

**Filename convention:** `{agency-code}-creative-direction.md`
**Reference:** `24sa-creative-direction.md` (262 lines) from the AWS project

**Purpose:** Encodes the subjective design decisions that CSS tokens alone cannot express -- what the brand *feels* like, what to avoid, how motion should behave, what the photography treatment is.

**Anatomy -- what it should contain:**

1. **Brand essence** -- 3 sentences on what the brand IS, 3 on what it is NOT
   > *Example from the AWS project:*
   > "The brand does NOT feel like a tech startup. It does NOT feel like a corporate consulting firm. It does NOT feel like a SaaS product page. It feels like a creative powerhouse that also happens to be incredibly well-organized."

2. **Font specifications table** -- Role / Font / Weight / Style / Notes for each typeface
   - Include critical rules (e.g., "Instrument Serif is ALWAYS at weight 400, never bold")
   - Specify what italic is used for (emphasis tool, not just styling)

3. **Color palette table** -- Hex / CSS variable name / usage description for each color

4. **Color temperature rules** -- warm vs. cool, when each applies
   > *Example:* "Text on dark backgrounds is ALWAYS #F3EEE7 (off-white), never pure #FFFFFF. Pure white feels clinical and digital. Off-white feels editorial and human."

5. **Texture specifications** -- with exact implementation details (opacity, blend mode, CSS approach)

6. **Signature shape vocabulary** -- what shapes define the brand, how/where to use them

7. **Typography hierarchy recipe** -- the exact three-layer pattern (Eyebrow -> Headline -> Body) with specific sizes, weights, tracking values

8. **Typography anti-patterns** -- minimum 5 "never do" rules
   > *Example:* "Don't use Instrument Serif for body copy. Don't use it in all-caps. Don't make it bold. Don't use it below 24px. Don't use Inter, Helvetica, or any other font."

9. **Layout philosophy** -- specific spacing values, grid patterns, what layouts to avoid

10. **Animation philosophy** -- exact pixel values, easing curves, stagger timing
    > *Example:* "Fade-up: 24px translateY, 600ms duration. Easing: cubic-bezier(0.16, 1, 0.3, 1). Stagger children by 80ms."

11. **Animation anti-patterns** -- what NOT to animate
    > *Example:* "No bouncy easing. No parallax. No color-shifting gradients. No 3D card flips. No animation that draws attention to itself over the content."

12. **Photography/image treatment** -- rules per background type (dark, light, colored)

13. **Content voice** -- 3-5 bullet points on tone

14. **The 3-second test** -- "If someone sees the site for 3 seconds and looks away, they remember..."

**Why anti-patterns matter as much as positive direction:** AI models have statistical biases toward specific design cliches (bouncy animations, neon glows, generic card grids). Telling Claude what NOT to do is as important as telling it what to do. Dedicate equal space to both.

#### Preparation checklist

- [ ] Brand identity: what it IS (3 sentences) and what it is NOT (3 comparisons)
- [ ] Font spec table with weights, styles, and usage rules
- [ ] "Never do" list for typography (minimum 5 items)
- [ ] Color palette table with hex, variable name, and semantic usage
- [ ] Color temperature rules
- [ ] Texture/effect specs with implementation details (opacity, blend mode)
- [ ] Typography hierarchy recipe with exact values
- [ ] Layout philosophy with specific spacing values
- [ ] Animation philosophy with exact timing values
- [ ] Animation anti-patterns (minimum 5 items)
- [ ] Photography treatment rules per background type
- [ ] Content voice in 3-5 bullet points
- [ ] "The 3-second test" statement

---

### File 3: Content Specification

**Filename convention:** `{Client}_Proposal_Site_Content.md` (versioned: `_v2`, `_v3`, etc.)
**Reference:** `AWS_Proposal_Site_Content_v2.md` (260 lines) from the AWS project

**Purpose:** The exact copy, section structure, and interaction notes Claude needs to build the full page. This is the blueprint.

**Anatomy -- what it should contain:**

1. **Navigation** -- exact logo arrangement and nav link labels

2. **Sections 1 through N**, each following this format:
   - Section number and type (e.g., "SECTION 1: HERO / FLASHY INTRO")
   - Preheading / eyebrow text
   - Headline (exact copy)
   - Subheadline (exact copy)
   - Body copy (exact copy)
   - Bulleted lists (exact copy)
   - Closing line / transition copy
   - **Layout notes** (e.g., "horizontal on desktop, vertical on mobile")
   - **Animation/interaction notes** (e.g., "Think a slow-zoom on a dramatic dark stage")
   - **Developer implementation hints** (e.g., "[Embed video here. Full-width.]")

3. **Portfolio/showcase data** -- for each entry: client, scope, description, tags

4. **Footer** -- company descriptions, contact info

5. **Brand/tone notes for developer** -- voice, visual tone, typography, imagery, interaction summary

6. **Changelog** (for revisions) -- what changed from the prior version and why

**Why final copy matters:** In the AWS project, the v2 content spec was used nearly verbatim in the output. Placeholder copy or rough notes will produce a rough site. The more polished the input copy, the less iteration you'll spend fixing text.

#### Preparation checklist

- [ ] Navigation: exact logo arrangement and nav link text
- [ ] Each section: eyebrow, headline, subheadline, body, lists, closing line
- [ ] All copy is final (or clearly marked as placeholder with `[BRACKETS]`)
- [ ] Layout direction per section
- [ ] Animation intent per section
- [ ] Portfolio entries with: client, scope, description, tags
- [ ] Media notes: where videos embed, where images go
- [ ] Footer: company info, contact details
- [ ] "Brand/tone notes for developer" section at the end
- [ ] Section numbering matches intended scroll order
- [ ] CTA text and targets specified
- [ ] Changelog if this is a revision

---

## 2. Asset Preparation

Before prompting Claude, gather and organize all visual assets. Use this directory structure:

```
{project-name}/
  {agency}-brand.css
  {agency}-creative-direction.md
  {Client}_Proposal_Site_Content.md
  logos/
    {agency-logo}.png
    {partner-logo}.webp
    {client-logo}.png
  slide-shots/               <-- Hero marquee / background images
    opt/                     <-- Optimized versions
    opt-mobile/              <-- Mobile-optimized versions
  {portfolio-item-1}/        <-- e.g., salesforce/
    opt/
    slide-1.png
    slide-2.png
  {portfolio-item-2}/        <-- e.g., okta/
    opt/
    ...
  headshots/                 <-- Team member photos
  covers/                    <-- Portfolio card cover images
```

### Asset checklist

- [ ] Logo files in PNG/SVG/WebP (test rendering on dark backgrounds)
- [ ] Portfolio cover images at consistent aspect ratio (AWS project used 16:9)
- [ ] Portfolio detail slides organized by client in named folders
- [ ] Headshot photos for team section
- [ ] Hero/marquee images or slide screenshots
- [ ] Video assets (YouTube IDs for lazy loading, or self-hosted files)
- [ ] Background textures if applicable

**Plan for optimized images from the start.** The AWS project added `/opt/` and `/opt-mobile/` subfolders with compressed versions later. Create these folders upfront and prepare responsive `srcset` attributes.

---

## 3. The Initial Build Prompt

### Loading the files

In Claude Code, reference all three files in your initial prompt. Claude will read and use them as complete context.

### Prompt template

Copy, customize the `{placeholders}`, and use:

```
Here are three files that define the project:

1. `{agency}-brand.css` -- our design system with all tokens, components, and animation classes
2. `{agency}-creative-direction.md` -- our creative direction guide with brand rules, anti-patterns, and visual specs
3. `{Client}_Proposal_Site_Content.md` -- the content specification with exact copy, section structure, and interaction notes

Using these three files as your complete source of truth, build a single-page
proposal microsite as a single `index.html` file.

Technical requirements:
- Link to `{agency}-brand.css` as an external stylesheet
- Add page-specific style overrides in an embedded `<style>` block in the `<head>`
- Load GSAP and ScrollTrigger from CDN for scroll animations
- Load Google Fonts via `<link>` with `rel="preconnect"` for the font families specified in the creative direction guide
- Put all JavaScript at the bottom before `</body>` in a single `<script>` block

Content and structure:
- Include every section from the content spec in order, using the exact copy provided
- Use the typography hierarchy from the creative direction guide (eyebrow -> headline -> body) for each section
- Follow every rule and anti-pattern listed in the creative direction guide

Features to include:
- Scroll-triggered reveal animations using the `.reveal` and `.reveal-stagger` classes from the brand CSS
- A lightbox/carousel for portfolio items with keyboard navigation (Arrow keys, Escape)
- Lazy-loaded YouTube video embed (use IntersectionObserver, inject iframe on visibility)
- Responsive behavior at desktop (1440px), tablet (768px), and mobile (375px)
- `prefers-reduced-motion` media query to disable animations for accessibility
- Semantic HTML with descriptive comments at each section boundary

Do NOT include:
- Any npm packages or build tools
- Any external JavaScript besides GSAP
- Placeholder "Lorem ipsum" text -- all copy comes from the content spec
```

### Why each part of this prompt matters

| Prompt element | Why it matters |
|---|---|
| "Single `index.html` file" | Avoids build tool complexity. The site works the moment you open it. No compilation, no bundling, no dependency resolution. |
| "Link to brand CSS as external stylesheet" | Forces Claude to use your token system instead of inventing its own styles. The generated HTML will reference `var(--text-hero)`, `var(--warm-card)`, etc. |
| "Page-specific overrides in `<style>`" | Keeps brand CSS reusable across projects while allowing project-specific customization. |
| "GSAP from CDN" | Provides powerful scroll animations without npm. CDN loading is reliable and fast. |
| "Exact copy from content spec" | Prevents Claude from generating filler text. The output matches what the content team wrote. |
| "Follow every rule and anti-pattern" | Activates the creative direction constraints. Without this, Claude defaults to generic AI design patterns. |
| "`.reveal` and `.reveal-stagger` classes" | Tells Claude to use the animation system already built into the brand CSS rather than writing custom animation code. |
| "Keyboard navigation" | Claude will implement Arrow key and Escape handling in the lightbox -- a detail often missed without prompting. |
| "Lazy-loaded YouTube" | Prevents a heavy iframe from loading on page load. Claude implements IntersectionObserver pattern. |
| "`prefers-reduced-motion`" | Accessibility requirement. Claude disables animations for users who've opted out. |
| "Do NOT include" | Prevents Claude from adding complexity (npm, extra libraries, placeholder text) that you'll have to undo. |

---

## 4. The Iteration Playbook

After the initial build, iteration follows a predictable pattern. The AWS project went through 18 commits across 4 phases.

### Phase 1: Structural fixes (commits 1-3)

Get the basics working before polishing.

- Rename file for deployment (`aws-proposal.html` -> `index.html`)
- Remove or adjust copy that doesn't land
- Broad UI pass across all sections (alignment, sizing, spacing)

### Phase 2: Section-by-section polish (commits 4-8)

Walk through the site top to bottom and fix each section.

- Alignment issues (vertically center sticky nav, fix org chart connectors)
- Missing nav links or broken anchor scroll
- Add content that wasn't in the initial build (new marquee images, etc.)
- Video behavior (autoplay, mute, loop)
- Image path issues (filenames with special characters, wrong directories)

### Phase 3: Portfolio buildout (commits 9-15)

Add portfolio content incrementally -- one case study at a time.

- Add images for each portfolio client
- Adjust card styling (aspect ratios, overlays, hover states)
- Replace placeholder tiles with real content
- Fine-tune lightbox slide data

### Phase 4: Final polish (commits 16-18)

Last-mile refinements before sharing.

- Responsive fixes (equal card heights, mobile layout)
- Sizing tweaks (video embed dimensions)
- Footer and closing section refinements

### Common iteration prompts

| Category | Example prompt |
|---|---|
| Layout | "Vertically center the process sticky nav within the viewport height" |
| Content swap | "Replace the placeholder gradient in the Salesforce card with `salesforce/opt/slide-1.jpg`" |
| Aspect ratio | "Change portfolio card images to 16:9 aspect ratio to match cover images" |
| Hover state | "Add a dark overlay on portfolio card covers. On hover, darken to near-black and reveal text" |
| Responsive | "On mobile, collapse the footer companies grid to single column" |
| Performance | "Set the platform video to autoplay muted and loop" |
| Spacing | "Fix team face cards so they are equal height within grid rows" |
| Animation | "Add a slow floating animation to the portfolio cards" |

### Iteration QA checklist

Run through this after each iteration session:

- [ ] Open at desktop (1440px), tablet (768px), and mobile (375px)
- [ ] Every section scrolls correctly (no overlapping, no cut-off)
- [ ] Lightbox opens, navigates prev/next, closes (click outside + Escape key)
- [ ] All image paths resolve (no broken images in DevTools console)
- [ ] Fonts load correctly (check Instrument Serif headlines, Rethink Sans body)
- [ ] GSAP animations fire on scroll (`.reveal` elements fade in)
- [ ] Nav links scroll to correct sections
- [ ] `prefers-reduced-motion` disables animations (test in browser settings)

---

## 5. Deployment & QA

### Deploying to Vercel

1. Make sure the main file is named `index.html` (Vercel serves this by default)
2. All asset paths are relative (no absolute localhost paths)
3. Run `vercel --prod` from the project root
4. Test the deployed URL on a real mobile device (not just browser emulation)

### Pre-share QA checklist

Before sending the URL to anyone outside the team:

- [ ] Every section heading matches the content spec
- [ ] No placeholder text remaining (search the file for "Lorem", "[TODO]", "placeholder")
- [ ] All portfolio images are real work, not placeholders
- [ ] Contact information is correct (email addresses, names, titles)
- [ ] Copyright year is current
- [ ] Page loads in under 3 seconds on 4G
- [ ] No console errors in browser DevTools
- [ ] Lightbox works on mobile (touch navigation)
- [ ] Footer content matches approved copy
- [ ] `<title>` tag is set with a relevant page title
- [ ] OG/social sharing meta tags are set (if the link will be shared in Slack/email)

---

## 6. File Naming Conventions

| File type | Naming pattern | Example |
|---|---|---|
| Brand CSS | `{agency-code}-brand.css` | `24sa-brand.css` |
| Creative direction | `{agency-code}-creative-direction.md` | `24sa-creative-direction.md` |
| Content spec | `{Client}_Proposal_Site_Content.md` | `AWS_Proposal_Site_Content.md` |
| Content spec (revised) | `{Client}_Proposal_Site_Content_v{N}.md` | `AWS_Proposal_Site_Content_v2.md` |
| Site output | `index.html` | `index.html` |
| Logos | `logos/{name}.{png,svg,webp}` | `logos/sketchdeck.png` |
| Portfolio slides | `{client-name}/slide-{N}.{png,jpg}` | `salesforce/slide-1.png` |
| Optimized slides | `{client-name}/opt/slide-{N}.jpg` | `salesforce/opt/slide-1.jpg` |
| Portfolio covers | `covers/{client-name}-{N}.jpg` | `covers/okta-1.jpg` |
| Hero/marquee images | `slide-shots/{description}.{png,jpg}` | `slide-shots/hero-stage.png` |
| Headshots | `headshots/{FirstName}.jpeg` | `headshots/Elliot.jpeg` |

---

## 7. Cowork Session Refinement Notes

This playbook is a first draft. The following areas should be expanded in a collaborative Claude cowork session:

- **Blank starter templates** -- Build forkable template files for the brand CSS, creative direction guide, and content spec so new projects start from structure rather than a blank page
- **Prompt library** -- Expand the iteration prompt examples into a categorized, copy-paste reference sheet covering all common tweaks
- **Image optimization pipeline** -- Document the exact export settings and tools for creating `/opt/` folders (sharp, squoosh, manual export settings, target file sizes)
- **Cross-project learnings** -- As more microsites are built, capture what patterns transfer across projects and what is always project-specific
- **Quality gates** -- Define explicit "done" criteria for each iteration phase so the team knows when to move on
- **Time budgets** -- Based on the AWS project timeline (~18 commits), establish rough time expectations per phase

---

*This playbook was developed from the actual workflow used to produce the AWS keynotes pitch microsite. See the project files referenced throughout for working examples of each input file.*
