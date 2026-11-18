import { createHash, timingSafeEqual } from "node:crypto";

/**
 * The Ghana trip hub is a private team page hosted in Claude. The website only checks a shared
 * team password and hands back its address, so neither value lives in this (public) repository:
 * both come from environment variables on the host.
 */
export type TripHubState =
  | { status: "idle" }
  | { status: "wrong" | "rate_limited" | "not_configured"; message: string }
  | { status: "open"; url: string };

export function isAllowedTripHubUrl(url: string) {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

/** Returns the configured password and address, or null when either is missing or the address is not https. */
export function tripHubConfig(env: Record<string, string | undefined> = process.env) {
  const password = (env.TRIP_HUB_PASSWORD ?? "").trim();
  const url = (env.TRIP_HUB_URL ?? "").trim();
  if (!password || !isAllowedTripHubUrl(url)) return null;
  return { password, url };
}

/**
 * Compares in constant time. Surrounding spaces and letter case are ignored because the password is
 * typed on phones, where keyboards add both.
 */
export function passwordMatches(given: string, expected: string) {
  const digest = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest();
  return timingSafeEqual(digest(given), digest(expected));
}
