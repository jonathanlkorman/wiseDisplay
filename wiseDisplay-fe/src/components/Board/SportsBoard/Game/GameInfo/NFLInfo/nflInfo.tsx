import React, { FunctionComponent } from 'react';

import '../gameInfo.css'
import { IApiGame, IApiNFLInfo } from '../../../../../../../../wiseDisplay-api/interfaces/IApiGames';
import NFLPossession from './nflPossession';
import Timeouts from './timeouts';



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
                    <Timeouts team='home' timeouts={Number(gameInfo.homeTimeouts)} />
                    <Timeouts team='away' timeouts={Number(gameInfo.awayTimeouts)} />
                </>
            ) : (
                <span className='quarter'>Half</span>
            )}

        </div>
    )
}

export default NFLInfo;