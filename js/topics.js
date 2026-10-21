/**
 * UX Roulette - Smart Topic Engine & Global UI Design Style Coordinator
 * Everyday Human Topic Phrasing + Design Hint/Overview + Problem to Solve
 * Authentic Global UI Design Styles (Prominently featuring African UI styles).
 */

const PALETTE = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#3b82f6', // Blue
  '#f43f5e', // Rose
  '#14b8a6', // Teal
  '#a855f7', // Purple
  '#fb923c', // Orange
  '#0284c7'  // Sky
];

const TOPIC_ICON_PATHS = {
  plane: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  card: "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm0 5h20M6 15h4",
  package: "m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
  zen: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-12a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  watch: "M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 2a4 4 0 1 1-4 4 4 4 0 0 1 4-4zm-1 2v3h3M9 2h6v4H9zm0 16h6v4H9z",
  layout: "M3 3h7v9H3zm11 0h7v5h-7zm0 9h7v9h-7zM3 16h7v5H3z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  pen: "m18 2 4 4-12 12H6v-4L18 2zM14 6l4 4",
  coffee: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zm4-7v3m4-3v3m4-3v3",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  globe: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 17.93A8 8 0 0 1 4.07 13H7a14.2 14.2 0 0 0 2 6.93zM4.07 11A8 8 0 0 1 11 4.07 14.2 14.2 0 0 0 9 11zm8 8.93c1.3-1.8 2-4.2 2-6.93H10c0 2.73.7 5.13 2 6.93zM10 11h4a12 12 0 0 0-2-6.93A12 12 0 0 0 10 11zm5 6.93A14.2 14.2 0 0 0 17 13h2.93A8 8 0 0 1 15 17.93zM17 11a14.2 14.2 0 0 0-2-6.93A8 8 0 0 1 19.93 11z",
  bot: "M12 8V4H8M2 14h2m16 0h2m-4-6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8zm-7 4h.01M15 12h.01",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z",
  compass: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.6 6.4-2.1 5.9-5.9 2.1 2.1-5.9 5.9-2.1z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z",
  rocket: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  music: "M9 18V5l12-2v13M9 9l12-2M6 18a3 3 0 1 0 3-3 3 3 0 0 0-3 3zm12-2a3 3 0 1 0 3-3 3 3 0 0 0-3 3z",
  clock: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4v6l4 2",
  leaf: "M11 20A7 7 0 0 1 4 13c0-4.4 3.6-8 8-8 4 0 8 2 8 8 0 4-4 7-9 7zm0 0v-8"
};
window.TOPIC_ICON_PATHS = TOPIC_ICON_PATHS;

function getTopicIconSVG(iconKey, size = 14) {
  const pathD = TOPIC_ICON_PATHS[iconKey] || TOPIC_ICON_PATHS.spark;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${pathD}"/></svg>`;
}
window.getTopicIconSVG = getTopicIconSVG;

