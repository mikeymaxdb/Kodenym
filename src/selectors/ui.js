import { createSelector } from 'reselect'
import { getTiles } from 'selectors/game'

export const getSocketConnected = (state) => state.ui.socketConnected
export const getHasGame = (state) => state.ui.hasGame
export const getIsSpymaster = (state) => state.ui.isSpymaster

export const getScore = createSelector(
    getTiles,
    (tiles) => {
        if (!tiles || !tiles.length) {
            return null
        }

        return tiles.reduce((score, tile) => {
            const val = (tile.status === 'hidden' ? 1 : 0)
            return ({
                ...score,
                [tile.color]: (tile.color in score ? score[tile.color] + val : val),
            })
        }, {})
    },
)
