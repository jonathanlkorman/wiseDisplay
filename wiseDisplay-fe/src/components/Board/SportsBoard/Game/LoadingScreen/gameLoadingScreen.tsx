import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const GameLoadingScreen = () => {

    return (
        <div className="gameCard">
            <div className="gameHeader">
                <Skeleton borderRadius='0.25rem' />
            </div>
            <div className="gameSummary">
                <div className="gameMatchup">
                    <TeamLoading />
                    <div className='game-info'>
                        <span className='game-day' style={{width: '80%'}}>{<Skeleton borderRadius='0.25rem' height='12vw'/>}</span>
                        <span className='game-time' style={{width: '70%'}}>{<Skeleton borderRadius='0.25rem' height='10vw'/>}</span>
                    </div>
                    <TeamLoading />
                </div>
                <div className="gameOdds" style={{marginBottom: '0.5%'}}>
                    <span className="oddsDetails" style={{width: '20%'}}>{<Skeleton borderRadius='0.25rem' height='5vw'/>}</span>
                    <span 
                        style={{width: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Skeleton circle width={10} height={10}/>
                    </span>
                    <span className="oddsOverUnder" style={{width: '20%'}}>{<Skeleton borderRadius='0.25rem' height='5vw'/>}</span>
                </div>
            </div>
        </div>
    );
}

export default GameLoadingScreen;

const TeamLoading = () => {
    return (
        <div className='teamWrapper'>
            <div className='team' style={{width: '100%'}}>
                <div className="teamLogoWrapper" style={{width: '100%'}}>
                    <Skeleton borderRadius='0.25rem' width='25vw' height='25vw'/>
                </div>
                <div className="teamInfoWrapper" style={{width: '100%'}}>
                    <div className="teamNameWrapper">
                        <span className="teamName" style={{width: '100%'}}>{<Skeleton borderRadius='0.25rem' height='11vw' width='60%'/>}</span>
                    </div>
                    <div className='teamRecordWrapper'>
                        <span className="teamRecord" style={{width: '100%'}}>{<Skeleton borderRadius='0.25rem' height='7vw' width='50%'/>}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}