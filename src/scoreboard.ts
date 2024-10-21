import { Match } from "./match";
import {
  ERROR_MATCH_EXISTS,
  ERROR_NO_MATCH,
  ERROR_SAME_TEAM,
} from "./constants";

export class Scoreboard {
  matches: Map<string, Match> = new Map();
  sortedMatches: Match[] = [];
  activeTeams: Set<string> = new Set();

  startMatch(homeTeam: string, awayTeam: string) {
    if (this.isSameTeams(homeTeam, awayTeam)) throw new Error(ERROR_SAME_TEAM);

    const matchKey = this.generateMatchKey(homeTeam, awayTeam);
    const isMatchExists = this.matches.get(matchKey);

    if (isMatchExists) throw new Error(ERROR_MATCH_EXISTS);

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
    const matchKey = this.generateMatchKey(homeTeam, awayTeam);
    const match = this.matches.get(matchKey);

    if (match) {
      match.updateScore(newHomeScore, newAwayScore);
      const removeIndex = this.sortedMatches.indexOf(match);
      this.sortedMatches.splice(removeIndex, 1);
      const insertIndex = this.findInsertionIndex(match);
      this.sortedMatches.splice(insertIndex, 0, match);
    } else throw new Error(ERROR_NO_MATCH);
  }

  finishMatch(homeTeam: string, awayTeam: string) {
    const matchKey = this.generateMatchKey(homeTeam, awayTeam);
    const match = this.matches.get(matchKey);

    if (match) {
      const removeIndex = this.sortedMatches.indexOf(match);

      this.sortedMatches.splice(removeIndex, 1);
      this.matches.delete(matchKey);
    } else throw new Error(ERROR_NO_MATCH);
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

  private normalize(team: string) {
    return team.trim().toLowerCase();
  }

  private generateMatchKey(homeTeam: string, awayTeam: string) {
    const home = this.normalize(homeTeam);
    const away = this.normalize(awayTeam);
    return `${home} vs ${away}`;
  }

  private isSameTeams(homeTeam: string, awayTeam: string) {
    return this.normalize(homeTeam) === this.normalize(awayTeam);
  }
}
