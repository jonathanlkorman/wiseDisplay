import React, { FunctionComponent } from 'react';

import '../GameInfo/gameInfo.css';
import { IApiGame, IApiNFLInfo } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';
import NFLPossession from './nflPossession';


interface NFLInfoData {
    gameData: IApiGame;
}

const NFLInfo: FunctionComponent<NFLInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNFLInfo;

    return (
        <div className='game-info'>
            {gameData.detail !== 'Halftime' ? (
                <>
                    <span className='quarter'>{gameInfo.quarter}</span>
                    <span className='time'>{gameData.time}</span>
                    <span className='down-and-distance'>{gameInfo.down}</span>
                    <span className='spot'>{gameInfo.spot}</span>
                    <NFLPossession gameData={gameData} />
                </>
            ) : (
                <span className='quarter'>Half</span>
            )}

        </div>
    )
}

export default NFLInfo;