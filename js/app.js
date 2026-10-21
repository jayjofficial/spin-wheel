/**
 * UX Roulette & Design Studio - Main Coordinator Application
 * Orchestrates Wheel, Topic Engine, Influence Generator, and Weekly Tracker.
 */

class App {
  constructor() {
    this.wheel = null;
    this.currentWinningTopic = null;
    this.currentEditingDesign = null;
    this.currentInspectingDesign = null;
    this.tempUploadedImage = null;

    window.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    this.initShuffle();
    this.initWheel();
    this.initNavigation();
    this.initFullscreen();
    this.initInfluenceInput();
    this.initWinningModal();
    this.initArchiveDetailsModal();
    this.initDesignModal();
    this.initLightbox();
    this.initTopicMatrix();
    this.initConvexControls();
    this.initSoundToggle();
    this.initKeyboardShortcuts();
    this.renderActiveTopicsMiniList();

    // Check query params or defaults
    this.switchTab('roulette');
  }

  // --- Shuffle Creative Topics System ---
  initShuffle() {
    const shuffleStageBtn = document.getElementById('btn-stage-shuffle');

    const handleShuffle = () => {
      if (this.wheel && this.wheel.isSpinning) return;
      const newTopics = window.topicEngine.shuffleTopics(10);
      this.wheel.setTopics(newTopics);
      this.updateSegmentCount();
      this.renderActiveTopicsMiniList();

      if (window.soundEngine) window.soundEngine.playPop();
      if (this.wheel) this.wheel.spin(0.24);
      this.showToast('Shuffled! Loaded 10 fresh everyday design challenges.', 'success');
    };

    if (shuffleStageBtn) shuffleStageBtn.addEventListener('click', handleShuffle);
    this.handleShuffleAction = handleShuffle;
  }

  // --- Wheel Initialization ---
  initWheel() {
    this.wheel = new RouletteWheel('roulette-wheel-canvas', (winner) => {
      this.handleWheelStop(winner);
    });

    const activeTopics = window.topicEngine.getActiveTopics();
    this.wheel.setTopics(activeTopics);
    this.updateSegmentCount();

    // Spin button click
    const spinCenterBtn = document.getElementById('btn-center-spin');
    const spinMainBtn = document.getElementById('btn-main-spin');

    const triggerSpin = () => {
      if (this.wheel.isSpinning) return;
      if (spinCenterBtn) spinCenterBtn.classList.add('spinning');
      if (spinMainBtn) spinMainBtn.disabled = true;
      this.wheel.spin();
    };

    if (spinCenterBtn) spinCenterBtn.addEventListener('click', triggerSpin);
    if (spinMainBtn) spinMainBtn.addEventListener('click', triggerSpin);

    // Canvas click
    const canvas = document.getElementById('roulette-wheel-canvas');
    if (canvas) {
      canvas.addEventListener('click', triggerSpin);
    }
  }

  async handleWheelStop(winner) {
    this.currentWinningTopic = winner;

    const spinCenterBtn = document.getElementById('btn-center-spin');
    const spinMainBtn = document.getElementById('btn-main-spin');
    if (spinCenterBtn) spinCenterBtn.classList.remove('spinning');
    if (spinMainBtn) spinMainBtn.disabled = false;

    // Auto-archive new challenge immediately to the Archive section
    await this.archiveNewChallenge(winner);

    // Confetti celebration
    if (window.confettiEngine) {
      window.confettiEngine.blast(100);
    }

    // Audio fanfare
    if (window.soundEngine) {
      window.soundEngine.playWinFanfare();
    }

    // Open Winner Modal
    this.openWinnerModal(winner);
  }

