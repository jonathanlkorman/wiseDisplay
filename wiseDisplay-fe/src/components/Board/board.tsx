import React, { FunctionComponent } from 'react';

import './board.css';
import SportsBoard from './SportsBoard/sportsBoard';
import { useTheme } from '../../context/themeContext';

interface BoardProps {
    preferences: any
}

const Board: FunctionComponent<BoardProps> = ({ preferences }) => {
    const { theme } = useTheme();
    return (
        <div className={`board-wrapper ${theme}`}>
            <SportsBoard preferences={preferences} />
        </div>
    )
}

export default Board;