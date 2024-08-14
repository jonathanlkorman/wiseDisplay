import React, { FunctionComponent } from "react";

interface IPossessionIconProps {
    touchdown: boolean;
    fieldGoal: boolean;
    extraPoint: boolean;
    redzone: boolean;
    missedFieldGoal: boolean;
    missedExtraPoint: boolean

}

const NFLPossessionIcon: FunctionComponent<IPossessionIconProps> = ({ 
    touchdown, 
    fieldGoal, 
    extraPoint, 
    redzone,
    missedFieldGoal,
    missedExtraPoint

}) => {
    if (extraPoint) {
        return <span className="nfl-icon nfl-icon-points">XP</span>;
    } else if (missedExtraPoint) {
         return <span className="nfl-icon nfl-icon-points-missed">XP</span>;
    } else if (touchdown) {
         return <span className="nfl-icon nfl-icon-points">TD</span>;
    } else if (fieldGoal) {
        return <span className="nfl-icon nfl-icon-points">FG</span>;
    } else if (missedFieldGoal) {
        return <span className="nfl-icon nfl-icon-points-missed">FG</span>;
    } else if (redzone) {
        return <span className="nfl-icon nfl-icon-redzone">RZ</span>;
    } else {
        return <span className="nfl-icon nfl-icon-possession">--|--|--|--|--</span>;
    }
}

export default NFLPossessionIcon;