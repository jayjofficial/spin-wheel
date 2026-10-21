/**
 * UX Roulette - Smart Topic Engine & Semantic Similarity Generator
 * Clean everyday natural phrasing + Expansive Creative Topic Library + Shuffle Engine.
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
    else if (text.includes('bill') || text.includes('rent') || text.includes('money') || text.includes('wallet') || text.includes('bank') || text.includes('pay') || text.includes('spend')) iconKey = 'card';
    else if (text.includes('flight') || text.includes('seat') || text.includes('airport') || text.includes('travel')) iconKey = 'plane';
    else if (text.includes('sleep') || text.includes('meditation') || text.includes('breathe') || text.includes('calm') || text.includes('zen')) iconKey = 'zen';
    else if (text.includes('solar') || text.includes('energy') || text.includes('battery') || text.includes('power')) iconKey = 'bolt';
    else if (text.includes('watch') || text.includes('clock') || text.includes('time') || text.includes('timer')) iconKey = 'watch';
    else if (text.includes('portfolio') || text.includes('showcase') || text.includes('bento') || text.includes('layout')) iconKey = 'layout';
    else if (text.includes('password') || text.includes('safe') || text.includes('security') || text.includes('lock') || text.includes('shield')) iconKey = 'shield';
    else if (text.includes('workout') || text.includes('gym') || text.includes('exercise') || text.includes('running') || text.includes('fitness')) iconKey = 'activity';
    else if (text.includes('whiteboard') || text.includes('canvas') || text.includes('notes') || text.includes('brainstorm') || text.includes('write')) iconKey = 'pen';
    else if (text.includes('book') || text.includes('library') || text.includes('spell') || text.includes('recipe') || text.includes('journal')) iconKey = 'book';
    else if (text.includes('space') || text.includes('mars') || text.includes('rocket') || text.includes('lunar') || text.includes('asteroid')) iconKey = 'rocket';
    else if (text.includes('camera') || text.includes('photo') || text.includes('film')) iconKey = 'camera';
    else if (text.includes('music') || text.includes('song') || text.includes('vinyl') || text.includes('sound') || text.includes('radio') || text.includes('podcast')) iconKey = 'music';
    else if (text.includes('plant') || text.includes('garden') || text.includes('tree') || text.includes('flower') || text.includes('leaf') || text.includes('farm')) iconKey = 'leaf';
    else if (text.includes('map') || text.includes('compass') || text.includes('hike') || text.includes('trail') || text.includes('star')) iconKey = 'compass';
    else if (text.includes('ai') || text.includes('bot') || text.includes('robot')) iconKey = 'bot';
    else if (text.includes('box') || text.includes('grocery') || text.includes('shop') || text.includes('delivery')) iconKey = 'package';
    else if (text.includes('chat') || text.includes('message')) iconKey = 'chat';
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

// Clean, natural human titles for default wheel topics
const DEFAULT_TOPICS = [
  {
    id: 'top_1',
    text: 'Flight booking & seat picker',
    shortLabel: 'Flight Picker',
    iconKey: 'plane',
    category: 'Travel',
    deliverable: 'Mobile App',
    uxFocus: 'Interactive Seat Map & Price Alerts',
    color: PALETTE[0],
    active: true
  },
  {
    id: 'top_2',
    text: 'Split bill with roommates',
    shortLabel: 'Split Bill',
    iconKey: 'card',
    category: 'Finance',
    deliverable: 'Mobile App',
    uxFocus: 'Receipt Scanning & Quick Settle',
    color: PALETTE[1],
    active: true
  },
  {
    id: 'top_3',
    text: 'Grocery delivery & recipe box',
    shortLabel: 'Recipe Box',
    iconKey: 'package',
    category: 'Food',
    deliverable: 'Mobile App',
    uxFocus: 'One-Tap Reorder & Dietary Filters',
    color: PALETTE[2],
    active: true
  },
  {
    id: 'top_4',
    text: 'Meditation & sleep timer',
    shortLabel: 'Sleep Timer',
    iconKey: 'zen',
    category: 'Wellness',
    deliverable: 'Mobile App',
    uxFocus: 'Calming Night Mode & Breathing Gauge',
    color: PALETTE[3],
    active: true
  },
  {
    id: 'top_5',
    text: 'Home energy & solar monitor',
    shortLabel: 'Solar Monitor',
    iconKey: 'bolt',
    category: 'Smart Home',
    deliverable: 'Tablet UI',
    uxFocus: 'Live Power Flow & Battery Levels',
    color: PALETTE[4],
    active: true
  },
  {
    id: 'top_6',
    text: 'Custom watch builder',
    shortLabel: 'Watch Builder',
    iconKey: 'watch',
    category: 'Design',
    deliverable: 'Web App',
    uxFocus: 'Strap & Dial Color Customizer',
    color: PALETTE[5],
    active: true
  },
  {
    id: 'top_7',
    text: 'Design portfolio showcase',
    shortLabel: 'Portfolio Site',
    iconKey: 'layout',
    category: 'Portfolio',
    deliverable: 'Responsive Web',
    uxFocus: 'Project Cards & Case Study Viewer',
    color: PALETTE[6],
    active: true
  },
  {
    id: 'top_8',
    text: 'Password & security manager',
    shortLabel: 'Password Safe',
    iconKey: 'shield',
    category: 'Security',
    deliverable: 'Desktop App',
    uxFocus: 'Autofill Prompt & Vault Encryption',
    color: PALETTE[7],
    active: true
  },
  {
    id: 'top_9',
    text: 'Workout & gym set logger',
    shortLabel: 'Workout Log',
    iconKey: 'activity',
    category: 'Fitness',
    deliverable: 'Smartwatch / Mobile',
    uxFocus: 'Rest Timer & Weight Plate Calculator',
    color: PALETTE[8],
    active: true
  },
  {
    id: 'top_10',
    text: 'Team brainstorming whiteboard',
    shortLabel: 'Sticky Board',
    iconKey: 'pen',
    category: 'Productivity',
    deliverable: 'Desktop Web',
    uxFocus: 'Sticky Notes & Live Multiplayer Cursor',
    color: PALETTE[9],
    active: true
  }
];

// Expansive Library of Creative, Wild & Unexpected Design Concepts for the Shuffle Feature
const CREATIVE_TOPIC_POOL = [
  // Sci-Fi & Space
  { text: 'Mars colony grocery delivery', shortLabel: 'Mars Grocery', iconKey: 'rocket', category: 'Sci-Fi', deliverable: 'Tablet HUD', uxFocus: 'Oxygen & Shelf-Life Indicators' },
  { text: 'Time traveler passport check', shortLabel: 'Time Passport', iconKey: 'clock', category: 'Sci-Fi', deliverable: 'Mobile App', uxFocus: 'Timeline Branching & Paradox Warnings' },
  { text: 'Submarine depth & sonar HUD', shortLabel: 'Sonar HUD', iconKey: 'compass', category: 'Hardware', deliverable: 'Console UI', uxFocus: 'Water Pressure & Thermal Echo Dial' },
  { text: 'Space elevator boarding pass', shortLabel: 'Space Elevator', iconKey: 'rocket', category: 'Sci-Fi', deliverable: 'Mobile Ticket', uxFocus: 'Atmospheric Altitude Tracker' },
  { text: 'Lunar hotel room service menu', shortLabel: 'Lunar Hotel', iconKey: 'rocket', category: 'Hospitality', deliverable: 'In-Room Tablet', uxFocus: 'Low-Gravity Dining Modifiers' },
  { text: 'Asteroid mining telemetry dashboard', shortLabel: 'Asteroid Mine', iconKey: 'bolt', category: 'Sci-Fi', deliverable: 'Web Dashboard', uxFocus: 'Mineral Density Heatmap' },
  { text: 'Alien language keyboard translator', shortLabel: 'Alien Keypad', iconKey: 'chat', category: 'Sci-Fi', deliverable: 'Mobile Keypad', uxFocus: 'Glyph Combinations & Phonetics' },

  // Whimsical & Wonder
  { text: 'Potion brewing recipe book', shortLabel: 'Potion Book', iconKey: 'book', category: 'Fantasy', deliverable: 'Mobile App', uxFocus: 'Boiling Timer & Ingredient Stirring Order' },
  { text: 'Ghost hunting audio radar', shortLabel: 'Ghost Radar', iconKey: 'radio', category: 'Paranormal', deliverable: 'Mobile App', uxFocus: 'Audio Frequency Spike & EMF Needle' },
  { text: 'Secret speakeasy door code', shortLabel: 'Speakeasy Lock', iconKey: 'shield', category: 'Nightlife', deliverable: 'Touchpad Screen', uxFocus: 'Tactile Rhythm Tap Lock' },
  { text: 'Dream journal with sketch pad', shortLabel: 'Dream Journal', iconKey: 'pen', category: 'Wellness', deliverable: 'Mobile App', uxFocus: 'Lucid Dream Mood Spectrum' },
  { text: 'Stargazing telescope compass', shortLabel: 'Star Compass', iconKey: 'compass', category: 'Astronomy', deliverable: 'Mobile AR', uxFocus: 'Constellation Gyro Overlay' },
  { text: 'Cat cafe table reservation', shortLabel: 'Cat Cafe', iconKey: 'coffee', category: 'Lifestyle', deliverable: 'Mobile App', uxFocus: 'Adoptable Cat Profile Cards' },
  { text: 'Treehouse weekend booking', shortLabel: 'Treehouse Stay', iconKey: 'leaf', category: 'Travel', deliverable: 'Web App', uxFocus: 'Canopy Height & Forest Views' },

  // Tactile & Retro Gear
  { text: 'Vinyl record swap club', shortLabel: 'Vinyl Club', iconKey: 'music', category: 'Music', deliverable: 'Mobile App', uxFocus: 'Crate Digging Swipe & Sleeve Art' },
  { text: 'Vintage film camera emulator', shortLabel: 'Film Camera', iconKey: 'camera', category: 'Photography', deliverable: 'Mobile App', uxFocus: 'ISO Dial, Shutter Sound & Film Grain' },
  { text: 'Modular synthesizer patcher', shortLabel: 'Modular Synth', iconKey: 'music', category: 'Audio', deliverable: 'Tablet UI', uxFocus: 'Draggable Patch Cables & Oscilloscope' },
  { text: 'Typewriter distraction-free editor', shortLabel: 'Typewriter', iconKey: 'pen', category: 'Writing', deliverable: 'Desktop App', uxFocus: 'Mechanical Keystrokes & Return Carriage' },
  { text: 'Retro arcade high score lounge', shortLabel: 'Arcade Scores', iconKey: 'bolt', category: 'Gaming', deliverable: 'Kiosk Screen', uxFocus: 'Pixel Font & Coin-Insert Animation' },
  { text: 'Ham radio Morse code decoder', shortLabel: 'Ham Radio', iconKey: 'radio', category: 'Hardware', deliverable: 'Desktop App', uxFocus: 'Frequency Waveform Waterfall' },
  { text: 'Mechanical keyboard sound tester', shortLabel: 'Key Switcher', iconKey: 'layout', category: 'Hardware', deliverable: 'Web App', uxFocus: 'Linear vs Tactile Sound Waves' },

  // Nature, Plants & Pets
  { text: 'Houseplant mood & water sensor', shortLabel: 'Plant Water', iconKey: 'leaf', category: 'Home', deliverable: 'Mobile App', uxFocus: 'Soil Moisture Gauge & Sunlight Meter' },
  { text: 'Dog park puppy meetup planner', shortLabel: 'Dog Park', iconKey: 'compass', category: 'Pets', deliverable: 'Mobile App', uxFocus: 'Play Style Match & Breed Filter' },
  { text: 'Sourdough starter feeding log', shortLabel: 'Sourdough Log', iconKey: 'package', category: 'Cooking', deliverable: 'Mobile App', uxFocus: 'Rise-and-Fall Height Chart' },
  { text: 'Bonsai tree pruning schedule', shortLabel: 'Bonsai Prune', iconKey: 'leaf', category: 'Gardening', deliverable: 'Mobile App', uxFocus: 'Branch Angle & Seasonal Trimming' },
  { text: 'Bird watching field notebook', shortLabel: 'Bird Notebook', iconKey: 'compass', category: 'Outdoors', deliverable: 'Mobile App', uxFocus: 'Chirp Audio Identifier & Sightings Map' },
  { text: 'Wildflower identification scanner', shortLabel: 'Wildflower ID', iconKey: 'camera', category: 'Nature', deliverable: 'Mobile AR', uxFocus: 'Petal Scanner & Meadow Field Guide' },
  { text: 'Rooftop greenhouse climate hub', shortLabel: 'Greenhouse Hub', iconKey: 'leaf', category: 'IoT', deliverable: 'Tablet UI', uxFocus: 'Humidity Fans & Nutrient Drip Log' },

  // Quirky Everyday & Niche
  { text: 'Neighborhood tool sharing shed', shortLabel: 'Tool Shed', iconKey: 'package', category: 'Community', deliverable: 'Mobile App', uxFocus: 'Locker Unlock QR & Return Reminder' },
  { text: 'Cozy rainy day sound mixer', shortLabel: 'Rain Mixer', iconKey: 'music', category: 'Audio', deliverable: 'Web App', uxFocus: 'Window Taps, Thunder & Fireplace Sliders' },
  { text: 'Antique bookstore library card', shortLabel: 'Old Bookstore', iconKey: 'book', category: 'Reading', deliverable: 'Mobile App', uxFocus: 'Leather Bound Editions & Book Stacks' },
  { text: 'Emergency zombie bug-out kit', shortLabel: 'Zombie Kit', iconKey: 'shield', category: 'Survival', deliverable: 'Mobile App', uxFocus: 'Backpack Weight & Supply Expiry' },
  { text: 'Campfire ghost story player', shortLabel: 'Campfire Story', iconKey: 'radio', category: 'Entertainment', deliverable: 'Mobile App', uxFocus: 'Creepy Sound FX & Lantern Mode' },
  { text: 'Origami step-by-step 3D folder', shortLabel: 'Origami 3D', iconKey: 'layout', category: 'Crafts', deliverable: 'Tablet App', uxFocus: 'Paper Crease 360-Degree Rotation' },
  { text: 'Ceramic pottery wheel tuner', shortLabel: 'Pottery Wheel', iconKey: 'watch', category: 'Crafts', deliverable: 'Mobile App', uxFocus: 'Clay Moisture & RPM Rotation Dial' },
  { text: 'Tea ceremony brewing guide', shortLabel: 'Tea Ceremony', iconKey: 'coffee', category: 'Culture', deliverable: 'Mobile App', uxFocus: 'Water Temp Degrees & Steeping Countdown' },
  { text: 'Tokyo street food stall map', shortLabel: 'Street Food', iconKey: 'compass', category: 'Food', deliverable: 'Mobile App', uxFocus: 'Alleyway Pins & Cash-Only Badge' },
  { text: 'Deep sea aquarium live camera', shortLabel: 'Deep Sea Cam', iconKey: 'camera', category: 'Nature', deliverable: 'Smart TV / Tablet', uxFocus: 'Jellyfish Night Cam & Depth Meter' },
  { text: 'Hot air balloon altitude tracker', shortLabel: 'Balloon Flight', iconKey: 'compass', category: 'Aviation', deliverable: 'Tablet Cockpit', uxFocus: 'Wind Currents & Thermal Lift Gauge' },
  { text: 'Boutique perfume scent notes', shortLabel: 'Perfume Notes', iconKey: 'spark', category: 'Beauty', deliverable: 'Web App', uxFocus: 'Top, Heart & Base Note Pyramid' },
  { text: 'Lost pet neighborhood beacon', shortLabel: 'Pet Beacon', iconKey: 'compass', category: 'Pets', deliverable: 'Mobile Alert', uxFocus: '1-Mile Radius Push & Sighting Pin' },
  { text: 'Solar eclipse countdown clock', shortLabel: 'Eclipse Clock', iconKey: 'clock', category: 'Astronomy', deliverable: 'Watch App', uxFocus: 'Totality Path & Eye Protection Warning' },
  { text: 'Bouldering climbing route log', shortLabel: 'Climbing Log', iconKey: 'activity', deliverable: 'Mobile App', uxFocus: 'V-Grade Difficulty & Wall Hold Map' },
  { text: 'Bicycle roadside repair guide', shortLabel: 'Bike Repair', iconKey: 'bolt', category: 'Sports', deliverable: 'Mobile Offline', uxFocus: 'Chain Slip & Flat Tire Troubleshooting' },
  { text: 'Farmers market produce basket', shortLabel: 'Farm Basket', iconKey: 'package', category: 'Food', deliverable: 'Mobile App', uxFocus: 'Harvest Schedule & Vendor Stall Pickup' },
  { text: 'Flea market vintage price guide', shortLabel: 'Vintage Guide', iconKey: 'card', category: 'Shopping', deliverable: 'Mobile App', uxFocus: 'Camera Barcode / Logo Valuation' },
  { text: 'Museum heist mystery audio tour', shortLabel: 'Mystery Tour', iconKey: 'music', category: 'Culture', deliverable: 'Mobile App', uxFocus: 'Beacon Triggered Detective Clues' }
];

// Semantic Knowledge Base for Natural Language Suggestions
const DOMAIN_PATTERNS = [
  {
    keywords: ['coffee', 'cafe', 'roast', 'brew', 'espresso', 'tea', 'beverage', 'drink'],
    category: 'Coffee & Drinks',
    variants: [
      { title: 'Coffee shop mobile order', deliverable: 'Mobile App', uxFocus: 'Milk & Syrup Modifiers with Pickup Timer' },
      { title: 'Pour-over brew timer & recipe', deliverable: 'Mobile App', uxFocus: 'Water Pour Weight & Bloom Countdown' },
      { title: 'Coffee bean subscription box', deliverable: 'Web Checkout', uxFocus: 'Roast Preference Quiz & Delivery Frequency' },
      { title: 'Barista counter register POS', deliverable: 'Tablet UI', uxFocus: 'Big Touch Buttons & Fast Split Payments' },
      { title: 'Coffee loyalty punch card', deliverable: 'Mobile Widget', uxFocus: 'Digital Stamp Animation & Free Cup Reward' }
    ]
  },
  {
    keywords: ['crypto', 'money', 'wallet', 'bank', 'finance', 'invest', 'budget', 'bills', 'split', 'cash'],
    category: 'Money & Finance',
    variants: [
      { title: 'Simple crypto & coin wallet', deliverable: 'Mobile App', uxFocus: 'One-Tap Send, Receive & Clear Fees' },
      { title: 'Stock & ETF portfolio tracker', deliverable: 'Web Dashboard', uxFocus: 'Clean Profit Chart & Asset Allocation' },
      { title: 'Split rent & bills with friends', deliverable: 'Mobile App', uxFocus: 'Equal Split Slider & Venmo Integration' },
      { title: 'Monthly budget & expense tracker', deliverable: 'Mobile App', uxFocus: 'Category Spending Bars & Alert Limits' },
      { title: 'Tap-to-pay virtual debit card', deliverable: 'Mobile App', uxFocus: 'Card Freeze Toggle & Instant Cashback' }
    ]
  },
  {
    keywords: ['fitness', 'workout', 'gym', 'exercise', 'training', 'running', 'sport', 'lift'],
    category: 'Fitness & Health',
    variants: [
      { title: 'Gym workout & lifting log', deliverable: 'Mobile App', uxFocus: 'Quick Rep Input & Rest Interval Timer' },
      { title: 'Running pace & route map', deliverable: 'Smartwatch App', uxFocus: 'Mile Split Alerts & High-Contrast Outdoor Mode' },
      { title: 'Boutique gym class schedule', deliverable: 'Mobile App', uxFocus: 'Spot & Bike Picker with 1-Tap Booking' },
      { title: 'Daily habit & water streak', deliverable: 'Mobile Widget', uxFocus: 'Circular Hydration Ring & Daily Reminder' },
      { title: 'Sleep quality & gentle alarm', deliverable: 'Mobile App', uxFocus: 'Sleep Stage Graph & Ambient Wake Sounds' }
    ]
  },
  {
    keywords: ['music', 'audio', 'podcast', 'playlist', 'song', 'streaming', 'sound', 'radio'],
    category: 'Music & Audio',
    variants: [
      { title: 'Cozy rain & ambient sound mixer', deliverable: 'Mobile App', uxFocus: 'Volume Sliders for Rain, Fire & Wind' },
      { title: 'Vinyl record player library', deliverable: 'Tablet App', uxFocus: 'Flipping Album Sleeves & Turntable Arm' },
      { title: 'Podcast player with chapter notes', deliverable: 'Mobile App', uxFocus: '15-Second Skip & Transcript Search' },
      { title: 'Concert tickets & festival tour', deliverable: 'Mobile App', uxFocus: 'Stage Schedule Clash Resolver & Ticket QR' },
      { title: 'Guitar chord & tuner helper', deliverable: 'Mobile App', uxFocus: 'Acoustic String Pitch Detection' }
    ]
  },
  {
    keywords: ['travel', 'flight', 'hotel', 'trip', 'vacation', 'booking', 'airline', 'explore', 'map'],
    category: 'Travel & Trips',
    variants: [
      { title: 'Flight booking & seat picker', deliverable: 'Mobile App', uxFocus: 'Airplane Seat Layout & Fare Comparison' },
      { title: 'Road trip packing checklist', deliverable: 'Mobile App', uxFocus: 'Shared Checklist & Luggage Weight Estimator' },
      { title: 'Hostel & boutique cabin stay', deliverable: 'Responsive Web', uxFocus: 'Room Photo Gallery & Community Reviews' },
      { title: 'Airport gate & transit guide', deliverable: 'Mobile App', uxFocus: 'Live Terminal Walking Map & Gate Changes' },
      { title: 'Hiking trail elevation map', deliverable: 'Offline Mobile', uxFocus: 'Elevation Gain Chart & Offline Compass' }
    ]
  },
  {
    keywords: ['shop', 'store', 'e-commerce', 'fashion', 'clothes', 'buy', 'retail', 'cart'],
    category: 'Shopping & Retail',
    variants: [
      { title: 'Sneaker drop live countdown', deliverable: 'Mobile App', uxFocus: 'Drop Timer & Express 1-Tap Checkout' },
      { title: 'Thrift store vintage clothing', deliverable: 'Mobile App', uxFocus: 'Condition Rating & Thrift Shop Map' },
      { title: 'Farmers market produce box', deliverable: 'Mobile App', uxFocus: 'Fresh Weekly Harvest Box Builder' },
      { title: 'Perfume scent discovery quiz', deliverable: 'Web Experience', uxFocus: 'Interactive Mood & Scent Matching' },
      { title: 'Express one-click cart checkout', deliverable: 'Mobile Web', uxFocus: 'Clear Shipping Cost & Sticky Buy Button' }
    ]
  },
  {
    keywords: ['health', 'mental', 'mind', 'doctor', 'therapy', 'wellness', 'journal', 'habit'],
    category: 'Health & Wellness',
    variants: [
      { title: 'Daily mood journal & check-in', deliverable: 'Mobile App', uxFocus: 'Emoji Emotion Spectrum & Private Passcode' },
      { title: 'Doctor video consultation', deliverable: 'Mobile Web', uxFocus: 'Virtual Waiting Room & Symptom Checklist' },
      { title: 'Pill reminder & pharmacy refill', deliverable: 'Smartwatch / App', uxFocus: 'Haptic Reminders & One-Tap Reorder' },
      { title: 'Guided breathing & calm timer', deliverable: 'Mobile App', uxFocus: 'Expanding Circle Pacer & Nature Audio' },
      { title: 'Houseplant care & sunlight guide', deliverable: 'Mobile App', uxFocus: 'Watering Calendar & Light Sensor Meter' }
    ]
  },
  {
    keywords: ['ai', 'chat', 'assistant', 'bot', 'prompt', 'smart', 'automation'],
    category: 'AI & Smart Tools',
    variants: [
      { title: 'AI voice note summarizer', deliverable: 'Mobile App', uxFocus: 'Live Waveform & 3 Key Bullet Takeaways' },
      { title: 'Chatbot prompt playground', deliverable: 'Desktop Web', uxFocus: 'Side-by-Side Model Comparison & History' },
      { title: 'Meeting action items notes', deliverable: 'Desktop Widget', uxFocus: '1-Click Export to To-Do List' },
      { title: 'Photo background remover', deliverable: 'Mobile App', uxFocus: 'Instant Cutout Preview & New Backdrop' },
      { title: 'Smart calendar meeting finder', deliverable: 'Mobile App', uxFocus: 'Free Time Slots & Time Zone Converter' }
    ]
  },
  {
    keywords: ['work', 'task', 'team', 'project', 'saas', 'notes', 'whiteboard', 'collab'],
    category: 'Work & Teams',
    variants: [
      { title: 'Team project task board', deliverable: 'Desktop Web', uxFocus: 'Clean Kanban Drag-and-Drop Columns' },
      { title: 'Digital sticky note canvas', deliverable: 'Tablet / Web', uxFocus: 'Color Sticky Notes & Infinite Zoom' },
      { title: 'Freelancer invoice generator', deliverable: 'Web App', uxFocus: 'Hourly Rate Calculator & PDF Download' },
      { title: 'Password & secret vault manager', deliverable: 'Mobile & Desktop', uxFocus: 'Autofill Prompt & Strong Password Generator' },
      { title: 'Contract signing & document sharing', deliverable: 'Mobile Web', uxFocus: 'Finger Signature Pad & Progress Check' }
    ]
  }
];

// Universal Fallback Generator when input doesn't match predefined domain keywords
function generateUniversalVariants(topicInput) {
  const clean = topicInput.trim();
  const titleCase = clean.charAt(0).toUpperCase() + clean.slice(1);

  return [
    {
      title: `${titleCase} mobile app`,
      category: 'Mobile App',
      deliverable: 'Mobile App (iOS/Android)',
      uxFocus: 'Smooth Onboarding & Quick Actions'
    },
    {
      title: `${titleCase} search & map finder`,
      category: 'Discovery',
      deliverable: 'Mobile App',
      uxFocus: 'Interactive Map Pins & Filter Chips'
    },
    {
      title: `${titleCase} booking & checkout`,
      category: 'E-Commerce',
      deliverable: 'Mobile Web',
      uxFocus: 'Clear Pricing Breakdown & 1-Tap Pay'
    },
    {
      title: `${titleCase} dashboard & tracking`,
      category: 'Dashboard',
      deliverable: 'Web App',
      uxFocus: 'Clean Metric Cards & Activity Timeline'
    },
    {
      title: `${titleCase} community & reviews`,
      category: 'Community',
      deliverable: 'Responsive Web',
      uxFocus: 'Verified Member Reviews & Star Ratings'
    }
  ];
}

class TopicEngine {
  constructor() {
    this.topics = [];
    this.init();
  }

  init() {
    const saved = window.storageManager.getSavedTopics();
    const hasOldJargon = saved && saved.some(t => 
      t.text && (t.text.includes('Fintech Staking') || t.text.includes('AI Travel Concierge') || t.text.includes('Zero-Waste Grocery Box') || t.text.includes('Spatial Audio Meditation'))
    );

    if (saved && Array.isArray(saved) && saved.length > 0 && !hasOldJargon) {
      this.topics = saved.map(t => {
        const vis = resolveTopicVisuals(t);
        t.iconKey = t.iconKey || vis.iconKey;
        t.shortLabel = t.shortLabel || vis.shortLabel;
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
    const newTopic = {
      id: 'top_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      text: topicData.text || topicData.title,
      iconKey: topicData.iconKey || vis.iconKey,
      shortLabel: topicData.shortLabel || vis.shortLabel,
      category: topicData.category || 'Custom Challenge',
      deliverable: topicData.deliverable || 'Mobile / Web Experience',
      uxFocus: topicData.uxFocus || 'Visual Polish & Micro-interactions',
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
   * Shuffle topics with 10 random out-of-the-box creative ideas from the expansive pool
   */
  shuffleTopics(count = 10) {
    // Pick unique items from CREATIVE_TOPIC_POOL
    const shuffledPool = [...CREATIVE_TOPIC_POOL].sort(() => Math.random() - 0.5);
    const chosen = shuffledPool.slice(0, count);

    this.topics = chosen.map((item, idx) => {
      const vis = resolveTopicVisuals(item);
      return {
        id: 'shuf_' + Date.now() + '_' + idx,
        text: item.text,
        shortLabel: item.shortLabel || vis.shortLabel,
        iconKey: item.iconKey || vis.iconKey,
        category: item.category || 'Creative Concept',
        deliverable: item.deliverable || 'Mobile / Web App',
        uxFocus: item.uxFocus || 'Creative Delight & Interaction Flow',
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
        return {
          id: 'gen_' + Date.now() + '_' + idx,
          title: v.title,
          iconKey: vis.iconKey,
          shortLabel: vis.shortLabel,
          category: bestPattern.category,
          deliverable: v.deliverable,
          uxFocus: v.uxFocus,
          color: PALETTE[(this.topics.length + idx) % PALETTE.length]
        };
      });
    } else {
      const universals = generateUniversalVariants(userInput);
      generatedList = universals.map((u, idx) => {
        const vis = resolveTopicVisuals({ text: u.title, category: u.category });
        return {
          id: 'gen_' + Date.now() + '_' + idx,
          title: u.title,
          iconKey: vis.iconKey,
          shortLabel: vis.shortLabel,
          category: u.category,
          deliverable: u.deliverable,
          uxFocus: u.uxFocus,
          color: PALETTE[(this.topics.length + idx) % PALETTE.length]
        };
      });
    }

    return generatedList;
  }
}

window.topicEngine = new TopicEngine();
