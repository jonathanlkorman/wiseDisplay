import React from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import ThemedSkeleton from "../../../../Skeletons/themedSkeleton";

const GameLoadingScreen = () => {

    return (
        <div className="game-card">
            <div className="game-header">
                <ThemedSkeleton borderRadius='0.25rem' />
            </div>
            <div className="game-summary">
                <div className="game-matchup">
                    <TeamLoading />
                    <div className='game-info'>
                        <span className='game-day' style={{ width: '100%' }}>
                            <ThemedSkeleton borderRadius='0.25rem' height='8vw' />
                        </span>
                        <span className='game-time' style={{ width: '100%' }}>
                            <ThemedSkeleton borderRadius='0.25rem' height='8vw' />
                        </span>
                        <div className="gameOdds" style={{ marginBottom: '0.5%' }}>
                            <span className="oddsDetails" style={{ width: '20%', padding: '1rem' }}>
                                <ThemedSkeleton borderRadius='0.25rem' height='5vw' />
                            </span>
                            <span
                                style={{ width: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <ThemedSkeleton circle width={10} height={10} />
                            </span>
                            <span className="oddsOverUnder" style={{ width: '20%', padding: '1rem' }}>
                                <ThemedSkeleton borderRadius='0.25rem' height='5vw' />
                            </span>
                        </div>
                    </div>
                    <TeamLoading />
                </div>
            </div>
        </div>
    );
}

export default GameLoadingScreen;

const TeamLoading = () => {
    return (
        <div className='team' style={{ height: '80vh' }}>
            <div className="team-name-wrapper">
                <span className="team-name" style={{ width: '100%' }}>
                    <ThemedSkeleton borderRadius='0.25rem' height='11vw' width='18vw' />
                </span>
            </div>
            <div className="team-logo-wrapper" style={{ width: '100%' }}>
                <ThemedSkeleton borderRadius='0.25rem' width='18vw' height='18vw' />
            </div>
            <div className='teamRecordWrapper'>
                <span className="team-record" style={{ width: '100%' }}>
                    <ThemedSkeleton borderRadius='0.25rem' height='11vw' width='18vw' />
                </span>
            </div>
        </div>
    );
}