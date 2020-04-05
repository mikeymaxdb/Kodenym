import React from 'react'
import { connect } from 'react-redux'
import { bool, func, string } from 'prop-types'

import { scoreType } from 'types'

import {
    getSocketConnected,
    getHasGame,
    getIsSpymaster,
    getScore,
} from 'selectors/ui'
import { getGameId } from 'selectors/game'
import { toggleColors } from 'actions/uiActions'
import { newGame } from 'actions/gameActions'

import Header from 'components/Header'

const HeaderContainer = ({
    connected,
    hasGame,
    gameId,
    isSpymaster,
    score,
    onToggleColors,
    onNewGame,
}) => (
    <Header
        connected={connected}
        hasGame={hasGame}
        gameId={gameId}
        isSpymaster={isSpymaster}
        score={score}
        toggleColors={onToggleColors}
        newGame={onNewGame}
    />
)

HeaderContainer.defaultProps = {
    score: null,
}

HeaderContainer.propTypes = {
    connected: bool.isRequired,
    hasGame: bool.isRequired,
    gameId: string.isRequired,
    isSpymaster: bool.isRequired,
    score: scoreType,
    onToggleColors: func.isRequired,
    onNewGame: func.isRequired,
}

const mapStateToProps = (state) => ({
    connected: getSocketConnected(state),
    hasGame: getHasGame(state),
    gameId: getGameId(state),
    isSpymaster: getIsSpymaster(state),
    score: getScore(state),
})

const mapDispatchToProps = (dispatch) => ({
    onToggleColors: () => dispatch(toggleColors()),
    onNewGame: () => dispatch(newGame()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
