import { IOdds } from "schema/blueprints/IGame";

export class Odds implements IOdds {
    private _details: string;
    private _overUnder: number;
    private _spread: number;

    constructor(data: IOdds){
        this._details = data.details,
        this._overUnder = data.overUnder,
        this._spread = data.spread
    }

    public get details(): string {
        return this._details;
    }
    public get overUnder(): number {
        return this._overUnder;
    }
    public get spread(): number {
        return this._spread;
    }
}