
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Popup from 'react-popup'

import { IoCloseCircled } from 'react-icons/lib/io'


import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import grey from '@material-ui/core/colors/grey'

import Close from '@material-ui/icons/Close'

import SimpleModal from '../../../../../Common/Modals'

import { adminConstants } from '../../../../../../_constants'
import { albumsActions, trashActions, adminUiActions } from '../../../../../../_actions'

const modal_id = adminConstants.MODAL_ALBUM_MEDIA_REMOVE

const styles = theme => ({
  closeBtn: {
    position: `absolute`,
    top: 0,
    right: 0,
    width: 28,
    height: 28
  },
  closeIcon: {
    fontSize: 20,
    color: grey[500]
  },
  actions_wrapper: {
    display: `flex`,
    justifyContent: `space-between`,
    marginTop: theme.spacing.unit * 2
  }
})
class RemoveButton extends Component {

  handleModalOpen() {
    const { dispatch } = this.props
    dispatch(adminUiActions.modalOpen(modal_id))
  }

  handleClose() {
    const { dispatch } = this.props
    dispatch(adminUiActions.modalClose(modal_id))
  }

  handleDelete() {
    const { media_id, dispatch } = this.props
    dispatch(albumsActions.deleteMedia(media_id))
    dispatch(adminUiActions.modalClose(modal_id))
  }

  handleTrash() {
    const { media_id, dispatch } = this.props
    dispatch(albumsActions.trashMedia(media_id))
    dispatch(adminUiActions.modalClose(modal_id))
  }

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

    const { t } = this.context
    const { classes } = this.props

    return (
      <Fragment>
        <Tooltip
          id="tooltip_remove_album_media"
          title={ t(`Remove`) }
          enterDelay={ 500 }
        >
          <IconButton
            onClick={ () => this.handleModalOpen() }
            className={ classes.closeBtn }
          >
            <Close className={ classes.closeIcon } />
          </IconButton>
        </Tooltip>

        <SimpleModal
          modal_id={ modal_id }
          title={ `${t('Really delete')} '${name}'?` }
          closeButton={ false }
        >
          <div className={ classes.actions_wrapper }>
            <Button
              onClick={ () => this.handleClose() }
              color="primary"
              variant="raised"
            >
              { t(`Cancel`) }
            </Button>
            <Button
              onClick={ () => this.handleTrash() }
              color="secondary"
              variant="raised"
            >
              { t(`Trash`) }
            </Button>
            <Button
              onClick={ () => this.handleDelete() }
              color="secondary"
              variant="raised"
            >
              { t(`Delete`) }
            </Button>
          </div>
        </SimpleModal>
      </Fragment>
    )
  }
}

RemoveButton.contextTypes = {
  t: PropTypes.func
}

RemoveButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  media_id: PropTypes.number.isRequired
}

export default connect()(withStyles(styles)(RemoveButton))
