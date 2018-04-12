
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Popup from 'react-popup'

import { IoCloseCircled } from 'react-icons/lib/io'

import { albumsActions, trashActions } from '../../../../../../_actions'

class RemoveButton extends Component {
  
  handleClick() {
    const { media_id, dispatch } = this.props

    Popup.create({
      title: 'Delete file',
      content: 'Really delete this file?',
      className: 'confirm',
      buttons: {
        left: [{
          text: 'Cancel',
          className: 'btn btn-default',
          action: () => { Popup.close() }
        }],
        right: [{
          text: 'Trash',
          className: 'btn btn-warning',
          action: () => {
            dispatch(albumsActions.trashMedia(media_id))
            Popup.close()
          }
        },{
          text: 'Hard delete',
          className: 'btn btn-danger',
          action: () => {
            dispatch(albumsActions.deleteMedia(media_id))
            Popup.close()
          }
        }]
      }
    })
  }

  render() {
    return (
      <div
        className="remove-button"
        onClick={ () => this.handleClick() }
      >
        <IoCloseCircled />
      </div>
    )
  }
}

RemoveButton.propTypes = {
  media_id: PropTypes.number.isRequired
}

export default connect()(RemoveButton)
