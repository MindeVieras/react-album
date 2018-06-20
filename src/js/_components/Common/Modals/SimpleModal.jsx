
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

import { adminUiActions } from '../../../_actions'

const styles = theme => ({
  root: {
    justifyContent: `center`,
    alignItems: `center`
  },
  paper: {
    maxWidth: 360,
    width: `100%`,
    margin: `10% 10px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2
  }
})

class SimpleModal extends Component {

  constructor(props) {
    super(props)
  }

  handleClose(modal_id) {
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  render() {
    const { dispatch, classes, children, modal_id, modals, title, ...other } = this.props

    let isOpen = false

    Object.keys(modals).forEach(key => {
      if (key === modal_id) {
        isOpen = modals[modal_id]
      }
    })

    return (
      <Modal
        className={ classes.root }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={ isOpen }
        onClose={ () => this.handleClose(modal_id) }
        { ...other }
      >
        <div className={ classes.paper }>
          {title &&
            <Typography variant="title" id="modal-title">
              { title }
            </Typography>
          }
          { children }
        </div>
      </Modal>
    )
  }
}

SimpleModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  modal_id: PropTypes.string.isRequired,
  modals: PropTypes.object.isRequired,
  title: PropTypes.string
}

SimpleModal.defaultProps = {
  title: ''
}

function mapStateToProps(state) {
  const { modals } = state.admin_ui
  return {
    modals
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleModal))
