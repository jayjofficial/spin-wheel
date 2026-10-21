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
      bannerWeekTag.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Current: Week ${this.currentWeekData.week}, ${this.currentWeekData.year}`;
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

    select.innerHTML = '<option value="all">All Weeks</option>';
    
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
          <div class="empty-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <h3 style="font-family: var(--font-heading); font-size: 1.35rem;">No Designs Logged Yet</h3>
          <p style="color: var(--text-muted); max-width: 420px; font-size: 0.92rem;">
            ${this.selectedWeekFilter !== 'all' ? 'No designs found for this selected week.' : 'Spin the UX Roulette, pick a challenge, and showcase your creative designs here!'}
          </p>
          <button class="btn-primary-glow" id="btn-empty-spin-trigger" style="margin-top: 0.5rem; display: inline-flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
            <span>Spin the Roulette</span>
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
      published: '<span class="status-indicator-dot published"></span>Published',
      completed: '<span class="status-indicator-dot completed"></span>Completed',
      in_progress: '<span class="status-indicator-dot in_progress"></span>In Progress',
      planned: '<span class="status-indicator-dot planned"></span>Planned'
    };

    const statusClass = statusClasses[design.status] || 'planned';
    const statusText = statusLabels[design.status] || '<span class="status-indicator-dot planned"></span>Planned';

    // Generative visual preview or real screenshot
    let mediaHTML = '';
    if (design.image) {
      mediaHTML = `<img src="${design.image}" alt="${design.title}" class="card-img" loading="lazy">`;
    } else {
      const platformSVGs = {
        'Mobile App': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
        'Web / Dashboard': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        'Smartwatch': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.85 3.22a2 2 0 0 1-1.94 1.43H10.28a2 2 0 0 1-1.94-1.43l-.85-3.22"/><path d="M7.49 6.65l.85-3.22A2 2 0 0 1 10.28 2h3.44a2 2 0 0 1 1.94 1.43l.85 3.22"/></svg>',
        'Tablet': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
        'Spatial / AR': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a5 5 0 0 1-5 5h-1a3 3 0 0 1-6 0H8a5 5 0 0 1-5-5v-4z"/><circle cx="8" cy="13" r="2.5"/><circle cx="16" cy="13" r="2.5"/></svg>'
      };
      const svgIcon = platformSVGs[design.platform] || '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>';
      mediaHTML = `
        <div class="card-generative-mock">
          <div class="mock-device-preview">${svgIcon}</div>
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
          <p class="card-prompt-snippet" title="${this.escapeHTML(design.about || design.prompt || '')}">${this.escapeHTML(design.about || design.prompt || 'Custom prompt')}</p>
          
          ${design.problem ? `
            <div class="archive-card-problem">
              <div class="archive-problem-header">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>UX Problem to Solve:</span>
              </div>
              <p class="archive-problem-text">${this.escapeHTML(design.problem)}</p>
            </div>
          ` : ''}

          ${design.uiStyle ? (() => {
            const styleObj = window.getUIStyleById ? window.getUIStyleById(design.uiStyle) : null;
            const styleName = styleObj ? styleObj.name : design.uiStyle;
            const guideHint = (styleObj && styleObj.figmaGuide?.signature) || design.uiStylePrinciples || '';
            return `
              <div class="archive-style-tag">
                <span class="style-badge-pill">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  ${this.escapeHTML(styleName)}
                </span>
                ${guideHint ? `<span class="archive-style-subprinciple" title="${this.escapeHTML(guideHint)}">${this.escapeHTML(guideHint)}</span>` : ''}
              </div>
            `;
          })() : ''}

          ${tagsHTML ? `<div class="card-tags">${tagsHTML}</div>` : ''}

          <div class="card-meta-row">
            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${dateFormatted}</span>
            <span>${design.platform || 'General'}</span>
          </div>

          <div class="card-footer-actions">
            <div class="link-buttons-group">
              ${figmaLink}
              ${postLink}
            </div>
            <div class="card-manage-btns">
              <button class="btn-card-icon" data-action="view-details" title="View Challenge Information">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </button>
              <button class="btn-card-icon" data-action="edit" title="Edit / Log Deliverables">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn-card-icon delete" data-action="delete" title="Delete Challenge">
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

      // View details action
      card.querySelector('[data-action="view-details"]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.app && window.app.openArchiveChallengeDetails) {
          window.app.openArchiveChallengeDetails(design);
        } else {
          window.app.openDesignModal(design);
        }
      });

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
          window.app.showToast('Challenge deleted', 'info');
          this.refresh();
        }
      });

      // Preview Image or open challenge details
      card.querySelector('[data-action="preview-image"]')?.addEventListener('click', () => {
        if (design.image) {
          window.app.openImageLightbox(design.image, design.title);
        } else if (window.app && window.app.openArchiveChallengeDetails) {
          window.app.openArchiveChallengeDetails(design);
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
