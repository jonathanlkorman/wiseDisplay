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