  async archiveNewChallenge(winner) {
    if (!winner) return null;

    if (!winner.style) {
      winner.style = winner.styleId ? window.getUIStyleById(winner.styleId) : window.getRandomUIStyle();
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const weekData = StorageManager.getISOWeekData(todayStr);

    const challengeRecord = {
      title: winner.text || 'Design Challenge',
      about: winner.about || `A dedicated product design challenge focused on solving everyday user needs for ${winner.text}.`,
      problem: winner.problem || 'Reduce user cognitive load, eliminate confusing friction points, and make core actions accessible on small mobile screens.',
      prompt: winner.about || winner.text,
      category: winner.category || 'General UI/UX',
      platform: winner.deliverable || 'Mobile App',
      uiStyle: winner.style?.name || '',
      uiStyleRegion: winner.style?.region ? `${winner.style.region} • ${winner.style.subRegion}` : '',
      uiStyleVibe: winner.style?.vibe || '',
      uiStylePrinciples: winner.style?.principles || '',
      uiStyleTypography: winner.style?.typography || '',
      uiStylePalette: Array.isArray(winner.style?.palette) ? winner.style.palette : [],
      status: 'planned',
      date: todayStr,
      week: weekData.week,
      year: weekData.year,
      weekString: weekData.weekString,
      tags: ['roulette', 'challenge', (winner.category || 'design').toLowerCase().replace(/[^a-z0-9]/g, '')].filter(Boolean),
      source: 'roulette'
    };

    const saved = await window.storageManager.saveDesign(challengeRecord);
    winner.archivedDesignId = saved.id;
    if (window.designTracker) {
      await window.designTracker.refresh();
    }
    return saved;
  }

  updateSegmentCount() {
    const active = window.topicEngine.getActiveTopics();
    const countEl = document.getElementById('wheel-segment-count');
    if (countEl) {
      countEl.textContent = `${active.length} Challenges`;
    }
  }

  // --- Fullscreen & Theater Mode ---
  initFullscreen() {
    const stageCard = document.getElementById('wheel-stage-card');
    const headerToggleBtn = document.getElementById('btn-fullscreen-toggle');
    const stageToggleBtn = document.getElementById('btn-stage-fullscreen');
    const exitBtn = document.getElementById('btn-exit-fullscreen');

    // 1. Header Button: Toggles Website Fullscreen (document.documentElement)
    const toggleWebsiteFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    if (headerToggleBtn) {
      headerToggleBtn.addEventListener('click', toggleWebsiteFullscreen);
    }

    // 2. Stage Card Button: Toggles Wheel Theater Overlay
    const toggleTheaterMode = () => {
      if (!stageCard) return;
      const isTheater = stageCard.classList.contains('theater-mode');
      stageCard.classList.toggle('theater-mode', !isTheater);
      setTimeout(() => this.wheel?.setupDPI(), 100);
      if (!isTheater) {
        this.showToast('Wheel theater mode active. Press Esc to exit.', 'info');
      }
    };

    if (stageToggleBtn) {
      stageToggleBtn.addEventListener('click', toggleTheaterMode);
    }

    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        if (stageCard) stageCard.classList.remove('theater-mode');
        setTimeout(() => this.wheel?.setupDPI(), 100);
      });
    }

    // 3. Sync icon & state when fullscreen changes
    const handleFullscreenChange = () => {
      const isFS = !!document.fullscreenElement;
      if (headerToggleBtn) {
        headerToggleBtn.innerHTML = isFS
          ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`
          : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
      }
      setTimeout(() => this.wheel?.setupDPI(), 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    // 4. Keyboard Shortcut: 'F' toggles website fullscreen
    window.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
        const openModal = document.querySelector('.modal-backdrop.open');
        if (openModal) return;

        e.preventDefault();
        toggleWebsiteFullscreen();
      }
    });
  }

  // --- Navigation & Tabs ---
  initNavigation() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        this.switchTab(target);
      });
    });
  }

  switchTab(tabId) {
    document.querySelectorAll('.nav-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.remove('active');
    });

    const targetContent = document.getElementById(`tab-${tabId}`);
    if (targetContent) {
      targetContent.classList.add('active');
    }

    // Refresh views if needed
    if (tabId === 'roulette') {
      setTimeout(() => this.wheel?.setupDPI(), 50);
    } else if (tabId === 'tracker') {
      window.designTracker?.refresh();
    } else if (tabId === 'matrix') {
      this.renderTopicMatrix();
    }
  }

  // --- Influence Panel & Topic Generator ---
  initInfluenceInput() {
    const input = document.getElementById('influence-topic-input');
    const addBtn = document.getElementById('btn-influence-add');

    const handleInfluence = () => {
      const val = input.value.trim();
      if (!val) {
        this.showToast('Please type a topic or theme to influence the wheel', 'info');
        return;
      }

      // 1. Add this topic directly to the roulette wheel
      const newTopic = window.topicEngine.addTopic({
        text: val,
        category: 'Custom Influence'
      });

      // Update wheel
      this.wheel.setTopics(window.topicEngine.getActiveTopics());
      this.updateSegmentCount();
      this.renderActiveTopicsMiniList();

      // 2. Generate contextual similar topics
      const similar = window.topicEngine.generateSimilarTopics(val);
      this.renderSimilarTopicsList(similar, val);

      input.value = '';
      this.showToast(`Added "${val}" to the roulette!`, 'success');
      if (window.soundEngine) window.soundEngine.playPop();
    };

    if (addBtn) addBtn.addEventListener('click', handleInfluence);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleInfluence();
      });
    }

    // Quick Inspiration preset tags
    document.querySelectorAll('.inspire-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        if (input) {
          input.value = tag.dataset.topic || tag.textContent.trim();
          handleInfluence();
        }
      });
    });
  }

  renderSimilarTopicsList(similarTopics, sourceTopic) {
    const section = document.getElementById('generated-similar-section');
    const list = document.getElementById('similar-topics-list');
    const headline = document.getElementById('generated-topics-headline');

    if (!section || !list) return;

    if (!similarTopics || similarTopics.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'flex';
    if (headline) {
      headline.textContent = `Generated Challenges similar to "${sourceTopic}":`;
    }

    list.innerHTML = similarTopics.map(item => `
      <div class="similar-topic-item" data-id="${item.id}">
        <div>
          <div class="similar-topic-text">${this.escapeHTML(item.title)}</div>
          <div class="similar-topic-category">${this.escapeHTML(item.deliverable || item.category)}</div>
        </div>
        <button class="btn-add-item" data-action="add-similar" title="Add this to wheel">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    `).join('');

    // Bind item click
    list.querySelectorAll('.similar-topic-item').forEach((row, idx) => {
      const itemData = similarTopics[idx];
      const addBtn = row.querySelector('[data-action="add-similar"]');

      addBtn.addEventListener('click', () => {
        window.topicEngine.addTopic({
          text: itemData.title,
          category: itemData.category,
          deliverable: itemData.deliverable,
          uxFocus: itemData.uxFocus,
          color: itemData.color
        });

        this.wheel.setTopics(window.topicEngine.getActiveTopics());
        this.updateSegmentCount();
        this.renderActiveTopicsMiniList();

        addBtn.classList.add('added');
        addBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
        addBtn.disabled = true;

        this.showToast(`Added challenge to wheel!`, 'success');
        if (window.soundEngine) window.soundEngine.playPop();
      });
    });

    // Add All button
    const addAllBtn = document.getElementById('btn-add-all-similar');
    if (addAllBtn) {
      addAllBtn.onclick = () => {
        similarTopics.forEach(itemData => {
          window.topicEngine.addTopic({
            text: itemData.title,
            category: itemData.category,
            deliverable: itemData.deliverable,
            uxFocus: itemData.uxFocus,
            color: itemData.color
          });
        });

        this.wheel.setTopics(window.topicEngine.getActiveTopics());
        this.updateSegmentCount();
        this.renderActiveTopicsMiniList();

        section.style.display = 'none';
        this.showToast(`Added all ${similarTopics.length} challenges to roulette!`, 'success');
        if (window.soundEngine) window.soundEngine.playPop();
      };
    }
  }

  renderActiveTopicsMiniList() {
    const list = document.getElementById('active-topics-mini-list');
    if (!list) return;

    const topics = window.topicEngine.getAllTopics();
    const themeCfg = window.THEME_WHEEL_CONFIGS?.[this.currentTheme || 'linear'] || window.THEME_WHEEL_CONFIGS?.linear;

    list.innerHTML = topics.map((t, idx) => {
      const chipColor = themeCfg ? themeCfg.palette[idx % themeCfg.palette.length] : (t.color || '#3b82f6');
      const visuals = window.resolveTopicVisuals ? window.resolveTopicVisuals(t) : { iconKey: t.iconKey || 'spark' };
      const iconSVG = window.getTopicIconSVG ? window.getTopicIconSVG(visuals.iconKey, 14) : '';
      const eyeIcon = t.active !== false 
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
        : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
      const removeIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

      return `
      <div class="active-topic-chip" style="opacity: ${t.active !== false ? '1' : '0.45'};">
        <div class="topic-chip-left">
          <span class="color-indicator" style="background-color: ${chipColor};"></span>
          <span class="topic-chip-icon" title="${this.escapeHTML(t.category || '')}">${iconSVG}</span>
          <span class="topic-name" title="${this.escapeHTML(t.text)}">${this.escapeHTML(t.text)}</span>
        </div>
        <div class="topic-chip-actions">
          <button class="btn-chip-action" data-action="toggle-active" data-id="${t.id}" title="${t.active !== false ? 'Disable' : 'Enable'}">
            ${eyeIcon}
          </button>
          <button class="btn-chip-action" data-action="delete-topic" data-id="${t.id}" title="Remove">
            ${removeIcon}
          </button>
        </div>
      </div>
    `;
    }).join('');

    list.querySelectorAll('[data-action="toggle-active"]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.topicEngine.toggleTopic(btn.dataset.id);
        this.wheel.setTopics(window.topicEngine.getActiveTopics());
        this.updateSegmentCount();
        this.renderActiveTopicsMiniList();
      });
    });

    list.querySelectorAll('[data-action="delete-topic"]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.topicEngine.removeTopic(btn.dataset.id);
        this.wheel.setTopics(window.topicEngine.getActiveTopics());
        this.updateSegmentCount();
        this.renderActiveTopicsMiniList();
        this.showToast('Challenge removed from wheel', 'info');
      });
    });
  }

  // --- Winner Modal ---
  initWinningModal() {
    const modal = document.getElementById('modal-winner');
    const closeBtn = document.getElementById('btn-close-winner');
    const startDesignBtn = document.getElementById('btn-winner-start-design');
    const spinAgainBtn = document.getElementById('btn-winner-spin-again');
    const generateMoreBtn = document.getElementById('btn-winner-generate-more');
    const rerollStyleBtn = document.getElementById('btn-winner-reroll-style');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal('modal-winner'));

    if (startDesignBtn) {
      startDesignBtn.addEventListener('click', () => {
        this.closeModal('modal-winner');
        // Switch to Design Log Modal with pre-filled winner data including UI Style
        this.openDesignModal({
          id: this.currentWinningTopic?.archivedDesignId,
          title: this.currentWinningTopic?.text || 'Design Challenge',
          prompt: this.currentWinningTopic?.about || this.currentWinningTopic?.text,
          about: this.currentWinningTopic?.about || '',
          problem: this.currentWinningTopic?.problem || '',
          platform: this.currentWinningTopic?.deliverable || 'Mobile App',
          uiStyle: this.currentWinningTopic?.style?.name || '',
          uiStyleRegion: this.currentWinningTopic?.style?.region ? `${this.currentWinningTopic.style.region} • ${this.currentWinningTopic.style.subRegion}` : '',
          uiStyleVibe: this.currentWinningTopic?.style?.vibe || '',
          uiStylePrinciples: this.currentWinningTopic?.style?.principles || '',
          uiStyleTypography: this.currentWinningTopic?.style?.typography || '',
          uiStylePalette: this.currentWinningTopic?.style?.palette || [],
          status: 'in_progress',
          tags: ['roulette', 'uiux', (this.currentWinningTopic?.category || 'design').toLowerCase().replace(/[^a-z0-9]/g, '')]
        });
      });
    }

    if (spinAgainBtn) {
      spinAgainBtn.addEventListener('click', () => {
        this.closeModal('modal-winner');
        setTimeout(() => this.wheel.spin(), 200);
      });
    }

    if (generateMoreBtn) {
      generateMoreBtn.addEventListener('click', () => {
        this.closeModal('modal-winner');
        if (this.currentWinningTopic) {
          const similar = window.topicEngine.generateSimilarTopics(this.currentWinningTopic.text);
          this.renderSimilarTopicsList(similar, this.currentWinningTopic.text);
          this.showToast('Generated similar challenges in side panel!', 'info');
        }
      });
    }

    if (rerollStyleBtn) {
      rerollStyleBtn.addEventListener('click', async () => {
        if (!this.currentWinningTopic) return;
        const currentStyleId = this.currentWinningTopic.style?.id;
        const newStyle = window.getRandomUIStyle(currentStyleId);
        this.currentWinningTopic.style = newStyle;
        this.renderWinnerStyleCard(newStyle);
        if (window.soundEngine) window.soundEngine.playPop();
        this.showToast(`Swapped UI style to: ${newStyle.name}`, 'info');

        // Sync with archived entry
        if (this.currentWinningTopic.archivedDesignId) {
          const designs = await window.storageManager.getAllDesigns();
          const existing = designs.find(d => d.id === this.currentWinningTopic.archivedDesignId);
          if (existing) {
            existing.uiStyle = newStyle.name;
            existing.uiStyleRegion = `${newStyle.region} • ${newStyle.subRegion}`;
            existing.uiStyleVibe = newStyle.vibe;
            existing.uiStylePrinciples = newStyle.principles;
            existing.uiStyleTypography = newStyle.typography;
            existing.uiStylePalette = newStyle.palette;
            await window.storageManager.saveDesign(existing);
            if (window.designTracker) await window.designTracker.refresh();
          }
        }
      });
    }
  }

  openWinnerModal(topic) {
    const modal = document.getElementById('modal-winner');
    if (!modal) return;

    this.currentWinningTopic = topic;

    // Header info
    const titleEl = document.getElementById('winner-modal-title');
    const catEl = document.getElementById('winner-spec-category');
    const platEl = document.getElementById('winner-spec-platform');
    const aboutEl = document.getElementById('winner-spec-about');
    const problemEl = document.getElementById('winner-spec-problem');

    if (titleEl) titleEl.textContent = topic.text;
    if (catEl) catEl.textContent = topic.category || 'General UI/UX';
    if (platEl) platEl.textContent = topic.deliverable || 'Mobile App';

    // What this design is about
    if (aboutEl) {
      aboutEl.textContent = topic.about || `A dedicated product design challenge focused on solving everyday user needs for ${topic.text}.`;
    }

    // UX Problem to solve
    if (problemEl) {
      problemEl.textContent = topic.problem || 'Reduce user cognitive load, eliminate confusing friction points, and make core actions accessible on small mobile screens.';
    }

    // Resolve & render assigned global UI style
    if (!topic.style) {
      topic.style = topic.styleId ? window.getUIStyleById(topic.styleId) : window.getRandomUIStyle();
    }
    this.renderWinnerStyleCard(topic.style);

    this.openModal('modal-winner');
  }

  renderWinnerStyleCard(style) {
    if (!style) return;
    const nameEl = document.getElementById('winner-style-name');
    const regionEl = document.getElementById('winner-style-region');
    const vibeEl = document.getElementById('winner-style-vibe');
    const principlesEl = document.getElementById('winner-style-principles');
    const typoEl = document.getElementById('winner-style-typography');
    const paletteEl = document.getElementById('winner-style-palette');

    if (nameEl) nameEl.textContent = style.name;
    if (regionEl) regionEl.textContent = `${style.region} • ${style.subRegion}`;
    if (vibeEl) vibeEl.textContent = style.vibe;
    if (principlesEl) principlesEl.textContent = style.principles;
    if (typoEl) typoEl.textContent = style.typography;

    if (paletteEl && Array.isArray(style.palette)) {
      paletteEl.innerHTML = style.palette.map(hex => 
        `<span class="palette-dot" style="background-color: ${hex};" title="${hex}"></span>`
      ).join('');
    }
  }

  // --- Archive Challenge Details Viewer ---
  initArchiveDetailsModal() {
    const closeBtn = document.getElementById('btn-close-archive-details');
    const editBtn = document.getElementById('btn-archive-detail-edit');
    const deleteBtn = document.getElementById('btn-archive-detail-delete');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal('modal-challenge-details'));
    }

    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const target = this.currentInspectingDesign;
        this.closeModal('modal-challenge-details');
        if (target) {
          this.openDesignModal(target);
        }
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener('click', async () => {
        const target = this.currentInspectingDesign;
        if (!target) return;
        if (confirm(`Delete "${target.title}"?`)) {
          await window.storageManager.deleteDesign(target.id);
          this.closeModal('modal-challenge-details');
          this.showToast('Challenge deleted from archive', 'info');
          if (window.designTracker) {
            await window.designTracker.refresh();
          }
        }
      });
    }
  }

  openArchiveChallengeDetails(design) {
    if (!design) return;
    this.currentInspectingDesign = design;

    const titleEl = document.getElementById('archive-detail-title');
    const catEl = document.getElementById('archive-detail-category');
    const platEl = document.getElementById('archive-detail-platform');
    const weekEl = document.getElementById('archive-detail-week');
    const statusPill = document.getElementById('archive-detail-status-pill');
    const aboutEl = document.getElementById('archive-detail-about');
    const problemEl = document.getElementById('archive-detail-problem');

    if (titleEl) titleEl.textContent = design.title;
    if (catEl) catEl.textContent = (design.category || 'UI/UX').toUpperCase();
    if (platEl) platEl.textContent = (design.platform || 'MOBILE APP').toUpperCase();
    if (weekEl) weekEl.textContent = `WEEK ${design.week || '1'}, ${design.year || '2026'}`;
    if (statusPill) statusPill.textContent = (design.status || 'PLANNED').toUpperCase() + ' CHALLENGE';

    if (aboutEl) {
      aboutEl.textContent = design.about || design.prompt || `Dedicated UI design challenge for ${design.title}.`;
    }

    if (problemEl) {
      problemEl.textContent = design.problem || 'Standard usability optimization, clarity of actions, and reduced cognitive load.';
    }

    // UI Style details
    const styleNameEl = document.getElementById('archive-detail-style-name');
    const styleRegionEl = document.getElementById('archive-detail-style-region');
    const styleVibeEl = document.getElementById('archive-detail-style-vibe');
    const stylePaletteEl = document.getElementById('archive-detail-palette');
    const stylePrinciplesEl = document.getElementById('archive-detail-principles');
    const styleTypoEl = document.getElementById('archive-detail-typography');

    let styleObj = null;
    if (design.uiStyle && window.GLOBAL_UI_STYLES) {
      styleObj = window.GLOBAL_UI_STYLES.find(s => s.name === design.uiStyle) || null;
    }

    const styleName = design.uiStyle || (styleObj ? styleObj.name : 'Industry Standard Minimal');
    const styleRegion = design.uiStyleRegion || (styleObj ? `${styleObj.region} • ${styleObj.subRegion}` : 'Global');
    const styleVibe = design.uiStyleVibe || (styleObj ? styleObj.vibe : 'Clear visual hierarchy, ergonomic spacing, and modern typography.');
    const stylePrinciples = design.uiStylePrinciples || (styleObj ? styleObj.principles : 'Clarity, direct affordances, and accessible contrast.');
    const styleTypography = design.uiStyleTypography || (styleObj ? styleObj.typography : 'Modern clean sans-serif');
    const stylePalette = (design.uiStylePalette && design.uiStylePalette.length) ? design.uiStylePalette : (styleObj ? styleObj.palette : ['#3b82f6', '#10b981', '#06b6d4', '#f59e0b', '#ffffff']);

    if (styleNameEl) styleNameEl.textContent = styleName;
    if (styleRegionEl) styleRegionEl.textContent = styleRegion;
    if (styleVibeEl) styleVibeEl.textContent = styleVibe;
    if (stylePrinciplesEl) stylePrinciplesEl.textContent = stylePrinciples;
    if (styleTypoEl) styleTypoEl.textContent = styleTypography;

    if (stylePaletteEl) {
      stylePaletteEl.innerHTML = stylePalette.map(hex =>
        `<span class="palette-dot" style="background-color: ${hex};" title="${hex}"></span>`
      ).join('');
    }

    this.openModal('modal-challenge-details');
  }

  // --- Design Log & Tracker Modal ---
  initDesignModal() {
    const modal = document.getElementById('modal-design-form');
    const closeBtn = document.getElementById('btn-close-design-form');
    const cancelBtn = document.getElementById('btn-cancel-design-form');
    const form = document.getElementById('form-log-design');
    const logNewBtn = document.getElementById('btn-log-new-design');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal('modal-design-form'));
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal('modal-design-form'));
    if (logNewBtn) {
      logNewBtn.addEventListener('click', () => {
        this.openDesignModal();
      });
    }

    // Dynamic Week calculation on date change
    const dateInput = document.getElementById('input-design-date');
    const weekIndicator = document.getElementById('form-week-preview');
    if (dateInput) {
      dateInput.addEventListener('change', () => {
        const d = dateInput.value;
        if (d) {
          const wData = StorageManager.getISOWeekData(d);
          if (weekIndicator) weekIndicator.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 3px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${wData.weekString}`;
        }
      });
    }

    // Image Upload Dropzone & Clipboard Paste
    this.initImageDropzone();

    // Form Submit
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleSaveDesignForm();
      });
    }

    // Toolbar Filters in Tracker
    const weekSelect = document.getElementById('filter-week-select');
    if (weekSelect) {
      weekSelect.addEventListener('change', () => {
        window.designTracker.selectedWeekFilter = weekSelect.value;
        window.designTracker.render();
      });
    }

    const statusPills = document.querySelectorAll('.filter-pill-btn');
    statusPills.forEach(pill => {
      pill.addEventListener('click', () => {
        statusPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        window.designTracker.selectedStatusFilter = pill.dataset.status;
        window.designTracker.render();
      });
    });

    const searchInput = document.getElementById('tracker-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        window.designTracker.searchQuery = searchInput.value;
        window.designTracker.render();
      });
    }
  }

  openDesignModal(initialData = null) {
    this.currentEditingDesign = initialData;
    this.tempUploadedImage = initialData?.image || null;

    const form = document.getElementById('form-log-design');
    if (!form) return;
    form.reset();

    const titleInput = document.getElementById('input-design-title');
    const promptInput = document.getElementById('input-design-prompt');
    const dateInput = document.getElementById('input-design-date');
    const platformSelect = document.getElementById('select-design-platform');
    const statusSelect = document.getElementById('select-design-status');
    const figmaInput = document.getElementById('input-design-figma');
    const postInput = document.getElementById('input-design-post');
    const reflectionInput = document.getElementById('textarea-design-reflection');
    const tagsInput = document.getElementById('input-design-tags');
    const weekIndicator = document.getElementById('form-week-preview');

    // Default Date to Today (YYYY-MM-DD)
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.value = initialData?.date ? initialData.date.split('T')[0] : todayStr;

    const wData = StorageManager.getISOWeekData(dateInput.value);
    if (weekIndicator) weekIndicator.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 3px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${wData.weekString}`;

    const styleInput = document.getElementById('input-design-style');
    if (styleInput) {
      styleInput.value = initialData?.uiStyle || (this.currentWinningTopic?.style?.name || '');
    }

    if (initialData) {
      titleInput.value = initialData.title || '';
      promptInput.value = initialData.prompt || initialData.about || '';
      const problemInput = document.getElementById('input-design-problem');
      if (problemInput) {
        problemInput.value = initialData.problem || '';
      }
      if (initialData.platform) platformSelect.value = initialData.platform;
      if (initialData.status) statusSelect.value = initialData.status;
      figmaInput.value = initialData.figmaUrl || '';
      postInput.value = initialData.postUrl || '';
      reflectionInput.value = initialData.reflection || '';
      tagsInput.value = (initialData.tags || []).join(', ');
    }

    // Image preview state
    this.updateImagePreview(this.tempUploadedImage);

    const modalTitle = document.getElementById('modal-design-form-title');
    if (modalTitle) {
      modalTitle.textContent = initialData?.id ? 'Edit Design Entry' : 'Log Design to Weekly Archive';
    }

    this.openModal('modal-design-form');
  }

  initImageDropzone() {
    const dropzone = document.getElementById('image-dropzone');
    const fileInput = document.getElementById('input-design-image');
    const removeImgBtn = document.getElementById('btn-remove-img');

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', (e) => {
      if (e.target !== removeImgBtn) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.processImageFile(file);
    });

    // Drag and Drop
    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file) this.processImageFile(file);
    });

    // Clipboard Paste Listener (Ctrl+V directly onto page when modal is open!)
    window.addEventListener('paste', (e) => {
      const modal = document.getElementById('modal-design-form');
      if (!modal || !modal.classList.contains('open')) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            this.processImageFile(blob);
            this.showToast('Image pasted from clipboard!', 'success');
            break;
          }
        }
      }
    });

    if (removeImgBtn) {
      removeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.tempUploadedImage = null;
        fileInput.value = '';
        this.updateImagePreview(null);
      });
    }
  }

  processImageFile(file) {
    if (!file.type.startsWith('image/')) {
      this.showToast('Please select a valid image file', 'info');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.tempUploadedImage = e.target.result;
      this.updateImagePreview(this.tempUploadedImage);
    };
    reader.readAsDataURL(file);
  }

  updateImagePreview(imageSrc) {
    const previewContainer = document.getElementById('upload-preview-container');
    const previewImg = document.getElementById('upload-preview-img');
    const dropzoneContent = document.getElementById('dropzone-placeholder-content');

    if (imageSrc) {
      if (previewImg) previewImg.src = imageSrc;
      if (previewContainer) previewContainer.style.display = 'block';
      if (dropzoneContent) dropzoneContent.style.display = 'none';
    } else {
      if (previewImg) previewImg.src = '';
      if (previewContainer) previewContainer.style.display = 'none';
      if (dropzoneContent) dropzoneContent.style.display = 'flex';
    }
  }

  async handleSaveDesignForm() {
    const title = document.getElementById('input-design-title').value.trim();
    if (!title) {
      this.showToast('Please provide a title for your design', 'info');
      return;
    }

    const dateVal = document.getElementById('input-design-date').value;
    const weekData = StorageManager.getISOWeekData(dateVal);

    const tagsRaw = document.getElementById('input-design-tags').value;
    const tags = tagsRaw
      .split(/[\s,]+/)
      .map(t => t.trim().replace(/^#/, ''))
      .filter(t => t.length > 0);

    const designRecord = {
      id: this.currentEditingDesign?.id,
      title,
      prompt: document.getElementById('input-design-prompt').value.trim(),
      about: document.getElementById('input-design-prompt').value.trim() || this.currentEditingDesign?.about || '',
      problem: document.getElementById('input-design-problem')?.value.trim() || this.currentEditingDesign?.problem || '',
      uiStyle: document.getElementById('input-design-style')?.value.trim() || this.currentEditingDesign?.uiStyle || '',
      uiStyleRegion: this.currentEditingDesign?.uiStyleRegion || '',
      uiStyleVibe: this.currentEditingDesign?.uiStyleVibe || '',
      uiStylePrinciples: this.currentEditingDesign?.uiStylePrinciples || '',
      uiStyleTypography: this.currentEditingDesign?.uiStyleTypography || '',
      uiStylePalette: this.currentEditingDesign?.uiStylePalette || [],
      date: dateVal,
      week: weekData.week,
      year: weekData.year,
      weekString: weekData.weekString,
      platform: document.getElementById('select-design-platform').value,
      status: document.getElementById('select-design-status').value,
      figmaUrl: document.getElementById('input-design-figma').value.trim(),
      postUrl: document.getElementById('input-design-post').value.trim(),
      reflection: document.getElementById('textarea-design-reflection').value.trim(),
      tags,
      image: this.tempUploadedImage,
      createdAt: this.currentEditingDesign?.createdAt || new Date().toISOString()
    };

    await window.storageManager.saveDesign(designRecord);

    this.closeModal('modal-design-form');
    this.showToast(`Saved to ${weekData.weekString}!`, 'success');

    // Switch to tracker tab and refresh
    this.switchTab('tracker');
    await window.designTracker.refresh();

    if (window.soundEngine) window.soundEngine.playPop();
  }

  // --- Lightbox Preview ---
  initLightbox() {
    const lightbox = document.getElementById('modal-lightbox');
    const closeBtn = document.getElementById('btn-close-lightbox');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal('modal-lightbox'));
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) this.closeModal('modal-lightbox');
      });
    }
  }

  openImageLightbox(src, title) {
    const lightbox = document.getElementById('modal-lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');

    if (img) img.src = src;
    if (cap) cap.textContent = title || '';

    this.openModal('modal-lightbox');
  }

  // --- Topic Matrix View ---
  initTopicMatrix() {
    const resetBtn = document.getElementById('btn-matrix-reset-default');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset roulette topics to original curated set?')) {
          window.topicEngine.resetToDefault();
          this.wheel.setTopics(window.topicEngine.getActiveTopics());
          this.updateSegmentCount();
          this.renderTopicMatrix();
          this.renderActiveTopicsMiniList();
          this.showToast('Topics reset to defaults', 'info');
        }
      });
    }

    const exportBtn = document.getElementById('btn-export-backup');
    if (exportBtn) {
      exportBtn.addEventListener('click', async () => {
        const json = await window.storageManager.exportBackup();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ux_roulette_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Data exported successfully!', 'success');
      });
    }

    const importFile = document.getElementById('input-import-backup');
    if (importFile) {
      importFile.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (evt) => {
          const success = await window.storageManager.importBackup(evt.target.result);
          if (success) {
            window.topicEngine.init();
            this.wheel.setTopics(window.topicEngine.getActiveTopics());
            this.updateSegmentCount();
            this.renderActiveTopicsMiniList();
            await window.designTracker.refresh();
            this.showToast('Backup restored successfully!', 'success');
          } else {
            this.showToast('Failed to import backup file', 'info');
          }
        };
        reader.readAsText(file);
      });
    }
  }

  initConvexControls() {
    window.convexManager?.updateStatusBadge();

    const envSelector = document.getElementById('convex-env-selector');
    if (envSelector) {
      envSelector.value = window.convexManager?.currentEnv || 'dev';
      envSelector.addEventListener('change', (e) => {
        window.convexManager?.setEnvironment(e.target.value);
        this.updateConvexPanelStatus();
      });
    }

    const syncBtn = document.getElementById('btn-sync-to-convex');
    if (syncBtn) {
      syncBtn.addEventListener('click', async () => {
        const origHTML = syncBtn.innerHTML;
        syncBtn.innerHTML = '<span>Syncing to Cloud...</span>';
        syncBtn.disabled = true;

        try {
          const res = await window.convexManager.syncLocalToCloud();
          this.showToast(`Synced ${res.designsSynced} designs & topics to Convex!`, 'success');
          if (window.soundEngine) window.soundEngine.playPop();
        } catch (e) {
          this.showToast(`Sync notice: ${e.message || 'Please check Convex connection'}`, 'info');
        } finally {
          syncBtn.innerHTML = origHTML;
          syncBtn.disabled = false;
        }
      });
    }

    const fetchBtn = document.getElementById('btn-fetch-from-convex');
    if (fetchBtn) {
      fetchBtn.addEventListener('click', async () => {
        const origHTML = fetchBtn.innerHTML;
        fetchBtn.innerHTML = '<span>Pulling from Cloud...</span>';
        fetchBtn.disabled = true;

        try {
          await window.designTracker.refresh();
          this.showToast('Pulled latest data from Convex Cloud!', 'success');
          if (window.soundEngine) window.soundEngine.playPop();
        } catch (e) {
          this.showToast('Could not reach cloud, using cached local data', 'info');
        } finally {
          fetchBtn.innerHTML = origHTML;
          fetchBtn.disabled = false;
        }
      });
    }

    this.updateConvexPanelStatus();
  }

  updateConvexPanelStatus() {
    const config = window.convexManager?.getCurrentEnvConfig();
    const statusText = document.getElementById('convex-panel-status');
    const statusDot = document.getElementById('convex-panel-dot');
    if (statusText && config) {
      statusText.textContent = `Connected to ${config.name.replace(' Deployment', '')}`;
    }
    if (statusDot && config) {
      statusDot.style.backgroundColor = config.badgeColor || '#10b981';
    }
  }

  renderTopicMatrix() {
    const container = document.getElementById('matrix-categories-grid');
    if (!container) return;

    const allTopics = window.topicEngine.getAllTopics();

    // Group by category
    const groups = {};
    allTopics.forEach(t => {
      const cat = t.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(t);
    });

    const categoryKeyMap = {
      'AI & Travel': 'plane',
      'Fintech': 'card',
      'Fintech & Web3': 'card',
      'E-Commerce': 'package',
      'E-Commerce & Fashion': 'package',
      'Health & Wellness': 'zen',
      'Health & Fitness': 'activity',
      'IoT & Smart Living': 'bolt',
      'Luxury & 3D': 'watch',
      'Portfolio': 'layout',
      'Enterprise SaaS': 'shield',
      'Productivity': 'pen',
      'Productivity & SaaS': 'pen',
      'Food & Beverage': 'coffee',
      'Entertainment & Audio': 'spark',
      'Travel & Hospitality': 'plane',
      'AI & Spatial Computing': 'bot',
      'Custom Influence': 'spark',
      'Custom Challenge': 'spark'
    };

    container.innerHTML = Object.entries(groups).map(([cat, list]) => {
      const iconKey = categoryKeyMap[cat] || 'spark';
      const catSVG = window.getTopicIconSVG ? window.getTopicIconSVG(iconKey, 16) : '';

      return `
      <div class="category-card">
        <div class="category-card-header">
          <div class="category-title-group">
            <span class="category-icon-wrapper" style="display: inline-flex; align-items: center; color: var(--primary);">${catSVG}</span>
            <span class="category-name">${this.escapeHTML(cat)}</span>
          </div>
          <span class="category-items-count">${list.length} item${list.length === 1 ? '' : 's'}</span>
        </div>
        <div class="category-topic-list">
          ${list.map(t => {
            const activeIcon = t.active !== false
              ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
              : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`;

            return `
            <div class="matrix-topic-row">
              <span style="color: ${t.active !== false ? 'var(--text-main)' : 'var(--text-dim)'};">${this.escapeHTML(t.text)}</span>
              <button class="btn-chip-action" data-action="toggle-matrix-topic" data-id="${t.id}" title="${t.active !== false ? 'Disable' : 'Enable'}">
                ${activeIcon}
              </button>
            </div>
          `;
          }).join('')}
        </div>
      </div>
    `;
    }).join('');

    container.querySelectorAll('[data-action="toggle-matrix-topic"]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.topicEngine.toggleTopic(btn.dataset.id);
        this.wheel.setTopics(window.topicEngine.getActiveTopics());
        this.updateSegmentCount();
        this.renderTopicMatrix();
        this.renderActiveTopicsMiniList();
      });
    });
  }

  // --- Sound Toggle ---
  initSoundToggle() {
    const btn = document.getElementById('btn-sound-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const enabled = window.soundEngine.toggleSound();
      btn.innerHTML = enabled
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      this.showToast(enabled ? 'Sound enabled' : 'Sound muted', 'info');
    });
  }

  // --- Keyboard Shortcuts ---
  initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Space to spin if no modal or input is focused
      if (e.code === 'Space') {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
        
        const openModal = document.querySelector('.modal-backdrop.open');
        if (openModal) return;

        e.preventDefault();
        const spinBtn = document.getElementById('btn-main-spin');
        if (spinBtn) spinBtn.click();
      }

      // 'S' to shuffle topics if no modal or input is focused
      if (e.key === 's' || e.key === 'S') {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
        const openModal = document.querySelector('.modal-backdrop.open');
        if (openModal) return;

        e.preventDefault();
        if (this.handleShuffleAction) this.handleShuffleAction();
      }

      // Escape to close theater mode or modals
      if (e.key === 'Escape') {
        const stageCard = document.getElementById('wheel-stage-card');
        if (stageCard && stageCard.classList.contains('theater-mode')) {
          stageCard.classList.remove('theater-mode');
          setTimeout(() => this.wheel?.setupDPI(), 100);
        }

        document.querySelectorAll('.modal-backdrop.open').forEach(m => {
          m.classList.remove('open');
        });
      }
    });
  }

  // --- Modal Helpers ---
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
    }
  }

  // --- Toast System ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    const iconSVG = type === 'success'
      ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    toast.innerHTML = `<span style="display: inline-flex; align-items: center;">${iconSVG}</span> <span>${this.escapeHTML(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
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

window.app = new App();
