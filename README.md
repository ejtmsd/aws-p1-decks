# AWS 1P Public Sector Symposiums Proposal Site

Client-facing proposal microsite for the AWS 1P cohort events opportunity (Ottawa, Canberra, London 2026). Cloned from the aws-keynotes-pitch project with new content and an interactive pricing configurator.

## How to run

No build step. Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

Site password: `Day1` (set in the password gate script at the bottom of `index.html`).

Deploys as static files on Vercel, same as the original project.

## Stack

Vanilla HTML/CSS/JS. GSAP + ScrollTrigger from CDN for scroll animations. Google Fonts via link tags. No npm dependencies, no framework.

## Where everything lives

The whole site is `index.html`. Sections are marked with banner comments:

| Section | Anchor | Find by searching |
|---|---|---|
| Password gate | `#pwGate` | `Password Gate` |
| Nav | `#mainNav` | `NAVIGATION` |
| Hero | `#hero` | `SECTION 1: HERO` |
| The Brief | `#brief` | `SECTION 2: THE BRIEF` |
| Process | `#process` | `SECTION 3: HOW WE WORK` |
| Team and Working Model | `#team` | `SECTION 4: YOUR TEAM` |
| Platform | `#platform` | `SECTION 5: THE SKETCHDECK PLATFORM` |
| Portfolio (do not edit, per direction) | `#work` | `SECTION 6: PORTFOLIO` |
| Pricing configurator | `#investment` | `SECTION: PRICING` |
| Footer | `#footer` | `SECTION 7: FOOTER` |

Styling: `24sa-brand.css` is the shared design system (tokens, components, breakpoints). Page-specific overrides live in the `<style>` block in the `<head>` of `index.html`. The pricing configurator styles are at the end of the PRICING block in that style sheet, marked with `/* - Configurator: ... - */` comments.

Creative rules: `24sa-creative-direction.md`. Conventions: `microsite-build-spec.md` and `microsite-playbook.md`.

Approved copy source: `AWS_1P_Symposiums_Proposal_Content_v1.md`.

## Pricing: config vs logic

- **`pricing.config.js`** holds every number: role rates, base hours per writing depth, modifiers, tier presets, symposium defaults, rounding, stepper limits, and initial UI state (default mode, default tier, breakdown visibility). To change pricing, edit only this file. All values are placeholders pending confirmation.
- **The engine and UI wiring** live in `index.html` in the inline script block, under `// ====== PRICING CONFIGURATOR ======`. It is pure math and DOM updates; it contains no numbers.

How the math works, per deck:

1. Writing depth picks cumulative base hours (each level adds onto the previous).
2. Modifiers add hours: extra slides above 20 add design hours, speakers add speaker management, edit rounds add design and writing, dry runs add PM and writing.
3. Cost = sum of role hours x rates, plus flat on-site day rate x days if enabled.
4. Headline figures round to the nearest $250 (`roundTo` in config); the role breakdown table shows exact math. Program totals sum the rounded per-deck figures so visible math adds up.

Two modes: Quick estimate (one config x number of symposiums) and Per-symposium (London, Ottawa, Canberra configured independently; defaults Lean / Signature / Premium). Changing any input after selecting a tier marks the config Custom.

The role breakdown is shown by default (`defaults.showBreakdown: true`). Set it to `false` before sharing if hours and rates should stay private until toggled.

## Editing tips

- Tier names, taglines, and presets: `tiers` array in `pricing.config.js`.
- Middle tier is provisionally named Signature; alternatives under consideration are in `AWS_1P_Symposiums_Proposal_Content_v1.md`.
- Keep edits surgical: copy changes go in the section markup, pricing changes go in the config, visual changes go in the head style block. Avoid touching `24sa-brand.css`.
