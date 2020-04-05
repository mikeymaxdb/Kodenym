import React from 'react'
import { bool, func } from 'prop-types'
import classNames from 'classnames'

import { tilesType } from 'types'

require('./Tiles.scss')

const Tiles = ({ tiles, isSpymaster, onTileClick }) => (
    <div className={`Tiles ${isSpymaster ? 'colorsVisible' : 'colorsHidden'}`}>
        {tiles.map((tile, i) => (
            <div
                className="tile"
                key={tile.word}
            >
                <button
                    onClick={() => onTileClick(i)}
                    className={classNames(tile.status, tile.color)}
                    type="button"
                >
                    {tile.word}
                </button>
            </div>
        ))}
    </div>
)

Tiles.propTypes = {
    tiles: tilesType.isRequired,
    isSpymaster: bool.isRequired,
    onTileClick: func.isRequired,
}

export default Tiles
