# ☁️ Convex Cloud Backend Integration Guide

This application is configured with two Convex cloud deployment environments: **Development** and **Production**.

---

## 📡 Deployment URLs

### 🟢 Development Deployment
- **Cloud URL**: `https://adorable-sturgeon-291.convex.cloud`
- **HTTP Actions URL**: `https://adorable-sturgeon-291.convex.site`

### 🟣 Production Deployment
- **Cloud URL**: `https://beaming-capybara-489.convex.cloud`
- **HTTP Actions URL**: `https://beaming-capybara-489.convex.site`

---

## 🏗️ Backend Structure (`convex/` directory)

The backend code is already structured and ready in your project:

1. **[convex/schema.ts](file:///c:/Users/sarfo/OneDrive/Documents/GitHub/spin-wheel/convex/schema.ts)**
   - `designs`: Table for design challenges, platforms, dates, week numbers, status, Figma/portfolio links, and screenshot storage.
   - `topics`: Table for roulette challenges, categories, colors, and active states.

2. **[convex/designs.ts](file:///c:/Users/sarfo/OneDrive/Documents/GitHub/spin-wheel/convex/designs.ts)**
   - `list`: Query returning all designs sorted by date/week, with optional filters.
   - `get`: Query fetching a single design by ID.
   - `create`: Mutation to save a new design with automatic timestamps.
   - `update`: Mutation to edit an existing design.
   - `remove`: Mutation to delete a design and clean up attached file storage.
   - `generateUploadUrl`: Mutation returning a direct upload URL for screenshots.

3. **[convex/topics.ts](file:///c:/Users/sarfo/OneDrive/Documents/GitHub/spin-wheel/convex/topics.ts)**
   - `list`: Query returning active/inactive roulette topics.
   - `create`: Mutation to add a new challenge.
   - `toggle`: Mutation to toggle a topic on/off the roulette.
   - `remove`: Mutation to delete a challenge.
   - `bulkSync`: Mutation to sync client topics in bulk.

4. **[convex/http.ts](file:///c:/Users/sarfo/OneDrive/Documents/GitHub/spin-wheel/convex/http.ts)**
   - Exposes REST endpoints on `*.convex.site`:
     - `GET /api/designs`
     - `POST /api/designs`
     - `GET /api/topics`
     - `POST /api/topics`
     - `GET /api/health`
   - Complete with CORS headers for direct browser fetch requests.

---

## 🚀 How to Deploy Convex Backend Functions

When you have Node.js / npm installed on your terminal or CI/CD:

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy to Development
```bash
npx convex dev --cmd-url https://adorable-sturgeon-291.convex.cloud
```

### 3. Deploy to Production
```bash
npx convex deploy --cmd-url https://beaming-capybara-489.convex.cloud
```

---

## 🔄 In-App Environment Switcher & Hybrid Sync

In the top header of the web app, you will find a status pill:
- **`🟢 Dev: adorable-sturgeon`**: Queries and mutations route to your Convex Dev Cloud.
- **`🟣 Prod: beaming-capybara`**: Queries and mutations route to your Convex Production Cloud.
- **`💾 Local Offline`**: Routes exclusively to local IndexedDB/LocalStorage.

### Cloud Sync Features:
- **Automatic Fallback**: If offline or if the backend functions haven't been pushed yet, the app works 100% offline using IndexedDB so you never lose work.
- **Push to Cloud**: In the **Topic Matrix** tab, click **"☁️ Push Local Data to Convex"** to sync all your local designs and topics to your active Convex cloud.
- **Pull from Cloud**: Click **"🔄 Pull Latest Cloud Data"** to refresh your local view with the cloud state.
