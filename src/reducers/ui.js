import * as types from 'constants/actionTypes'

const initialState = {
    isSpymaster: false,
    socketConnected: false,
    hasGame: false,
    settingsOpen: false,
}

const ui = (state = initialState, action) => {
    switch (action.type) {
        case types.SOCKET_CONNECTED:
            return {
                ...state,
                socketConnected: true,
            }
        case types.SOCKED_DISCONNECTED:
            return {
                ...state,
                socketConnected: false,
            }
        case types.GAME_UPDATE:
            return {
                ...state,
                hasGame: true,
            }
        case types.TOGGLE_COLORS:
            return {
                ...state,
                isSpymaster: !state.isSpymaster,
            }
        case types.GAME_NEW:
            return {
                ...state,
                isSpymaster: false,
            }
        case types.TOGGLE_SETTINGS:
            return {
                ...state,
                settingsOpen: !state.settingsOpen,
            }
        default:
            return state
    }
}

export default ui
