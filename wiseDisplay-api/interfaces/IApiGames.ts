import { IOdds, IPlayer, ITeam } from '../../wiseDisplay-be/src/schema/blueprints/IGame';
import { NFL_PLAY } from './IApiNFLPlay';

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
    odds: IOdds
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
    lastPlay?: IApiNFLPlay,
}

export interface IApiMLBInfo {
    inning: string,
    outs: number | null,
    strikes: number | null,
    balls: number | null,
    onFirst: boolean | null,
    onSecond: boolean | null,
    onThird: boolean | null,
    pitcher: IPlayer | null;
    batter: IPlayer | null;
    dueUp: IPlayer[] | null;
}

export interface IApiNFLPlay {
    type: NFL_PLAY;
    teamId: string;
}

export interface IApiNBAInfo {
    quarter: string
}

export interface IApiNHLInfo {
    period: string
}

export type IApiGameInfo = IApiMLBInfo | IApiNFLInfo | IApiNBAInfo | IApiNHLInfo;