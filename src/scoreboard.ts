import { Match } from "./match";

export class Scoreboard {
  matches: Map<string, Match> = new Map();
  sortedMatches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string) {
    const matchKey = `${homeTeam} vs ${awayTeam}`;
    const match = new Match(homeTeam, awayTeam);
    const insertIndex = this.findInsertionIndex(match);

    this.matches.set(matchKey, match);
    this.sortedMatches.splice(insertIndex, 0, match);
  }

  updateScore(
    homeTeam: string,
    awayTeam: string,
    newHomeScore: number,
    newAwayScore: number
  ) {
    const matchKey = `${homeTeam} vs ${awayTeam}`;
    const match = this.matches.get(matchKey);
    match?.updateScore(newHomeScore, newAwayScore)
  }

  getSummary() {
    return this.sortedMatches.map(
      (match, index) =>
        `${index + 1}. ${match.homeTeam} ${match.homeScore} - ${
          match.awayTeam
        } ${match.awayScore}`
    );
  }

  private findInsertionIndex(newMatch: Match): number {
    const totalScore = newMatch.homeScore + newMatch.awayScore;
    let low = 0;
    let high = this.sortedMatches.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const midMatch = this.sortedMatches[mid];
      const midScore = midMatch.homeScore + midMatch.awayScore;

      if (totalScore > midScore) {
        high = mid;
      } else if (totalScore < midScore) {
        low = mid + 1;
      } else if (newMatch.startTime > midMatch.startTime) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    return low;
  }
}
