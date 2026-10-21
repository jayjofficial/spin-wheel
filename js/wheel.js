/**
 * UX Roulette - Canvas-Based High-DPI Spin Wheel Engine
 * Features realistic deceleration physics, mechanical peg collisions, and needle deflection.
 */

class RouletteWheel {
  constructor(canvasId, onSpinEnd) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.onSpinEnd = onSpinEnd;

    this.topics = [];
    this.currentAngle = 0; // Current rotation in radians
    this.angularVelocity = 0;
    this.friction = 0.988; // Deceleration damping
    this.minVelocity = 0.0018; // Velocity threshold to stop
    this.isSpinning = false;

    // Pointer needle element for physical deflection animation
    this.pointerEl = document.getElementById('wheel-pointer');
    this.lastPegIndex = -1;

    this.setupDPI();
    window.addEventListener('resize', () => this.setupDPI());
  }

  setupDPI() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const size = Math.min(rect.width || 480, 520);
    this.width = size;
    this.height = size;

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.scale(dpr, dpr);

    this.centerX = size / 2;
    this.centerY = size / 2;
    this.radius = size / 2 - 16; // Outer wheel padding

    this.draw();
  }

  setTopics(topics) {
    this.topics = topics || [];
    this.draw();
  }

  spin(initialVelocity = null) {
    if (this.isSpinning || this.topics.length === 0) return;

    this.isSpinning = true;
    // Randomized high initial velocity (between 0.35 and 0.55 rad per frame ~= 20 to 33 rad/s)
    this.angularVelocity = initialVelocity || (0.36 + Math.random() * 0.22);
    
    // Add extra spin turns
    const extraTurns = 5 + Math.floor(Math.random() * 4);
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
    // Normalize angle between 0 and 2*PI
    this.currentAngle = (this.currentAngle + Math.PI * 2) % (Math.PI * 2);

    // Apply friction deceleration
    this.angularVelocity *= this.friction;

    // Track peg collisions for needle tick audio and visual wobble
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

    // Pointer is at the top: angle = -PI/2 (or 3*PI/2)
    // Slices move under pointer
    const pointerAngle = (3 * Math.PI) / 2;
    let relativeAngle = (pointerAngle - this.currentAngle) % (Math.PI * 2);
    if (relativeAngle < 0) relativeAngle += Math.PI * 2;

    const currentPeg = Math.floor(relativeAngle / sliceAngle);

    if (currentPeg !== this.lastPegIndex) {
      this.lastPegIndex = currentPeg;
      // Play tick sound with velocity modulation
      if (window.soundEngine) {
        window.soundEngine.playTick(this.angularVelocity * 100);
      }
      // Deflect needle visually
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

    // Pointer is at 12 o'clock (3*PI / 2)
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

    if (this.topics.length === 0) {
      // Draw empty wheel state
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 15px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No active topics on wheel', cx, cy);
      return;
    }

    const numSlices = this.topics.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    // 1. Draw Outer Glowing Ring & Shadow
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.lineWidth = 4;
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

      // Slice Color Fill with subtle radial lighting
      const baseColor = topic.color || PALETTE[i % PALETTE.length];
      const sliceGrad = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius);
      sliceGrad.addColorStop(0, '#1c2438');
      sliceGrad.addColorStop(0.35, baseColor);
      sliceGrad.addColorStop(1, this.darkenColor(baseColor, 0.25));

      ctx.fillStyle = sliceGrad;
      ctx.fill();

      // Slice Separator Line
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 3. Draw Slice Text (Oriented along the radius)
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12.5px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Drop shadow for crisp readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      // Format & Truncate Text for segment size
      const maxTextLength = numSlices > 12 ? 20 : numSlices > 8 ? 26 : 34;
      let label = topic.text || topic.title || '';
      if (label.length > maxTextLength) {
        label = label.substr(0, maxTextLength - 2) + '...';
      }

      // Draw text near outer edge with room for hub
      ctx.fillText(label, radius - 26, 0);
      ctx.restore();
    }

    // 4. Draw Wheel Pins / Pegs around perimeter
    for (let i = 0; i < numSlices; i++) {
      const pegAngle = i * sliceAngle;
      const px = Math.cos(pegAngle) * (radius - 5);
      const py = Math.sin(pegAngle) * (radius - 5);

      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 4;
      ctx.fill();

      // Center silver dot
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#cbd5e1';
      ctx.fill();
    }

    ctx.restore();

    // 5. Draw Outer Chrome Bezel Rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 5;
    ctx.stroke();
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
