import type { Competition } from "./competition";
import type { Team } from "./match";

export interface Standing {
  id: number;
  competition: Competition;
  team: Team;
  position: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  lastUpdated: string;
  groupName: string | null;
}