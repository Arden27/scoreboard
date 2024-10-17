import { Match } from "./match";

export class Scoreboard {
  matches: Map<string, Match> = new Map();
  sortedMatches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string) {
    const matchKey = `${homeTeam} vs ${awayTeam}`;
    const match = new Match(homeTeam, awayTeam);

    this.matches.set(matchKey, match);
    this.sortedMatches.push(match);
    this.sortedMatches.sort((a, b) => b.startTime - a.startTime);
  }

  getSummary() {
    return this.sortedMatches.map(
      (match, index) =>
        `${index + 1}. ${match.homeTeam} ${match.homeScore} - ${
          match.awayTeam
        } ${match.awayScore}`
    );
  }
}
