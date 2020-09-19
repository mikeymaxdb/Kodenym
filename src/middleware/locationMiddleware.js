import * as types from 'constants/actionTypes'
import { getGameId } from 'selectors/game'

const locationMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case types.GAME_UPDATE: {
            const result = next(action)
            window.history.pushState(null, null, `#${getGameId(store.getState())}`)
            return result
        }
        default:
            return next(action)
    }
}

export default locationMiddleware
