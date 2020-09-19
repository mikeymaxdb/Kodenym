import React from 'react'
import { bool, func } from 'prop-types'
import classNames from 'classnames'

import { tilesType } from 'types'

require('./Tiles.scss')

const Tiles = ({ tiles, isSpymaster, onTileClick }) => (
    <div className={`Tiles ${isSpymaster ? 'colorsVisible' : 'colorsHidden'}`}>
        <div className="tilesContainer">
            {tiles.map((tile, index) => (
                <button
                    onClick={() => onTileClick(index)}
                    className={classNames('tile', tile.status, tile.color)}
                    key={tile.word}
                    type="button"
                >
                    {tile.word}
                </button>
            ))}
        </div>
    </div>
)

Tiles.propTypes = {
    tiles: tilesType.isRequired,
    isSpymaster: bool.isRequired,
    onTileClick: func.isRequired,
}

export default Tiles