// ============================================================================
// GLOBAL UI DESIGN STYLES CATALOG
// Grounded in real-world regional design philosophies, with special prominence
// given to authentic African UI styles, Asian, European, and American aesthetics.
// ============================================================================
const GLOBAL_UI_STYLES = [
  // --- African UI Design Styles ---
  {
    id: 'afro_futurism',
    name: 'Afro-Modernist Tech',
    region: 'Africa',
    subRegion: 'Pan-African & Silicon Savannah',
    vibe: 'High-contrast dark mode with electric cyan and solar gold accents, woven geometric card borders, and battery-efficient layout.',
    principles: 'Optimized for high outdoor sunlight, data-efficient micro-assets, and rich cultural rhythm with zero clutter.',
    palette: ['#0a0e17', '#00f0ff', '#f59e0b', '#10b981', '#f8fafc'],
    typography: 'Modern Geometric Sans with high x-height (e.g. Syne / Space Grotesk)'
  },
  {
    id: 'naija_fintech',
    name: 'Lagos FinTech Neo-Bank',
    region: 'Africa',
    subRegion: 'Nigeria (Lagos Tech Hub)',
    vibe: 'Deep midnight obsidian with crisp emerald verification green, prominent numeric hierarchy, and biometric one-touch cards.',
    principles: 'Radical fee transparency, high-trust security guarantees, one-thumb reachability, and offline-resilient micro-states.',
    palette: ['#090d1a', '#10b981', '#38bdf8', '#6366f1', '#ffffff'],
    typography: 'Ultra-clear tabular numbers & clean crisp sans (e.g. Plus Jakarta Sans)'
  },
  {
    id: 'sahel_terracotta',
    name: 'Sahelian Earth-Tone Minimal',
    region: 'Africa',
    subRegion: 'West & North Africa (Sahel Belt)',
    vibe: 'Warm desert sand, baked terracotta clay, deep indigo accents, and organic card curves with subtle textile dividers.',
    principles: 'Warm human resonance, tactile stacked cards, calm grounded hierarchy, and natural earthy warmth.',
    palette: ['#1c1815', '#e07a5f', '#f4a261', '#3d405b', '#f9f6f0'],
    typography: 'Warm Humanist Sans with organic curves (e.g. Outfit / Epilogue)'
  },
  {
    id: 'kente_modular',
    name: 'Geometric Modular Bento',
    region: 'Africa',
    subRegion: 'Ghana (Accra)',
    vibe: 'Structured interlocking bento grid with golden yellow, royal crimson, and forest emerald accents over deep charcoal.',
    principles: 'Celebrated heritage geometry, modular content hierarchy, rhythmic spacing, and bold visual anchors.',
    palette: ['#121214', '#eab308', '#ef4444', '#15803d', '#fafafa'],
    typography: 'Bold Display Heading paired with ultra-legible Body (e.g. Clash Display + Inter)'
  },
  {
    id: 'swahili_glass',
    name: 'Swahili Glassmorphism',
    region: 'Africa',
    subRegion: 'East African Coast (Zanzibar & Mombasa)',
    vibe: 'Breezy coastal whitespace, frosted glass cards over deep sea teal, soft mother-of-pearl accents, and tranquil rounded pills.',
    principles: 'Airy cognitive breathing room, tranquil visual hierarchy, graceful touch targets, and serene interaction cadence.',
    palette: ['#081c24', '#06b6d4', '#14b8a6', '#f0fdfa', '#ffffff'],
    typography: 'Light, airy modern sans with generous tracking'
  },
  {
    id: 'joburg_industrial',
    name: 'Joburg Industrial Modern',
    region: 'Africa',
    subRegion: 'South Africa (Johannesburg)',
    vibe: 'Raw slate grey, crisp industrial typography, punchy warning orange highlights, and structured card borders with brutalist precision.',
    principles: 'Direct visual hierarchy, high scannability, utilitarian clarity, and unapologetic structural honesty.',
    palette: ['#181a1d', '#f97316', '#e2e8f0', '#475569', '#ffffff'],
    typography: 'Monospaced metadata + Heavy Industrial Grotesk'
  },

  // --- Asian UI Design Styles ---
  {
    id: 'japan_zen',
    name: 'Japanese Minimalist Zen',
    region: 'Asia',
    subRegion: 'Japan (Kyoto & Tokyo)',
    vibe: 'Delicate hairline dividers, generous intentional whitespace, muted stone & sumi ink accents, and serene focus.',
    principles: 'Extreme cognitive calm, single primary action focus, meditative clarity, and zero decorative distraction.',
    palette: ['#141414', '#a3a3a3', '#d4d4d4', '#dc2626', '#ffffff'],
    typography: 'Clean, disciplined grotesk with light weights'
  },
  {
    id: 'korean_pastel',
    name: 'Korean Soft Neo-Card',
    region: 'Asia',
    subRegion: 'South Korea (Seoul)',
    vibe: 'Pillowy rounded cards (24px+), soft diffused shadows, gentle friendly pastel badges, and welcoming micro-copy.',
    principles: 'Approachable empathy, low cognitive friction, and friendly delightful micro-interactions.',
    palette: ['#0f172a', '#a78bfa', '#38bdf8', '#f472b6', '#ffffff'],
    typography: 'Soft rounded geometric sans'
  },
  {
    id: 'tokyo_hud',
    name: 'Cyberpunk HUD Interface',
    region: 'Asia',
    subRegion: 'Japan (Tokyo / Shinjuku)',
    vibe: 'Dense dark telemetry, electric magenta & cyan borders, mono-spaced data tags, and glowing status markers.',
    principles: 'High-information density, rapid glanceability, and futuristic tactile feedback.',
    palette: ['#050811', '#ff007f', '#00e5ff', '#3b82f6', '#ffffff'],
    typography: 'Technical Monospace + Compact Sans'
  },

  // --- European UI Design Styles ---
  {
    id: 'swiss_typo',
    name: 'Swiss International Style',
    region: 'Europe',
    subRegion: 'Switzerland (Zurich & Basel)',
    vibe: 'Mathematical grid alignment, stark black/white contrast with vivid red accent, heavy grotesque typography, and zero decoration.',
    principles: 'Content-as-interface, uncompromising typographic hierarchy, and mathematical clarity.',
    palette: ['#09090b', '#ffffff', '#ef4444', '#71717a', '#27272a'],
    typography: 'Neutral grotesque (Helvetica / Neue Haas / Inter)'
  },
  {
    id: 'scandi_functional',
    name: 'Scandinavian Functionalism',
    region: 'Europe',
    subRegion: 'Denmark & Sweden (Nordic)',
    vibe: 'Soft muted slate, forest sage, warm birchwood accents, generous ergonomics, and natural breathing room.',
    principles: 'Democratic design, honest ergonomics, accessible for all ages, and clutter-free utility.',
    palette: ['#181a1d', '#10b981', '#94a3b8', '#f59e0b', '#f1f5f9'],
    typography: 'Warm Humanist Grotesk'
  },
  {
    id: 'french_editorial',
    name: 'Editorial Serif & Luxury Minimal',
    region: 'Europe',
    subRegion: 'France (Paris)',
    vibe: 'Sophisticated serif headlines, hairline gold & cream borders, editorial multi-column flow, and restrained elegance.',
    principles: 'Storytelling visual flow, elevated aesthetics, meticulous breathing space, and high craft.',
    palette: ['#121110', '#d4af37', '#f5f5f0', '#78716c', '#ffffff'],
    typography: 'High-contrast Serif headlines paired with clean Sans body'
  },

  // --- Americas & Contemporary Global UI Styles ---
  {
    id: 'brazil_modern',
    name: 'Brazilian Organic Modernism',
    region: 'Americas',
    subRegion: 'Brazil (São Paulo & Rio)',
    vibe: 'Sweeping Niemeyer-inspired wave curves, deep botanical green, terracotta highlights, and vibrant lively rhythm.',
    principles: 'Organic fluid motion, human-centric warmth, dynamic card transitions, and expressive energy.',
    palette: ['#0c1913', '#059669', '#ea580c', '#facc15', '#ffffff'],
    typography: 'Organic, curved modern display sans'
  },
  {
    id: 'bento_grid',
    name: 'Modern Bento Grid',
    region: 'Global',
    subRegion: 'Modern Tech & Silicon Valley',
    vibe: 'Asymmetrical modular compartments, inner-glow borders, interactive status pills, and dense glanceable hierarchy.',
    principles: 'Scannable modular blocks, progressive disclosure, and responsive reflow.',
    palette: ['#090d16', '#6366f1', '#06b6d4', '#8b5cf6', '#ffffff'],
    typography: 'Contemporary tech sans with tight tracking'
  },
  {
    id: 'neo_brutalism',
    name: 'High-Contrast Neo-Brutalism',
    region: 'Global',
    subRegion: 'Global Indie Web',
    vibe: '2.5px solid black borders, hard dropped 4px box shadows without blur, saturated color blocks, and high affordance.',
    principles: 'Unmistakable interactive affordance, zero ambiguity, bold tactile presence, and accessible contrast.',
    palette: ['#18181b', '#facc15', '#ec4899', '#06b6d4', '#ffffff'],
    typography: 'Heavy bold grotesque with high contrast'
  }
];
window.GLOBAL_UI_STYLES = GLOBAL_UI_STYLES;

function getUIStyleById(styleId) {
  return GLOBAL_UI_STYLES.find(s => s.id === styleId) || GLOBAL_UI_STYLES[0];
}
window.getUIStyleById = getUIStyleById;

function getRandomUIStyle(excludeId = null) {
  const pool = excludeId ? GLOBAL_UI_STYLES.filter(s => s.id !== excludeId) : GLOBAL_UI_STYLES;
  return pool[Math.floor(Math.random() * pool.length)];
}
window.getRandomUIStyle = getRandomUIStyle;

