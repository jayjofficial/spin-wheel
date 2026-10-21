/**
 * UX Roulette & Design Studio - Data Storage & ISO Week Utilities
 * Manages IndexedDB for rich assets (screenshots/mockups) and LocalStorage for state.
 */

class StorageManager {
  constructor() {
    this.dbName = 'UXRouletteDB';
    this.dbVersion = 1;
    this.db = null;
    this.ready = this.initDB();
  }

  async initDB() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, falling back to LocalStorage');
        resolve(null);
        return;
      }
      const req = indexedDB.open(this.dbName, this.dbVersion);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('designs')) {
          const store = db.createObjectStore('designs', { keyPath: 'id' });
          store.createIndex('weekYear', ['year', 'week'], { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };
      req.onerror = () => {
        console.warn('Error opening IndexedDB, falling back to LocalStorage');
        resolve(null);
      };
    });
  }

  // --- ISO 8601 Week Calculations ---
  static getISOWeekData(dateInput) {
    let d;
    if (typeof dateInput === 'string' && dateInput.includes('-')) {
      const parts = dateInput.split('T')[0].split('-').map(Number);
      if (parts.length === 3) {
        d = new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        d = new Date(dateInput);
      }
    } else {
      d = dateInput ? new Date(dateInput) : new Date();
    }

    // Copy date so don't modify original
    const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number (Sunday 7)
    const dayNr = (target.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNr + 3);
    // January 4 is always in week 1
    const firstThursday = target.getTime();
    target.setUTCMonth(0, 1);
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);
    const targetYear = new Date(firstThursday).getUTCFullYear();

    return {
      week: weekNumber,
      year: targetYear,
      weekString: `Week ${weekNumber}, ${targetYear}`,
      dateFormatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  }

  static getWeekDateRange(year, week) {
    // January 4 is always in ISO week 1
    const jan4 = new Date(year, 0, 4);
    const dayOfWeek = (jan4.getDay() + 6) % 7; // Monday = 0, Sunday = 6
    const mondayWeek1 = new Date(year, 0, 4 - dayOfWeek);
    
    // Target week Monday & Sunday
    const targetMonday = new Date(mondayWeek1.getTime() + (week - 1) * 7 * 86400000);
    const targetSunday = new Date(targetMonday.getTime() + 6 * 86400000);

    const startStr = targetMonday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = targetSunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startStr} – ${endStr}`;
  }

  // --- Design CRUD with Convex Cloud Sync ---
  async getAllDesigns() {
    await this.ready;

    // 1. Try fetching from Convex Cloud if enabled
    if (window.convexManager && window.convexManager.currentEnv !== 'offline') {
      const cloudList = await window.convexManager.getCloudDesigns();
      if (Array.isArray(cloudList) && cloudList.length > 0) {
        // Cache to local IndexedDB
        for (const item of cloudList) {
          await this.saveLocalOnly(item);
        }
        cloudList.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        return cloudList;
      }
    }

    // 2. Local IndexedDB fallback
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('designs', 'readonly');
        const store = tx.objectStore('designs');
        const req = store.getAll();
        req.onsuccess = () => {
          const list = req.result || [];
          list.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
          resolve(list);
        };
        req.onerror = () => resolve(this.getFallbackDesigns());
      });
    }
    return this.getFallbackDesigns();
  }

  async saveDesign(design) {
    await this.ready;
    if (!design.id) {
      design.id = 'des_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }
    if (!design.createdAt) design.createdAt = new Date().toISOString();
    design.updatedAt = new Date().toISOString();

    // Ensure week data is populated
    if (!design.week || !design.year) {
      const weekData = StorageManager.getISOWeekData(design.date);
      design.week = weekData.week;
      design.year = weekData.year;
      design.weekString = weekData.weekString;
    }

    // Save locally
    await this.saveLocalOnly(design);

    // Sync to Convex Cloud asynchronously if online
    if (window.convexManager && window.convexManager.currentEnv !== 'offline') {
      try {
        const cloudRes = await window.convexManager.saveCloudDesign(design);
        if (cloudRes && cloudRes.id) {
          design.convexId = cloudRes.id;
        }
      } catch (e) {
        console.warn('Convex cloud sync deferred:', e);
      }
    }

    return design;
  }

  async saveLocalOnly(design) {
    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction('designs', 'readwrite');
        const store = tx.objectStore('designs');
        const req = store.put(design);
        req.onsuccess = () => resolve(design);
        req.onerror = () => reject(req.error);
      });
    } else {
      const all = this.getFallbackDesigns();
      const idx = all.findIndex(d => d.id === design.id);
      if (idx >= 0) all[idx] = design;
      else all.push(design);
      localStorage.setItem('ux_roulette_designs', JSON.stringify(all));
      return design;
    }
  }

  async deleteDesign(id) {
    await this.ready;

    // Delete in Convex Cloud
    if (window.convexManager && window.convexManager.currentEnv !== 'offline') {
      try {
        await window.convexManager.deleteCloudDesign(id);
      } catch (e) {}
    }

    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction('designs', 'readwrite');
        const store = tx.objectStore('designs');
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } else {
      let all = this.getFallbackDesigns();
      all = all.filter(d => d.id !== id);
      localStorage.setItem('ux_roulette_designs', JSON.stringify(all));
      return true;
    }
  }

  getFallbackDesigns() {
    try {
      const data = localStorage.getItem('ux_roulette_designs');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // --- Streak Calculation ---
  static calculateStreak(designs) {
    if (!designs || designs.length === 0) return 0;

    // Set of "YYYY-Www" strings representing weeks that have completed or published designs
    const activeWeeks = new Set();
    designs.forEach(d => {
      if (d.status === 'completed' || d.status === 'published' || d.status === 'in_progress') {
        activeWeeks.add(`${d.year}-W${String(d.week).padStart(2, '0')}`);
      }
    });

    const now = new Date();
    const currentWeekData = StorageManager.getISOWeekData(now);
    let checkDate = new Date();
    let streak = 0;

    // Check if current week has an entry; if not, check previous week before terminating streak
    const currentKey = `${currentWeekData.year}-W${String(currentWeekData.week).padStart(2, '0')}`;
    let startOffset = 0;
    if (!activeWeeks.has(currentKey)) {
      // Check last week
      const prevWeekDate = new Date(checkDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      const prevWeekData = StorageManager.getISOWeekData(prevWeekDate);
      const prevKey = `${prevWeekData.year}-W${String(prevWeekData.week).padStart(2, '0')}`;
      if (!activeWeeks.has(prevKey)) {
        return 0;
      }
      checkDate = prevWeekDate;
    }

    // Traverse backwards week by week
    while (true) {
      const wData = StorageManager.getISOWeekData(checkDate);
      const key = `${wData.year}-W${String(wData.week).padStart(2, '0')}`;
      if (activeWeeks.has(key)) {
        streak++;
        // Step back 7 days
        checkDate = new Date(checkDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }

    return streak;
  }

  // --- Topics State Storage ---
  getSavedTopics() {
    try {
      const data = localStorage.getItem('ux_roulette_custom_topics');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveTopics(topics) {
    try {
      localStorage.setItem('ux_roulette_custom_topics', JSON.stringify(topics));
    } catch (e) {
      console.warn('Failed to save topics to localStorage', e);
    }
  }

  // --- Export & Import ---
  async exportBackup() {
    const designs = await this.getAllDesigns();
    const topics = this.getSavedTopics();
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      designs,
      topics
    };
    return JSON.stringify(backup, null, 2);
  }

  async importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.designs)) {
        for (const des of parsed.designs) {
          await this.saveDesign(des);
        }
      }
      if (Array.isArray(parsed.topics)) {
        this.saveTopics(parsed.topics);
      }
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }
}

window.storageManager = new StorageManager();
