import React from 'react'
import { bool, func, string } from 'prop-types'

import { scoreType } from 'types'

require('./Header.scss')

const Header = ({
    connected,
    hasGame,
    gameId,
    isSpymaster,
    score,
    toggleColors,
    newGame,
}) => (
    <div className={`Header ${hasGame ? 'hasGame' : ''}`}>
        <div className={`connectionContainer ${!connected ? 'disconnected' : ''}`}>
            <div className="connection">
                disconnected from game server
            </div>
        </div>
        <div className="inner">
            <div className="logo">
                <a href="/">
                    <img src="/img/kodenym_logo.svg" alt="kodenym logo" />
                </a>
            </div>
            {score ? (
                <div className="score">
                    <div className="red">{score.red}</div>
                    {gameId}
                    <div className="blue">{score.blue}</div>
                </div>
            ) : null}
            <div className="buttons">
                <button type="button" onClick={newGame}>New tiles</button>
                <button type="button" onClick={toggleColors}>{isSpymaster ? 'Spy' : 'Spymaster'}</button>
            </div>
        </div>
    </div>
)

Header.defaultProps = {
    score: null,
}

Header.propTypes = {
    connected: bool.isRequired,
    hasGame: bool.isRequired,
    gameId: string.isRequired,
    isSpymaster: bool.isRequired,
    score: scoreType,
    toggleColors: func.isRequired,
    newGame: func.isRequired,
}

export default Header
