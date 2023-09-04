import { INBAGame } from "../blueprints/INBAGame";
import { Game } from "./Game";

export class NBAGame extends Game implements INBAGame {
    private _quarter: number;

    constructor(data: INBAGame){
        super(data),
        this._quarter = data.quarter
    }

    public get quarter(): number {
        return this._quarter;
    }

}