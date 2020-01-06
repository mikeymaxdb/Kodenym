import React from 'react'
import { connect } from 'react-redux'

import { gameType } from 'types'
import { getGame } from 'selectors/game'

import Kodenym from 'components/Kodenym'

const KodenymContainer = ({ game }) => (
    <Kodenym game={game} />
)

KodenymContainer.defaultProps = {
    game: null,
}

KodenymContainer.propTypes = {
    game: gameType,
}

const mapStateToProps = (state) => ({
    game: getGame(state),
})
export default connect(mapStateToProps)(KodenymContainer)
