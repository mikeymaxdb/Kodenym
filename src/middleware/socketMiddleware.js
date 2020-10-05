import * as types from 'constants/actionTypes'
import { joinGame } from 'actions/gameActions'
import { getGameId } from 'selectors/game'
import { getHashGameId } from 'selectors/location'

const socketMiddleware = (socket) => (store) => (next) => (action) => {
    switch (action.type) {
        case types.SOCKET_CONNECTED: {
            const gameId = getGameId(store.getState()) || getHashGameId()
            if (gameId) {
                store.dispatch(joinGame(gameId))
            }
            break
        }
        case types.JOIN_GAME:
        case types.TILE_CLICK:
        case types.NEW_GAME:
        case types.UPDATE_SETTINGS:
            socket.emit('message', action)
            break
        case types.SOCKET_MESSAGE:
            return next(action.message)
        default:
            break
    }
    return next(action)
}
export default socketMiddleware
