import { describe, expect, it } from "vitest";
import { faqLists, memberSchema, pageHeaders, teamMembers } from "../../src/content/editable";

const valid = {
  name: { name: "Test Person", slug: "test-person" },
  role: "Role",
  bio: "Bio",
  focus: ["Focus"],
  photo: "/images/team/members/test-person/photo.webp",
  linkedin: "https://www.linkedin.com/in/test",
  show: true,
};

describe("admin-editable content", () => {
  it("loads the committed content", () => {
    expect(pageHeaders.home.lead).toBeTruthy();
    expect(teamMembers.length).toBeGreaterThan(0);
    expect(teamMembers.every((m) => typeof m.name === "string")).toBe(true);
    expect(faqLists.physicians.length).toBeGreaterThan(0);
  });

  it("accepts a valid team member and flattens the name", () => {
    expect(memberSchema.parse(valid).name).toBe("Test Person");
  });

  it("rejects unsafe LinkedIn links and photo paths", () => {
    expect(() => memberSchema.parse({ ...valid, linkedin: "javascript:alert(1)" })).toThrow();
    expect(() => memberSchema.parse({ ...valid, linkedin: "http://example.com" })).toThrow();
    expect(() => memberSchema.parse({ ...valid, photo: "/images/team/../../secret.webp" })).toThrow();
    expect(() => memberSchema.parse({ ...valid, photo: "https://evil.example/x.webp" })).toThrow();
  });
});
