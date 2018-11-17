
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import grey from '@material-ui/core/colors/grey'

import Close from '@material-ui/icons/Close'

import { Tip } from 'Common'
import SimpleModal from '../../../../../Common/Modals'

import { albumsActions, trashActions, adminUiActions } from 'Actions'

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

  handleModalOpen(modal_id) {
    const { dispatch } = this.props
    dispatch(adminUiActions.modalOpen(modal_id))
  }

  handleClose(modal_id) {
    const { dispatch } = this.props
    dispatch(adminUiActions.modalClose(modal_id))
  }

  handleDelete(modal_id) {
    const { media_id, dispatch } = this.props
    dispatch(albumsActions.deleteMedia(media_id))
    dispatch(adminUiActions.modalClose(modal_id))
  }

  handleTrash(modal_id) {
    const { media_id, dispatch } = this.props
    dispatch(albumsActions.trashMedia(media_id))
    dispatch(adminUiActions.modalClose(modal_id))
  }

  render() {

    const { t } = this.context
    const { classes, media_id } = this.props

    const modal_id = `album_media_remove_${media_id}`

    return (
      <Fragment>
        <Fragment>
          <IconButton
            data-tip
            data-for={ `tip_album_rename_${media_id}` }
            onClick={ () => this.handleModalOpen(modal_id) }
            className={ classes.closeBtn }
          >
            <Close className={ classes.closeIcon } />
          </IconButton>
          <Tip id={ `tip_album_rename_${media_id}` }>{ t(`Remove`) }</Tip>
        </Fragment>

        <SimpleModal
          modal_id={ modal_id }
          title={ `${t('Really delete')} '${name}'?` }
          closeButton={ false }
        >
          <div className={ classes.actions_wrapper }>
            <Button
              onClick={ () => this.handleClose(modal_id) }
              color="primary"
              variant="contained"
            >
              { t(`Cancel`) }
            </Button>
            <Button
              onClick={ () => this.handleTrash(modal_id) }
              color="secondary"
              variant="contained"
            >
              { t(`Trash`) }
            </Button>
            <Button
              onClick={ () => this.handleDelete(modal_id) }
              color="secondary"
              variant="contained"
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
