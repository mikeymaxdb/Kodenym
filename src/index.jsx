import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'configureStore'
import KodenymContainer from 'containers/KodenymContainer'

const store = configureStore()

require('./style/Root.scss')

render(
    <Provider store={store}>
        <KodenymContainer />
    </Provider>,
    document.getElementById('Root'),
)