function resolveTopicVisuals(topic) {
  if (!topic) return { iconKey: 'spark', shortLabel: 'Challenge' };
  
  if (topic.iconKey && topic.shortLabel) {
    return { iconKey: topic.iconKey, shortLabel: topic.shortLabel };
  }

  const raw = topic.text || topic.title || 'Design Challenge';
  const text = raw.toLowerCase();

  let iconKey = topic.iconKey || '';
  if (!iconKey) {
    if (text.includes('coffee') || text.includes('tea') || text.includes('cafe')) iconKey = 'coffee';
    else if (text.includes('bill') || text.includes('rent') || text.includes('money') || text.includes('wallet') || text.includes('bank') || text.includes('pay') || text.includes('spend') || text.includes('invoice') || text.includes('budget')) iconKey = 'card';
    else if (text.includes('flight') || text.includes('seat') || text.includes('airport') || text.includes('travel') || text.includes('trip')) iconKey = 'plane';
    else if (text.includes('sleep') || text.includes('meditation') || text.includes('breathe') || text.includes('calm') || text.includes('zen') || text.includes('wellness')) iconKey = 'zen';
    else if (text.includes('solar') || text.includes('energy') || text.includes('battery') || text.includes('power') || text.includes('electric')) iconKey = 'bolt';
    else if (text.includes('watch') || text.includes('clock') || text.includes('time') || text.includes('timer') || text.includes('schedule')) iconKey = 'watch';
    else if (text.includes('portfolio') || text.includes('showcase') || text.includes('bento') || text.includes('layout') || text.includes('apartment') || text.includes('house')) iconKey = 'layout';
    else if (text.includes('password') || text.includes('safe') || text.includes('security') || text.includes('lock') || text.includes('shield') || text.includes('emergency')) iconKey = 'shield';
    else if (text.includes('workout') || text.includes('gym') || text.includes('exercise') || text.includes('running') || text.includes('fitness') || text.includes('health') || text.includes('doctor') || text.includes('clinic')) iconKey = 'activity';
    else if (text.includes('whiteboard') || text.includes('canvas') || text.includes('notes') || text.includes('brainstorm') || text.includes('write') || text.includes('tutor')) iconKey = 'pen';
    else if (text.includes('book') || text.includes('library') || text.includes('recipe') || text.includes('journal') || text.includes('course')) iconKey = 'book';
    else if (text.includes('camera') || text.includes('photo') || text.includes('video')) iconKey = 'camera';
    else if (text.includes('music') || text.includes('song') || text.includes('sound') || text.includes('radio') || text.includes('podcast')) iconKey = 'music';
    else if (text.includes('plant') || text.includes('garden') || text.includes('flower') || text.includes('leaf') || text.includes('farm') || text.includes('produce')) iconKey = 'leaf';
    else if (text.includes('map') || text.includes('compass') || text.includes('hike') || text.includes('trail') || text.includes('bus') || text.includes('transit') || text.includes('ride')) iconKey = 'compass';
    else if (text.includes('box') || text.includes('grocery') || text.includes('shop') || text.includes('delivery') || text.includes('package') || text.includes('market')) iconKey = 'package';
    else if (text.includes('chat') || text.includes('message') || text.includes('language') || text.includes('talk')) iconKey = 'chat';
    else iconKey = 'spark';
  }

  let shortLabel = topic.shortLabel || '';
  if (!shortLabel) {
    const words = raw.split(/\s+/);
    if (words.length <= 3) {
      shortLabel = words.join(' ');
    } else {
      shortLabel = words.slice(0, 2).join(' ');
    }
    if (shortLabel.length > 18) {
      shortLabel = shortLabel.slice(0, 16) + '…';
    }
  }

  return { iconKey, shortLabel };
}
window.resolveTopicVisuals = resolveTopicVisuals;

// ============================================================================
// DEFAULT WHEEL TOPICS
// 100% everyday natural language names normal people use, complete with
// design hint/overview, specific UX problem to solve, and assigned UI style.
// ============================================================================
const DEFAULT_TOPICS = [
  {
    id: 'top_1',
    text: 'Flight booking & seat selector',
    shortLabel: 'Flight Picker',
    iconKey: 'plane',
    category: 'Travel',
    deliverable: 'Mobile App',
    uxFocus: 'Interactive Seat Map & Transparent Price Breakdown',
    about: 'A mobile reservation flow that lets travelers pick flights, compare cabin classes, and choose their exact airplane seats on an interactive map.',
    problem: 'Travelers struggle with hidden add-on fees during checkout and find cabin seat maps cramped and hard to navigate on small mobile screens.',
    style: getUIStyleById('swiss_typo'),
    color: PALETTE[0],
    active: true
  },
  {
    id: 'top_2',
    text: 'Roommate expense & bill splitter',
    shortLabel: 'Bill Splitter',
    iconKey: 'card',
    category: 'FinTech',
    deliverable: 'Mobile App',
    uxFocus: 'Receipt Scanning & One-Tap Balance Settle',
    about: 'An app for housemates to log utility bills, scan shared grocery receipts, split costs unequally when needed, and settle balances instantly.',
    problem: 'Social awkwardness and calculation errors when splitting household bills, leading to delayed payments and unresolved debts between friends.',
    style: getUIStyleById('naija_fintech'),
    color: PALETTE[1],
    active: true
  },
  {
    id: 'top_3',
    text: 'Grocery delivery & weekly meal box',
    shortLabel: 'Grocery Box',
    iconKey: 'package',
    category: 'E-Commerce',
    deliverable: 'Mobile App',
    uxFocus: 'Dietary Filter Toggles & One-Tap Reorders',
    about: 'An online supermarket delivery service where users select weekly dinner recipes and automatically add the exact fresh ingredients to their cart.',
    problem: 'High cart abandonment caused by complicated ingredient quantity conversions and frustrating out-of-stock item replacements.',
    style: getUIStyleById('scandi_functional'),
    color: PALETTE[2],
    active: true
  },
  {
    id: 'top_4',
    text: 'Meditation & bedtime sleep timer',
    shortLabel: 'Sleep Timer',
    iconKey: 'zen',
    category: 'Wellness',
    deliverable: 'Mobile App',
    uxFocus: 'Calming Dark UI & Tactile Breathing Gauge',
    about: 'A bedtime relaxation companion featuring ambient nature soundscapes, guided breathing exercises, and an automatic gentle sleep shutoff timer.',
    problem: 'Harsh screen brightness and confusing menus wake users up right before sleeping when they just want to tap once and put their phone away.',
    style: getUIStyleById('japan_zen'),
    color: PALETTE[3],
    active: true
  },
  {
    id: 'top_5',
    text: 'Home solar & electricity monitor',
    shortLabel: 'Solar Monitor',
    iconKey: 'bolt',
    category: 'Smart Home',
    deliverable: 'Tablet UI',
    uxFocus: 'Live Power Flow Animation & Battery Level Gauge',
    about: 'A home dashboard displaying real-time rooftop solar generation, home battery reserve, and notifications for the cheapest hours to run laundry.',
    problem: 'Homeowners find kilowatt-hour charts confusing and need clear, plain-language recommendations on how to cut electricity bills today.',
    style: getUIStyleById('afro_futurism'),
    color: PALETTE[4],
    active: true
  },
  {
    id: 'top_6',
    text: 'Doctor appointment & clinic check-in',
    shortLabel: 'Doctor Visit',
    iconKey: 'activity',
    category: 'Healthcare',
    deliverable: 'Mobile App',
    uxFocus: 'Verified Provider Cards & Digital Medical Intake',
    about: 'A patient portal to find nearby doctors, book open appointment slots, and fill out intake forms on mobile before stepping into the clinic.',
    problem: 'Patients arrive stressed and waste 20 minutes filling out repetitive clipboards in waiting rooms with zero visibility into doctor delay times.',
    style: getUIStyleById('swahili_glass'),
    color: PALETTE[5],
    active: true
  },
  {
    id: 'top_7',
    text: 'Freelancer invoice & client payment',
    shortLabel: 'Invoice App',
    iconKey: 'card',
    category: 'FinTech & Work',
    deliverable: 'Responsive Web',
    uxFocus: 'Clean Invoice Builder & Payment Link Generator',
    about: 'A streamlined tool for independent contractors to generate professional invoices, set automated polite payment reminders, and receive bank deposits.',
    problem: 'Freelancers feel uncomfortable chasing late client payments, and clients delay paying due to complicated PDF forms and tedious bank wire steps.',
    style: getUIStyleById('sahel_terracotta'),
    color: PALETTE[6],
    active: true
  },
  {
    id: 'top_8',
    text: 'Gym workout & weight set counter',
    shortLabel: 'Workout Log',
    iconKey: 'activity',
    category: 'Fitness',
    deliverable: 'Smartwatch / Mobile',
    uxFocus: 'Single-Tap Rep Entry & Barbell Weight Calculator',
    about: 'A high-speed fitness companion to log lifting sets, track rest countdowns, and calculate barbell plate combinations in a crowded gym.',
    problem: 'Typing on a phone while sweaty and out of breath is clumsy; lifters need massive touch targets and haptic rest-timer buzzers.',
    style: getUIStyleById('kente_modular'),
    color: PALETTE[7],
    active: true
  },
  {
    id: 'top_9',
    text: 'Bus countdown & digital transit pass',
    shortLabel: 'Bus Pass',
    iconKey: 'compass',
    category: 'Transit',
    deliverable: 'Mobile App',
    uxFocus: 'Live GPS Arrival Counter & NFC Tap-to-Board',
    about: 'A city transit app showing real-time GPS bus arrival countdowns, platform walking directions, and a quick-swipe digital boarding pass.',
    problem: 'Riders running to catch their bus cannot tell whether the bus is 2 minutes away or already gone, causing missed rides and transit anxiety.',
    style: getUIStyleById('bento_grid'),
    color: PALETTE[8],
    active: true
  },
  {
    id: 'top_10',
    text: 'Apartment hunting & rent lease',
    shortLabel: 'Rent Hunter',
    iconKey: 'layout',
    category: 'Real Estate',
    deliverable: 'Mobile / Web',
    uxFocus: 'Verified Landlord Badges & Digital Lease Signing',
    about: 'A rental property discovery app with verified landlord virtual tours, neighborhood safety scores, and digital lease signing.',
    problem: 'Renters waste time on misleading listings, hidden maintenance fees, and opaque application timelines from property managers.',
    style: getUIStyleById('korean_pastel'),
    color: PALETTE[9],
    active: true
  }
];

