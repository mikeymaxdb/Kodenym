import * as types from 'constants/actionTypes'

export const socketConnected = () => ({
    type: types.SOCKET_CONNECTED,
})

export const socketDisconnected = () => ({
    type: types.SOCKED_DISCONNECTED,
})

export const socketMessageReceived = (message) => ({
    type: types.SOCKET_MESSAGE,
    message,
})
