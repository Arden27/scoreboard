import { describe, it, expect } from "vitest";
import { Match } from "../src/match";

describe("initial test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("Match Class", () => {
  it("should initialize with the home name, away name and both scores set to 0", () => {
    const match = new Match("Brazil", "North Korea");

    expect(match.homeTeam).toBe("Brazil");
    expect(match.awayTeam).toBe("North Korea");
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
  });

  it("should have correct start date", () => {
    const timeBeforeStart = Date.now();
    const match = new Match("Brazil", "North Korea");
    const timeAfterStart = Date.now();

    expect(match.startTime).toBeGreaterThanOrEqual(timeBeforeStart);
    expect(match.startTime).toBeLessThanOrEqual(timeAfterStart);
  });
});
