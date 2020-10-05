import React from 'react'
import { bool } from 'prop-types'

import TilesContainer from 'containers/TilesContainer'
import JoinGameContainer from 'containers/JoinGameContainer'
import HeaderContainer from 'containers/HeaderContainer'
import SettingsContainer from 'containers/SettingsContainer'

import Footer from 'components/Footer'

require('./Kodenym.scss')

const Kodenym = ({ hasGame, settingsOpen }) => (
    <div className="Kodenym">
        <HeaderContainer />
        <div className="gameplayContainer">
            {hasGame ? (
                <TilesContainer />
            ) : (
                <JoinGameContainer />
            )}
        </div>
        <Footer />
        {hasGame && settingsOpen ? (
            <SettingsContainer />
        ) : null}
    </div>
)

Kodenym.propTypes = {
    hasGame: bool.isRequired,
    settingsOpen: bool.isRequired,
}

export default Kodenym
