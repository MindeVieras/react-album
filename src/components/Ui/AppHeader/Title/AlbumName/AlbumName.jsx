
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import Edit from '@material-ui/icons/Edit'

import lightBlue from '@material-ui/core/colors/lightBlue'

import { Tip } from 'Common'
import AlbumNameForm from './AlbumNameForm'
import SimpleModal from '../../../../../Common/Modals'

import { adminUiActions } from 'Actions'

const styles = theme => ({
  title: {
    position: `relative`,
    display: `flex`,
    alignItems: `center`,
    paddingRight: 35
  },
  button: {
    position: `absolute`,
    right: 0,
    width: 32,
    height: 32,
    padding: 0
  },
  edit_btn: {
    fontSize: 16,
    color: lightBlue[400]
  }
})

class AlbumName extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showEditBtn: false
    }
  }

  handleModalOpen(modal_id) {
    this.props.dispatch(adminUiActions.modalOpen(modal_id))
  }

  render() {

    const { t } = this.context
    const { showEditBtn } = this.state
    const { classes, album_id, name } = this.props

    const modal_id = `album_rename_${album_id}`

    return (
      <Fragment>
        <Typography
          variant="h6"
          color="inherit"
          className={ classes.title }
          onMouseOver={ () => this.setState({ showEditBtn: true }) }
          onMouseLeave={ () => this.setState({ showEditBtn: false }) }
          onClick={ () => this.setState({ showEditBtn: !showEditBtn }) }
        >

          { name }

          {showEditBtn &&
            <Fragment>
              <IconButton
                data-tip
                data-for="tip_album_rename"
                className={ classes.button }
                onClick={ () => this.handleModalOpen(modal_id) }
              >
                <Edit className={ classes.edit_btn } />
              </IconButton>
              <Tip id="tip_album_rename">{ t(`Edit album name`) }</Tip>
            </Fragment>
          }

        </Typography>

        <SimpleModal
          modal_id={ modal_id }
          title={ t(`Edit album name`) }
          closeButton={ false }
          disableEscapeKeyDown={ true }
        >
          <AlbumNameForm name={ name } album_id={ album_id } />
        </SimpleModal>
      </Fragment>
    )
  }
}

AlbumName.contextTypes = {
  t: PropTypes.func
}

AlbumName.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  album_id: PropTypes.number.isRequired
}

export default connect()(withStyles(styles)(AlbumName))
