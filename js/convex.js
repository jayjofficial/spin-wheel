/**
 * UX Roulette - Convex Cloud Integration & Environment Manager
 * Connects to Convex Dev & Production deployments with automatic fallback and local caching.
 */

const CONVEX_ENVIRONMENTS = {
  dev: {
    id: 'dev',
    name: 'Dev Deployment',
    cloudUrl: 'https://adorable-sturgeon-291.convex.cloud',
    siteUrl: 'https://adorable-sturgeon-291.convex.site',
    badgeColor: '#10b981',
    label: '🟢 Convex: Dev'
  },
  prod: {
    id: 'prod',
    name: 'Production Deployment',
    cloudUrl: 'https://beaming-capybara-489.convex.cloud',
    siteUrl: 'https://beaming-capybara-489.convex.site',
    badgeColor: '#a855f7',
    label: '🟣 Convex: Prod'
  },
  offline: {
    id: 'offline',
    name: 'Local Offline Only',
    cloudUrl: null,
    siteUrl: null,
    badgeColor: '#64748b',
    label: '💾 Offline Mode'
  }
};

class ConvexClientManager {
  constructor() {
    this.currentEnv = localStorage.getItem('ux_roulette_convex_env') || 'dev';
    this.isOnline = navigator.onLine;
    this.lastSyncStatus = 'idle'; // 'idle' | 'syncing' | 'connected' | 'error'

    window.addEventListener('online', () => this.handleNetworkChange(true));
    window.addEventListener('offline', () => this.handleNetworkChange(false));
  }

  getCurrentEnvConfig() {
    return CONVEX_ENVIRONMENTS[this.currentEnv] || CONVEX_ENVIRONMENTS.dev;
  }

  setEnvironment(envKey) {
    if (!CONVEX_ENVIRONMENTS[envKey]) return;
    this.currentEnv = envKey;
    localStorage.setItem('ux_roulette_convex_env', envKey);
    this.updateStatusBadge();
    
    if (window.app) {
      window.app.showToast(`Switched to ${CONVEX_ENVIRONMENTS[envKey].name}`, 'info');
    }
    
    // Refresh views to pull from new environment
    if (window.designTracker) {
      window.designTracker.refresh();
    }
  }

  handleNetworkChange(online) {
    this.isOnline = online;
    this.updateStatusBadge();
  }

  updateStatusBadge() {
    const badge = document.getElementById('convex-env-selector');
    const statusDot = document.getElementById('convex-status-dot');
    const statusText = document.getElementById('convex-status-text');

    if (!badge) return;

    const config = this.getCurrentEnvConfig();
    badge.value = this.currentEnv;

    if (statusDot) {
      statusDot.style.backgroundColor = this.isOnline && this.currentEnv !== 'offline' 
        ? config.badgeColor 
        : '#64748b';
    }

    if (statusText) {
      if (this.currentEnv === 'offline') {
        statusText.textContent = 'Local Mode';
      } else if (!this.isOnline) {
        statusText.textContent = 'Offline (Cached)';
      } else {
        statusText.textContent = config.name.replace(' Deployment', '');
      }
    }
  }

  // --- Generic HTTP Query API ---
  async query(path, args = {}) {
    const config = this.getCurrentEnvConfig();
    if (!config.cloudUrl || !this.isOnline) {
      return null;
    }

    try {
      const response = await fetch(`${config.cloudUrl}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          args,
          format: 'clean'
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.warn(`Convex Query ${path} error:`, err);
        return null;
      }

      const data = await response.json();
      return data.value !== undefined ? data.value : data;
    } catch (e) {
      console.warn(`Convex Query ${path} fetch failed (falling back to local):`, e);
      return null;
    }
  }

  // --- Generic HTTP Mutation API ---
  async mutation(path, args = {}) {
    const config = this.getCurrentEnvConfig();
    if (!config.cloudUrl || !this.isOnline) {
      return null;
    }

    try {
      const response = await fetch(`${config.cloudUrl}/api/mutation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          args,
          format: 'clean'
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.warn(`Convex Mutation ${path} error:`, err);
        return null;
      }

      const data = await response.json();
      return data.value !== undefined ? data.value : data;
    } catch (e) {
      console.warn(`Convex Mutation ${path} fetch failed:`, e);
      return null;
    }
  }

  // --- Designs Cloud Sync Layer ---
  async getCloudDesigns() {
    return await this.query('designs:list');
  }

  async saveCloudDesign(design) {
    // If updating existing with Convex ID
    if (design._id || (design.id && design.id.length > 20 && !design.id.startsWith('des_'))) {
      const id = design._id || design.id;
      return await this.mutation('designs:update', {
        id,
        title: design.title,
        prompt: design.prompt,
        date: design.date,
        week: design.week,
        year: design.year,
        weekString: design.weekString,
        platform: design.platform,
        status: design.status,
        figmaUrl: design.figmaUrl,
        postUrl: design.postUrl,
        reflection: design.reflection,
        tags: design.tags || [],
        imageUrl: design.image || design.imageUrl
      });
    } else {
      return await this.mutation('designs:create', {
        title: design.title,
        prompt: design.prompt,
        date: design.date,
        week: design.week,
        year: design.year,
        weekString: design.weekString,
        platform: design.platform,
        status: design.status,
        figmaUrl: design.figmaUrl,
        postUrl: design.postUrl,
        reflection: design.reflection,
        tags: design.tags || [],
        imageUrl: design.image || design.imageUrl
      });
    }
  }

  async deleteCloudDesign(id) {
    if (id && id.length > 20 && !id.startsWith('des_')) {
      return await this.mutation('designs:remove', { id });
    }
    return null;
  }

  // --- Push all Local data to Convex Cloud ---
  async syncLocalToCloud() {
    const config = this.getCurrentEnvConfig();
    if (!config.cloudUrl) {
      throw new Error('Please select Dev or Prod environment to sync to cloud.');
    }

    const localDesigns = await window.storageManager.getAllDesigns();
    const localTopics = window.topicEngine.getAllTopics();

    let syncedDesigns = 0;
    for (const d of localDesigns) {
      try {
        const res = await this.saveCloudDesign(d);
        if (res) syncedDesigns++;
      } catch (e) {
        console.warn('Sync item failed', e);
      }
    }

    try {
      await this.mutation('topics:bulkSync', {
        topics: localTopics.map(t => ({
          text: t.text,
          category: t.category || 'General',
          deliverable: t.deliverable,
          uxFocus: t.uxFocus,
          color: t.color || '#6366f1',
          active: t.active !== false,
          isCustom: !!t.isCustom
        }))
      });
    } catch (e) {}

    return {
      designsSynced: syncedDesigns,
      totalDesigns: localDesigns.length
    };
  }
}

window.convexManager = new ConvexClientManager();
