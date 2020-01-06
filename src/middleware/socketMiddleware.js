import * as types from 'constants/actionTypes'
import { joinGame } from 'actions/gameActions'

const socketMiddleware = (socket) => (store) => (next) => (action) => {
    switch (action.type) {
        case types.SOCKET_CONNECTED:
            store.dispatch(joinGame('default'))
            break
        case types.JOIN_GAME:
            socket.emit('message', action)
            break
        case types.TILE_CLICK:
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
