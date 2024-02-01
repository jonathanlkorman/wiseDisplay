import React, { FunctionComponent } from 'react';

import './board.css';
import SportsBoard from './SportsBoard/sportsBoard';

interface BoardProps {
    preferences: any
}

const Board: FunctionComponent<BoardProps> = ({ preferences }) => {
    return (
        <div className='board-wrapper'>
            <SportsBoard preferences={preferences} />
        </div>
    )
}

export default Board;