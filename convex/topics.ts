import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all topics
export const list = query({
  args: {},
  handler: async (ctx) => {
    const topics = await ctx.db.query("topics").collect();
    return topics.map((t) => ({
      ...t,
      id: t._id,
    }));
  },
});

// Create a new topic
export const create = mutation({
  args: {
    text: v.string(),
    category: v.string(),
    deliverable: v.optional(v.string()),
    uxFocus: v.optional(v.string()),
    color: v.string(),
    active: v.boolean(),
    isCustom: v.boolean(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("topics", {
      ...args,
      createdAt: new Date().toISOString(),
    });
    return { id, ...args };
  },
});

// Toggle a topic active/inactive
export const toggle = mutation({
  args: { id: v.id("topics") },
  handler: async (ctx, args) => {
    const topic = await ctx.db.get(args.id);
    if (!topic) throw new Error("Topic not found");
    const updated = !topic.active;
    await ctx.db.patch(args.id, { active: updated });
    return { id: args.id, active: updated };
  },
});

// Remove a topic
export const remove = mutation({
  args: { id: v.id("topics") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true, id: args.id };
  },
});

// Bulk sync topics from client
export const bulkSync = mutation({
  args: {
    topics: v.array(
      v.object({
        text: v.string(),
        category: v.string(),
        deliverable: v.optional(v.string()),
        uxFocus: v.optional(v.string()),
        color: v.string(),
        active: v.boolean(),
        isCustom: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Clear and reload
    const existing = await ctx.db.query("topics").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }
    const insertedIds = [];
    for (const t of args.topics) {
      const id = await ctx.db.insert("topics", {
        ...t,
        createdAt: new Date().toISOString(),
      });
      insertedIds.push(id);
    }
    return { count: insertedIds.length };
  },
});
