import { describe, expect, it } from "vitest";
import { formatFigure, parseFigure } from "../../src/components/motion/count-up";

describe("count up figures", () => {
  it.each([
    ["20", "0"],
    ["60+", "0+"],
    ["1.43", "0.00"],
    ["71.8%", "0.0%"],
    ["1:5,707", "1:0"],
    ["11,867", "0"],
  ])("%s starts at %s and ends on itself", (value, start) => {
    const f = parseFigure(value);
    expect(f).not.toBeNull();
    expect(formatFigure(f!, 0)).toBe(start);
    expect(formatFigure(f!, f!.target)).toBe(value);
  });

  it("keeps thousands separators while counting", () => {
    expect(formatFigure(parseFigure("1:5,707")!, 2853.5)).toBe("1:2,854");
  });

  it("ignores text without a number", () => {
    expect(parseFigure("n/a")).toBeNull();
  });
});
