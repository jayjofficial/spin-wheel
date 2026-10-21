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

function resolveTopicVisuals(topic) {
  if (!topic) return { icon: '✨', shortLabel: 'Challenge' };
  
  if (topic.icon && topic.shortLabel) {
    return { icon: topic.icon, shortLabel: topic.shortLabel };
  }

  const raw = topic.text || topic.title || 'Design Challenge';
  const text = raw.toLowerCase();

  let icon = topic.icon || '';
  if (!icon) {
    if (text.includes('coffee') || text.includes('roast') || text.includes('espresso')) icon = '☕';
    else if (text.includes('crypto') || text.includes('stake') || text.includes('fintech') || text.includes('bank') || text.includes('yield') || text.includes('wallet')) icon = '💳';
    else if (text.includes('flight') || text.includes('travel') || text.includes('itinerary') || text.includes('airline') || text.includes('concierge')) icon = '✈️';
    else if (text.includes('meditation') || text.includes('breath') || text.includes('mood') || text.includes('mind') || text.includes('journal')) icon = '🧘';
    else if (text.includes('solar') || text.includes('energy') || text.includes('battery') || text.includes('power')) icon = '⚡';
    else if (text.includes('watch') || text.includes('dial') || text.includes('wearable')) icon = '⌚';
    else if (text.includes('portfolio') || text.includes('bento') || text.includes('case study') || text.includes('design')) icon = '🎨';
    else if (text.includes('security') || text.includes('threat') || text.includes('cyber') || text.includes('shield')) icon = '🛡️';
    else if (text.includes('fitness') || text.includes('workout') || text.includes('activity') || text.includes('sleep') || text.includes('ring')) icon = '📈';
    else if (text.includes('whiteboard') || text.includes('canvas') || text.includes('team') || text.includes('sticky')) icon = '✏️';
    else if (text.includes('ar') || text.includes('spatial') || text.includes('vr') || text.includes('vision') || text.includes('headset')) icon = '🥽';
    else if (text.includes('ai') || text.includes('bot') || text.includes('copilot') || text.includes('gpt')) icon = '🤖';
    else if (text.includes('grocery') || text.includes('box') || text.includes('shop') || text.includes('store') || text.includes('checkout')) icon = '🛍️';
    else if (text.includes('music') || text.includes('audio') || text.includes('sound') || text.includes('track')) icon = '🎧';
    else if (text.includes('car') || text.includes('ev') || text.includes('vehicle') || text.includes('charging')) icon = '🔋';
    else if (text.includes('food') || text.includes('recipe') || text.includes('dish') || text.includes('kitchen')) icon = '🍽️';
    else if (text.includes('chat') || text.includes('message') || text.includes('social')) icon = '💬';
    else if (text.includes('cloud') || text.includes('server') || text.includes('saas') || text.includes('data')) icon = '☁️';
    else icon = '✨';
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

  return { icon, shortLabel };
}
window.resolveTopicVisuals = resolveTopicVisuals;

const DEFAULT_TOPICS = [
  {
    id: 'top_1',
    text: 'AI Travel Concierge: Flight & Itinerary Booking Flow',
    shortLabel: 'Flight Concierge',
    icon: '✈️',
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
    icon: '💳',
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
    icon: '📦',
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
    icon: '🧘',
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
    icon: '⚡',
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
    icon: '⌚',
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
    icon: '🎨',
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
    icon: '🛡️',
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
    icon: '📈',
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
    icon: '✏️',
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
        if (!t.icon || !t.shortLabel) {
          const vis = resolveTopicVisuals(t);
          t.icon = t.icon || vis.icon;
          t.shortLabel = t.shortLabel || vis.shortLabel;
        }
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
      icon: topicData.icon || vis.icon,
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
          icon: vis.icon,
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
          icon: vis.icon,
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
