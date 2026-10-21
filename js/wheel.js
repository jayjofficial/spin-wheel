/**
 * UX Roulette - Canvas-Based High-DPI Studio Wheel Engine
 * Features realistic deceleration physics, mechanical peg collisions, and needle deflection.
 * Equipped with Pictorial Icon Badges, calibrated milled bezel dial, and Fullscreen Studio Mode.
 */

const THEME_WHEEL_CONFIGS = {
  linear: {
    name: 'Linear Studio',
    palette: [
      '#131a28', // Studio Graphite
      '#1a263c', // Slate Sapphire
      '#162033', // Deep Steel
      '#1b2842', // Cobalt Slate
      '#182236', // Muted Obsidian
      '#1f2d48', // Titanium Blue
      '#162135', // Deep Navy
      '#1d2a45'  // Precision Milled
    ],
    fontFamily: "'Inter', -apple-system, sans-serif",
    accentText: '#f8fafc',
    textShadow: 'rgba(0, 0, 0, 0.95)',
    centerDarken: '#080a11',
    outerRingGlow: 'rgba(59, 130, 246, 0.35)',
    separatorColor: 'rgba(8, 10, 16, 0.95)',
    bezelOuter: 'rgba(255, 255, 255, 0.16)',
    bezelInner: 'rgba(59, 130, 246, 0.35)',
    bezelTick: 'rgba(255, 255, 255, 0.25)',
    pegColor: '#e2e8f0',
    pegCore: '#38bdf8',
    podBg: 'rgba(10, 14, 24, 0.82)',
    podBorder: 'rgba(255, 255, 255, 0.22)',
    gradientDarken: 0.38,
    confettiColors: ['#3b82f6', '#60a5fa', '#94a3b8', '#ffffff', '#818cf8', '#0ea5e9']
  },
  editorial: {
    name: 'Nordic Editorial',
    palette: [
      '#c25e3d', // Terracotta Clay
      '#476856', // Swedish Sage
      '#c9893d', // Warm Ochre
      '#3a3d45', // Warm Slate
      '#8c586a', // Dusty Rose
      '#596e57', // Forest Olive
      '#ad6c47', // Burnished Sienna
      '#384852'  // Nordic Sea
    ],
    fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
    accentText: '#faf8f5',
    textShadow: 'rgba(28, 25, 23, 0.85)',
    centerDarken: '#2d2724',
    outerRingGlow: 'rgba(194, 94, 61, 0.35)',
    separatorColor: 'rgba(250, 248, 245, 0.35)',
    bezelOuter: 'rgba(194, 94, 61, 0.35)',
    bezelInner: 'rgba(217, 119, 6, 0.25)',
    bezelTick: 'rgba(194, 94, 61, 0.4)',
    pegColor: '#fef3c7',
    pegCore: '#d97706',
    podBg: 'rgba(255, 255, 255, 0.88)',
    podBorder: 'rgba(194, 94, 61, 0.45)',
    gradientDarken: 0.2,
    confettiColors: ['#c25e3d', '#476856', '#c9893d', '#d97706', '#8c586a', '#fef3c7']
  },
  spatial: {
    name: 'Apple Spatial',
    palette: [
      '#0071e3', // System Blue
      '#bf5af2', // Royal Purple
      '#30d158', // Mint Emerald
      '#ff375f', // Sunset Rose
      '#06b6d4', // Liquid Cyan
      '#ff9f0a', // Luminous Amber
      '#5e5ce6', // Electric Indigo
      '#32d74b'  // Vibrant Green
    ],
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    accentText: '#ffffff',
    textShadow: 'rgba(0, 0, 0, 0.75)',
    centerDarken: 'rgba(255, 255, 255, 0.18)',
    outerRingGlow: 'rgba(56, 189, 248, 0.5)',
    separatorColor: 'rgba(255, 255, 255, 0.3)',
    bezelOuter: 'rgba(255, 255, 255, 0.4)',
    bezelInner: 'rgba(56, 189, 248, 0.45)',
    bezelTick: 'rgba(255, 255, 255, 0.45)',
    pegColor: '#ffffff',
    pegCore: '#38bdf8',
    podBg: 'rgba(255, 255, 255, 0.22)',
    podBorder: 'rgba(255, 255, 255, 0.4)',
    gradientDarken: 0.28,
    confettiColors: ['#0071e3', '#30d158', '#bf5af2', '#ff375f', '#ff9f0a', '#64d2ff', '#ffffff']
  },
  arcade: {
    name: 'Neo-Arcade',
    palette: [
      '#00f2fe', // Hyper Cyan
      '#ff007f', // Laser Magenta
      '#7928ca', // Cyber Violet
      '#10e598', // Radioactive Emerald
      '#ff5e00', // Turbo Orange
      '#0070f3', // Electric Blue
      '#e00070', // Hot Pink
      '#ffd600'  // Cyber Yellow
    ],
    fontFamily: "'Space Grotesk', -apple-system, sans-serif",
    accentText: '#ffffff',
    textShadow: 'rgba(0, 0, 0, 0.95)',
    centerDarken: '#06060e',
    outerRingGlow: 'rgba(0, 242, 254, 0.65)',
    separatorColor: 'rgba(0, 242, 254, 0.5)',
    bezelOuter: 'rgba(255, 0, 127, 0.6)',
    bezelInner: 'rgba(0, 242, 254, 0.5)',
    bezelTick: 'rgba(0, 242, 254, 0.6)',
    pegColor: '#ffffff',
    pegCore: '#ff007f',
    podBg: 'rgba(6, 6, 16, 0.85)',
    podBorder: 'rgba(0, 242, 254, 0.5)',
    gradientDarken: 0.45,
    confettiColors: ['#00f2fe', '#ff007f', '#ffd600', '#10e598', '#7928ca', '#ffffff']
  }
};

