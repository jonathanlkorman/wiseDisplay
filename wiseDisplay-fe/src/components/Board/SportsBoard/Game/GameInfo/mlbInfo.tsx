import React, { FunctionComponent } from 'react';

import '../../sportsBoard.css';
import { IApiGame, IApiMLBInfo } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface MLBInfoData {
    gameData: IApiGame;
}

const MLBInfo: FunctionComponent<MLBInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiMLBInfo;
    return (
        <div className='game-info'>
           
        </div>
    )
}

export default MLBInfo;