import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Saved designs and weekly portfolio tracker
  designs: defineTable({
    title: v.string(),
    prompt: v.optional(v.string()),
    date: v.string(), // YYYY-MM-DD
    week: v.number(), // ISO week number (1-53)
    year: v.number(), // ISO year
    weekString: v.string(), // "Week 43, 2026"
    platform: v.string(), // "Mobile App", "Web / Dashboard", etc.
    status: v.string(), // "planned", "in_progress", "completed", "published"
    figmaUrl: v.optional(v.string()),
    postUrl: v.optional(v.string()),
    reflection: v.optional(v.string()),
    tags: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_week", ["year", "week"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  // Roulette topics & challenges
  topics: defineTable({
    text: v.string(),
    category: v.string(),
    deliverable: v.optional(v.string()),
    uxFocus: v.optional(v.string()),
    color: v.string(),
    active: v.boolean(),
    isCustom: v.boolean(),
    createdAt: v.optional(v.string()),
  }).index("by_active", ["active"]),
});
