/**
 * UX Roulette - Smart Topic Engine & Semantic Similarity Generator
 * Curated designer library + dynamic contextual expansion algorithm.
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
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z"
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
    if (text.includes('coffee') || text.includes('roast') || text.includes('espresso')) iconKey = 'coffee';
    else if (text.includes('crypto') || text.includes('stake') || text.includes('fintech') || text.includes('bank') || text.includes('yield') || text.includes('wallet')) iconKey = 'card';
    else if (text.includes('flight') || text.includes('travel') || text.includes('itinerary') || text.includes('airline') || text.includes('concierge')) iconKey = 'plane';
    else if (text.includes('meditation') || text.includes('breath') || text.includes('mood') || text.includes('mind') || text.includes('journal')) iconKey = 'zen';
    else if (text.includes('solar') || text.includes('energy') || text.includes('battery') || text.includes('power')) iconKey = 'bolt';
    else if (text.includes('watch') || text.includes('dial') || text.includes('wearable')) iconKey = 'watch';
    else if (text.includes('portfolio') || text.includes('bento') || text.includes('case study') || text.includes('design')) iconKey = 'layout';
    else if (text.includes('security') || text.includes('threat') || text.includes('cyber') || text.includes('shield')) iconKey = 'shield';
    else if (text.includes('fitness') || text.includes('workout') || text.includes('activity') || text.includes('sleep') || text.includes('ring')) iconKey = 'activity';
    else if (text.includes('whiteboard') || text.includes('canvas') || text.includes('team') || text.includes('sticky')) iconKey = 'pen';
    else if (text.includes('ai') || text.includes('bot') || text.includes('copilot') || text.includes('gpt')) iconKey = 'bot';
    else if (text.includes('grocery') || text.includes('box') || text.includes('shop') || text.includes('store') || text.includes('checkout')) iconKey = 'package';
    else if (text.includes('chat') || text.includes('message') || text.includes('social')) iconKey = 'chat';
    else if (text.includes('cloud') || text.includes('server') || text.includes('saas') || text.includes('data')) iconKey = 'layout';
    else iconKey = 'spark';
  }

  let shortLabel = topic.shortLabel || '';
  if (!shortLabel) {
    const firstPart = raw.split(/[:\–\—\-]/)[0].trim();
    const words = firstPart.split(/\s+/);
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

const DEFAULT_TOPICS = [
  {
    id: 'top_1',
    text: 'AI Travel Concierge: Flight & Itinerary Booking Flow',
    shortLabel: 'Flight Concierge',
    iconKey: 'plane',
    category: 'AI & Travel',
    deliverable: 'Mobile App (iOS)',
    uxFocus: 'Conversational Onboarding & Dynamic Price Alerts',
    color: PALETTE[0],
    active: true
  },
  {
    id: 'top_2',
    text: 'Fintech Staking & Yield Portfolio Dashboard',
    shortLabel: 'Fintech Vault',
    iconKey: 'card',
    category: 'Fintech',
    deliverable: 'Web Dashboard',
    uxFocus: 'Data Visualization & High-Density Financial Hierarchy',
    color: PALETTE[1],
    active: true
  },
  {
    id: 'top_3',
    text: 'Zero-Waste Grocery Box: Custom Taste Quiz & Schedule',
    shortLabel: 'ZeroWaste Box',
    iconKey: 'package',
    category: 'E-Commerce',
    deliverable: 'Mobile App',
    uxFocus: 'Interactive Stepper & Micro-animations on Checkout',
    color: PALETTE[2],
    active: true
  },
  {
    id: 'top_4',
    text: 'Spatial Audio Meditation & Breathing Guide',
    shortLabel: 'Spatial Breath',
    iconKey: 'zen',
    category: 'Health & Wellness',
    deliverable: 'Mobile & Watch App',
    uxFocus: 'Calming Haptics, Dark Mode Palette & Gesture Controls',
    color: PALETTE[3],
    active: true
  },
  {
    id: 'top_5',
    text: 'Smart Home Energy & Solar Battery Monitor',
    shortLabel: 'Solar Battery',
    iconKey: 'bolt',
    category: 'IoT & Smart Living',
    deliverable: 'Tablet & Mobile App',
    uxFocus: 'Live Power-Flow Physics Animation & Consumption Forecasting',
    color: PALETTE[4],
    active: true
  },
  {
    id: 'top_6',
    text: 'Luxury Mechanical Watch Customizer & 3D Configurator',
    shortLabel: 'Luxury Watch',
    iconKey: 'watch',
    category: 'Luxury & 3D',
    deliverable: 'Web Experience',
    uxFocus: 'Tactile Dial Zooming & Material Texture Customization',
    color: PALETTE[5],
    active: true
  },
  {
    id: 'top_7',
    text: 'Designer Portfolio Bento Grid with Interactive Case Studies',
    shortLabel: 'Portfolio Bento',
    iconKey: 'layout',
    category: 'Portfolio',
    deliverable: 'Responsive Web',
    uxFocus: 'Cursor Interaction, Bento Layouts & Smooth Page Transitions',
    color: PALETTE[6],
    active: true
  },
  {
    id: 'top_8',
    text: 'Cybersecurity Incident Response & Live Threat Map',
    shortLabel: 'Threat Map',
    iconKey: 'shield',
    category: 'Enterprise SaaS',
    deliverable: 'Desktop Web App',
    uxFocus: 'Critical Alert Triage, Dark UI & Color-coded Severity Nodes',
    color: PALETTE[7],
    active: true
  },
  {
    id: 'top_9',
    text: 'Fitness Wearable Activity Rings & Sleep Recovery Score',
    shortLabel: 'Fitness Rings',
    iconKey: 'activity',
    category: 'Health & Fitness',
    deliverable: 'Smartwatch & Mobile',
    uxFocus: 'Glanceable Circular Progress & Heart-Rate Variability Chart',
    color: PALETTE[8],
    active: true
  },
  {
    id: 'top_10',
    text: 'Remote Team Virtual Whiteboard & Sticky Canvas Hub',
    shortLabel: 'Team Canvas',
    iconKey: 'pen',
    category: 'Productivity',
    deliverable: 'Desktop App / Web',
    uxFocus: 'Multiplayer Cursors, Infinite Canvas Zoom & Toolbar Dock',
    color: PALETTE[9],
    active: true
  }
];

// Semantic Knowledge Base for Generating Smart Contextual Topics
const DOMAIN_PATTERNS = [
  {
    keywords: ['coffee', 'cafe', 'roast', 'brew', 'espresso', 'tea', 'beverage'],
    category: 'Food & Beverage',
    variants: [
      {
        title: 'Smart Espresso Companion: Pressure Profiling & Dial-in Guide',
        deliverable: 'Mobile App',
        uxFocus: 'Real-time Extraction Gauges & Shot Recipe Log'
      },
      {
        title: 'Artisan Coffee Roastery: Sensory Flavor Wheel & Bean Explorer',
        deliverable: 'Web Experience',
        uxFocus: 'Interactive Flavor Radar Chart & Origin Storytelling'
      },
      {
        title: 'Daily Cold Brew Subscription: Taste Quiz & Box Customizer',
        deliverable: 'Mobile Web Checkout',
        uxFocus: 'Frictionless One-Click Reorder & Delivery Stepper'
      },
      {
        title: 'Café Barista Fast POS: High-Speed Custom Drink Queue',
        deliverable: 'Tablet UI',
        uxFocus: 'Large Touch Targets, Order Modifiers & Split Payments'
      },
      {
        title: 'Neighborhood Café Loyalty: Gamified Digital Stamp Card & Perk Drawer',
        deliverable: 'Mobile App Widget',
        uxFocus: 'Delightful Confetti Micro-interaction & Quick Apple Wallet Pass'
      }
    ]
  },
  {
    keywords: ['crypto', 'bitcoin', 'wallet', 'web3', 'defi', 'blockchain', 'nft', 'token'],
    category: 'Fintech & Web3',
    variants: [
      {
        title: 'Self-Custody Multi-Chain Wallet: Simple Seedless Security Flow',
        deliverable: 'Mobile App',
        uxFocus: 'Biometric Social Recovery & Plain-English Gas Fee Breakdown'
      },
      {
        title: 'DeFi Staking Yield Optimizer: Risk vs Return Simulator',
        deliverable: 'Web Dashboard',
        uxFocus: 'Interactive Yield Slider & Liquidity Pool Heatmap'
      },
      {
        title: 'Instant Crypto-to-Fiat Tap-to-Pay Debit Card Hub',
        deliverable: 'Mobile App',
        uxFocus: 'Card Freeze Micro-interaction & Dynamic Cashback Progress'
      },
      {
        title: 'Web3 Identity & Social Graph: ENS Profile & Collectibles Showcase',
        deliverable: 'Responsive Web',
        uxFocus: 'Bento Grid Portfolio & Badge Verification Hologram'
      },
      {
        title: 'Autonomous Smart Contract Security Scanner & Transaction Preview',
        deliverable: 'Browser Extension UI',
        uxFocus: 'Phishing Warning Callouts & Phased Simulation Modal'
      }
    ]
  },
  {
    keywords: ['fitness', 'workout', 'gym', 'exercise', 'training', 'running', 'sport'],
    category: 'Health & Fitness',
    variants: [
      {
        title: 'AI Personal Trainer: Camera Rep Counting & Posture Correction',
        deliverable: 'Mobile App / AR',
        uxFocus: 'Real-time Skeletal Skeleton Overlay & Voice Audio Cues'
      },
      {
        title: 'Marathon Training Companion: Split Pace & Elevation Forecast',
        deliverable: 'Smartwatch Glances',
        uxFocus: 'High-contrast Outdoor Mode & Heart-rate Zone Rings'
      },
      {
        title: 'Boutique Gym Class Scheduler: Interactive Floor Studio Booking',
        deliverable: 'Mobile App',
        uxFocus: 'Spot Picker Map (Cycle/Reformer) & Waitlist Status'
      },
      {
        title: 'Strength Progression Tracker: 1-Rep Max Calculator & Warmup Sets',
        deliverable: 'Mobile App',
        uxFocus: 'Minimalist Dark Theme & Quick Barbell Weight Plate Selector'
      },
      {
        title: 'Social Fitness Club: Live Friend Workout Feed & Cheer Haptics',
        deliverable: 'Mobile App',
        uxFocus: 'Live Reaction Drawer & Weekly Challenge Leaderboard'
      }
    ]
  },
  {
    keywords: ['music', 'audio', 'podcast', 'playlist', 'dj', 'streaming', 'sound'],
    category: 'Entertainment & Audio',
    variants: [
      {
        title: 'Ambient Spatial Soundscape Mixer: Rain, Lo-Fi & White Noise Nodes',
        deliverable: 'Mobile / Tablet App',
        uxFocus: 'Draggable 2D Sound Position Canvas & Sleep Timer Dial'
      },
      {
        title: 'Collaborative Live DJ Room: Real-time Upvote Queue & Crossfader',
        deliverable: 'Web & Desktop App',
        uxFocus: 'Synchronized Playhead & Waveform Track Scrubber'
      },
      {
        title: 'Vinyl Record Digitizer & Album Art Liner Notes Explorer',
        deliverable: 'iPad Tablet App',
        uxFocus: 'Skeuomorphic Turntable Controls & High-Res Gatefold Flip'
      },
      {
        title: 'Podcast Chapter Bookmarking & AI Transcript Search',
        deliverable: 'Mobile App',
        uxFocus: 'Synchronized Highlight Playback & 15s Snippet Share'
      },
      {
        title: 'Concert & Festival Discovery: Interactive 3D Stage Lineup Schedule',
        deliverable: 'Mobile App',
        uxFocus: 'Offline Schedule Clash Resolver & Push Reminder Pills'
      }
    ]
  },
  {
    keywords: ['travel', 'flight', 'hotel', 'trip', 'vacation', 'booking', 'airline', 'explore'],
    category: 'Travel & Hospitality',
    variants: [
      {
        title: 'Split-Fare Group Trip Planner: Shared Itinerary & Expense Pool',
        deliverable: 'Mobile App',
        uxFocus: 'Real-time Voting on Activities & Receipt Camera Scanner'
      },
      {
        title: 'Boutique Eco-Lodge Booking: Carbon Offset & Sustainability Scorecard',
        deliverable: 'Responsive Web',
        uxFocus: 'Immersive Hero Video Transitions & Room Amenity Badges'
      },
      {
        title: 'Airport Flight Navigation: Live Terminal Gate Walking Map & Queue Times',
        deliverable: 'Smartwatch & Mobile',
        uxFocus: 'Dynamic Island Live Activity & TSA Wait-Time Bar'
      },
      {
        title: 'Solo Backpacker Offline City Map & Local Hidden Gem Compass',
        deliverable: 'Mobile App',
        uxFocus: 'Ultra-low Battery Mode & Community Pin Verification'
      },
      {
        title: 'Train Route Scenic Explorer: Panoramic Window View Highlights',
        deliverable: 'Tablet UI',
        uxFocus: 'Linear Timeline Route Map & Mountain Peak Landmark Markers'
      }
    ]
  },
  {
    keywords: ['e-commerce', 'shop', 'fashion', 'store', 'retail', 'clothes', 'shoes', 'product'],
    category: 'E-Commerce & Fashion',
    variants: [
      {
        title: '3D Sneaker Try-on & Virtual Augmented Reality Fitting Room',
        deliverable: 'Mobile App (iOS AR)',
        uxFocus: 'Realistic Material Reflections & Foot Size Camera Measurement'
      },
      {
        title: 'Limited Edition Streetwear Drop: Live Countdown & Instant Checkout',
        deliverable: 'Mobile Web App',
        uxFocus: 'Bot Prevention Micro-interaction & Reserved Cart Timer'
      },
      {
        title: 'Sustainable Secondhand Wardrobe: Condition Authenticity Grading',
        deliverable: 'Mobile App',
        uxFocus: 'High-Def Fabric Zoom & Price Depreciation Historical Graph'
      },
      {
        title: 'Luxury Perfume Scent Profile Quiz & Custom Discovery Set',
        deliverable: 'Web Experience',
        uxFocus: 'Mood-to-Fragrance Visualizer & Mini Bottle Sampler Tray'
      },
      {
        title: 'Cart Abandonment Recovery: Smart Bag Review & Alternative Bundles',
        deliverable: 'Mobile Web',
        uxFocus: 'Sticky Checkout Summary & Transparent Shipping Delivery Date'
      }
    ]
  },
  {
    keywords: ['health', 'mental', 'mind', 'meditation', 'doctor', 'therapy', 'sleep', 'wellness'],
    category: 'Health & Wellness',
    variants: [
      {
        title: 'Mood & Emotional Energy Journal with Voice Sentiment Heatmap',
        deliverable: 'Mobile App',
        uxFocus: 'Fluid Fluidity Blob Animations & Private Biometric Lock'
      },
      {
        title: 'Virtual Telehealth Waiting Room & Symptom Checker Triage',
        deliverable: 'Tablet & Mobile Web',
        uxFocus: 'Empathetic Conversational Flow & Doctor Bio Video Intro'
      },
      {
        title: 'Medication Smart Schedule & Pill Box Dispenser Sync',
        deliverable: 'Smartwatch & Mobile',
        uxFocus: 'Haptic Reminders, Drug Interaction Warnings & Refill Bar'
      },
      {
        title: 'Guided CBT Thought Reframing: Interactive Cognitive Bias Flip Cards',
        deliverable: 'Mobile App',
        uxFocus: 'Perspective Shifting Step-by-Step Exercise & Affirmation Stamp'
      },
      {
        title: 'Sleep Hygiene Coaching: Chronotype Schedule & Wind-Down Protocol',
        deliverable: 'Mobile App',
        uxFocus: 'Dim Amber Display Mode & Ambient Sound Fade-out'
      }
    ]
  },
  {
    keywords: ['ai', 'chat', 'copilot', 'model', 'prompt', 'assistant', 'bot', 'machine learning'],
    category: 'AI & Spatial Computing',
    variants: [
      {
        title: 'AI Multi-Agent Collaborative Canvas: Drag-and-drop Workflow Builder',
        deliverable: 'Web Desktop App',
        uxFocus: 'Node Connection Graph, Step Inspection & Branching Trees'
      },
      {
        title: 'Conversational Voice AI Interface with Dynamic Visual Memory Cards',
        deliverable: 'Mobile & Spatial App',
        uxFocus: 'Soundwave Ripple Animation & Card Extraction Feed'
      },
      {
        title: 'AI Prompt Engineering Lab: Side-by-Side Model Output Comparison',
        deliverable: 'Desktop Web App',
        uxFocus: 'Diff Highlighter, Token Cost Tracker & Latency Gauges'
      },
      {
        title: 'Generative UI: On-the-Fly Dynamic Interface Customizer for Tasks',
        deliverable: 'Responsive Web',
        uxFocus: 'Morphing Components, Layout Rearrangement & Micro-feedback'
      },
      {
        title: 'AI Meeting Intelligence: Live Speaker Sentiment & Action Items Matrix',
        deliverable: 'Desktop Widget',
        uxFocus: 'Minimalist Floating Pill & 1-Click Task Export to Notion/Linear'
      }
    ]
  },
  {
    keywords: ['saas', 'crm', 'dashboard', 'analytics', 'management', 'b2b', 'task', 'project'],
    category: 'Productivity & SaaS',
    variants: [
      {
        title: 'Project Roadmap & Gantt Chart with Drag-and-Drop Dependency Links',
        deliverable: 'Web App',
        uxFocus: 'Fluid Timeline Zooming, Milestone Pills & Critical Path Mode'
      },
      {
        title: 'Sales Pipeline Kanban: Deal Probability Forecasting & Quick Notes',
        deliverable: 'Desktop Web',
        uxFocus: 'Smooth Drag Physics, Stage Win Velocity & Contact Flyout'
      },
      {
        title: 'Cloud Infrastructure Observability: Live Microservice Latency Mesh',
        deliverable: 'Web Dashboard',
        uxFocus: 'Dark Theme High-Contrast Topology Graph & Error Stack Drilldown'
      },
      {
        title: 'Team Onboarding Portal: Gamified Knowledge Base & Checklist Quest',
        deliverable: 'Responsive Web',
        uxFocus: 'Celebration Progress Bar & Mentor Chat Quick Launcher'
      },
      {
        title: 'SaaS Billing & Team License Seat Allocator with Prorated Calculator',
        deliverable: 'Web Settings',
        uxFocus: 'Interactive Price Slider & Instant Invoice Preview'
      }
    ]
  }
];

// Universal Fallback Generator when input doesn't match predefined domain keywords
function generateUniversalVariants(topicInput) {
  const clean = topicInput.trim();
  const titleCase = clean.charAt(0).toUpperCase() + clean.slice(1);

  return [
    {
      title: `${titleCase}: Frictionless Mobile Onboarding & Preference Flow`,
      category: 'Mobile UX',
      deliverable: 'Mobile App (iOS/Android)',
      uxFocus: 'Progressive Disclosure, Skip Option & Delightful Micro-illustrations'
    },
    {
      title: `${titleCase}: Real-Time Analytics & Performance Bento Dashboard`,
      category: 'Data & Dashboard',
      deliverable: 'Web Dashboard',
      uxFocus: 'Bento Grid Layout, Interactive Trend Filters & Summary Metric Cards'
    },
    {
      title: `${titleCase}: High-Conversion Checkout, Booking & Payment Stepper`,
      category: 'Growth & E-Commerce',
      deliverable: 'Mobile Web',
      uxFocus: 'Single-page Sticky Order Review, Trust Badges & Apple/Google Pay'
    },
    {
      title: `${titleCase}: Smart AI Copilot Assistant & Contextual Quick-Actions`,
      category: 'AI & Productivity',
      deliverable: 'Web / Mobile Interface',
      uxFocus: 'Command Bar (Cmd+K), Floating Prompt Dock & Action History'
    },
    {
      title: `${titleCase}: Community Hub, Collaborative Feed & Member Showcase`,
      category: 'Social & Community',
      deliverable: 'Responsive Web',
      uxFocus: 'Threaded Discussions, Reaction Tray & Member Profile Cards'
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
    if (saved && Array.isArray(saved) && saved.length > 0) {
      this.topics = saved.map(t => {
        const vis = resolveTopicVisuals(t);
        t.iconKey = t.iconKey || vis.iconKey;
        t.shortLabel = t.shortLabel || vis.shortLabel;
        return t;
      });
    } else {
      this.topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
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

  persist() {
    window.storageManager.saveTopics(this.topics);
  }

  // --- Dynamic Similar Topics Generator ---
  generateSimilarTopics(userInput) {
    if (!userInput || !userInput.trim()) return [];

    const inputLower = userInput.toLowerCase().trim();
    const words = inputLower.split(/[\s,._-]+/).filter(w => w.length > 2);

    // Search for best matching domain pattern
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
      // Use intelligent universal fallback generator
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
