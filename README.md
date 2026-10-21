# UX Roulette & Weekly Design Tracker

A studio tool designed for UI/UX designers to overcome creative block, generate tailored design challenges, influence the roulette with custom topics, and track weekly design cadence for social media content.

---

## Features

### 1. The Creative Roulette Wheel
- **Crisp High-DPI Canvas Rendering**: Silky-smooth 60fps rotation, neon slice highlights, glowing metallic bezel, and top pointer needle.
- **Realistic Deceleration Physics**: Damped friction inertia with physical needle deflection on every passing pin.
- **Web Audio Mechanical Ticks & Fanfare**: Procedural audio engine that clicks with wheel velocity and plays a celebration chord when landing on a winner.
- **Confetti Explosion**: Custom particle physics celebration when your challenge is picked.
- **Creative Specs Modal**: Breaks down the winning topic into **Platform** (Mobile, Web Dashboard, Watch, AR), **UX Challenge Focus**, and **Domain**.

### 2. Influence & Dynamic Topic Generator
- **Influence the Wheel**: Type any idea or industry (e.g. *Coffee shop app*, *Split bills*, *Plant care*, *Pet adoption*).
- **Smart Semantic Variation Engine**: Instantly generates 5 contextual, everyday human UI/UX challenges tailored to your idea.
- **One-Click Inclusion**: Add individual generated challenges or add all with a single click.

### 3. Creative Shuffle Engine
- **Shuffle Ideas Button (or Press `S`)**: Instantly picks 10 random, unexpected, and imaginative design challenges from an expansive 50+ creative concept library (Sci-Fi, Whimsical, Retro Gear, Niche Passions, Nature, and Audio).

### 4. Weekly Design Archive & Habit Tracker
- **Automatic ISO-8601 Week Calculation**: Accurately tracks which week each design belongs to (e.g., `Week 43, 2026`) and calculates date ranges.
- **Weekly Design Streak**: Tracks consecutive active weeks where you published or created designs to keep your content rhythm strong.
- **Rich Media & Screenshot Logger**:
  - Upload screenshots or drag-and-drop design files.
  - **Clipboard Paste Support (`Ctrl+V`)**: Directly paste screenshots from Figma or CleanShot into the logger!
  - Generative fallback mockups if no screenshot is provided yet.
- **External Portfolio Links**: Direct buttons to open the live Figma project and published social post (Dribbble, Instagram, Behance, X, LinkedIn).
- **Filter & Search**: Filter by specific week, design status (*Planned*, *In Progress*, *Completed*, *Published*), or keyword search.

### 5. Topic Matrix & Backup Portability
- Browse topics grouped by domain: *AI & Smart Tools*, *Money & Finance*, *Health & Wellness*, *Shopping & Retail*, *Work & Teams*, *Music & Audio*, *Travel*, etc.
- Export all designs and topics to JSON for backup or restore anytime.

---

## Getting Started

Simply open `index.html` directly in any modern browser (Chrome, Edge, Safari, Firefox):

```bash
# Double-click index.html or open via command line:
start index.html
```

---

## Shortcuts

- **`Spacebar`**: Spin the roulette anytime.
- **`S`**: Shuffle roulette topics with fresh creative design ideas.
- **`F`**: Toggle full-screen studio mode.
- **`Ctrl+V` / `Cmd+V`**: Paste a copied screenshot directly into the Design Logger modal.
- **`Esc`**: Close any active modal or theater mode.

---

## ☁️ Convex Cloud Backend

This app connects to your Convex Dev and Production deployments:
- **Dev Cloud**: `https://adorable-sturgeon-291.convex.cloud`
- **Dev Site**: `https://adorable-sturgeon-291.convex.site`
- **Prod Cloud**: `https://beaming-capybara-489.convex.cloud`
- **Prod Site**: `https://beaming-capybara-489.convex.site`

See [CONVEX_SETUP.md](file:///c:/Users/sarfo/OneDrive/Documents/GitHub/spin-wheel/CONVEX_SETUP.md) for full schema definitions and deployment steps.
