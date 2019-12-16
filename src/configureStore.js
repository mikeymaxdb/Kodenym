import { createStore, applyMiddleware, compose } from 'redux'
import io from 'socket.io-client'
import { createLogger } from 'redux-logger'

import createRootReducer from 'reducers'
import socketMiddleware from 'middleware/socketMiddleware'
import { socketConnected, socketMessageReceived } from 'actions/socketActions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const loggerMiddleware = createLogger()
const socket = io('http://localhost:8081')

export default () => {
    const store = createStore(
        createRootReducer(),
        {},
        composeEnhancers(applyMiddleware(
            socketMiddleware(socket),
            loggerMiddleware,
        )),
    )

    socket.on('connect', () => store.dispatch(socketConnected()))
    socket.on('message', (message) => store.dispatch(socketMessageReceived(message)))

    return store
}
