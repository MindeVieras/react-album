
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'

import Close from '@material-ui/icons/Close'

import { adminUiActions } from 'Actions'

const styles = theme => ({
  root: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
  },
  content: {
    flex: 1,
    position: `relative`
  },
  title_wrapper: {
    display: `flex`,
    justifyContent: `space-between`,
    marginBottom: theme.spacing.unit / 2
  },
  controls_wrapper: {
    display: `flex`
  },
  title_controls: {
    marginRight: theme.spacing.unit
  },
  close_btn: {
    width: 28,
    height: 28
  },
  close_icon: {
    fontSize: 20
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

    const {
      dispatch, classes,
      children, modal_id, modals,
      title, title_controls,
      size, closeButton,
      ...other
    } = this.props

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
            <div className={ classes.title_wrapper }>
              <Typography
                variant="title"
                id="modal-title"
              >
                { title }
              </Typography>

              <div className={ classes.controls_wrapper }>
                {title_controls &&
                  <div className={ classes.title_controls }>
                    { title_controls }
                  </div>
                }
                {closeButton &&
                  <IconButton
                    className={ classes.close_btn }
                    onClick={ () => this.handleClose(modal_id) }
                  >
                    <Close className={ classes.close_icon } />
                  </IconButton>
                }
              </div>

            </div>
          }
          <div className={ classes.content }>{ children }</div>
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
  title_controls: PropTypes.node,
  size: PropTypes.string,
  closeButton: PropTypes.bool
}

SimpleModal.defaultProps = {
  title: '',
  title_controls: <span />,
  size: 'small',
  closeButton: true
}

function mapStateToProps(state) {
  const { modals } = state.admin_ui
  return {
    modals
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleModal))
