
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import DeleteForever from '@material-ui/icons/DeleteForever'

import { Tip } from 'Common'
import SimpleModal from '../../Common/Modals'

import { albumsActions, adminUiActions } from 'Actions'

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

  handleModalOpen(modal_id) {
    this.props.dispatch(adminUiActions.modalOpen(modal_id))
  }

  handleClose(modal_id) {
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  handleDelete(id, modal_id) {
    this.props.dispatch(albumsActions.delete(id))
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  render() {

    const { t } = this.context
    const { classes, name, id } = this.props
    const modal_id = `album_delete_${id}`
    return (
      <Fragment>

        <Button
          data-tip
          data-for="tip_album_delete"
          onClick={ () => this.handleModalOpen(modal_id) }
          variant="fab"
          color="secondary"
          aria-label="delete"
          mini
          className={ classes.button }
        >
          <DeleteForever />
        </Button>

        <Tip id="tip_album_delete">{ t(`Delete album`) }</Tip>

        <SimpleModal
          modal_id={ modal_id }
          title={ `${t('Really delete')} '${name}'?` }
          closeButton={ false }
        >
          <div className={ classes.actions_wrapper }>
            <Button
              onClick={ () => this.handleClose(modal_id) }
              color="primary"
              variant="raised"
            >
              { t(`Cancel`) }
            </Button>
            <Button
              onClick={ () => this.handleDelete(id, modal_id) }
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
