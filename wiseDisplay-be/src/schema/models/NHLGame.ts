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

}