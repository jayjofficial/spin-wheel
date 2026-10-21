import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all designs sorted by date/createdAt descending
export const list = query({
  args: {
    week: v.optional(v.number()),
    year: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let designs = await ctx.db.query("designs").order("desc").collect();

    // Filter by week/year if provided
    if (args.week !== undefined && args.year !== undefined) {
      designs = designs.filter(
        (d) => d.week === args.week && d.year === args.year
      );
    }

    // Filter by status if provided
    if (args.status && args.status !== "all") {
      designs = designs.filter((d) => d.status === args.status);
    }

    // Resolve storage images if using Convex file storage
    return Promise.all(
      designs.map(async (d) => {
        let resolvedImage = d.imageUrl;
        if (d.imageStorageId) {
          const url = await ctx.storage.getUrl(d.imageStorageId);
          if (url) resolvedImage = url;
        }
        return {
          ...d,
          id: d._id,
          image: resolvedImage,
        };
      })
    );
  },
});

// Get a single design by ID
export const get = query({
  args: { id: v.id("designs") },
  handler: async (ctx, args) => {
    const design = await ctx.db.get(args.id);
    if (!design) return null;

    let resolvedImage = design.imageUrl;
    if (design.imageStorageId) {
      const url = await ctx.storage.getUrl(design.imageStorageId);
      if (url) resolvedImage = url;
    }
    return {
      ...design,
      id: design._id,
      image: resolvedImage,
    };
  },
});

// Create a new design entry
export const create = mutation({
  args: {
    title: v.string(),
    prompt: v.optional(v.string()),
    date: v.string(),
    week: v.number(),
    year: v.number(),
    weekString: v.string(),
    platform: v.string(),
    status: v.string(),
    figmaUrl: v.optional(v.string()),
    postUrl: v.optional(v.string()),
    reflection: v.optional(v.string()),
    tags: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const id = await ctx.db.insert("designs", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return { id, ...args };
  },
});

// Update an existing design entry
export const update = mutation({
  args: {
    id: v.id("designs"),
    title: v.optional(v.string()),
    prompt: v.optional(v.string()),
    date: v.optional(v.string()),
    week: v.optional(v.number()),
    year: v.optional(v.number()),
    weekString: v.optional(v.string()),
    platform: v.optional(v.string()),
    status: v.optional(v.string()),
    figmaUrl: v.optional(v.string()),
    postUrl: v.optional(v.string()),
    reflection: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Design not found");
    }

    const updates = {
      ...fields,
      updatedAt: new Date().toISOString(),
    };

    await ctx.db.patch(id, updates);
    return { id, ...existing, ...updates };
  },
});

// Remove a design entry
export const remove = mutation({
  args: { id: v.id("designs") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (existing && existing.imageStorageId) {
      await ctx.storage.delete(existing.imageStorageId);
    }
    await ctx.db.delete(args.id);
    return { success: true, id: args.id };
  },
});

// Generate an upload URL for uploading screenshots into Convex File Storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
