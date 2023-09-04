import { IGame } from "../blueprints/IGame";

export interface INFLGame extends IGame {
    quarter: number,
    possession?: string | null,
    redzone?: boolean | null, 
    down?: string | null, 
    spot?: string | null,
    awayTimeouts: number | null, 
    homeTimeouts: number | null,
}