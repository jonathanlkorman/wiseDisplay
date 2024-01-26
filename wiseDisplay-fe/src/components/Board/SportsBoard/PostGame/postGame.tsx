import React, { FunctionComponent } from 'react';

import '../sportsBoard.css';
import { IApiGame } from '../../../../../../wiseDisplay-api/interfaces/IApiGames';


interface PostGameData {
    gameData: IApiGame;
}

const PostGame: FunctionComponent<PostGameData> = ({ gameData }) => {

    return (
        <>
            <div className='game-info'>
                <p className='game-status'>{gameData.detail}</p>
                <p className='game-day'>{gameData.date.day}</p>
            </div>
            <div className='matchup-info'>
                <div className='away-team' style={{ backgroundColor: `#${gameData.awayteam.altcolor}` }}>
                    <img className='team-logo' src={gameData.awayteam.logo} alt='away-team-logo' />
                    <div className='team-info'>
                        <p className='team-name'>{gameData.awayteam.teamShortName}</p>
                        <p className='score'>{gameData.awayteam.score}</p>
                    </div>
                </div>
                <div className='home-team' style={{ backgroundColor: `#${gameData.hometeam.color}` }}>
                    <img className='team-logo' src={gameData.hometeam.logo} alt='home-team-logo' />
                    <div className='team-info'>
                        <p className='team-name'>{gameData.hometeam.teamShortName}</p>
                        <p className='score'>{gameData.hometeam.score}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostGame;