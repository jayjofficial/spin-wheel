/**
 * UX Roulette - Notification & Daily Reminder Engine
 * Manages Web Notifications, daily deadline tracking, in-app banners, and alerts.
 * Strictly zero emojis.
 */

class NotificationManager {
  constructor() {
    this.storageKeyEnabled = 'ux_roulette_notifications_enabled';
    this.storageKeyLastDate = 'ux_roulette_last_daily_reminder_date';
    this.isSupported = typeof window !== 'undefined' && 'Notification' in window;
    this.hourlyInterval = null;
    this.panelOpen = false;
  }

  get enabled() {
    return localStorage.getItem(this.storageKeyEnabled) !== 'false';
  }

  set enabled(val) {
    localStorage.setItem(this.storageKeyEnabled, val ? 'true' : 'false');
  }

  get lastReminderDate() {
    return localStorage.getItem(this.storageKeyLastDate) || '';
  }

  set lastReminderDate(val) {
    localStorage.setItem(this.storageKeyLastDate, val);
  }

  get permission() {
    if (!this.isSupported) return 'unsupported';
    return Notification.permission;
  }

  async init() {
    this.bindDOM();
    this.updatePermissionUI();
    await this.updateBadgeCount();

    // Daily reminder check on startup
    await this.checkDailyReminders(false);

    // Periodic check every 30 minutes while tab remains open
    if (this.hourlyInterval) clearInterval(this.hourlyInterval);
    this.hourlyInterval = setInterval(() => {
      this.checkDailyReminders(false);
      this.updateBadgeCount();
    }, 30 * 60 * 1000);
  }

