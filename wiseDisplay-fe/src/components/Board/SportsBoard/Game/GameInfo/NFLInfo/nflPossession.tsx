import React, { FunctionComponent } from "react";

import { IApiGame, IApiNFLInfo } from "../../../../../../../../wiseDisplay-api/interfaces/IApiGames";
import NFLPossessionIcon from "./nflPossessionIcon";

interface IPossessionProps {
    gameData: IApiGame;
}

const NFLPossession: FunctionComponent<IPossessionProps> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNFLInfo;
    const homePossession = gameInfo.possession === gameData.hometeam.id;
    const awayPossession = gameInfo.possession === gameData.awayteam.id;

    if (homePossession || awayPossession) {
        return (
            <span className={`possession possession-${homePossession ? `home` : `away`}`}>
                <NFLPossessionIcon
                    //TODO Add data to API
                    touchdown={false}
                    fieldGoal={false}
                    extraPoint={false}
                    redzone={!!gameInfo.redzone}
                    missedExtraPoint={false}
                    missedFieldGoal={false}
                />
            </span>
        );
    } else {
        return null;
    }
}

export default NFLPossession;