
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import DeleteForever from '@material-ui/icons/DeleteForever'

import SimpleModal from '../../Common/Modals'

import { adminConstants } from '../../../_constants'
import { albumsActions, adminUiActions } from '../../../_actions'

const modal_id = adminConstants.MODAL_ALBUM_DELETE

const styles = theme => ({
  button: {
    position: `fixed`,
    right: theme.spacing.unit * 8,
    bottom: 0,
    margin: theme.spacing.unit,
    zIndex: theme.zIndex.appBar
  },
  actions_wrapper: {
    display: `flex`,
    justifyContent: `space-between`,
    marginTop: theme.spacing.unit * 2
  }
})

class DeleteAlbum extends Component {

  handleModalOpen() {
    this.props.dispatch(adminUiActions.modalOpen(modal_id))
  }

  handleClose() {
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  handleDelete(id) {
    this.props.dispatch(albumsActions.delete(id))
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  render() {

    const { t } = this.context
    const { classes, name, id } = this.props

    return (
      <Fragment>
        <Tooltip
          id="tooltip_delete_album"
          title={ t(`Delete album`) }
          enterDelay={ 500 }
        >
          <Button
            onClick={ () => this.handleModalOpen() }
            variant="fab"
            color="secondary"
            aria-label="delete"
            mini
            className={ classes.button }
          >
            <DeleteForever />
          </Button>
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
              onClick={ () => this.handleDelete(id) }
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

DeleteAlbum.contextTypes = {
  t: PropTypes.func
}

DeleteAlbum.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default connect()(withStyles(styles)(DeleteAlbum))
