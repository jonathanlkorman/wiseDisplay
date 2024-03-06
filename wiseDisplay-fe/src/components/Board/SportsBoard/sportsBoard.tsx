import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import Game from './Game/game';
import GameLoadingScreen from './Game/LoadingScreen/gameLoadingScreen';
import useFetchGameData from '../../../hooks/useFetchGameData';

interface SportsBoardProps {
	preferences: any
}

const SportsBoard: FunctionComponent<SportsBoardProps> = ({ preferences }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { gameData, loading, fetchGameData } = useFetchGameData(preferences); // 
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const startInterval = () => {
			intervalRef.current = setInterval(() => {
				setCurrentIndex((prevIndex) => {
					const nextIndex = (prevIndex + 1) % gameData.filteredGames.length;
					if (nextIndex === 0) {
						fetchGameData();
					}
					return nextIndex;
				});
			}, 10000);
		};

		const stopInterval = () => {
			if (intervalRef.current !== null) {
				clearInterval(intervalRef.current as NodeJS.Timeout);
			}
		};

		fetchGameData();

		if (gameData.filteredGames.length > 0 && !loading) {
			startInterval();
		}

		return () => {
			stopInterval();
		};
	}, [fetchGameData, gameData.filteredGames.length, loading]);

	if (loading) {
		return <GameLoadingScreen />
	} else if (gameData.filteredGames.length <= 0) {
		return <p className='no-data'>No Games</p>;
	} else {
		return <Game gameData={gameData.filteredGames[currentIndex]} />;
	}
};

export default SportsBoard;

