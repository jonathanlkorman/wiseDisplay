import React, { FunctionComponent } from 'react';

import '../GameInfo/gameInfo.css';
import { IApiGame, IApiNFLInfo } from '../../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface NFLInfoData {
    gameData: IApiGame;
}

const NFLInfo: FunctionComponent<NFLInfoData> = ({ gameData }) => {
    const gameInfo = gameData.gameInfo as IApiNFLInfo;
    const homePossession = gameInfo.possession === gameData.hometeam.teamShortName;
    const awayPossession = gameInfo.possession === gameData.awayteam.teamShortName;

    const styles = {
        backgroundColor: '#ff5256',
        fontSize: '2rem',
        borderRadius: '8px',
        letterSpacing: 'normal'
    };

    return (
        <div className='game-info'>
            {gameData.detail !== 'Halftime' ? (
                <>
                    <span className='quarter'>{gameInfo.quarter}</span>
                    <span className='time'>{gameData.time}</span>
                    <span className='down-and-distance'>{gameInfo.down}</span>
                    <span className='spot'>{gameInfo.spot}</span>
                    {(homePossession || awayPossession) &&
                        <span className={`possession possession-${homePossession ? `home` : `away`}`}>
                            <span className='possession-icon' style={gameInfo.redzone ? styles : {}}>
                                {gameInfo.redzone ? "RZ" : "--|--|--|--|--"}
                            </span>
                        </span>
                    }

                </>
            ) : (
                <span className='quarter'>Half</span>
            )}

        </div>
    )
}

export default NFLInfo;