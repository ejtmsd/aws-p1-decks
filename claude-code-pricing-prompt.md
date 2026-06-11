# Claude Code Prompt: Pricing Section, AWS 1P Symposiums Proposal

Paste everything below this line into Claude Code from the project root (`~/projects/sketchdeck/aws-1p-symposiums-proposal`).

---

You are iterating on the pricing section of a client-facing proposal microsite for AWS. The section is already implemented; your job is to verify it against this spec, reconcile any drift, and apply future changes while preserving the architecture. `pricing-model.xlsx` in this folder is the team-facing source of truth for numbers; when it changes, sync the values into `pricing.config.js`. Do not use em dashes anywhere in copy or code comments.

## Files and separation of concerns

- `pricing.config.js` holds EVERY number: role rates, absolute base hours per writing depth, modifiers, tier presets, symposium recommendations, rounding, stepper limits, UI defaults. Pricing changes happen only here.
- The engine and UI wiring live in `index.html` under `// ====== PRICING CONFIGURATOR ======`. Math and DOM only; it must contain no pricing numbers.
- Pricing styles are in the embedded `<style>` block in `index.html`, marked `/* - Configurator: ... - */`. Do not touch `24sa-brand.css`.
- `pricing-model.xlsx` mirrors the config 1:1; each input lists its config key. Sync direction is spreadsheet to config unless told otherwise.

## Data model: two independent axes, never conflate them

1. Tiers (`Lean`, `Signature`, `Premium`) are service-level options. A tier applies to ANY event. No tier is bound to a location.
2. Symposiums (London, Ottawa, Canberra) are the three events. Each has a client-facing `readiness` note and a `recommendedTier`, which is OUR suggested starting point based on readiness. It is a changeable default, not an identity. Confirmed facts from the client: the three events exist and sit at different readiness levels (London written, Ottawa has an owner but needs writing, Canberra from scratch). The tier mapping is our recommendation only and the client must be able to change it.

Never render a tier as a fixed subtitle or identity under a location. It must read as a selectable option ("Service level for London", "Service level: Signature", "Recommended" badge on the suggestion).

## Engine math, per deck

1. Writing depth sets absolute base hours per role (three levels: Deck mods only / Scripting from framework / Full narrative + scripting; values in `depthLevels[].hours`).
2. Modifiers add hours: slides above 20 add 0.6 design hours per extra slide (slide bands: up to 20 / 35 / 50, computed on band max); each speaker adds 3 speaker management hours; each edit round adds 4 design + 2 writing; each dry run adds 4 PM + 3 writing.
3. Cost = sum of role hours x rates, plus flat on-site day rate x days. On-site is a days stepper, 0 to 5, where 0 means none. There is no separate on/off toggle.
4. Headline prices round UP to the nearest $100 (`roundUpTo`). The role breakdown table shows exact math; a footnote explains the gap. Program totals sum the rounded per-deck figures so visible math adds up.

Current placeholder rates (pending confirmation, label everything "Estimate, not a quote"): Writing and Speaker Mgmt $185/hr, Design $175/hr, Design Direction $200/hr, PM $175/hr, QC $100/hr, on-site $3,500/day flat.

## UI spec

- Two modes. Quick estimate: one global service-level selector and one config applied across a symposium-count stepper (1 to 3, default 3, displayed outside the custom panel). Per-symposium: tabs for London, Ottawa, Canberra; each event has its own service-level selector defaulting to its `recommendedTier` with a "Recommended" badge that stays on the suggestion even when another tier is selected, its own scope inputs, and its readiness note shown above the selector. Program total is the sum of the three.
- Tier cards are presets: each shows an inclusions list (slides band, depth, speakers, edit rounds, dry runs, on-site days) DERIVED from its preset in the config via `presetInclusions()`, never hardcoded in markup.
- Scope inputs live in a "Custom configuration" panel that is collapsed by default behind a gear icon header (`pricingCustomToggle`). Opening it and changing any input marks the config Custom; selecting a preset tier resets inputs and collapses the panel. Inputs: slide band (segmented), writing depth (segmented, 3 levels), speakers / edit rounds / dry runs / on-site days (steppers).
- Gotcha: several configurator components set display:flex or grid, which beats the hidden attribute. The rule `.section-pricing [hidden] { display: none !important; }` must stay; without it, city tabs and the summary strip leak into Quick estimate mode.
- Live outputs: per-deck cost, program total, and a toggleable role-by-role breakdown (role, hours, rate, amount; on-site as a flat line). Breakdown is currently shown by default (`defaults.showBreakdown`).
- Match the existing brand exactly; reuse the existing pricing classes and tokens.

## Verification checklist (run after any change)

- Any symposium can be set to any tier, and each event's price recalculates independently.
- Expected defaults with current placeholders: London (Lean) $11,500, Ottawa (Signature) $23,900, Canberra (Premium) $40,600, per-symposium program total $76,000; Quick estimate at Signature x3 is $23,900 per deck, $71,700 program.
- Exact per-deck math before rounding: Lean 11,450; Signature 23,845; Premium 40,570.
- No formula numbers in `index.html`; `node --check pricing.config.js` passes; no em dashes in any file.
- Headline figures are always >= the exact breakdown total and within $100 of it (plus on-site already included in both).

## Syncing from the spreadsheet

When the team returns an edited `pricing-model.xlsx`: read the Assumptions sheet (rates, depth hours, modifiers, tier presets, symposium recommendations), map each value to its listed config key, update `pricing.config.js`, then re-run the verification checklist and update the expected figures in this prompt and in README.md if they changed.
