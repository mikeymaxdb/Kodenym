import { createStore, applyMiddleware, compose } from 'redux'
import io from 'socket.io-client'
import { createLogger } from 'redux-logger'

import createRootReducer from 'reducers'
import socketMiddleware from 'middleware/socketMiddleware'
import locationMiddleware from 'middleware/locationMiddleware'
import {
    socketConnected,
    socketDisconnected,
    socketMessageReceived,
} from 'actions/socketActions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const loggerMiddleware = createLogger()
console.debug('ENV', ENV)
const socket = (ENV === 'production' ? (
    io('//kodenym.beyondbox.net', { path: '/kodenymSocket' })
) : (
    io('http://localhost:8081', { path: '/kodenymSocket' }))
)

export default () => {
    const store = createStore(
        createRootReducer(),
        {},
        composeEnhancers(applyMiddleware(
            socketMiddleware(socket),
            locationMiddleware,
            loggerMiddleware,
        )),
    )

    socket.on('connect', () => store.dispatch(socketConnected()))
    socket.on('disconnect', () => store.dispatch(socketDisconnected()))
    socket.on('message', (message) => store.dispatch(socketMessageReceived(message)))

    return store
}
