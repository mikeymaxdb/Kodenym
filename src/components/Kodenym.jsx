import React from 'react'

import { gameType } from 'types'

import TilesContainer from 'containers/TilesContainer'

require('./Kodenym.scss')

const Kodenym = ({ game }) => (
    <div className="Kodenym">
        {game.gameId}
        <TilesContainer />
    </div>
)

Kodenym.defaultProps = {
    game: null,
}

Kodenym.propTypes = {
    game: gameType,
}

export default Kodenym
