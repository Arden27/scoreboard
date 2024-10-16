import { describe, it, expect, beforeAll } from "vitest";
import { Match } from "../src/match";
import { ERROR_NEGATIVE_SCORE } from "../src/constants";

describe("initial test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("Match Class", () => {
  let timeBeforeStart: number;
  let match: Match;
  let timeAfterStart: number;

  beforeAll(() => {
    timeBeforeStart = Date.now();
    match = new Match("Brazil", "North Korea");
    timeAfterStart = Date.now();
  });

  it("should initialize with the home name, away name and both scores set to 0", () => {
    const match = new Match("Brazil", "North Korea");

    expect(match.homeTeam).toBe("Brazil");
    expect(match.awayTeam).toBe("North Korea");
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
  });

  it("should have correct start date", () => {
    expect(match.startTime).toBeGreaterThanOrEqual(timeBeforeStart);
    expect(match.startTime).toBeLessThanOrEqual(timeAfterStart);
  });

  it("should update the score", () => {
    match.updateScore(1, 3);

    expect(match.homeScore).toBe(1);
    expect(match.awayScore).toBe(3);
  });

  it("should throw an error when trying to update score to a negative number", () => {
    expect(() => {
      match.updateScore(1, -3);
    }).toThrowError(ERROR_NEGATIVE_SCORE);
  });
});
