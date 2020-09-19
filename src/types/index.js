import {
    arrayOf,
    number,
    shape,
    string,
} from 'prop-types'

export const tileType = shape({
    word: string.isRequired,
    status: string.isRequired,
    color: string.isRequired,
})

export const tilesType = arrayOf(tileType)

export const settingsType = shape({
    columns: number.isRequired,
    rows: number.isRequired,
})

export const gameType = shape({
    gameId: string,
    tiles: tilesType,
    settings: settingsType,
})

export const scoreType = shape({
    red: number.isRequired,
    blue: number.isRequired,
})
