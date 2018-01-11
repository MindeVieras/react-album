
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import { headerActions, footerActions } from '../../_actions'

import '../../../scss/Front/main.scss'

class Front extends Component {

  constructor(props) {
    super(props)
    console.log(props)
  }

  componentDidMount() {
    console.log('front comp mounted')
    // const { dispatch } = this.props
    // dispatch(headerActions.setTitle('Album'))
    // dispatch(footerActions.buttonsClear())

  }

  render() {
    return (
      <div id="front_page">
        Front page
        <Link to="/login">LOGOUT</Link>
        <Link to="/admin">ADMIN</Link>
      </div>
    )
  }
}

export default connect()(Front)