// ============================================================================
// PRACTICE TOPIC POOL (Used by Shuffle Ideas feature)
// 100% everyday natural language names that real people say, with design hint,
// problem statement, and diverse global UI styles (balanced African inclusion).
// ============================================================================
const PRACTICE_TOPIC_POOL = [
  {
    text: 'Farmers market fruit & vegetable box',
    shortLabel: 'Farm Basket',
    category: 'Food & E-Commerce',
    deliverable: 'Mobile App',
    uxFocus: 'Harvest Availability & Pickup Time Slots',
    about: 'A community app connecting local urban dwellers directly with small regional farms to order seasonal vegetable crates.',
    problem: 'Shoppers cannot see what produce is actually in season each week, and farmers struggle with erratic weekly preorder quantities.',
    styleId: 'sahel_terracotta'
  },
  {
    text: 'Coffee shop mobile pickup order',
    shortLabel: 'Coffee Pickup',
    category: 'Food & Beverage',
    deliverable: 'Mobile App',
    uxFocus: 'Milk & Sweetener Modifiers with Preparation Bar',
    about: 'A neighborhood coffee order app allowing commuters to customize drinks, prepay, and grab their cup from a contactless pickup shelf.',
    problem: 'Morning counter lines cause people to run late for work, and complex drink customizations frequently get miscommunicated.',
    styleId: 'naija_fintech'
  },
  {
    text: 'Neighborhood lost pet alert & map',
    shortLabel: 'Lost Pet Alert',
    category: 'Community',
    deliverable: 'Mobile App',
    uxFocus: 'Radius Push Notification & Sighting Pins',
    about: 'A hyperlocal alert system where owners post lost pet notices with photos and neighbors drop GPS pins of sightings in real time.',
    problem: 'Panicked pet owners post across fragmented social media groups where critical local sightings get buried under irrelevant comments.',
    styleId: 'afro_futurism'
  },
  {
    text: 'Second-hand clothing buy & sell',
    shortLabel: 'Thrift Shop',
    category: 'E-Commerce',
    deliverable: 'Mobile App',
    uxFocus: 'Garment Condition Ratings & Buyer Protection Badge',
    about: 'A sustainable fashion marketplace for thrifting, trading, and selling pre-owned vintage clothes with prepaid shipping labels.',
    problem: 'Buyers worry about unwashed clothes or counterfeit tags, while sellers find measuring garment dimensions tedious.',
    styleId: 'kente_modular'
  },
  {
    text: 'Personal monthly budget & debt payoff',
    shortLabel: 'Budget App',
    category: 'FinTech',
    deliverable: 'Mobile App',
    uxFocus: 'Envelope Spending Bars & Snowball Debt Tracker',
    about: 'A simple personal finance app that categorizes daily spending, flags recurring subscriptions, and visualizes loan repayment progress.',
    problem: 'Users get overwhelmed by complex banking charts and abandon budgeting apps that make them feel guilty about small daily purchases.',
    styleId: 'naija_fintech'
  },
  {
    text: 'Language exchange practice with locals',
    shortLabel: 'Language Chat',
    category: 'Education',
    deliverable: 'Mobile App',
    uxFocus: 'Voice Note Corrections & Icebreaker Prompts',
    about: 'An app matching language learners around the world for 15-minute split conversations (half in your native language, half in theirs).',
    problem: 'Learners feel intimidated speaking with strangers and conversations stall quickly without structured conversational prompts.',
    styleId: 'swahili_glass'
  },
  {
    text: 'Public library book reserve & loan reminder',
    shortLabel: 'Library Card',
    category: 'Public Services',
    deliverable: 'Mobile App',
    uxFocus: 'Barcode Card Wallet & 1-Tap Hold Renewal',
    about: 'A digital library card to browse city catalog books, place holds on popular novels, and receive alerts before overdue fines kick in.',
    problem: 'Patrons forget return deadlines, lose track of reserve hold positions, and misplace physical plastic membership cards.',
    styleId: 'swiss_typo'
  },
  {
    text: 'Emergency blood donor & hospital finder',
    shortLabel: 'Blood Donor',
    category: 'Healthcare',
    deliverable: 'Mobile App',
    uxFocus: 'Urgent Blood Type Match & Hospital Route Navigation',
    about: 'A critical health app alerting nearby verified donors when local hospitals experience urgent shortages of specific blood types.',
    problem: 'Families spend frantic hours calling acquaintances during medical emergencies because hospitals lack instant donor broadcast channels.',
    styleId: 'afro_futurism'
  },
  {
    text: 'Home plant watering & disease diagnosis',
    shortLabel: 'Plant Doctor',
    category: 'Smart Living',
    deliverable: 'Mobile App',
    uxFocus: 'Camera Leaf Scanner & Sunlight Meter',
    about: 'A houseplant care assistant that identifies yellowing leaves via smartphone camera and schedules moisture-aware watering reminders.',
    problem: 'Beginner plant owners either overwater or underwater their indoor plants because care tags are generic and ignore season/climate.',
    styleId: 'scandi_functional'
  },
  {
    text: 'Electric vehicle charging station finder',
    shortLabel: 'EV Charger',
    category: 'Automotive',
    deliverable: 'Mobile / In-Car',
    uxFocus: 'Plug Compatibility Filter & Live Stall Availability',
    about: 'A map for EV drivers showing functional charging plugs, real-time stall occupancy, charging speeds, and nearby cafe amenities.',
    problem: 'Drivers arrive with low battery only to find broken charging stations, long queues, or incompatible connector plugs.',
    styleId: 'joburg_industrial'
  },
  {
    text: 'Campus carpool & student ride share',
    shortLabel: 'Campus Ride',
    category: 'Transit',
    deliverable: 'Mobile App',
    uxFocus: 'Verified Student ID & Gas Cost Contribution Split',
    about: 'A safe ridesharing network for university students commuting between student housing, suburban campuses, and weekend hometowns.',
    problem: 'Public transit between campuses is slow, while private taxis are unaffordable for students on tight college budgets.',
    styleId: 'kente_modular'
  },
  {
    text: 'Pet vet appointment & vaccination log',
    shortLabel: 'Pet Health',
    category: 'Pet Care',
    deliverable: 'Mobile App',
    uxFocus: 'Vaccine Certificate Vault & Flea Medication Reminder',
    about: 'A pet healthcare passport storing official rabies certificates, vet visit history, and push notifications for monthly medication.',
    problem: 'Pet owners lose paper vaccination cards needed for boarding kennels, and forget crucial annual booster appointments.',
    styleId: 'korean_pastel'
  },
  {
    text: 'Restaurant table & meal preorder',
    shortLabel: 'Table Preorder',
    category: 'Hospitality',
    deliverable: 'Mobile Web',
    uxFocus: 'Party Size Availability & Kitchen Dietary Notes',
    about: 'A dining app allowing dinner guests to reserve tables and preorder appetizers so food arrives shortly after sitting down.',
    problem: 'Busy lunch diners with 45-minute work breaks waste 30 minutes waiting for food to be cooked and another 10 waiting for the bill.',
    styleId: 'french_editorial'
  },
  {
    text: 'Household recycling guide & pickup alert',
    shortLabel: 'Recycle Guide',
    category: 'Civic Tech',
    deliverable: 'Mobile App',
    uxFocus: 'Packaging Barcode Scanner & Bin Color Schedule',
    about: 'A city app where residents scan consumer packaging barcodes to find out whether an item goes in the paper, plastic, or compost bin.',
    problem: 'Confusing recycling symbols cause widespread contamination in municipal waste bins, resulting in entire truckloads going to landfills.',
    styleId: 'scandi_functional'
  },
  {
    text: 'Local artisan craft & pottery market',
    shortLabel: 'Artisan Market',
    category: 'Crafts',
    deliverable: 'Responsive Web',
    uxFocus: 'Maker Story Video Cards & Custom Commission Form',
    about: 'A digital marketplace showcasing handmade ceramics, woven textiles, and woodworking from verified independent local makers.',
    problem: 'Independent creators struggle to stand out on massive commercial e-commerce websites filled with mass-produced dropshipped items.',
    styleId: 'sahel_terracotta'
  },
  {
    text: 'Podcast player with chapter bookmarks',
    shortLabel: 'Podcast Queue',
    category: 'Audio',
    deliverable: 'Mobile App',
    uxFocus: 'Clickable Transcript Search & Smart Silence Skip',
    about: 'An audio app designed for educational podcasts with interactive transcripts, searchable keywords, and saved 30-second audio clips.',
    problem: 'Listeners hear a memorable insight on a 2-hour podcast while walking or driving, but have no easy way to save or reference that exact moment later.',
    styleId: 'bento_grid'
  },
  {
    text: 'Daily water intake & hydration reminder',
    shortLabel: 'Water Tracker',
    category: 'Health',
    deliverable: 'Mobile Widget',
    uxFocus: 'Quick-Add Container Buttons & Daily Hydration Ring',
    about: 'A fast hydration companion with one-tap buttons for standard glasses, water bottles, and teas with smart daylight reminders.',
    problem: 'People forget to drink water during intense desk work, and existing health apps require too many taps to log a simple cup of water.',
    styleId: 'swahili_glass'
  },
  {
    text: 'High school tutor booking & homework help',
    shortLabel: 'Tutor Help',
    category: 'Education',
    deliverable: 'Mobile / Tablet',
    uxFocus: 'Subject Match Badges & Virtual Whiteboard Session',
    about: 'A platform connecting high school students with qualified university tutors for 30-minute targeted math and science review sessions.',
    problem: 'Parents find private tutoring agencies exorbitantly expensive, while students need quick help on specific homework problems tonight.',
    styleId: 'naija_fintech'
  },
  {
    text: 'Music concert ticket swap & fair resale',
    shortLabel: 'Ticket Swap',
    category: 'Entertainment',
    deliverable: 'Mobile App',
    uxFocus: 'Face-Value Price Cap & Dynamic Anti-Scalp QR Code',
    about: 'A fair-price ticket exchange for live music and theater, allowing fans to safely resell tickets they can no longer use at original face value.',
    problem: 'Secondary ticket sites allow bots and scalpers to charge 400% markups, leaving real fans unable to attend shows.',
    styleId: 'neo_brutalism'
  },
  {
    text: 'Package locker pickup',
    shortLabel: 'Locker Pickup',
    category: 'Logistics',
    deliverable: 'Mobile App',
    uxFocus: 'Bluetooth Proximity Door Unlock & Delivery Code',
    about: 'A contactless delivery app that guides package recipients to local neighborhood locker hubs and pops open the locker door with one button.',
    problem: 'Porch package theft is widespread, while traditional post office pickup desks have long queues and limited working hours.',
    styleId: 'joburg_industrial'
  },
  {
    text: 'Pharmacy prescription refill & reminder',
    shortLabel: 'Pill Refill',
    category: 'Healthcare',
    deliverable: 'Mobile App',
    uxFocus: 'Bottle Barcode Scanner & Delivery Status Tracker',
    about: 'An accessible pharmacy tool to scan prescription pill bottles, request automatic refills from doctors, and schedule home delivery.',
    problem: 'Elderly patients and busy caregivers lose track of pill counts and face stressful gaps in daily essential medications.',
    styleId: 'swiss_typo'
  },
  {
    text: 'Plumber & electrician home repair booking',
    shortLabel: 'Home Repair',
    category: 'Home Services',
    deliverable: 'Mobile App',
    uxFocus: 'Photo Damage Uploader & Upfront Fixed-Price Quotes',
    about: 'An on-demand home maintenance app matching homeowners with licensed plumbers and electricians with transparent upfront hourly rates.',
    problem: 'Homeowners face unexpected gouged repair bills and have no reliable way to verify trade licenses or insurance coverage.',
    styleId: 'brazil_modern'
  },
  {
    text: 'Car oil change & maintenance schedule',
    shortLabel: 'Car Service',
    category: 'Automotive',
    deliverable: 'Mobile App',
    uxFocus: 'Mileage Due Counter & Trusted Mechanic Booking',
    about: 'A vehicle maintenance tracker logging tire rotations, oil change intervals, and brake pad inspections based on actual mileage.',
    problem: 'Drivers ignore dashboard maintenance lights because they suspect repair garages will invent unnecessary replacement items.',
    styleId: 'joburg_industrial'
  },
  {
    text: 'Baby feeding & sleep schedule log',
    shortLabel: 'Baby Tracker',
    category: 'Family',
    deliverable: 'Mobile App',
    uxFocus: 'One-Handed Night Mode Log & Partner Cloud Sync',
    about: 'A sleep-deprived parent companion to log nursing times, bottle ounces, diaper changes, and sleep windows with one hand in the dark.',
    problem: 'New parents are exhausted at 3 AM and struggle to remember when the infant was last fed or which side they nursed on.',
    styleId: 'korean_pastel'
  },
  {
    text: 'Local hiking trail map & offline GPS',
    shortLabel: 'Trail Guide',
    category: 'Outdoors',
    deliverable: 'Mobile Offline',
    uxFocus: 'Elevation Contour Chart & Offline Waypoint Compass',
    about: 'An outdoor GPS guide detailing trail difficulty, water fountain locations, shade coverage, and downloadable offline topographical maps.',
    problem: 'Hikers lose cellular reception in forest canyons and risk taking dangerous wrong turns when signs are missing or overgrown.',
    styleId: 'scandi_functional'
  },
  {
    text: 'Blood pressure & daily health vitals log',
    shortLabel: 'Vitals Log',
    category: 'Healthcare',
    deliverable: 'Mobile App',
    uxFocus: 'Large Numbers Display & Doctor PDF Summary Export',
    about: 'A clean health journal for hypertensive patients to record daily morning/evening blood pressure readings and export clean charts for doctors.',
    problem: 'Seniors struggle with cluttered health apps with small fonts, making it hard to show accurate trends during brief clinic checkups.',
    styleId: 'swahili_glass'
  },
  {
    text: 'Neighborhood tool sharing & borrowing club',
    shortLabel: 'Tool Share',
    category: 'Community',
    deliverable: 'Mobile App',
    uxFocus: 'Lawnmower / Drill Availability & Deposit Protection',
    about: 'A suburban community app where neighbors borrow drills, ladders, lawnmowers, and pressure washers instead of buying single-use tools.',
    problem: 'Homeowners spend hundreds on tools they only use once a year, while garages stay cluttered and neighbors remain disconnected.',
    styleId: 'kente_modular'
  },
  {
    text: 'Job interview prep & salary comparison',
    shortLabel: 'Career Prep',
    category: 'Career',
    deliverable: 'Desktop Web',
    uxFocus: 'Role Salary Range Benchmarks & Mock Question Timer',
    about: 'A career platform providing verified transparent compensation benchmarks by city and practice timers for common behavioral questions.',
    problem: 'Job applicants go into salary negotiations blind and undervalue their worth due to intentionally opaque corporate salary disclosures.',
    styleId: 'swiss_typo'
  },
  {
    text: 'Hostel bed booking & traveler group chat',
    shortLabel: 'Hostel Chat',
    category: 'Travel',
    deliverable: 'Mobile App',
    uxFocus: 'Bunk Bed Privacy Rating & Walking Tour Group Chat',
    about: 'A backpacker app combining verified hostel dormitory reviews with an active group chat for solo travelers looking to explore the city together.',
    problem: 'Solo travelers want to meet fellow explorers safely without relying on noisy hotel bars or unstructured public social channels.',
    styleId: 'brazil_modern'
  },
  {
    text: 'Food allergy restaurant menu scanner',
    shortLabel: 'Allergy Scan',
    category: 'Dining & Health',
    deliverable: 'Mobile App',
    uxFocus: 'Gluten / Peanut Warning Badge & Safe Dish Filter',
    about: 'A dining safety tool that translates restaurant menus and cross-checks ingredient disclosures against user food allergies (nuts, gluten, dairy).',
    problem: 'People with severe food allergies experience constant anxiety when eating out because menu descriptions omit hidden allergen cross-contaminations.',
    styleId: 'tokyo_hud'
  }
];

