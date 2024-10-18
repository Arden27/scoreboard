import { describe, it, expect, beforeEach } from "vitest";

import { Scoreboard } from "../src/scoreboard";
import { ERROR_NO_MATCH } from "../src/constants";

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

  it("should update the score", () => {
    scoreboard.startMatch("Australia", "Cuba");
    scoreboard.updateScore("Australia", "Cuba", 3, 2);
    summary = scoreboard.getSummary();

    expect(summary).toEqual(["1. Australia 3 - Cuba 2"]);
  });

  it("should keep correct order after score update", async () => {
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

  it("should finish selected match and remove it from the scoreboard", async () => {
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

    expect(summary).toEqual(["1. Ukraine 0 - England 0"]);
  });

  it("should throw an error when trying to update or finish non existing match", async () => {
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
