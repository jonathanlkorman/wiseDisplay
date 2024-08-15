import React, { FunctionComponent } from "react";
import { useTheme } from "../../../../../../context/themeContext";

interface ITimeoutProps {
    timeouts: number
    team: string;
}

const Timeouts: FunctionComponent<ITimeoutProps> = ({ team, timeouts }) => {
    const { theme } = useTheme();
    return (
        <div className={`timeouts timeouts-${team}`}>
            {[...Array(timeouts)].map((_, index) => (
                <span key={index} className={`timeout ${theme}`}></span>
            ))}
        </div>
    );
}

export default Timeouts;