// ============================================================================
// SEMANTIC DOMAIN PATTERNS (For "Influence Challenges" suggestions)
// Realistic everyday challenges with paired global UI styles.
// ============================================================================
const DOMAIN_PATTERNS = [
  {
    keywords: ['coffee', 'cafe', 'roast', 'brew', 'espresso', 'tea', 'drink', 'beverage'],
    category: 'Coffee & Drinks',
    variants: [
      {
        title: 'Coffee shop mobile pickup order',
        deliverable: 'Mobile App',
        uxFocus: 'Milk & Sweetener Modifiers with Preparation Bar',
        about: 'A neighborhood coffee order app allowing commuters to customize drinks, prepay, and grab their cup from a contactless pickup shelf.',
        problem: 'Morning counter lines cause people to run late for work, and complex drink customizations frequently get miscommunicated.',
        styleId: 'naija_fintech'
      },
      {
        title: 'Pour-over coffee recipe timer',
        deliverable: 'Mobile App',
        uxFocus: 'Water Pour Weight & Bloom Countdown',
        about: 'A brewing guide tracking water ratio, grind size, and blooming duration for specialty coffee roasters.',
        problem: 'Home baristas ruin expensive beans by guessing pour intervals instead of maintaining consistent water flow.',
        styleId: 'japan_zen'
      },
      {
        title: 'Coffee bean monthly subscription',
        deliverable: 'Web Checkout',
        uxFocus: 'Roast Preference Quiz & Delivery Frequency',
        about: 'A subscription box selecting single-origin coffee beans from small roasters matched to personal flavor preferences.',
        problem: 'Shoppers find specialty coffee tasting notes pretentious and cannot predict whether they will enjoy a roast.',
        styleId: 'french_editorial'
      },
      {
        title: 'Barista register touch terminal',
        deliverable: 'Tablet UI',
        uxFocus: 'Big Touch Buttons & Fast Split Payments',
        about: 'A fast point-of-sale system for busy cafe baristas to punch orders, handle modifiers, and split tabs in seconds.',
        problem: 'Cluttered cash register screens slow down transactions during the 8 AM commuter rush.',
        styleId: 'scandi_functional'
      }
    ]
  },
  {
    keywords: ['money', 'wallet', 'bank', 'finance', 'invest', 'budget', 'bills', 'split', 'cash', 'pay', 'debt'],
    category: 'Money & Finance',
    variants: [
      {
        title: 'Roommate expense & bill splitter',
        deliverable: 'Mobile App',
        uxFocus: 'Receipt Scanning & One-Tap Settle',
        about: 'An app for flatmates to log rent, scan shared supermarket receipts, and settle IOUs with one tap.',
        problem: 'Awkward social tension and calculation errors when friends split unequal shares of household bills.',
        styleId: 'naija_fintech'
      },
      {
        title: 'Personal monthly budget & expense tracker',
        deliverable: 'Mobile App',
        uxFocus: 'Spending Category Caps & Bill Due Notifications',
        about: 'A simple budget manager showing daily safe-to-spend limits and automatic alerts for upcoming utility bills.',
        problem: 'Users abandon complex spreadsheets and financial apps that make them feel overwhelmed by obscure metrics.',
        styleId: 'swiss_typo'
      },
      {
        title: 'Freelancer invoice & payment link generator',
        deliverable: 'Web / Tablet',
        uxFocus: '1-Click Invoice Creation & Automatic Reminders',
        about: 'A clean billing tool for independent designers and contractors to send invoices and receive instant debit/credit payments.',
        problem: 'Freelancers waste hours drafting invoices and feel uncomfortable chasing late client payments.',
        styleId: 'sahel_terracotta'
      },
      {
        title: 'Family savings goal & allowance jar',
        deliverable: 'Mobile App',
        uxFocus: 'Visual Progress Piggybank & Match Contributions',
        about: 'A shared savings tracker helping families set targets for holidays, emergency funds, and kids chores.',
        problem: 'Family members lose motivation without a shared visual tracker celebrating incremental savings milestones.',
        styleId: 'kente_modular'
      }
    ]
  },
  {
    keywords: ['fitness', 'workout', 'gym', 'exercise', 'training', 'running', 'sport', 'lift', 'weights'],
    category: 'Fitness & Health',
    variants: [
      {
        title: 'Gym workout & weight set counter',
        deliverable: 'Smartwatch / Mobile',
        uxFocus: 'Single-Tap Rep Entry & Barbell Weight Calculator',
        about: 'A high-speed fitness companion to log lifting sets, track rest countdowns, and calculate barbell plate combinations in a crowded gym.',
        problem: 'Typing on a phone while sweaty and out of breath is clumsy; lifters need massive touch targets and haptic rest-timer buzzers.',
        styleId: 'kente_modular'
      },
      {
        title: 'Boutique gym class & spot reservation',
        deliverable: 'Mobile App',
        uxFocus: 'Studio Spot Map & Waitlist Push Notification',
        about: 'A reservation system to book cycling bikes, yoga mats, and personal training slots at boutique fitness studios.',
        problem: 'Popular fitness classes fill up in seconds, and users cannot see which instructor or studio spot they are getting.',
        styleId: 'bento_grid'
      },
      {
        title: 'Outdoor running pace & mile split tracker',
        deliverable: 'Watch / Mobile',
        uxFocus: 'High-Contrast Sunlight Display & Audio Pace Alerts',
        about: 'A distraction-free GPS run tracker providing audio mile updates and elevation gains without needing to unlock the phone.',
        problem: 'Runners struggle to read phone screens in bright direct sunlight while maintaining running cadence.',
        styleId: 'joburg_industrial'
      }
    ]
  },
  {
    keywords: ['travel', 'flight', 'hotel', 'trip', 'vacation', 'booking', 'airline', 'explore', 'map', 'transit'],
    category: 'Travel & Trips',
    variants: [
      {
        title: 'Flight booking & seat selector',
        deliverable: 'Mobile App',
        uxFocus: 'Interactive Seat Map & Transparent Price Breakdown',
        about: 'A mobile flight reservation flow with interactive aircraft cabin seat selection and baggage add-ons.',
        problem: 'Travelers struggle to compare legroom, seat amenities, and hidden fees on small mobile screens before checkout.',
        styleId: 'swiss_typo'
      },
      {
        title: 'Hostel bed booking & traveler group chat',
        deliverable: 'Mobile App',
        uxFocus: 'Bunk Bed Privacy Rating & Walking Tour Group Chat',
        about: 'A backpacker app combining verified hostel dormitory reviews with an active group chat for solo travelers looking to explore the city together.',
        problem: 'Solo travelers want to meet fellow explorers safely without relying on noisy hotel bars or unstructured public social channels.',
        styleId: 'brazil_modern'
      },
      {
        title: 'City walking guide & offline map',
        deliverable: 'Mobile Offline',
        uxFocus: 'Curated Audio Landmarks & Zero-Data Mode',
        about: 'A self-guided walking tour app that triggers interesting neighborhood history stories as travelers approach historic street corners.',
        problem: 'International travelers without roaming data get lost and miss authentic local architecture hidden behind tourist traps.',
        styleId: 'swahili_glass'
      }
    ]
  },
  {
    keywords: ['health', 'mental', 'doctor', 'clinic', 'wellness', 'medicine', 'hospital', 'pill', 'patient'],
    category: 'Health & Wellness',
    variants: [
      {
        title: 'Doctor appointment & clinic check-in',
        deliverable: 'Mobile App',
        uxFocus: 'Verified Provider Cards & Digital Medical Intake',
        about: 'A patient portal to find nearby doctors, book open appointment slots, and fill out intake forms on mobile before stepping into the clinic.',
        problem: 'Patients arrive stressed and waste 20 minutes filling out repetitive clipboards in waiting rooms with zero visibility into doctor delay times.',
        styleId: 'swahili_glass'
      },
      {
        title: 'Pharmacy prescription refill & reminder',
        deliverable: 'Mobile App',
        uxFocus: 'Bottle Barcode Scanner & Delivery Status Tracker',
        about: 'An accessible pharmacy tool to scan prescription pill bottles, request automatic refills from doctors, and schedule home delivery.',
        problem: 'Elderly patients and busy caregivers lose track of pill counts and face stressful gaps in daily essential medications.',
        styleId: 'swiss_typo'
      },
      {
        title: 'Meditation & bedtime sleep timer',
        deliverable: 'Mobile App',
        uxFocus: 'Calming Dark UI & Tactile Breathing Gauge',
        about: 'A bedtime relaxation companion featuring ambient nature soundscapes, guided breathing exercises, and an automatic gentle sleep shutoff timer.',
        problem: 'Harsh screen brightness and confusing menus wake users up right before sleeping when they just want to tap once and put their phone away.',
        styleId: 'japan_zen'
      }
    ]
  }
];

