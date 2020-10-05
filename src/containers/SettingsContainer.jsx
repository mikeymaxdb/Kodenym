import React from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'

import { settingsType } from 'types'

import { getSettings } from 'selectors/game'

import { toggleSettings } from 'actions/uiActions'
import { updateSettings } from 'actions/gameActions'

import Settings from 'components/Settings'

const SettingsContainer = (props) => (
    <Settings
        settings={props.settings}
        toggleSettings={props.toggleSettings}
        updateSettings={props.updateSettings}
    />
)

SettingsContainer.propTypes = {
    settings: settingsType.isRequired,
    toggleSettings: func.isRequired,
    updateSettings: func.isRequired,
}

const mapStateToProps = (state) => ({
    settings: getSettings(state),
})

const mapDispatchToProps = (dispatch) => ({
    toggleSettings: () => dispatch(toggleSettings()),
    updateSettings: (settings) => dispatch(updateSettings(settings)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
