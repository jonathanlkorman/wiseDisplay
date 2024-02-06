import React, { FunctionComponent } from 'react';

import '../GameInfo/gameInfo.css';
import { IApiGame, IApiNHLInfo } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface NHLInfoData {
    gameData: IApiGame;
}

const NHLInfo: FunctionComponent<NHLInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNHLInfo;
    return (
        <div className='game-info'>
            <span className='period'>{gameInfo.period}</span>
            <span className='time'>{gameData.time}</span>
        </div>
    )
}

export default NHLInfo;