// Universal Fallback Generator for any arbitrary input typed by the designer
function generateUniversalVariants(topicInput) {
  const clean = topicInput.trim();
  const titleCase = clean.charAt(0).toUpperCase() + clean.slice(1);

  return [
    {
      title: `${titleCase} mobile app`,
      category: 'Mobile Experience',
      deliverable: 'Mobile App',
      uxFocus: 'Smooth Onboarding & One-Thumb Reachability',
      about: `A dedicated mobile app designed for everyday users to manage their ${clean.toLowerCase()} tasks with zero friction.`,
      problem: `Users feel frustrated by bloated multi-step apps when they want to accomplish ${clean.toLowerCase()} goals quickly on their phone.`,
      styleId: 'naija_fintech'
    },
    {
      title: `${titleCase} search & map finder`,
      category: 'Discovery',
      deliverable: 'Mobile App',
      uxFocus: 'Interactive Map Pins & Real-Time Availability Chips',
      about: `A location discovery map helping users locate nearby verified ${clean.toLowerCase()} spots with open hours and pricing.`,
      problem: `Finding trustworthy local options for ${clean.toLowerCase()} requires checking multiple outdated review sites with inaccurate hours.`,
      styleId: 'afro_futurism'
    },
    {
      title: `${titleCase} booking & checkout`,
      category: 'E-Commerce',
      deliverable: 'Mobile Web',
      uxFocus: 'Transparent Pricing Breakdown & 1-Tap Pay',
      about: `A streamlined reservation and checkout flow for ${clean.toLowerCase()} with clear cancellation terms.`,
      problem: `Customers abandon checkout when surprise convenience fees and rigid time slots appear on the final confirmation step.`,
      styleId: 'kente_modular'
    },
    {
      title: `${titleCase} tracking dashboard`,
      category: 'Dashboard',
      deliverable: 'Web App',
      uxFocus: 'Clean Metric Cards & Weekly Progress Overview',
      about: `A desktop dashboard providing insights and weekly consistency stats for ${clean.toLowerCase()} activity.`,
      problem: `Users find raw data intimidating; they need visual comparisons that highlight achievements and next steps.`,
      styleId: 'scandi_functional'
    },
    {
      title: `${titleCase} community exchange`,
      category: 'Community',
      deliverable: 'Responsive Web',
      uxFocus: 'Verified Member Profiles & Direct Chat Messaging',
      about: `A community platform where people share advice, trade gear, and organize meetups around ${clean.toLowerCase()}.`,
      problem: `Niche enthusiasts struggle to find welcoming, spam-free spaces to connect with local peers who share their interest.`,
      styleId: 'sahel_terracotta'
    }
  ];
}

