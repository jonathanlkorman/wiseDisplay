export interface IGame {
    league: string,
    name: string,
    date: string,
    hometeam: ITeam,
    awayteam: ITeam,
    time: string,
    over: boolean,
    detail: string,
    halftime?: boolean | undefined,
    state: string,
    isLive: boolean,
    odds: IOdds;
}

export interface ITeam {
    teamShortName: string,
    teamFullName: string,
    id: string,
    score: number,
    color: string,
    logo: string,
    altcolor: string,
    record?: string,
}

export interface IOdds {
    details: string,
    overUnder: number,
    spread: number
}