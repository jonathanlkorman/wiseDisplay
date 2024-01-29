import React, { FunctionComponent } from 'react';

import '../../sportsBoard.css';
import { IApiGame, IApiNFLInfo } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface NFLInfoData {
    gameData: IApiGame;
}

const NFLInfo: FunctionComponent<NFLInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNFLInfo;
    return (
        <div className='game-info'>
            {gameData.detail !== 'Halftime'? (
                <>
                    <p className='quarter'>{gameInfo.quarter}</p>
                    <p className='time'>{gameData.time}</p>
                    <p className='down-and-distance'>{gameInfo.down?.replace('&', '+')}</p>
                    <p className='spot'>{gameInfo.spot}</p>
                </>
            ) : (
                <p className='quarter'>Half</p>
            )}
            
        </div>
    )
}

export default NFLInfo;