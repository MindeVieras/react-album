
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import red from '@material-ui/core/colors/red'

import { Tip } from 'Common'
import SimpleModal from 'Common/Modals'

import { facesActions, adminUiActions } from 'Actions'

const styles = theme => ({
  iconButton: {
    color: red[900],
    position: `absolute`,
    top: theme.spacing.unit / 2,
    right: theme.spacing.unit / 2,
    zIndex: 1,
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  deleteButtonIcon: {
    fontSize: 20
  },
  actionsWrapper: {
    display: `flex`,
    justifyContent: `space-between`,
    marginTop: theme.spacing.unit * 2
  }
})

class DeleteCollectionItem extends Component {

  handleModalOpen(modal_id) {
    this.props.dispatch(adminUiActions.modalOpen(modal_id))
  }

  handleClose(modal_id) {
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  handleDelete(id, modal_id) {
    this.props.dispatch(facesActions.deleteFace(id))
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  render() {

    const { t } = this.context
    const { classes, id } = this.props

    const modal_id = `collection_face_delete_${id}`

    return (
      <Fragment>

        <IconButton
          data-tip
          data-for={ `tip_collection_face_delete_${id}` }
          onClick={ () => this.handleModalOpen(modal_id) }
          aria-label="Delete"
          className={ classes.iconButton }
        >
          <DeleteIcon className={ classes.deleteButtonIcon } />
        </IconButton>

        <Tip
          id={ `tip_collection_face_delete_${id}` }
          type="error"
          delayShow={ 1500 }
        >
          Delete face
        </Tip>

        <SimpleModal
          modal_id={ modal_id }
          title={ `${t('Really delete')} '${id}'?` }
          closeButton={ false }
        >
          <div className={ classes.actionsWrapper }>
            <Button
              onClick={ () => this.handleClose(modal_id) }
              color="primary"
              variant="contained"
            >
              { t(`Cancel`) }
            </Button>
            <Button
              onClick={ () => this.handleDelete(id, modal_id) }
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

DeleteCollectionItem.contextTypes = {
  t: PropTypes.func
}

DeleteCollectionItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default connect()(withStyles(styles)(DeleteCollectionItem))
