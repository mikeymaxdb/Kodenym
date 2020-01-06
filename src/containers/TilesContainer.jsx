import React from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'

import { tilesType } from 'types'

import { getTiles } from 'selectors/game'
import { tileClick } from 'actions/gameActions'

import Tiles from 'components/Tiles'

const TilesContainer = ({ tiles, onTileClick }) => (
    <Tiles tiles={tiles} onTileClick={onTileClick} />
)

TilesContainer.propTypes = {
    tiles: tilesType.isRequired,
    onTileClick: func.isRequired,
}

const mapStateToProps = (state) => ({
    tiles: getTiles(state),
})

const mapDispatchToProps = (dispatch) => ({
    onTileClick: (index) => dispatch(tileClick(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesContainer)
