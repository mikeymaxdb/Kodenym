import React from 'react'
import { connect } from 'react-redux'
import { bool, func } from 'prop-types'

import { joinGame } from 'actions/gameActions'

import { getSocketConnected } from 'selectors/ui'

import JoinGame from 'components/JoinGame'

const JoinGameContainer = ({ connected, onJoinGame }) => (
    <JoinGame joinGame={onJoinGame} connected={connected} />
)

JoinGameContainer.propTypes = {
    connected: bool.isRequired,
    onJoinGame: func.isRequired,
}

const mapStateToProps = (state) => ({
    connected: getSocketConnected(state),
})

const mapDispatchToProps = (dispatch) => ({
    onJoinGame: (gameId) => dispatch(joinGame(gameId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGameContainer)
