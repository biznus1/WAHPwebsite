import { describe, expect, it } from "vitest";
import { MIN_FILL_SECONDS, isLikelyBot, parseEnquiry } from "@/lib/enquiry-schema";
import { createRateLimiter } from "@/lib/rate-limit";
import { approvedClaim, claims } from "@/content/claims";

function form(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const valid = {
  type: "general",
  name: "Ama Mensah",
  email: "ama@example.com",
  message: "Hello, I'd like an update.",
  consent: "on",
};

describe("enquiry validation", () => {
  it("accepts a valid general enquiry", () => {
    const r = parseEnquiry(form(valid));
    expect(r.success).toBe(true);
  });

  it("requires consent", () => {
    const r = parseEnquiry(form({ ...valid, consent: "" }));
    expect(r.success).toBe(false);
    expect(r.error?.issues.some((i) => i.path[0] === "consent")).toBe(true);
  });

  it("rejects invalid email and unknown types", () => {
    expect(parseEnquiry(form({ ...valid, email: "not-an-email" })).success).toBe(false);
    expect(parseEnquiry(form({ ...valid, type: "patient-intake" })).success).toBe(false);
  });

  it("requires specialty and location for physicians", () => {
    const r = parseEnquiry(form({ ...valid, type: "physician", message: "" }));
    expect(r.success).toBe(false);
    const paths = r.error!.issues.map((i) => i.path[0]);
    expect(paths).toContain("specialty");
    expect(paths).toContain("location");
  });

  it("strips markup from text fields", () => {
    const r = parseEnquiry(form({ ...valid, message: "<script>alert(1)</script>Hello there team" }));
    expect(r.success && r.data.message).toBe("alert(1)Hello there team");
  });

  it("normalises email case", () => {
    const r = parseEnquiry(form({ ...valid, email: "Ama@Example.COM" }));
    expect(r.success && r.data.email).toBe("ama@example.com");
  });
});

describe("bot detection", () => {
  const now = 1_000_000;
  it("flags a filled honeypot", () => {
    expect(isLikelyBot(form({ website: "spam", startedAt: String(now - 60_000) }), now)).toBe(true);
  });
  it("flags submissions that are too fast or have a tampered start time", () => {
    expect(isLikelyBot(form({ startedAt: String(now - 500) }), now)).toBe(true);
    expect(isLikelyBot(form({ startedAt: "abc" }), now)).toBe(true);
  });
  it("does not block no-JS submissions (empty start time) without a honeypot hit", () => {
    expect(isLikelyBot(form({ startedAt: "" }), now)).toBe(false);
  });
  it("allows a human-paced submission", () => {
    expect(isLikelyBot(form({ startedAt: String(now - MIN_FILL_SECONDS * 1000 - 1) }), now)).toBe(false);
  });
});

describe("rate limiter", () => {
  it("blocks after the limit and resets after the window", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("ip", 0).allowed).toBe(true);
    expect(check("ip", 10).allowed).toBe(true);
    expect(check("ip", 20).allowed).toBe(false);
    expect(check("other", 20).allowed).toBe(true);
    expect(check("ip", 1001).allowed).toBe(true);
  });
});

describe("claims register", () => {
  it("never approves unsupported claims", () => {
    for (const c of claims.filter((c) => c.status === "unsupported")) expect(c.publicApproved).toBe(false);
  });
  it("does not expose the unsupported homepage statistics", () => {
    expect(approvedClaim("stat-95-lower-overhead")).toBeNull();
    expect(approvedClaim("stat-24-7-access")).toBeNull();
  });
});
