import React, { FunctionComponent } from 'react';

import empty from '../../../../../../assets/empty.svg'
import first from '../../../../../../assets/first.svg'
import second from '../../../../../../assets/second.svg'
import third from '../../../../../../assets/third.svg'
import firstSecond from '../../../../../../assets/first_second.svg'
import secondThird from '../../../../../../assets/second_third.svg'
import firstThird from '../../../../../../assets/first_third.svg'
import loaded from '../../../../../../assets/loaded.svg'

import darkEmpty from '../../../../../../assets/dark_empty.svg'
import darkFirst from '../../../../../../assets/dark_first.svg'
import darkSecond from '../../../../../../assets/dark_second.svg'
import darkThird from '../../../../../../assets/dark_third.svg'
import darkFirstSecond from '../../../../../../assets/dark_first_second.svg'
import darkSecondThird from '../../../../../../assets/dark_second_third.svg'
import darkFirstThird from '../../../../../../assets/dark_first_third.svg'
import darkLoaded from '../../../../../../assets/dark_loaded.svg'

import '../gameInfo.css'
import { IApiGame, IApiMLBInfo } from '../../../../../../../../wiseDisplay-api/interfaces/IApiGames';
import { useTheme } from '../../../../../../context/themeContext';


interface MLBInfoData {
    gameData: IApiGame;
}

const MLBInfo: FunctionComponent<MLBInfoData> = ({ gameData }) => {
    const { theme } = useTheme();
    const dark = theme === 'dark';
    const gameInfo = gameData.gameInfo as IApiMLBInfo;

    const getBase = () => {
        if (gameInfo.onFirst && gameInfo.onSecond && gameInfo.onThird)
            return dark ? darkLoaded : loaded;
        else if (gameInfo.onFirst && gameInfo.onSecond && !gameInfo.onThird)
            return dark ? darkFirstSecond : firstSecond;
        else if (gameInfo.onFirst && !gameInfo.onSecond && gameInfo.onThird)
            return dark ? darkFirstThird : firstThird;
        else if (!gameInfo.onFirst && gameInfo.onSecond && gameInfo.onThird)
            return dark ? darkSecondThird : secondThird;
        else if (!gameInfo.onFirst && !gameInfo.onSecond && gameInfo.onThird)
            return dark ? darkThird : third;
        else if (!gameInfo.onFirst && gameInfo.onSecond && !gameInfo.onThird)
            return dark ? darkSecond : second;
        else if (gameInfo.onFirst && !gameInfo.onSecond && !gameInfo.onThird)
            return dark ? darkFirst : first;
        else
            return dark ? darkEmpty : empty;
    }

    return (
        <div className='game-info'>
            <span className='inning'>{gameInfo.inning}</span>
            {gameInfo.dueUp ?
                <div className='dueUp'>
                    <span className='dueUpHeader'>Due Up</span>
                    {gameInfo.dueUp.map(player => (
                        <span className='dueUpItem'>{player.shortName}</span>
                    ))}
                </div>
                :
                <>
                    <img className='bases' src={getBase()} alt='bases' />
                    <span className='count'>{`${gameInfo.balls} - ${gameInfo.strikes}`}</span>
                    <span className='outs'>{`${gameInfo.outs} out${gameInfo.outs !== 1 ? 's' : ''}`}</span>
                    
                </>
            }
        </div>
    )
}

export default MLBInfo;