import React from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'

const HeaderContainer = ({}) => (
    <Header />
)

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(HeaderContainer)
