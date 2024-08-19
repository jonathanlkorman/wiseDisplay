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
}

export enum ESPN_NFL_PLAY {
    PASSING_TOUCHDOWN = "63",
    RUSHING_TOUCHDOWN = "68",
    INTERCEPTION_RETURN_TOUCHDOWN = "36",
    FIELD_GOAL_GOOD = "59",
    FIELD_GOAL_MISSED = "60",
    EXTRA_POINT_GOOD = "61",
    EXTRA_POINT_MISSED = "62",
    SAFETY = "20",

}

export enum NFL_PLAY {
    TOUCHDOWN = "TOUCHDOWN",
    FIELD_GOAL_GOOD = "FIELD_GOAL_GOOD",
    FIELD_GOAL_MISSED = "FIELD_GOAL_MISSED",
    EXTRA_POINT_GOOD = "EXTRA_POINT_GOOD",
    EXTRA_POINT_MISSED = "EXTRA_POINT_MISSED",
    SAFETY = "SAFETY",

}