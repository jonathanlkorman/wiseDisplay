import React, { FunctionComponent } from 'react';

import '../../sportsBoard.css';
import { IApiGame, IApiNBAInfo } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface NBAInfoData {
    gameData: IApiGame;
}

const NBAInfo: FunctionComponent<NBAInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNBAInfo;
    return (
        <div className='game-info'>
            <p className='period'>{gameInfo.quarter}</p>
            <p className='time'>{gameData.time}</p>
        </div>
    )
}

export default NBAInfo;