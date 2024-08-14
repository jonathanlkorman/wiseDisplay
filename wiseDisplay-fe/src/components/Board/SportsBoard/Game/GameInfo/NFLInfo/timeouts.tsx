import React, { FunctionComponent } from "react";

interface ITimeoutProps {
    timeouts: number
    team: string;
}

const Timeouts: FunctionComponent<ITimeoutProps> = ({ team, timeouts }) => {
    return (
        <div className={`timeouts timeouts-${team}`}>
            {[...Array(timeouts)].map((_, index) => (
                <span key={index} className='timeout'></span>
            ))}
        </div>
    );
}

export default Timeouts;