window.THEME_WHEEL_CONFIGS = THEME_WHEEL_CONFIGS;

class RouletteWheel {
  constructor(canvasId, onSpinEnd) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.onSpinEnd = onSpinEnd;

    this.topics = [];
    this.currentAngle = 0; // Current rotation in radians
    this.angularVelocity = 0;
    this.friction = 0.988; // Deceleration damping
    this.minVelocity = 0.0018; // Velocity threshold to stop
    this.isSpinning = false;
    this.currentTheme = localStorage.getItem('ux_roulette_theme') || 'linear';

    // Pointer needle element for physical deflection animation
    this.pointerEl = document.getElementById('wheel-pointer');
    this.lastPegIndex = -1;

    this.setupDPI();
    window.addEventListener('resize', () => this.setupDPI());
    document.addEventListener('fullscreenchange', () => setTimeout(() => this.setupDPI(), 100));
  }

  setTheme(themeName) {
    this.currentTheme = themeName || 'linear';
    this.draw();
  }

  setupDPI() {
    if (!this.canvas) return;
    const isFullscreen = document.body.classList.contains('fullscreen-active') || !!document.fullscreenElement;
    const dpr = window.devicePixelRatio || 1;

    let size;
    if (isFullscreen) {
      const avail = Math.min(window.innerWidth * 0.88, window.innerHeight * 0.74);
      size = Math.min(Math.max(avail, 480), 720);
    } else {
      const rect = this.canvas.getBoundingClientRect();
      size = Math.min(rect.width || 480, 520);
      if (size < 320) size = 360;
    }

    this.width = size;
    this.height = size;

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.centerX = size / 2;
    this.centerY = size / 2;
    this.radius = size / 2 - 18; // Outer wheel padding

    this.draw();
  }

  setTopics(topics) {
    this.topics = topics || [];
    this.draw();
  }

  spin(initialVelocity = null) {
    if (this.isSpinning || this.topics.length === 0) return;

    this.isSpinning = true;
    this.angularVelocity = initialVelocity || (0.36 + Math.random() * 0.22);
    this.friction = 0.985 + Math.random() * 0.005;

    // Trigger audio gesture unlock
    if (window.soundEngine) {
      window.soundEngine.init();
    }

    this.animate();
  }

  animate() {
    if (!this.isSpinning) return;

    this.currentAngle += this.angularVelocity;
    this.currentAngle = (this.currentAngle + Math.PI * 2) % (Math.PI * 2);

    this.angularVelocity *= this.friction;
    this.checkPegCollision();
    this.draw();

    if (this.angularVelocity > this.minVelocity) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.stop();
    }
  }

  checkPegCollision() {
    if (this.topics.length === 0) return;
    const numSlices = this.topics.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    const pointerAngle = (3 * Math.PI) / 2;
    let relativeAngle = (pointerAngle - this.currentAngle) % (Math.PI * 2);
    if (relativeAngle < 0) relativeAngle += Math.PI * 2;

    const currentPeg = Math.floor(relativeAngle / sliceAngle);

    if (currentPeg !== this.lastPegIndex) {
      this.lastPegIndex = currentPeg;
      if (window.soundEngine) {
        window.soundEngine.playTick(this.angularVelocity * 100);
      }
      if (this.pointerEl) {
        const deflection = Math.min(22, this.angularVelocity * 120);
        this.pointerEl.style.transform = `translateX(-50%) rotate(${deflection}deg)`;
        setTimeout(() => {
          if (this.pointerEl) this.pointerEl.style.transform = `translateX(-50%) rotate(0deg)`;
        }, 45);
      }
    }
  }

  stop() {
    this.isSpinning = false;
    this.angularVelocity = 0;

    const winner = this.getWinningTopic();
    if (this.pointerEl) {
      this.pointerEl.style.transform = 'translateX(-50%) rotate(0deg)';
    }

    if (this.onSpinEnd && winner) {
      this.onSpinEnd(winner);
    }
  }

  getWinningTopic() {
    if (this.topics.length === 0) return null;

    const numSlices = this.topics.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    const pointerAngle = (3 * Math.PI) / 2;
    let relativeAngle = (pointerAngle - this.currentAngle) % (Math.PI * 2);
    if (relativeAngle < 0) relativeAngle += Math.PI * 2;

    const winningIndex = Math.floor(relativeAngle / sliceAngle);
    return this.topics[winningIndex] || this.topics[0];
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const cx = this.centerX;
    const cy = this.centerY;
    const radius = this.radius;

    ctx.clearRect(0, 0, this.width, this.height);

    const themeCfg = THEME_WHEEL_CONFIGS[this.currentTheme] || THEME_WHEEL_CONFIGS.linear;

    if (this.topics.length === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = this.currentTheme === 'editorial' ? '#f4f0e8' : '#101420';
      ctx.fill();
      ctx.strokeStyle = this.currentTheme === 'editorial' ? '#d6cebe' : '#273142';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = this.currentTheme === 'editorial' ? '#78716c' : '#94a3b8';
      ctx.font = `600 14px ${themeCfg.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.fillText('No active challenges on wheel', cx, cy);
      return;
    }

    const numSlices = this.topics.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    // 1. Draw Outer Glowing Ring & Shadow
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
    ctx.strokeStyle = themeCfg.outerRingGlow;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();

    // 2. Draw Wheel Slices
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.currentAngle);

    for (let i = 0; i < numSlices; i++) {
      const topic = this.topics[i];
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Slice Path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      const baseColor = themeCfg.palette[i % themeCfg.palette.length];

      // Sophisticated radial lighting gradient
      const sliceGrad = ctx.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius);
      sliceGrad.addColorStop(0, themeCfg.centerDarken);
      sliceGrad.addColorStop(0.35, baseColor);
      sliceGrad.addColorStop(1, this.darkenColor(baseColor, themeCfg.gradientDarken));

      ctx.fillStyle = sliceGrad;
      ctx.fill();

      // Slice Separator Line
      ctx.strokeStyle = themeCfg.separatorColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Draw PICTORIAL OPTION (Icon Pod + Concise Punchy Label)
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);

      const visuals = window.resolveTopicVisuals ? window.resolveTopicVisuals(topic) : { icon: topic.icon || '✨', shortLabel: topic.shortLabel || topic.text || '' };
      const icon = visuals.icon;
      let shortLabel = visuals.shortLabel;

      // Calculate pictorial pod size & position
      const podDist = radius * 0.74;
      const arcWidth = (radius * Math.PI / numSlices);
      const maxPodR = arcWidth * 0.38;
      const podR = Math.max(15, Math.min(23, maxPodR));

      // 3A. Draw Pictorial Icon Pod
      ctx.save();
      ctx.translate(podDist, 0);

      // Pod shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      ctx.beginPath();
      ctx.arc(0, 0, podR, 0, Math.PI * 2);
      ctx.fillStyle = themeCfg.podBg;
      ctx.fill();

      // Pod border ring
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = themeCfg.podBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Icon Glyph
      ctx.font = `${Math.round(podR * 1.15)}px -apple-system, "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, 0, 1);
      ctx.restore();

      // 3B. Draw Clean Concise Label
      ctx.save();
      const labelDist = podDist - podR - 7;
      ctx.fillStyle = themeCfg.accentText;
      const fontSize = numSlices > 12 ? 11 : numSlices > 8 ? 12 : 13;
      ctx.font = `700 ${fontSize}px ${themeCfg.fontFamily}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      ctx.shadowColor = themeCfg.textShadow;
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      // Truncate cleanly if needed
      const maxChars = numSlices > 12 ? 15 : numSlices > 8 ? 19 : 24;
      if (shortLabel.length > maxChars) {
        shortLabel = shortLabel.substr(0, maxChars - 1) + '…';
      }

      ctx.fillText(shortLabel, labelDist, 0);
      ctx.restore();

      ctx.restore();
    }

    // 4. Draw Wheel Pins / Pegs around perimeter
    for (let i = 0; i < numSlices; i++) {
      const pegAngle = i * sliceAngle;
      const px = Math.cos(pegAngle) * (radius - 5);
      const py = Math.sin(pegAngle) * (radius - 5);

      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = themeCfg.pegColor;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = themeCfg.pegCore;
      ctx.fill();
    }

    ctx.restore();

    // 5. Draw Outer Calibrated Milled Bezel Dial
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = themeCfg.bezelOuter;
    ctx.lineWidth = 4.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
    ctx.strokeStyle = themeCfg.bezelInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Calibrated micro tick marks around bezel rim (60 ticks like a luxury watch)
    const totalTicks = 60;
    ctx.strokeStyle = themeCfg.bezelTick || 'rgba(255, 255, 255, 0.2)';
    for (let t = 0; t < totalTicks; t++) {
      const tickAngle = (t * Math.PI * 2) / totalTicks;
      const isMajor = t % 5 === 0;
      const tickLen = isMajor ? 5 : 2.5;
      const x1 = cx + Math.cos(tickAngle) * (radius - 1);
      const y1 = cy + Math.sin(tickAngle) * (radius - 1);
      const x2 = cx + Math.cos(tickAngle) * (radius - 1 - tickLen);
      const y2 = cy + Math.sin(tickAngle) * (radius - 1 - tickLen);

      ctx.lineWidth = isMajor ? 1.5 : 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.restore();
  }

  darkenColor(hex, factor) {
    try {
      hex = hex.replace('#', '');
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      r = Math.floor(r * (1 - factor));
      g = Math.floor(g * (1 - factor));
      b = Math.floor(b * (1 - factor));

      return `rgb(${r}, ${g}, ${b})`;
    } catch (e) {
      return hex;
    }
  }
}

window.RouletteWheel = RouletteWheel;
