import { describe, expect, it } from "vitest";
import { isAllowedTripHubUrl, passwordMatches, tripHubConfig } from "@/lib/trip-hub";

describe("trip hub access", () => {
  it("is off unless both the password and an https address are set", () => {
    expect(tripHubConfig({})).toBeNull();
    expect(tripHubConfig({ TRIP_HUB_PASSWORD: "secret" })).toBeNull();
    expect(tripHubConfig({ TRIP_HUB_URL: "https://example.com/hub" })).toBeNull();
    expect(tripHubConfig({ TRIP_HUB_PASSWORD: "  ", TRIP_HUB_URL: "https://example.com/hub" })).toBeNull();
    expect(tripHubConfig({ TRIP_HUB_PASSWORD: "secret", TRIP_HUB_URL: "http://example.com/hub" })).toBeNull();
    expect(tripHubConfig({ TRIP_HUB_PASSWORD: "secret", TRIP_HUB_URL: "https://example.com/hub" })).toEqual({
      password: "secret",
      url: "https://example.com/hub",
    });
  });

  it("only accepts https addresses", () => {
    expect(isAllowedTripHubUrl("https://example.com/a")).toBe(true);
    expect(isAllowedTripHubUrl("javascript:alert(1)")).toBe(false);
    expect(isAllowedTripHubUrl("not a url")).toBe(false);
  });

  it("matches the password regardless of case and surrounding spaces, and nothing else", () => {
    expect(passwordMatches("secret", "secret")).toBe(true);
    expect(passwordMatches(" Secret ", "secret")).toBe(true);
    expect(passwordMatches("", "secret")).toBe(false);
    expect(passwordMatches("secre", "secret")).toBe(false);
    expect(passwordMatches("secrets", "secret")).toBe(false);
  });
});
