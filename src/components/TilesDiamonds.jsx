import React from 'react'
import { bool, func } from 'prop-types'
import classNames from 'classnames'

import { tilesType } from 'types'

require('./TilesDiamonds.scss')

const Tiles = ({ tiles, isSpymaster, onTileClick }) => {
    const tile = (index) => (
        <div className="tile" key={tiles[index].word}>
            <div className="tileInner">
                <div className="tileContent">
                    <button
                        onClick={() => onTileClick(index)}
                        className={classNames(tiles[index].status, tiles[index].color)}
                        type="button"
                    >
                        <p>
                            {tiles[index].word}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
    return (
        <div className={`Tiles ${isSpymaster ? 'colorsVisible' : 'colorsHidden'}`}>
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" />
            <div className="tilesContainer">
                <section>
                    {tile(0)}
                    {tile(1)}
                </section>
                <section>
                    {tile(2)}
                    {tile(3)}
                    {tile(4)}
                    {tile(5)}
                    {tile(6)}
                </section>
                <section>
                    {tile(7)}
                    {tile(8)}
                    {tile(9)}
                    {tile(10)}
                </section>
                <section>
                    {tile(11)}
                    {tile(12)}
                    {tile(13)}
                    {tile(14)}
                    {tile(15)}
                </section>
                <section>
                    {tile(16)}
                    {tile(17)}
                    {tile(18)}
                    {tile(19)}
                </section>
                <section>
                    {tile(20)}
                    {tile(21)}
                    {tile(22)}
                    {tile(23)}
                    {tile(24)}
                </section>
            </div>
        </div>
    )
}

Tiles.propTypes = {
    tiles: tilesType.isRequired,
    isSpymaster: bool.isRequired,
    onTileClick: func.isRequired,
}

export default Tiles
