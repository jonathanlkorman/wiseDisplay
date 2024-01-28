import React, { FunctionComponent } from 'react';

import '../../sportsBoard.css';
import { IApiGame, IApiNHLInfo } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface NHLInfoData {
    gameData: IApiGame;
}

const NHLInfo: FunctionComponent<NHLInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNHLInfo;
    return (
        <div className='game-info'>
            <p className='period'>{gameInfo.period}</p>
            <p className='time'>{gameData.time}</p>
        </div>
    )
}

export default NHLInfo;