import { IGame } from "../blueprints/IGame";

export interface INFLGame extends IGame {
    quarter: number,
    possession?: string | null,
    redzone?: boolean | null,
    down?: string | null,
    spot?: string | null,
    awayTimeouts: number | null,
    homeTimeouts: number | null,
    lastPlayId?: string;
    lastPlayTeamId?: string;
    lastPlayScoreValue?: number;
}

export enum ESPN_NFL_PLAY {
    PASSING_TOUCHDOWN = "63",
    RUSHING_TOUCHDOWN = "68",
    INTERCEPTION_RETURN_TOUCHDOWN = "36",
    FIELD_GOAL_GOOD = "59",
    FIELD_GOAL_MISSED = "60",
    EXTRA_POINT_GOOD = "61",
    EXTRA_POINT_MISSED = "62",
    TWO_POINT_PASS = "15",
    TWO_POINT_RUSH = '16',
    SAFETY = "20",

}

export enum NFL_PLAY {
    TOUCHDOWN = "TOUCHDOWN",
    FIELD_GOAL_GOOD = "FIELD_GOAL_GOOD",
    FIELD_GOAL_MISSED = "FIELD_GOAL_MISSED",
    EXTRA_POINT_GOOD = "EXTRA_POINT_GOOD",
    EXTRA_POINT_MISSED = "EXTRA_POINT_MISSED",
    TWO_POINT_GOOD = "TWO_POINT_GOOD",
    TWO_POINT_MISS = "TWO_POINT_MISS",
    SAFETY = "SAFETY",

}

export const playMappings: Partial<Record<ESPN_NFL_PLAY, NFL_PLAY>> = {
    [ESPN_NFL_PLAY.PASSING_TOUCHDOWN]: NFL_PLAY.TOUCHDOWN,
    [ESPN_NFL_PLAY.RUSHING_TOUCHDOWN]: NFL_PLAY.TOUCHDOWN,
    [ESPN_NFL_PLAY.INTERCEPTION_RETURN_TOUCHDOWN]: NFL_PLAY.TOUCHDOWN,
    [ESPN_NFL_PLAY.EXTRA_POINT_GOOD]: NFL_PLAY.EXTRA_POINT_GOOD,
    [ESPN_NFL_PLAY.EXTRA_POINT_MISSED]: NFL_PLAY.EXTRA_POINT_MISSED,
    [ESPN_NFL_PLAY.FIELD_GOAL_GOOD]: NFL_PLAY.FIELD_GOAL_GOOD,
    [ESPN_NFL_PLAY.FIELD_GOAL_MISSED]: NFL_PLAY.FIELD_GOAL_MISSED,
    [ESPN_NFL_PLAY.SAFETY]: NFL_PLAY.SAFETY,
};