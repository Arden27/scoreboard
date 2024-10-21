import { describe, it, expect, beforeEach } from "vitest";

import { Scoreboard } from "../src/scoreboard";
import { ERROR_NO_MATCH, ERROR_MATCH_EXISTS } from "../src/constants";

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
    await startMatches(
      [
        ["Australia", "Cuba"],
        ["Mongolia", "Canada"],
      ],
      scoreboard
    );
    summary = scoreboard.getSummary();

    expect(summary).toEqual([
      "1. Mongolia 0 - Canada 0",
      "2. Australia 0 - Cuba 0",
    ]);
  });

  it("should update the score correctly", () => {
    scoreboard.startMatch("Australia", "Cuba");
    scoreboard.updateScore("Australia", "Cuba", 3, 2);
    summary = scoreboard.getSummary();

    expect(summary).toEqual(["1. Australia 3 - Cuba 2"]);
  });

  it("should maintain the correct order after a score update", async () => {
    await startMatches(
      [
        ["Israel", "Italy"],
        ["Ukraine", "England"],
        ["Poland", "Czechia"],
        ["China", "USA"],
      ],
      scoreboard
    );
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

  it("should finish the selected match and remove it from both matches map and sortedMatches array", async () => {
    await startMatches(
      [
        ["Israel", "Italy"],
        ["Ukraine", "England"],
        ["Poland", "Czechia"],
        ["China", "USA"],
      ],
      scoreboard
    );
    scoreboard.finishMatch("China", "USA");
    scoreboard.finishMatch("Poland", "Czechia");
    scoreboard.finishMatch("Israel", "Italy");
    summary = scoreboard.getSummary();
    const isMatchDeleted = !scoreboard.matches.get("Poland vs Czechia");

    expect(summary).toEqual(["1. Ukraine 0 - England 0"]);
    expect(isMatchDeleted).toBe(true);
  });

  it("should throw an error when updating or finishing a non-existing match", async () => {
    await startMatches(
      [
        ["Israel", "Italy"],
        ["China", "USA"],
      ],
      scoreboard
    );

    expect(() => {
      scoreboard.finishMatch("Israel", "USA");
    }).toThrowError(ERROR_NO_MATCH);
    expect(() => {
      scoreboard.updateScore("USA", "China", 1, 2);
    }).toThrowError(ERROR_NO_MATCH);
  });

  it("should throw an error when starting a match that already exists", () => {
    scoreboard.startMatch("Australia", "Cuba");
    expect(() => {
      scoreboard.startMatch("Australia", "Cuba");
    }).toThrowError(ERROR_MATCH_EXISTS);
  });

  it("should throw an error when trying to start a match with the same teams but with different casing", () => {
    scoreboard.startMatch("Australia", "Cuba");
    expect(() => {
      scoreboard.startMatch("AUStRALia", "CuBa");
    }).toThrowError(ERROR_MATCH_EXISTS);
  });
});

async function startMatches(
  matches: [string, string][],
  scoreboard: Scoreboard
) {
  for (const match of matches) {
    scoreboard.startMatch(match[0], match[1]);
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
  }
}
