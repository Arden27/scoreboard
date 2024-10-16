import { ERROR_NEGATIVE_SCORE } from "./constants";

export class Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: number;

  constructor(homeTeam: string, awayTeam: string) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = 0;
    this.awayScore = 0;
    this.startTime = Date.now();
  }

  updateScore(newHomeScore: number, newAwayScore: number) {
    if (newHomeScore < 0 || newAwayScore < 0) {
      throw new Error(ERROR_NEGATIVE_SCORE);
    }
    
    this.homeScore = newHomeScore;
    this.awayScore = newAwayScore;
  }
}
