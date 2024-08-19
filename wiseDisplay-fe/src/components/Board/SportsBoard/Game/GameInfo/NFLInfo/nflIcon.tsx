import React, { FunctionComponent } from "react";

import { useNFLIconBtn } from "./useNFLIconBtn";


const NFLIcon: FunctionComponent<any> = ({ gameData }) => {
    const btnType = useNFLIconBtn(gameData);

    if(!btnType) {
        return null;
    }
    
    const { text, wrapperClassName, iconClassName } = btnType;

    return (
        <span className={`nfl-icon-wrapper ${wrapperClassName}`}>
            <span className={`nfl-icon ${iconClassName}`}>{text}</span>
        </span>
    );
}

export default NFLIcon;