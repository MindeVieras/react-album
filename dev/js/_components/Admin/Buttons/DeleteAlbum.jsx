
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Popup from 'react-popup'

import { IoTrashA } from 'react-icons/lib/io'

import { albumsActions, footerActions } from '../../../_actions'

class DeleteAlbum extends Component {

  handleClick() {
    const { id, name, dispatch } = this.props

    Popup.create({
      title: 'Delete album',
      content: 'Really delete '+name+'?',
      className: 'confirm',
      buttons: {
        left: [{
          text: 'Cancel',
          className: 'btn btn-default',
          action: () => { Popup.close() }
        }],
        right: [{
          text: 'Delete',
          className: 'btn btn-danger',
          action: () => {
            dispatch(albumsActions.delete(id))
            dispatch(footerActions.buttonRemove('deleteAlbum'))
            // dispatch(albumsActions.getOne(null))
            Popup.close()
          }
        }]
      }
    })
  }

  render() {
    return (
      <div
        onClick={() => this.handleClick()}
        className={ `btn btn-sm btn-${this.props.type}` }
      >
        <IoTrashA />
      </div>
    )
  }
}

DeleteAlbum.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
}

DeleteAlbum.defaultProps = {
  type: 'danger'
}

export default connect()(DeleteAlbum)
