import * as types from 'constants/actionTypes'

const initialState = {
    gameId: '',
    tiles: [],
    settings: {
        columns: 5,
        rows: 5,
    },
}

const game = (state = initialState, action) => {
    switch (action.type) {
        case types.GAME_UPDATE:
            return action.gameData
        default:
            return state
    }
}

export default game
