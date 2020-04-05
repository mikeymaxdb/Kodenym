import { combineReducers } from 'redux'

import game from 'reducers/game'
import ui from 'reducers/ui'

export default () => combineReducers({
    game,
    ui,
})