  bindDOM() {
    const toggleBtn = document.getElementById('btn-notification-toggle');
    const panel = document.getElementById('notification-panel');
    const closeBtn = document.getElementById('btn-close-notif-panel');
    const reqPermBtn = document.getElementById('btn-request-notif-perm');
    const testBtn = document.getElementById('btn-test-notification');
    const openArchiveBtn = document.getElementById('btn-view-archive-from-notif');
    const bannerDismissBtn = document.getElementById('btn-reminder-dismiss');
    const bannerActionBtn = document.getElementById('btn-reminder-action');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePanel();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.togglePanel(false));
    }

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (this.panelOpen && panel && !panel.contains(e.target) && e.target !== toggleBtn && !toggleBtn?.contains(e.target)) {
        this.togglePanel(false);
      }
    });

    if (reqPermBtn) {
      reqPermBtn.addEventListener('click', async () => {
        await this.requestPermission();
      });
    }

    if (testBtn) {
      testBtn.addEventListener('click', async () => {
        await this.sendTestReminder();
      });
    }

    if (openArchiveBtn) {
      openArchiveBtn.addEventListener('click', () => {
        this.togglePanel(false);
        if (window.app) window.app.switchTab('tracker');
      });
    }

    if (bannerDismissBtn) {
      bannerDismissBtn.addEventListener('click', () => {
        this.hideBanner();
      });
    }

    if (bannerActionBtn) {
      bannerActionBtn.addEventListener('click', async () => {
        this.hideBanner();
        const pending = await this.getUpcomingDesigns();
        if (pending.length > 0 && window.app) {
          window.app.switchTab('tracker');
          const primary = pending[0];
          setTimeout(() => {
            window.app.openDesignModal(primary);
          }, 150);
        } else if (window.app) {
          window.app.switchTab('tracker');
        }
      });
    }
  }

  togglePanel(forceState) {
    const panel = document.getElementById('notification-panel');
    if (!panel) return;
    this.panelOpen = typeof forceState === 'boolean' ? forceState : !this.panelOpen;
    panel.style.display = this.panelOpen ? 'flex' : 'none';

    if (this.panelOpen) {
      this.updatePermissionUI();
      this.renderDropdownPanel();
    }
  }

  async requestPermission() {
    if (!this.isSupported) {
      if (window.app && window.app.showToast) {
        window.app.showToast('Desktop notifications are not supported in this browser.', 'info');
      }
      return 'unsupported';
    }

    try {
      const perm = await Notification.requestPermission();
      this.updatePermissionUI();
      if (perm === 'granted') {
        this.enabled = true;
        if (window.app && window.app.showToast) {
          window.app.showToast('Desktop notifications enabled. You will receive daily design reminders.', 'success');
        }
        await this.checkDailyReminders(true);
      } else {
        if (window.app && window.app.showToast) {
          window.app.showToast('Notification permission was not granted. In-app reminder banners remain active.', 'info');
        }
      }
      return perm;
    } catch (e) {
      console.warn('Notification permission error:', e);
      return 'error';
    }
  }

  updatePermissionUI() {
    const dot = document.getElementById('notif-perm-dot');
    const text = document.getElementById('notif-perm-text');
    const btn = document.getElementById('btn-request-notif-perm');

    if (!dot || !text || !btn) return;

    if (!this.isSupported) {
      dot.className = 'notif-status-indicator disabled';
      text.textContent = 'Desktop Alerts: Unsupported';
      btn.style.display = 'none';
      return;
    }

    const perm = Notification.permission;
    if (perm === 'granted') {
      dot.className = 'notif-status-indicator active';
      text.textContent = 'Desktop Alerts: Enabled';
      btn.textContent = 'Active';
      btn.disabled = true;
      btn.classList.add('btn-granted');
    } else if (perm === 'denied') {
      dot.className = 'notif-status-indicator blocked';
      text.textContent = 'Desktop Alerts: Blocked in Browser';
      btn.textContent = 'Permission Blocked';
      btn.disabled = true;
    } else {
      dot.className = 'notif-status-indicator idle';
      text.textContent = 'Desktop Alerts: Disabled';
      btn.textContent = 'Enable Alerts';
      btn.disabled = false;
      btn.classList.remove('btn-granted');
    }
  }

  async getUpcomingDesigns() {
    if (!window.storageManager) return [];
    const designs = await window.storageManager.getAllDesigns();
    const active = designs.filter(d => d.status === 'planned' || d.status === 'in_progress');

    // Ensure all have deadline information and compute status
    active.forEach(d => {
      if (!d.deadlineDate) {
        const dl = StorageManager.getNextWeekDeadline(d.date || d.createdAt);
        d.deadlineDate = dl.deadlineDate;
        d.deadlineFormatted = dl.deadlineFormatted;
        d.deadlineWeek = dl.deadlineWeek;
        d.deadlineYear = dl.deadlineYear;
      }
      d.deadlineStatus = StorageManager.getDeadlineStatus(d.deadlineDate);
    });

    // Sort by earliest deadline first (most urgent)
    active.sort((a, b) => {
      const dayA = a.deadlineStatus?.days ?? 999;
      const dayB = b.deadlineStatus?.days ?? 999;
      return dayA - dayB;
    });

    return active;
  }

  async updateBadgeCount() {
    const badge = document.getElementById('header-notification-badge');
    const countLabel = document.getElementById('notif-active-count');
    const active = await this.getUpcomingDesigns();

    if (badge) {
      if (active.length > 0) {
        badge.textContent = active.length > 9 ? '9+' : active.length;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }

    if (countLabel) {
      countLabel.textContent = `${active.length} active`;
    }
  }

  async renderDropdownPanel() {
    const listEl = document.getElementById('notif-designs-list');
    if (!listEl) return;

    const active = await this.getUpcomingDesigns();
    await this.updateBadgeCount();

    if (active.length === 0) {
      listEl.innerHTML = `
        <div class="notif-empty-state">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <p>No active designs in archive right now. Spin the roulette to start a new weekly challenge!</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = active.map(d => {
      const statusClass = d.deadlineStatus?.urgency || 'normal';
      const label = d.deadlineStatus?.label || 'Next week';
      const styleName = d.uiStyle || 'Standard';

      return `
        <div class="notif-design-item" data-id="${d.id}">
          <div class="notif-item-header">
            <span class="notif-item-title">${this.escapeHTML(d.title)}</span>
            <span class="notif-deadline-pill ${statusClass}">${label}</span>
          </div>
          <div class="notif-item-meta">
            <span class="notif-meta-pill">${d.platform || 'Mobile App'}</span>
            <span class="notif-meta-pill style">${this.escapeHTML(styleName)}</span>
            <span class="notif-meta-deadline">Deadline: ${d.deadlineFormatted || 'Next Week'}</span>
          </div>
          <div class="notif-item-actions">
            <button class="btn-notif-item-work" data-action="work-design" data-id="${d.id}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <span>Work on Design</span>
            </button>
            <button class="btn-notif-item-view" data-action="view-details" data-id="${d.id}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>View Specs</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind item buttons
    listEl.querySelectorAll('[data-action="work-design"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const design = active.find(d => d.id === id);
        if (design && window.app) {
          this.togglePanel(false);
          window.app.switchTab('tracker');
          window.app.openDesignModal(design);
        }
      });
    });

    listEl.querySelectorAll('[data-action="view-details"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const design = active.find(d => d.id === id);
        if (design && window.app) {
          this.togglePanel(false);
          window.app.openArchiveChallengeDetails(design);
        }
      });
    });
  }

  async checkDailyReminders(force = false) {
    const todayStr = new Date().toISOString().split('T')[0];

    if (!force && this.lastReminderDate === todayStr) {
      return;
    }

    const upcoming = await this.getUpcomingDesigns();
    if (upcoming.length === 0) {
      return;
    }

    const primary = upcoming[0];
    const totalCount = upcoming.length;
    const deadlineStr = primary.deadlineFormatted || 'Next Week';
    const daysLabel = primary.deadlineStatus?.label || 'Next week';

    const message = totalCount === 1
      ? `You have 1 design challenge to work on before next week's deadline (${deadlineStr}): "${primary.title}" (${daysLabel}).`
      : `You have ${totalCount} designs to work on before next week's deadline. Up next: "${primary.title}" (${daysLabel}).`;

    // 1. Send Desktop Notification if permitted and enabled
    if (this.isSupported && Notification.permission === 'granted' && this.enabled) {
      try {
        const notif = new Notification('Daily UX Design Habit Reminder', {
          body: message,
          tag: `daily-reminder-${todayStr}`,
          renotify: true
        });

        notif.onclick = () => {
          window.focus();
          if (window.app) {
            window.app.switchTab('tracker');
            window.app.openDesignModal(primary);
          }
        };
      } catch (e) {
        console.warn('Desktop notification dispatch failed:', e);
      }
    }

    // 2. Display In-App Banner
    this.showBanner(message, primary);

    // 3. Audio cue if available
    if (window.soundEngine && window.soundEngine.playPop) {
      window.soundEngine.playPop();
    }

    // 4. Mark today as reminded
    this.lastReminderDate = todayStr;
  }

  showBanner(message, primaryDesign) {
    const banner = document.getElementById('daily-reminder-banner');
    const msgEl = document.getElementById('reminder-banner-message');
    if (!banner || !msgEl) return;

    msgEl.textContent = message;
    banner.style.display = 'flex';
  }

  hideBanner() {
    const banner = document.getElementById('daily-reminder-banner');
    if (banner) banner.style.display = 'none';
  }

  async sendTestReminder() {
    const upcoming = await this.getUpcomingDesigns();
    const sample = upcoming.length > 0 ? upcoming[0] : {
      title: 'Practice Design Challenge',
      deadlineFormatted: 'Next Sunday',
      deadlineStatus: { label: '7 days left' }
    };

    const count = upcoming.length > 0 ? upcoming.length : 1;
    const message = `Test Reminder: You have ${count} design challenge${count > 1 ? 's' : ''} to work on before next week's deadline. Next up: "${sample.title}" (${sample.deadlineStatus.label}).`;

    // Desktop notification test
    if (this.isSupported && Notification.permission === 'granted') {
      try {
        const notif = new Notification('Daily UX Design Habit Reminder (Test)', {
          body: message,
          tag: 'test-reminder',
          renotify: true
        });
        notif.onclick = () => {
          window.focus();
          if (window.app) window.app.switchTab('tracker');
        };
      } catch (e) {
        console.warn('Test notification error:', e);
      }
    } else if (this.isSupported && Notification.permission === 'default') {
      await this.requestPermission();
    }

    // Always show in-app banner for feedback
    this.showBanner(message, sample);

    if (window.app && window.app.showToast) {
      window.app.showToast('Test daily reminder sent to desktop and app banner.', 'success');
    }

    if (window.soundEngine && window.soundEngine.playPop) {
      window.soundEngine.playPop();
    }
  }

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global instance
window.notificationManager = new NotificationManager();
