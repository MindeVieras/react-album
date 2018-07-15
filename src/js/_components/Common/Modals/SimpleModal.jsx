
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
  flex: {
    flex: 1
  },
  paper: {
    display: `flex`,
    flexDirection: `column`,
    width: `100%`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  small: {
    maxWidth: 360,
    margin: `10% 10px`,
    padding: theme.spacing.unit * 2
  },
  medium: {
    maxWidth: 480,
    margin: `10% 10px`,
    padding: theme.spacing.unit * 2
  },
  full: {
    maxWidth: `95%`,
    height: `95%`,
    padding: theme.spacing.unit
  }
})

class SimpleModal extends Component {

  handleClose(modal_id) {
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  render() {
    const { dispatch, classes, children, modal_id, modals, title, size, ...other } = this.props

    let isOpen = false

    Object.keys(modals).map(key => {
      if (key === modal_id) {
        isOpen = modals[modal_id]
      }
    })

    let modalClass = classes.paper

    if (size === 'small')
      modalClass = `${classes.paper} ${classes.small}`

    if (size === 'medium')
      modalClass = `${classes.paper} ${classes.medium}`

    if (size === 'full')
      modalClass = `${classes.paper} ${classes.full}`

    return (
      <Modal
        className={ classes.root }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={ isOpen }
        onClose={ () => this.handleClose(modal_id) }
        { ...other }
      >
        <div className={ modalClass }>
          {title &&
            <Typography variant="title" id="modal-title">
              { title }
            </Typography>
          }
          <div className={ classes.flex }>{ children }</div>
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
  title: PropTypes.string,
  size: PropTypes.string
}

SimpleModal.defaultProps = {
  title: '',
  size: 'small'
}

function mapStateToProps(state) {
  const { modals } = state.admin_ui
  return {
    modals
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleModal))
