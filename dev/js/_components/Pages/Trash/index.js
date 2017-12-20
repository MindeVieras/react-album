
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { headerActions, footerActions } from '../../../_actions'

class TrashPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(headerActions.setTitle('Trash'))
    dispatch(footerActions.buttonsClear())
  }

  render() {
    return (
      <div id="trash_page">
        trashhhs
      </div>
    )
  }
}

export default connect()(TrashPage)
