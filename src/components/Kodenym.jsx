import React from 'react'
import { bool } from 'prop-types'

import TilesContainer from 'containers/TilesContainer'
import JoinGameContainer from 'containers/JoinGameContainer'
import HeaderContainer from 'containers/HeaderContainer'

import Footer from 'components/Footer'

require('./Kodenym.scss')

const Kodenym = ({ hasGame }) => (
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
    </div>
)

Kodenym.propTypes = {
    hasGame: bool.isRequired,
}

export default Kodenym
