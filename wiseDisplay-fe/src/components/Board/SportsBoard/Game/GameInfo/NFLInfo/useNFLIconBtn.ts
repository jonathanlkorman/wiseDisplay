import { IApiGame, IApiNFLInfo } from "../../../../../../../../wiseDisplay-api/interfaces/IApiGames";

export interface BtnType {
    text: string;
    iconClassName: string;
    wrapperClassName: string;

}

export enum NFL_PLAY {
    TOUCHDOWN = "TOUCHDOWN",
    FIELD_GOAL_GOOD = "FIELD_GOAL_GOOD",
    FIELD_GOAL_MISSED = "FIELD_GOAL_MISSED",
    EXTRA_POINT_GOOD = "EXTRA_POINT_GOOD",
    EXTRA_POINT_MISSED = "EXTRA_POINT_MISSED",
    SAFETY = "SAFETY",

}

export function useNFLIconBtn(gameData: IApiGame): BtnType | null {
    const gameInfo = gameData.gameInfo as IApiNFLInfo;
    const { lastPlay, redzone, possession } = gameInfo;
    const teamId = lastPlay?.teamId ? lastPlay.teamId : possession;
    const isHomeTeam = teamId === gameData.hometeam.id;
    const wrapperClassName = isHomeTeam ? "home" : "away";


    const playTypes: Record<NFL_PLAY, BtnType> = {
        [NFL_PLAY.TOUCHDOWN]: { text: "TD", iconClassName: "points", wrapperClassName },
        [NFL_PLAY.EXTRA_POINT_GOOD]: { text: "XP", iconClassName: "points", wrapperClassName },
        [NFL_PLAY.FIELD_GOAL_GOOD]: { text: "FG", iconClassName: "points", wrapperClassName },
        [NFL_PLAY.EXTRA_POINT_MISSED]: { text: "XP", iconClassName: "points-missed", wrapperClassName },
        [NFL_PLAY.FIELD_GOAL_MISSED]: { text: "FG", iconClassName: "points-missed", wrapperClassName },
        [NFL_PLAY.SAFETY]: { text: "SAF", iconClassName: "points", wrapperClassName },
    };

    if (lastPlay?.type !== undefined && lastPlay.type in playTypes) {
        return playTypes[lastPlay.type];
    } else if (redzone) {
        return { text: "RZ", iconClassName: "redzone", wrapperClassName };
    } else if (possession) {
        return { text: "--|--|--|--", iconClassName: "possession", wrapperClassName };
    } else {
        return null;
    }
}