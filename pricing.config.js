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

  /* Slide bands. The slide modifier uses the band's slide count. */
  slideBands: [
    { id: 'b20', label: 'Up to 20', slides: 20 },
    { id: 'b35', label: 'Up to 35', slides: 35 },
    { id: 'b50', label: 'Up to 50', slides: 50 }
  ],

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
    slidesIncluded: 20,                 /* slides above this add design hours */
    designHoursPerExtraSlide: 0.6,
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
      preset: { band: 'b20', depth: 'mods',   speakers: 3, edits: 2, dryRuns: 1, onSiteDays: 0 }
    },
    {
      id: 'signature',
      label: 'Signature',
      tagline: 'Scripting and speaker support',
      preset: { band: 'b35', depth: 'script', speakers: 4, edits: 3, dryRuns: 2, onSiteDays: 0 }
    },
    {
      id: 'premium',
      label: 'Premium',
      tagline: 'Full narrative, full coverage',
      preset: { band: 'b50', depth: 'full',   speakers: 5, edits: 4, dryRuns: 2, onSiteDays: 2 }
    }
  ],

  /* The three events. Confirmed facts: the events exist and sit at
     different readiness levels (the only per-event distinction the
     client gave us). recommendedTier is OUR suggested starting
     point based on readiness; it is a changeable default, not an
     identity. Any symposium can run at any service level. */
  symposiums: [
    {
      id: 'london',
      label: 'Symposium 1',
      readiness: 'Content is already written. We recommend starting light: modification and polish of the existing deck.',
      recommendedTier: 'lean'
    },
    {
      id: 'ottawa',
      label: 'Symposium 2',
      readiness: 'An owner is in place, but the story still needs writing. We recommend starting with scripting-level support.',
      recommendedTier: 'signature'
    },
    {
      id: 'canberra',
      label: 'Symposium 3',
      readiness: 'Starting from scratch. We recommend a full narrative build with the deepest coverage.',
      recommendedTier: 'premium'
    }
  ],

  /* Initial UI state. */
  defaults: {
    mode: 'quick',            /* 'quick' or 'per' */
    quickTier: 'signature',
    symposiumCount: 3,
    showBreakdown: true
  }
};
