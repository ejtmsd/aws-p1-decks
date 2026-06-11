/* ============================================================
   PRICING CONFIG - AWS 1P Public Sector Symposiums
   ------------------------------------------------------------
   Every rate, hour formula, tier preset, and default for the
   pricing configurator lives in this file. Edit numbers here;
   no other file contains pricing data.

   NOTE: All values are PLACEHOLDERS pending confirmation.
   ============================================================ */

window.PRICING_CONFIG = {

  /* Displayed prices round to the nearest roundTo dollars.
     The role breakdown table shows exact math. */
  roundTo: 250,

  /* Hourly rates per role. Order here controls row order in
     the breakdown table. */
  roles: [
    { key: 'writing',     label: 'Content Strategy / Writing', rate: 185 },
    { key: 'speakerMgmt', label: 'Speaker Management',         rate: 185 },
    { key: 'design',      label: 'Design',                     rate: 175 },
    { key: 'designDir',   label: 'Design Direction',           rate: 200 },
    { key: 'pm',          label: 'Project Management',         rate: 175 },
    { key: 'qc',          label: 'Quality Control',            rate: 100 }
  ],

  /* On-site support is a flat day rate, not hourly. */
  onSite: {
    label: 'On-Site Support',
    dayRate: 3500
  },

  /* Slide bands. The slide modifier uses the band's slide count. */
  slideBands: [
    { id: 'b20', label: 'Up to 20', slides: 20 },
    { id: 'b35', label: 'Up to 35', slides: 35 },
    { id: 'b50', label: 'Up to 50', slides: 50 }
  ],

  /* Writing and content depth. Hours are CUMULATIVE: each level
     starts from the previous level's hours and adds addHours. */
  depthLevels: [
    {
      id: 'mods',
      label: 'Deck mods only',
      baseHours: { design: 20, designDir: 3, pm: 6, qc: 5, writing: 4, speakerMgmt: 0 }
    },
    {
      id: 'script',
      label: 'Scripting from framework',
      addHours: { writing: 16, speakerMgmt: 8 }
    },
    {
      id: 'full',
      label: 'Full narrative + scripting',
      addHours: { writing: 28, speakerMgmt: 14, designDir: 5 }
    }
  ],

  /* Modifiers added on top of the depth-level base hours. */
  modifiers: {
    slidesIncluded: 20,                 /* slides above this add design hours */
    designHoursPerExtraSlide: 0.6,
    speakerMgmtHoursPerSpeaker: 3,
    perEditRound: { design: 4, writing: 2 },
    perDryRun:    { pm: 4, writing: 3 }
  },

  /* Stepper limits. */
  limits: {
    symposiums: { min: 1, max: 3 },
    speakers:   { min: 1, max: 12 },
    edits:      { min: 0, max: 10 },
    dryRuns:    { min: 0, max: 6 },
    onSiteDays: { min: 1, max: 5 }
  },

  /* Tier presets. Selecting a tier loads these inputs; changing
     any input afterward shows the configuration as Custom. */
  tiers: [
    {
      id: 'lean',
      label: 'Lean',
      tagline: 'Deck mods, light support',
      preset: { band: 'b20', depth: 'mods',   speakers: 3, edits: 2, dryRuns: 1, onSiteOn: false, onSiteDays: 1 }
    },
    {
      id: 'signature',
      label: 'Signature',
      tagline: 'Scripting and speaker support',
      preset: { band: 'b35', depth: 'script', speakers: 4, edits: 3, dryRuns: 2, onSiteOn: true,  onSiteDays: 1 }
    },
    {
      id: 'premium',
      label: 'Premium',
      tagline: 'Full narrative, full coverage',
      preset: { band: 'b50', depth: 'full',   speakers: 5, edits: 4, dryRuns: 3, onSiteOn: true,  onSiteDays: 2 }
    }
  ],

  /* The three symposiums and their default tiers, reflecting
     real readiness: London is largely written, Ottawa is
     writing-heavy, Canberra is a full build. */
  symposiums: [
    { id: 'london',   label: 'London',   defaultTier: 'lean' },
    { id: 'ottawa',   label: 'Ottawa',   defaultTier: 'signature' },
    { id: 'canberra', label: 'Canberra', defaultTier: 'premium' }
  ],

  /* Initial UI state. */
  defaults: {
    mode: 'quick',            /* 'quick' or 'per' */
    quickTier: 'signature',
    symposiumCount: 3,
    showBreakdown: true
  }
};
