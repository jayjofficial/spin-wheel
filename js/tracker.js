/**
 * UX Roulette - Design Tracker & Weekly Archive Module
 * Tracks weekly cadence, ISO week numbers, design streak, image uploads and portfolio links.
 */

class DesignTracker {
  constructor() {
    this.designs = [];
    this.selectedWeekFilter = 'all'; // 'all' or 'YYYY-Www'
    this.selectedStatusFilter = 'all';
    this.searchQuery = '';

    this.currentWeekData = StorageManager.getISOWeekData(new Date());
    this.init();
  }

  async init() {
    this.designs = await window.storageManager.getAllDesigns();
    this.render();
  }

  async refresh() {
    this.designs = await window.storageManager.getAllDesigns();
    this.render();
  }

  // Calculate and update top stats
  updateStats() {
    const streak = StorageManager.calculateStreak(this.designs);
    
    // Total designs
    const totalCount = this.designs.length;

    // Current week designs
    const currentWeekKey = `${this.currentWeekData.year}-W${String(this.currentWeekData.week).padStart(2, '0')}`;
    const thisWeekDesigns = this.designs.filter(d => {
      const k = `${d.year}-W${String(d.week).padStart(2, '0')}`;
      return k === currentWeekKey;
    });

    const thisWeekCount = thisWeekDesigns.length;

    // Update DOM elements
    const streakEl = document.getElementById('stat-streak');
    const totalEl = document.getElementById('stat-total');
    const thisWeekEl = document.getElementById('stat-this-week');
    const headerStreakEl = document.getElementById('header-streak-count');

    if (streakEl) streakEl.textContent = `${streak} ${streak === 1 ? 'Week' : 'Weeks'}`;
    if (totalEl) totalEl.textContent = totalCount;
    if (thisWeekEl) thisWeekEl.textContent = thisWeekCount;
    if (headerStreakEl) headerStreakEl.textContent = `${streak} ${streak === 1 ? 'Week' : 'Weeks'}`;

    // Update banner headline
    const bannerWeekTag = document.getElementById('banner-current-week-tag');
    const bannerDateRange = document.getElementById('banner-date-range');
    if (bannerWeekTag) {
      bannerWeekTag.textContent = `📅 Current: Week ${this.currentWeekData.week}, ${this.currentWeekData.year}`;
    }
    if (bannerDateRange) {
      const range = StorageManager.getWeekDateRange(this.currentWeekData.year, this.currentWeekData.week);
      bannerDateRange.textContent = `${range} • Let's build your design habit!`;
    }

    this.populateWeekFilterDropdown();
  }

