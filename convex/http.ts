import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// CORS Headers helper
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Health Check & Status
http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(
      JSON.stringify({
        status: "ok",
        service: "UX Roulette Convex Backend",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }),
});

// OPTIONS preflight handler for CORS
http.route({
  path: "/api/designs",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, { status: 204, headers: corsHeaders });
  }),
});

http.route({
  path: "/api/topics",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, { status: 204, headers: corsHeaders });
  }),
});

// GET /api/designs -> List designs
http.route({
  path: "/api/designs",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || undefined;
    const week = url.searchParams.get("week") ? Number(url.searchParams.get("week")) : undefined;
    const year = url.searchParams.get("year") ? Number(url.searchParams.get("year")) : undefined;

    const list = await ctx.runQuery(api.designs.list, { status, week, year });
    return new Response(JSON.stringify(list), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }),
});

// POST /api/designs -> Create design
http.route({
  path: "/api/designs",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const res = await ctx.runMutation(api.designs.create, body);
      return new Response(JSON.stringify(res), {
        status: 201,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }),
});

// GET /api/topics -> List topics
http.route({
  path: "/api/topics",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const list = await ctx.runQuery(api.topics.list, {});
    return new Response(JSON.stringify(list), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }),
});

// POST /api/topics -> Create topic
http.route({
  path: "/api/topics",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const res = await ctx.runMutation(api.topics.create, body);
      return new Response(JSON.stringify(res), {
        status: 201,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }),
});

export default http;
