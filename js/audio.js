/**
 * Procedural Audio Engine for UX Roulette
 * Uses Web Audio API to create mechanical tick clicks, needle snaps, and celebratory fanfares.
 * 100% self-contained, no external mp3 assets needed.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.lastTickTime = 0;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Play a crisp mechanical tick sound when wheel passes a peg
  playTick(velocity = 1) {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const now = performance.now();
    // Throttle clicks so high speeds don't saturate audio buffer
    if (now - this.lastTickTime < 18) return;
    this.lastTickTime = now;

    try {
      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Pitch slightly randomized for realistic mechanical ratchet sound
      const baseFreq = 580 + Math.random() * 120 + Math.min(velocity * 15, 300);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.035);

      const vol = Math.min(0.25, 0.08 + velocity * 0.015);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + 0.038);
    } catch (e) {
      // Audio might be blocked before first user gesture
    }
  }

  // Play celebratory victory chords upon stopping
  playWinFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const t = this.audioCtx.currentTime;
      // Bright major triad chord progression: C5, E5, G5, C6 with warm harmonics
      const notes = [523.25, 659.25, 783.99, 1046.50];
      
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        const startTime = t + idx * 0.08;
        const dur = 0.65;

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur + 0.05);
      });
    } catch (e) {}
  }

  // Subtler pop sound for UI interactions
  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(840, t + 0.06);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    } catch (e) {}
  }
}

window.soundEngine = new SoundEngine();