  // Populate week filter dropdown with existing weeks in data + current week
  populateWeekFilterDropdown() {
    const select = document.getElementById('filter-week-select');
    if (!select) return;

    // Collect all unique week keys
    const weekMap = new Map();
    // Add current week first
    const currentKey = `${this.currentWeekData.year}-W${String(this.currentWeekData.week).padStart(2, '0')}`;
    weekMap.set(currentKey, {
      key: currentKey,
      label: `Week ${this.currentWeekData.week}, ${this.currentWeekData.year} (Current)`,
      year: this.currentWeekData.year,
      week: this.currentWeekData.week
    });

    this.designs.forEach(d => {
      const k = `${d.year}-W${String(d.week).padStart(2, '0')}`;
      if (!weekMap.has(k)) {
        weekMap.set(k, {
          key: k,
          label: `Week ${d.week}, ${d.year}`,
          year: d.year,
          week: d.week
        });
      }
    });

    // Save previous selection
    const prevVal = select.value || 'all';

    select.innerHTML = '<option value="all">🗓️ All Weeks</option>';
    
    // Sort descending (latest week first)
    const sortedWeeks = Array.from(weekMap.values()).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.week - a.week;
    });

    sortedWeeks.forEach(w => {
      const opt = document.createElement('option');
      opt.value = w.key;
      opt.textContent = w.label;
      select.appendChild(opt);
    });

    select.value = prevVal;
  }

  getFilteredDesigns() {
    return this.designs.filter(d => {
      // Week filter
      if (this.selectedWeekFilter !== 'all') {
        const k = `${d.year}-W${String(d.week).padStart(2, '0')}`;
        if (k !== this.selectedWeekFilter) return false;
      }

      // Status filter
      if (this.selectedStatusFilter !== 'all') {
        if (d.status !== this.selectedStatusFilter) return false;
      }

      // Search query
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const titleMatch = (d.title || '').toLowerCase().includes(q);
        const promptMatch = (d.prompt || '').toLowerCase().includes(q);
        const tagsMatch = (d.tags || []).some(t => t.toLowerCase().includes(q));
        if (!titleMatch && !promptMatch && !tagsMatch) return false;
      }

      return true;
    });
  }

  render() {
    this.updateStats();

    const container = document.getElementById('designs-gallery-grid');
    if (!container) return;

    const filtered = this.getFilteredDesigns();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-gallery-state">
          <div class="empty-icon-wrap">🎨</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.35rem;">No Designs Logged Yet</h3>
          <p style="color: var(--text-muted); max-width: 420px; font-size: 0.92rem;">
            ${this.selectedWeekFilter !== 'all' ? 'No designs found for this selected week.' : 'Spin the UX Roulette, pick a challenge, and showcase your creative designs here!'}
          </p>
          <button class="btn-primary-glow" id="btn-empty-spin-trigger" style="margin-top: 0.5rem;">
            <span>🎡 Spin the Roulette</span>
          </button>
        </div>
      `;

      const emptySpinBtn = document.getElementById('btn-empty-spin-trigger');
      if (emptySpinBtn) {
        emptySpinBtn.addEventListener('click', () => {
          window.app.switchTab('roulette');
        });
      }
      return;
    }

    container.innerHTML = filtered.map(d => this.createCardHTML(d)).join('');
    this.bindCardEvents(container);
  }

  createCardHTML(design) {
    const weekData = StorageManager.getISOWeekData(design.date);
    const dateFormatted = new Date(design.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const statusClasses = {
      published: 'published',
      completed: 'completed',
      in_progress: 'in_progress',
      planned: 'planned'
    };

    const statusLabels = {
      published: '🚀 Published',
      completed: '✨ Completed',
      in_progress: '⏳ In Progress',
      planned: '📌 Planned'
    };

    const statusClass = statusClasses[design.status] || 'planned';
    const statusText = statusLabels[design.status] || 'Planned';

    // Generative visual preview or real screenshot
    let mediaHTML = '';
    if (design.image) {
      mediaHTML = `<img src="${design.image}" alt="${design.title}" class="card-img" loading="lazy">`;
    } else {
      const platformIcons = {
        'Mobile App': '📱',
        'Web / Dashboard': '💻',
        'Smartwatch': '⌚',
        'Tablet': '📲',
        'Spatial / AR': '🥽'
      };
      const icon = platformIcons[design.platform] || '🎨';
      mediaHTML = `
        <div class="card-generative-mock">
          <div class="mock-device-preview">${icon}</div>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${design.platform || 'UI Design'}</span>
        </div>
      `;
    }

    const tagsHTML = (design.tags || [])
      .map(tag => `<span class="tag-badge">${tag.startsWith('#') ? tag : '#' + tag}</span>`)
      .join('');

    const figmaLink = design.figmaUrl
      ? `<a href="${design.figmaUrl}" target="_blank" rel="noopener" class="icon-link-btn" title="Open Figma File">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>
         </a>`
      : '';

    const postLink = design.postUrl
      ? `<a href="${design.postUrl}" target="_blank" rel="noopener" class="icon-link-btn" title="View Published Post">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
         </a>`
      : '';

    return `
      <div class="design-card" data-id="${design.id}">
        <div class="card-media-wrapper" data-action="preview-image">
          ${mediaHTML}
          <div class="card-badges-overlay">
            <span class="week-badge-pill">Week ${design.week}, ${design.year}</span>
            <span class="status-pill ${statusClass}">${statusText}</span>
          </div>
        </div>
        <div class="card-content">
          <h4 class="card-title">${this.escapeHTML(design.title)}</h4>
          <p class="card-prompt-snippet" title="${this.escapeHTML(design.prompt || '')}">${this.escapeHTML(design.prompt || 'Custom prompt')}</p>
          
          ${tagsHTML ? `<div class="card-tags">${tagsHTML}</div>` : ''}

          <div class="card-meta-row">
            <span>📅 ${dateFormatted}</span>
            <span>${design.platform || 'General'}</span>
          </div>

          <div class="card-footer-actions">
            <div class="link-buttons-group">
              ${figmaLink}
              ${postLink}
            </div>
            <div class="card-manage-btns">
              <button class="btn-card-icon" data-action="edit" title="Edit Design">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn-card-icon delete" data-action="delete" title="Delete Design">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindCardEvents(container) {
    container.querySelectorAll('.design-card').forEach(card => {
      const id = card.dataset.id;
      const design = this.designs.find(d => d.id === id);
      if (!design) return;

      // Edit action
      card.querySelector('[data-action="edit"]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.app.openDesignModal(design);
      });

      // Delete action
      card.querySelector('[data-action="delete"]')?.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm(`Delete "${design.title}"?`)) {
          await window.storageManager.deleteDesign(id);
          window.app.showToast('Design deleted', 'info');
          this.refresh();
        }
      });

      // Preview Image click
      card.querySelector('[data-action="preview-image"]')?.addEventListener('click', () => {
        if (design.image) {
          window.app.openImageLightbox(design.image, design.title);
        } else {
          window.app.openDesignModal(design);
        }
      });
    });
  }

  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

window.designTracker = new DesignTracker();
