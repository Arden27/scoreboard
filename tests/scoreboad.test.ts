import { describe, it, expect, beforeEach } from "vitest";

import { Scoreboard } from "../src/scoreboard";
describe("Scoreboard Class", () => {
  let scoreboard: Scoreboard;
  let summary: string[];

  beforeEach(() => {
    scoreboard = new Scoreboard();
    summary = [];
  });

  it("should start a new match and add it to the scoreboard", () => {
    scoreboard.startMatch("Australia", "Cuba");
    summary = scoreboard.getSummary();
    expect(summary).toEqual(["1. Australia 0 - Cuba 0"]);
  });

  it("should be sorted by startTime", async () => {
    scoreboard.startMatch("Australia", "Cuba");
    await new Promise((resolve) => setTimeout(resolve, 10));
    scoreboard.startMatch("Mongolia", "Canada");
    summary = scoreboard.getSummary();
    expect(summary).toEqual([
      "1. Mongolia 0 - Canada 0",
      "2. Australia 0 - Cuba 0",
    ]);
  });

  it("should update the score", () => {
    scoreboard.startMatch("Australia", "Cuba");
    scoreboard.updateScore("Australia", "Cuba", 3, 2);
    summary = scoreboard.getSummary();
    expect(summary).toEqual(["1. Australia 3 - Cuba 2"]);
  });
});
