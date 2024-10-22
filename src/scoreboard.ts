import { Match } from "./match";
import {
  ERROR_ALREADY_PLAYING,
  ERROR_NO_MATCH,
  ERROR_SAME_TEAM,
} from "./constants";

export class Scoreboard {
  matches: Map<string, Match> = new Map(); // Map to store matches with a unique key
  sortedMatches: Match[] = []; // Array to maintain sorted matches for summary
  activeTeams: Set<string> = new Set(); // Set to track active teams to prevent duplicate participation

  startMatch(homeTeam: string, awayTeam: string) {
    const { homeTeamNormalized, awayTeamNormalized } = this.getNormalizedTeams(
      homeTeam,
      awayTeam
    );

    if (this.isSameTeam(homeTeamNormalized, awayTeamNormalized))
      throw new Error(ERROR_SAME_TEAM);
    if (this.isPlaying(homeTeamNormalized, awayTeamNormalized))
      throw new Error(ERROR_ALREADY_PLAYING);

    const matchKey = this.generateMatchKey(
      homeTeamNormalized,
      awayTeamNormalized
    );
    const match = new Match(homeTeam, awayTeam);
    const insertIndex = this.findInsertionIndex(match);
     // Add the match to the matches map and sortedMatches array
    this.matches.set(matchKey, match);
    this.sortedMatches.splice(insertIndex, 0, match);
    // Mark both teams as active
    this.activeTeams.add(homeTeamNormalized);
    this.activeTeams.add(awayTeamNormalized);
  }

  updateScore(
    homeTeam: string,
    awayTeam: string,
    newHomeScore: number,
    newAwayScore: number
  ) {
    const { homeTeamNormalized, awayTeamNormalized } = this.getNormalizedTeams(
      homeTeam,
      awayTeam
    );
    const matchKey = this.generateMatchKey(
      homeTeamNormalized,
      awayTeamNormalized
    );
    const match = this.matches.get(matchKey);

    if (match) {
      match.updateScore(newHomeScore, newAwayScore);
      // Remove and re-insert the match to maintain correct order
      const removeIndex = this.sortedMatches.indexOf(match);
      this.sortedMatches.splice(removeIndex, 1);
      const insertIndex = this.findInsertionIndex(match);
      this.sortedMatches.splice(insertIndex, 0, match);
    } else throw new Error(ERROR_NO_MATCH);
  }

  finishMatch(homeTeam: string, awayTeam: string) {
    const { homeTeamNormalized, awayTeamNormalized } = this.getNormalizedTeams(
      homeTeam,
      awayTeam
    );
    const matchKey = this.generateMatchKey(
      homeTeamNormalized,
      awayTeamNormalized
    );
    const match = this.matches.get(matchKey);

    if (match) {
      const removeIndex = this.sortedMatches.indexOf(match);
      // Remove the match from the sortedMatches array and matches map
      this.sortedMatches.splice(removeIndex, 1);
      this.matches.delete(matchKey);
      // Remove teams from activeTeams set
      this.activeTeams.delete(homeTeamNormalized);
      this.activeTeams.delete(awayTeamNormalized);
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

  // binary search to find the insertion index
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

  private getNormalizedTeams(homeTeam: string, awayTeam: string) {
    const normalize = (team: string) => team.trim().toLowerCase();

    return {
      homeTeamNormalized: normalize(homeTeam),
      awayTeamNormalized: normalize(awayTeam),
    };
  }

  private generateMatchKey(
    homeTeamNormalized: string,
    awayTeamNormalized: string
  ) {
    return `${homeTeamNormalized} vs ${awayTeamNormalized}`;
  }

  private isSameTeam(homeTeamNormalized: string, awayTeamNormalized: string) {
    return homeTeamNormalized === awayTeamNormalized;
  }

  // checks if any team is already in play
  private isPlaying(homeTeamNormalized: string, awayTeamNormalized: string) {
    return (
      this.activeTeams.has(homeTeamNormalized) ||
      this.activeTeams.has(awayTeamNormalized)
    );
  }
}
