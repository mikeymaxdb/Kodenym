import * as types from 'constants/actionTypes'

// Game events
export const joinGame = (gameId) => ({
    type: types.JOIN_GAME,
    gameId,
})

export const tileClick = (tileIndex) => ({
    type: types.TILE_CLICK,
    tileIndex,
})

// Game actions
export const newGame = () => ({
    type: types.NEW_GAME,
})
