import React, { useEffect, useState } from 'react';

import './homepage.css';
import Board from '../Board/board';
import { useLocalStorage } from '../DataStore/localstorage';
import PreferencesModal from '../PreferencesModal/preferencesModal';


const HomePage = () => {

    const [preferences, setPreferences] = useLocalStorage("preferences", {
        liveOnly: false,
        favTeamsOnly: false,
        favTeams: [],
        leagues: [],
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (preferences.leagues?.length === 0 &&
            preferences.favTeams?.length === 0
        ) {
            setShowModal(true);
        }
    }, [preferences]);

    return (
        <div className='home-page-wrapper'>
            {showModal 
            ?
                <PreferencesModal
                    preferences={preferences}
                    setPreferences={setPreferences}
                    setShowModal={setShowModal}
                />
            :   
                <Board preferences={preferences} />
            }
        </div>
    )

}


export default HomePage;