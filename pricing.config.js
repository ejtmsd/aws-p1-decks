/* ============================================================
   PRICING CONFIG - AWS 1P Public Sector Symposiums
   ------------------------------------------------------------
   Every rate, hour formula, tier preset, and default for the
   pricing configurator lives in this file. Edit numbers here;
   no other file contains pricing data.

   NOTE: All values are PLACEHOLDERS pending confirmation.
   ============================================================ */

window.PRICING_CONFIG = {

  /* Displayed prices round UP to the nearest roundUpTo dollars.
     The role breakdown table shows exact math; headline figures
     may sit up to this amount above the breakdown total. */
  roundUpTo: 100,

  /* Hourly rates per role. Order here controls row order in
     the breakdown table. */
  roles: [
    { key: 'writing',     label: 'Content Strategy / Writing', rate: 250 },
    { key: 'speakerMgmt', label: 'Speaker Management',         rate: 150 },
    { key: 'design',      label: 'Design',                     rate: 150 },
    { key: 'designDir',   label: 'Design Direction',           rate: 200 },
    { key: 'pm',          label: 'Project Management',         rate: 150 },
    { key: 'qc',          label: 'Quality Control',            rate: 100 }
  ],

  /* On-site support is a flat day rate, not hourly. */
  onSite: {
    label: 'On-Site Support',
    dayRate: 3000
  },

  /* Motion-enhanced slides: three levels. Cost = total slides x perSlide.
     "Just a few" assumes motion on fewer than half the slides (blended rate);
     "Most slides" assumes motion across the majority of the deck. */
  motionLevels: [
    { id: 'none', label: 'None',        rowLabel: null,                       perSlide: 0   },
    { id: 'few',  label: 'Just a few',  rowLabel: 'Motion on a few slides',   perSlide: 75  },
    { id: 'most', label: 'Most slides', rowLabel: 'Motion on most slides',    perSlide: 150 }
  ],

  /* Slider bounds shared by both slide inputs (Design slides and
     Scripting slides). Each input scrolls independently within these
     bounds; design slides drive design hours, scripting slides drive
     writing hours. */
  slides: {
    min: 5,
    max: 150,
    step: 1
  },

  /* Writing and content depth. Each level lists its ABSOLUTE base
     hours per deck; what you see is what that level costs before
     modifiers. */
  depthLevels: [
    {
      id: 'mods',
      label: 'Light copyedits only',
      hours: { writing: 6,  speakerMgmt: 2,  design: 20, designDir: 3, pm: 6,  qc: 5 }
    },
    {
      id: 'script',
      label: 'Scripting from framework',
      hours: { writing: 24, speakerMgmt: 8,  design: 20, designDir: 3, pm: 8,  qc: 6 }
    },
    {
      id: 'full',
      label: 'Full narrative + scripting',
      hours: { writing: 48, speakerMgmt: 22, design: 20, designDir: 8, pm: 10, qc: 7 }
    }
  ],

  /* Modifiers added on top of the depth-level base hours. */
  modifiers: {
    slidesIncluded: 20,                 /* slides above this add design AND writing hours */
    designHoursPerExtraSlide: 0.6,      /* per design slide above slidesIncluded */
    /* Writing hours per scripting slide above slidesIncluded, indexed
       by writing depth: Light copyedits, Scripting, Full narrative.
       Light copyedits do not scale with slide count. */
    writingHoursPerExtraSlide: { byDepth: [0, 0.5, 0.75] },
    speakerMgmtHoursPerSpeaker: 3,
    perEditRound: { design: 4, writing: 2 },
    perDryRun:    { pm: 4, writing: 3 }
  },

  /* Stepper limits. On-site days of 0 means no on-site support. */
  limits: {
    symposiums: { min: 1, max: 10 },
    speakers:   { min: 1, max: 12 },
    edits:      { min: 0, max: 10 },
    dryRuns:    { min: 0, max: 6 },
    onSiteDays: { min: 0, max: 5 }
  },

  /* Service-level tiers. These are independent options that can
     apply to ANY symposium; they are not bound to locations.
     Selecting a tier loads these inputs; changing any input
     afterward shows the configuration as Custom. */
  tiers: [
    {
      id: 'lean',
      label: 'Lean',
      tagline: 'Light copyedits, light support',
      preset: { designSlides: 20, scriptSlides: 20, depth: 'mods',   speakers: 3, edits: 2, dryRuns: 1, onSiteDays: 0, motionLevel: 'none' }
    },
    {
      id: 'signature',
      label: 'Signature',
      tagline: 'Scripting and speaker support',
      preset: { designSlides: 35, scriptSlides: 35, depth: 'script', speakers: 4, edits: 3, dryRuns: 2, onSiteDays: 0, motionLevel: 'few' }
    },
    {
      id: 'premium',
      label: 'Premium',
      tagline: 'Full narrative, full coverage',
      preset: { designSlides: 50, scriptSlides: 50, depth: 'full',   speakers: 5, edits: 4, dryRuns: 2, onSiteDays: 2, motionLevel: 'most' }
    }
  ],

  /* Initial UI state. */
  defaults: {
    quickTier: 'signature',
    symposiumCount: 3,
    showBreakdown: true
  }
};
