"use server";

import { headers } from "next/headers";
import { createRateLimiter } from "@/lib/rate-limit";
import { passwordMatches, tripHubConfig, type TripHubState } from "@/lib/trip-hub";

// The password is short and shared, so guesses are limited per connection.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function openTripHub(_prev: TripHubState, form: FormData): Promise<TripHubState> {
  const config = tripHubConfig();
  if (!config) {
    return { status: "not_configured", message: "The trip hub isn't set up on this site yet." };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (!limiter(ip).allowed) {
    return { status: "rate_limited", message: "Too many tries from this connection. Wait ten minutes and try again." };
  }

  const given = form.get("password");
  if (typeof given !== "string" || !passwordMatches(given, config.password)) {
    return { status: "wrong", message: "That password isn't right." };
  }
  return { status: "open", url: config.url };
}
