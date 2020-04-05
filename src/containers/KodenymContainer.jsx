import React from 'react'
import { connect } from 'react-redux'
import { bool } from 'prop-types'

import { getHasGame } from 'selectors/ui'
import Kodenym from 'components/Kodenym'

const KodenymContainer = ({ hasGame }) => (
    <Kodenym
        hasGame={hasGame}
    />
)

KodenymContainer.propTypes = {
    hasGame: bool.isRequired,
}

const mapStateToProps = (state) => ({
    hasGame: getHasGame(state),
})

export default connect(mapStateToProps)(KodenymContainer)
