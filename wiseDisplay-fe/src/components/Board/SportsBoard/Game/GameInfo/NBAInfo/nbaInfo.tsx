import React, { FunctionComponent } from 'react';

import '../gameInfo.css'
import { IApiGame, IApiNBAInfo } from '../../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface NBAInfoData {
    gameData: IApiGame;
}

const NBAInfo: FunctionComponent<NBAInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNBAInfo;
    return (
        <div className='game-info'>
            <span className='period'>{gameInfo.quarter}</span>
            <span className='time'>{gameData.time}</span>
        </div>
    )
}

export default NBAInfo;