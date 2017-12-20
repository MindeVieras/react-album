
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { headerActions, footerActions } from '../../../_actions'

class Error404 extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(headerActions.setTitle('404 Not Found'))
    dispatch(footerActions.buttonsClear())
  }

  render() {
    return (
      <div id="error_404_page">
        Not found { location.pathname }
      </div>
    )
  }
}

export default connect()(Error404)
