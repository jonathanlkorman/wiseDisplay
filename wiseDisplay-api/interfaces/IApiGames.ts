import { ITeam } from '../../wiseDisplay-be/src/schema/blueprints/IGame';

export interface IApiGames {
    preferredTeamsLive: boolean,
    filteredGames: IApiGame[],
}

export interface IApiGame {
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
    gameInfo: IApiGameInfo
}

export interface IApiNFLInfo {
    quarter: string,
    possession: string | null,
    redzone: boolean | null, 
    down: string | null, 
    spot: string | null,
    awayTimeouts: number | null, 
    homeTimeouts: number | null,
}

export interface IApiMLBInfo {
    inning: number,
    outs: number | null,
    strikes: number | null,
    balls: number | null,
    onFirst: boolean | null,
    onSecond: boolean | null,
    onThird: boolean | null,
}

export interface IApiNBAInfo {
    quarter: string
}

export interface IApiNHLInfo {
    period: string
}

export type IApiGameInfo = IApiMLBInfo | IApiNFLInfo | IApiNBAInfo | IApiNHLInfo;