// ============================================================================
// TOPIC ENGINE CLASS
// ============================================================================
class TopicEngine {
  constructor() {
    this.topics = [];
    this.init();
  }

  init() {
    const saved = window.storageManager.getSavedTopics();
    const hasOldJargon = saved && saved.some(t => 
      !t.about || 
      !t.problem || 
      !t.style ||
      (t.text && (
        t.text.includes('Fintech Staking') || 
        t.text.includes('AI Travel Concierge') || 
        t.text.includes('Zero-Waste Grocery Box') || 
        t.text.includes('Spatial Audio Meditation') ||
        t.text.includes('Password & security') ||
        t.text.includes('Custom watch builder') ||
        t.text.includes('portfolio showcase') ||
        t.text.includes('brainstorming whiteboard') ||
        t.text.includes('Mars colony') ||
        t.text.includes('Time traveler') ||
        t.text.includes('Alien language') ||
        t.text.includes('Ghost hunting')
      ))
    );

    // If no saved topics or old jargon exists, upgrade directly to natural topics
    if (saved && Array.isArray(saved) && saved.length > 0 && !hasOldJargon) {
      this.topics = saved.map(t => {
        if (t.text === 'Self-service parcel locker pickup') {
          t.text = 'Package locker pickup';
          t.shortLabel = 'Locker Pickup';
        }
        const vis = resolveTopicVisuals(t);
        t.iconKey = t.iconKey || vis.iconKey;
        t.shortLabel = t.shortLabel || vis.shortLabel;
        if (!t.style) {
          t.style = getRandomUIStyle();
        }
        return t;
      });
    } else {
      this.topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
      this.persist();
    }
  }

