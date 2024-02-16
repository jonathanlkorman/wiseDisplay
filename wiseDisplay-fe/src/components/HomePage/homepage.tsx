import React, { useEffect, useState } from 'react';

import './homepage.css';
import Board from '../Board/board';
import { useLocalStorage } from '../DataStore/localstorage';
import PreferencesModal from '../PreferencesModal/preferencesModal';
import { BsThreeDotsVertical } from 'react-icons/bs';


const HomePage = () => {

    const [preferences, setPreferences] = useLocalStorage("preferences", {
        liveOnly: false,
        favTeamsOnly: false,
        favTeams: [],
        leagues: [],
        dailyOnly: false
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
            <BsThreeDotsVertical className='pref' onClick={() => setShowModal(true)} />
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