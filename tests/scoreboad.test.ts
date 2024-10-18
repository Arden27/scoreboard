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

  it("should keep correct order after score update", async () => {
    scoreboard.startMatch("Israel", "Italy");
    await new Promise((resolve) => setTimeout(resolve, 10));
    scoreboard.startMatch("Ukraine", "England");
    await new Promise((resolve) => setTimeout(resolve, 10));
    scoreboard.startMatch("Poland", "Czechia");
    await new Promise((resolve) => setTimeout(resolve, 10));
    scoreboard.startMatch("China", "USA");

    scoreboard.updateScore("Israel", "Italy", 2, 2);
    scoreboard.updateScore("Poland", "Czechia", 3, 2);
    scoreboard.updateScore("Ukraine", "England", 5, 0);
    scoreboard.updateScore("China", "USA", 3, 4);

    summary = scoreboard.getSummary();
    expect(summary).toEqual([
      "1. China 3 - USA 4",
      "2. Poland 3 - Czechia 2",
      "3. Ukraine 5 - England 0",
      "4. Israel 2 - Italy 2",
    ]);
  });
});