  getActiveTopics() {
    return this.topics.filter(t => t.active !== false);
  }

  getAllTopics() {
    return this.topics;
  }

  addTopic(topicData) {
    const vis = resolveTopicVisuals(topicData);
    const assignedStyle = topicData.style || (topicData.styleId ? getUIStyleById(topicData.styleId) : getRandomUIStyle());

    const newTopic = {
      id: 'top_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      text: topicData.text || topicData.title,
      iconKey: topicData.iconKey || vis.iconKey,
      shortLabel: topicData.shortLabel || vis.shortLabel,
      category: topicData.category || 'Custom Challenge',
      deliverable: topicData.deliverable || 'Mobile / Web Experience',
      uxFocus: topicData.uxFocus || 'Visual Hierarchy & User Ergonomics',
      about: topicData.about || `A dedicated product design challenge focused on solving everyday user needs for ${topicData.text || topicData.title}.`,
      problem: topicData.problem || 'Reduce user cognitive load, eliminate confusing extra steps, and make core actions accessible on small mobile screens.',
      style: assignedStyle,
      color: topicData.color || PALETTE[this.topics.length % PALETTE.length],
      active: true,
      isCustom: true
    };

    this.topics.unshift(newTopic);
    this.persist();
    return newTopic;
  }

  removeTopic(id) {
    this.topics = this.topics.filter(t => t.id !== id);
    this.persist();
  }

  toggleTopic(id) {
    const t = this.topics.find(item => item.id === id);
    if (t) {
      t.active = !t.active;
      this.persist();
    }
  }

  resetToDefault() {
    this.topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
    this.persist();
    return this.topics;
  }

  /**
   * Shuffle topics with 10 random everyday human design challenges
   * from the practice pool, each paired with design hint, problem, and global UI style.
   */
  shuffleTopics(count = 10) {
    const shuffledPool = [...PRACTICE_TOPIC_POOL].sort(() => Math.random() - 0.5);
    const chosen = shuffledPool.slice(0, count);

    this.topics = chosen.map((item, idx) => {
      const vis = resolveTopicVisuals(item);
      const style = item.styleId ? getUIStyleById(item.styleId) : getRandomUIStyle();

      return {
        id: 'shuf_' + Date.now() + '_' + idx,
        text: item.text,
        shortLabel: item.shortLabel || vis.shortLabel,
        iconKey: item.iconKey || vis.iconKey,
        category: item.category || 'Product Design',
        deliverable: item.deliverable || 'Mobile App',
        uxFocus: item.uxFocus || 'User Ergonomics & Clear Hierarchy',
        about: item.about,
        problem: item.problem,
        style: style,
        color: PALETTE[idx % PALETTE.length],
        active: true,
        isCustom: true
      };
    });

    this.persist();
    return this.topics;
  }

  persist() {
    window.storageManager.saveTopics(this.topics);
  }

  // --- Dynamic Similar Topics Generator ---
  generateSimilarTopics(userInput) {
    if (!userInput || !userInput.trim()) return [];

    const inputLower = userInput.toLowerCase().trim();
    const words = inputLower.split(/[\s,._-]+/).filter(w => w.length > 2);

    let bestPattern = null;
    let maxMatches = 0;

    for (const pattern of DOMAIN_PATTERNS) {
      let matches = 0;
      for (const kw of pattern.keywords) {
        if (inputLower.includes(kw)) matches += 2;
        for (const w of words) {
          if (kw.includes(w) || w.includes(kw)) matches += 1;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestPattern = pattern;
      }
    }

    let generatedList = [];

    if (bestPattern && maxMatches > 0) {
      generatedList = bestPattern.variants.map((v, idx) => {
        const vis = resolveTopicVisuals({ text: v.title, category: bestPattern.category });
        const style = v.styleId ? getUIStyleById(v.styleId) : getRandomUIStyle();
        return {
          id: 'gen_' + Date.now() + '_' + idx,
          title: v.title,
          iconKey: vis.iconKey,
          shortLabel: vis.shortLabel,
          category: bestPattern.category,
          deliverable: v.deliverable,
          uxFocus: v.uxFocus,
          about: v.about,
          problem: v.problem,
          style: style,
          color: PALETTE[(this.topics.length + idx) % PALETTE.length]
        };
      });
    } else {
      const universals = generateUniversalVariants(userInput);
      generatedList = universals.map((u, idx) => {
        const vis = resolveTopicVisuals({ text: u.title, category: u.category });
        const style = u.styleId ? getUIStyleById(u.styleId) : getRandomUIStyle();
        return {
          id: 'gen_' + Date.now() + '_' + idx,
          title: u.title,
          iconKey: vis.iconKey,
          shortLabel: vis.shortLabel,
          category: u.category,
          deliverable: u.deliverable,
          uxFocus: u.uxFocus,
          about: u.about,
          problem: u.problem,
          style: style,
          color: PALETTE[(this.topics.length + idx) % PALETTE.length]
        };
      });
    }

    return generatedList;
  }
}

window.topicEngine = new TopicEngine();
