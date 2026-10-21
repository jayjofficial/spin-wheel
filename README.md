# UX Roulette & Weekly Design Tracker

A studio tool designed for UI/UX designers to overcome creative block, generate tailored design challenges, influence the roulette with custom topics, and track weekly design cadence for social media content.

---

## Features

### 1. The Creative Roulette Wheel
- **Crisp High-DPI Canvas Rendering**: Silky-smooth 60fps rotation, neon slice highlights, glowing metallic bezel, and top pointer needle.
- **Realistic Deceleration Physics**: Damped friction inertia with physical needle deflection on every passing pin.
- **Web Audio Mechanical Ticks & Fanfare**: Procedural audio engine that clicks with wheel velocity and plays a celebration chord when landing on a winner.
- **Confetti Explosion**: Custom particle physics celebration when your challenge is picked.
- **UI/UX Problem-Solving Brief**: Breaks down the winning topic into:
  - **What This Design Is About**: Clear overview of the digital product/service.
  - **The UX Problem to Solve**: The specific human friction, ergonomics, or usability challenge to address.
  - **Assigned Global UI Design Style**: A paired international UI design style complete with regional origin, color palette swatches, typography pairing, and core UX principles (with easy one-click style swapping).

### 2. Intuitive Country UI Design Styles (With Figma Cheat Sheets)
Includes 15 intuitive country design styles from around the world, prominently featuring African UI design aesthetics with actionable Figma guidelines (Buttons, Cards, Layout, and Signature Elements):
- **Africa**:
  - *Ghana Style* (Accra) — Bold warm gold primary buttons, rich green/red badges, Kente-inspired cards.
  - *Nigeria Style* (Lagos Tech Hub) — Electric emerald green action buttons, big numbers, and high-trust balance cards.
  - *Kenya Style* (Nairobi Silicon Savannah) — Mobile-first outdoor visibility, large touch targets, sunrise orange & teal.
  - *South Africa Style* (Johannesburg & Cape Town) — Urban industrial modernism, heavy charcoal cards, solid 1.5px borders.
  - *Rwanda Style* (Kigali Eco-Tech) — Clean botanical eco-minimalism, full pill buttons, spacious whitespace.
  - *Morocco Style* (Marrakech & Casablanca) — Warm desert terracotta clay cards, deep royal Majorelle blue buttons.
- **Asia**:
  - *Japan Style* (Kyoto & Tokyo) — Calm Zen minimalism, generous breathing room, single crimson red accent.
  - *South Korea Style* (Seoul) — 24px+ pillowy extra-rounded cards, soft lilac & sky pastel chips, friendly micro-copy.
- **Europe**:
  - *Switzerland Style* (Zurich & Basel) — Iconic grotesque typography grid, pure Swiss red buttons, strict mathematical layout.
  - *Germany Style* (Berlin & Bauhaus) — Strict 8px functional grid, primary blue/red action blocks, zero fluff.
  - *France Style* (Paris) — Parisian luxury editorial, high-contrast Serif headlines, champagne gold hairline borders.
  - *Scandinavia Style* (Stockholm & Copenhagen) — Cozy Nordic simplicity, soft muted sage green, ergonomic touch targets.
- **Americas & Global**:
  - *Brazil Style* (Rio & São Paulo) — Lively organic modernism, fluid sweeping card curves, botanical green & mango yellow.
  - *Silicon Valley Style* (California Tech) — Modern tech bento-grid, subtle 1px border glows, cyan/indigo status pills.
  - *Indie Web Style* (Retro Neo-Brutalism) — Solid 2.5px black borders on everything, hard 4px unblurred drop shadows.

### 3. Everyday Human Challenge Pool & Shuffle
- **Natural Phrasing**: Challenges use names everyday people say (e.g., *Roommate expense & bill splitter*, *Grocery delivery & weekly meal box*, *Doctor appointment & clinic check-in*, *Bus countdown & digital transit pass*, *Apartment hunting & rent lease*).
- **Stage Shuffle Pill (or Press `S`)**: Instantly loads 10 fresh, realistic challenges from a pool of 40+ everyday product ideas across finance, healthcare, transit, food, housing, education, and community.
- **Influence Generator**: Type any idea or industry to instantly generate 4-5 contextual, natural UI/UX challenges.

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

## Convex Cloud Backend

This app connects to your Convex Dev and Production deployments:
- **Dev Cloud**: `https://adorable-sturgeon-291.convex.cloud`
- **Dev Site**: `https://adorable-sturgeon-291.convex.site`
- **Prod Cloud**: `https://beaming-capybara-489.convex.cloud`
- **Prod Site**: `https://beaming-capybara-489.convex.site`

See [CONVEX_SETUP.md](file:///c:/Users/sarfo/OneDrive/Documents/GitHub/spin-wheel/CONVEX_SETUP.md) for full schema definitions and deployment steps.
