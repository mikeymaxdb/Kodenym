import React from 'react'
import { connect } from 'react-redux'
import { bool, func } from 'prop-types'

import { tilesType } from 'types'

import { getTiles } from 'selectors/game'
import { getIsSpymaster } from 'selectors/ui'
import { tileClick } from 'actions/gameActions'

import Tiles from 'components/Tiles'

const TilesContainer = ({ tiles, isSpymaster, onTileClick }) => (
    <Tiles tiles={tiles} isSpymaster={isSpymaster} onTileClick={onTileClick} />
)

TilesContainer.propTypes = {
    tiles: tilesType.isRequired,
    isSpymaster: bool.isRequired,
    onTileClick: func.isRequired,
}

const mapStateToProps = (state) => ({
    tiles: getTiles(state),
    isSpymaster: getIsSpymaster(state),
})

const mapDispatchToProps = (dispatch) => ({
    onTileClick: (index) => dispatch(tileClick(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesContainer)
