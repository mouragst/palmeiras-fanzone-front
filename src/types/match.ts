export interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    lastUpdated: string | null;
}

export interface Competition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
    lastUpdated: string | null;
}

export interface Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    competition: Competition;
    season: {
        id: number;
        startDate: string;
        endDate: string;
        winner: string | null;
        lastUpdated: string | null;
    };
    matchDate: string;
    status: string;
    homeScore: number;
    awayScore: number;
    lastUpdated: string;
    live: boolean;
}