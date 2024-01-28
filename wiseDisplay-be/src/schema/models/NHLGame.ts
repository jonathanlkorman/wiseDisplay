import { INHLGame } from "../blueprints/INHLGame";
import { Game } from "./Game";

export class NHLGame extends Game implements INHLGame {
    private _period: number;

    constructor(data: INHLGame){
        super(data),
        this._period = data.period
    }

    public get period(): number {
        return this._period;
    }

    public get displayPeriod(): string {
        const ORDINAL = ['Pre', '1st', '2nd', '3rd', 'OT'];
        return ORDINAL[this.period];
    }

}