import React from 'react'
import { connect } from 'react-redux'
import { bool } from 'prop-types'

import { getHasGame, getSettingsOpen } from 'selectors/ui'
import Kodenym from 'components/Kodenym'

const KodenymContainer = ({ hasGame, settingsOpen }) => (
    <Kodenym
        hasGame={hasGame}
        settingsOpen={settingsOpen}
    />
)

KodenymContainer.propTypes = {
    hasGame: bool.isRequired,
    settingsOpen: bool.isRequired,
}

const mapStateToProps = (state) => ({
    hasGame: getHasGame(state),
    settingsOpen: getSettingsOpen(state),
})

export default connect(mapStateToProps)(KodenymContainer)
