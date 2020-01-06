import React from 'react'
import { func } from 'prop-types'
import classNames from 'classnames'

import { tilesType } from 'types'

require('./Tiles.scss')

const Tiles = ({ tiles, onTileClick }) => (
    <div className="Tiles">
        {tiles.map((tile, i) => (
            <div className="tile">
                <button
                    key={tile.word}
                    onClick={() => onTileClick(i)}
                    type="button"
                    className={classNames(tile.status, tile.color)}
                >
                    {tile.word}
                </button>
            </div>
        ))}
    </div>
)

Tiles.propTypes = {
    tiles: tilesType.isRequired,
    onTileClick: func.isRequired,
}

export default Tiles
