import React, { FunctionComponent } from 'react';

import empty from '../../../../../../assets/empty.svg'
import first from '../../../../../../assets/first.svg'
import second from '../../../../../../assets/second.svg'
import third from '../../../../../../assets/third.svg'
import firstSecond from '../../../../../../assets/first_second.svg'
import secondThird from '../../../../../../assets/second_third.svg'
import firstThird from '../../../../../../assets/first_third.svg'
import loaded from '../../../../../../assets/loaded.svg'

import '../gameInfo.css'
import { IApiGame, IApiMLBInfo } from '../../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface MLBInfoData {
    gameData: IApiGame;
}

const MLBInfo: FunctionComponent<MLBInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiMLBInfo;

    const getBase = () => {
        if (gameInfo.onFirst && gameInfo.onSecond && gameInfo.onThird)
            return loaded;
        else if (gameInfo.onFirst && gameInfo.onSecond && !gameInfo.onThird)
            return firstSecond;
        else if (gameInfo.onFirst && !gameInfo.onSecond && gameInfo.onThird)
            return firstThird;
        else if (!gameInfo.onFirst && gameInfo.onSecond && gameInfo.onThird)
            return secondThird;
        else if (!gameInfo.onFirst && !gameInfo.onSecond && gameInfo.onThird)
            return third;
        else if (!gameInfo.onFirst && gameInfo.onSecond && !gameInfo.onThird)
            return second;
        else if (gameInfo.onFirst && !gameInfo.onSecond && !gameInfo.onThird)
            return first;
        else
            return empty;
    }

    return (
        <div className='game-info'>
            <span className='inning'>{gameInfo.inning}</span>
            {gameInfo.dueUp && <span className='dueUpHeader'>Due Up</span>}
            {gameInfo.dueUp ?
                <div className='dueUp'>
                    {gameInfo.dueUp.map(player => (
                        <span className='dueUpItem'>{player.shortName}</span>
                    ))}
                </div>
                :
                <>
                    <img className='bases' src={getBase()} alt='bases' />
                    <span className='count'>{`${gameInfo.balls} - ${gameInfo.strikes}`}</span>
                    <div className='outs'>
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className='out'
                                style={{ backgroundColor: !!gameInfo.outs && gameInfo.outs > index ? '#000000' : 'none' }}
                            ></div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default MLBInfo;