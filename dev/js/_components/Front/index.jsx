
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import { headerActions, footerActions } from '../../_actions'

import '../../../scss/Front/main.scss'

class Front extends Component {

  componentDidMount() {
    // const { dispatch } = this.props
    // dispatch(headerActions.setTitle('Album'))
    // dispatch(footerActions.buttonsClear())
  }

  render() {
    return (
      <div id="front_page">
        Front page
        <Link to="/login">LOGOUT</Link>
      </div>
    )
  }
}

export default connect()(Front)
