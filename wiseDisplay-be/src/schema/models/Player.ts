import { IPlayer } from "schema/blueprints/IGame";

export class Player implements IPlayer {
    private _id: string;
    private _teamId: string;
    private _headshot: string;
    private _position: string;
    private _shortName: string;
    private _jerseyNumber: string;

    constructor(data: IPlayer){
        this._id = data.id,
        this._teamId = data.teamId,
        this._headshot = data.headshot,
        this._position = data.position,
        this._shortName = data.shortName,
        this._jerseyNumber = data.jerseyNumber
    }

    public get id(): string {
        return this._id;
    }
    public get teamId(): string {
        return this._teamId;
    }
    public get headshot(): string {
        return this._headshot;
    }
    public get position(): string {
        return this._position;
    }
    public get shortName(): string {
        return this._shortName;
    }
    public get jerseyNumber(): string {
        return this._jerseyNumber;
    }
}