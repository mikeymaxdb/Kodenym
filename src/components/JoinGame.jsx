import React, { useState } from 'react'
import { bool, func } from 'prop-types'

import generateUID from 'utils/generateUID'
import { JOIN_PROMPT, DESCRIPTION } from 'constants/strings'

require('./JoinGame.scss')

const JoinGame = ({ connected, joinGame }) => {
    const [gameId, setGameId] = useState(generateUID())

    return (
        <div className={`JoinGame ${connected ? 'connected' : ''}`}>
            <div className="loadingContainer">Loading...</div>
            <div className="joinContent">
                <img src="/img/kodenym_logo.svg" alt="kodenym logo" />
                <p>{JOIN_PROMPT}</p>
                <form>
                    <input
                        type="text"
                        name="gameId"
                        className="gameId"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Join Game"
                        className="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            joinGame(gameId)
                        }}
                    />
                </form>
                <p className="description">
                    {DESCRIPTION}
                </p>
            </div>
        </div>
    )
}

JoinGame.propTypes = {
    connected: bool.isRequired,
    joinGame: func.isRequired,
}

export default JoinGame
