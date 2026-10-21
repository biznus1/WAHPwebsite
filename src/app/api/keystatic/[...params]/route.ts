import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { adminEnabled } from "@/lib/admin";

// Created on first request so a missing GitHub secret surfaces as a failed admin request, not a failed build.
let handler: ReturnType<typeof makeRouteHandler> | undefined;

async function handle(request: Request) {
  if (!adminEnabled) return new Response("Not found", { status: 404 });
  handler ??= makeRouteHandler({ config });
  return request.method === "POST" ? handler.POST(request) : handler.GET(request);
}

export { handle as GET, handle as POST };
