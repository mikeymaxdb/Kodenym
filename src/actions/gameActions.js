import * as types from 'constants/actionTypes'

export const joinGame = (gameId) => ({
    type: types.JOIN_GAME,
    gameId,
    settings: {
        columns: 5,
        rows: 5,
    },
})

export const tileClick = (tileIndex) => ({
    type: types.TILE_CLICK,
    tileIndex,
})
