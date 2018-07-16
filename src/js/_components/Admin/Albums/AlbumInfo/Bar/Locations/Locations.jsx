
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import Edit from '@material-ui/icons/Edit'

import lightBlue from '@material-ui/core/colors/lightBlue'

import Address from './Address'
import AlbumMap from './AlbumMap'
import LocationsBar from './LocationsBar'
import SimpleModal from '../../../../../Common/Modals'

import { adminConstants } from '../../../../../../_constants'
import { adminUiActions } from '../../../../../../_actions'

const modal_id = adminConstants.MODAL_ALBUM_LOCATIONS

const styles = theme => ({
  text_wrapper: {
    position: `relative`,
    display: `flex`,
    alignItems: `center`,
    paddingRight: 35
  },
  text: {
    color: theme.palette.common.white
  },
  button: {
    position: `absolute`,
    right: 0,
    width: 32,
    height: 32
  },
  edit_btn: {
    fontSize: 16,
    color: lightBlue[400]
  }
})

class Locations extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showEditBtn: false
    }
  }

  handleModalOpen() {
    this.props.dispatch(adminUiActions.modalOpen(modal_id))
  }

  render() {

    const { t } = this.context
    const { showEditBtn } = this.state
    const { classes, album_id } = this.props

    return (
      <div
        className={ classes.text_wrapper }
        onMouseOver={ () => this.setState({ showEditBtn: true }) }
        onMouseLeave={ () => this.setState({ showEditBtn: false }) }
        onClick={ () => this.setState({ showEditBtn: !showEditBtn }) }
      >

        <Typography
          className={ classes.text }
          variant="subheading"
        >
          <Address />
        </Typography>

        {showEditBtn &&
          <Tooltip
            id="tooltip_edit_album_locations"
            title={ t(`Edit album locations`) }
            enterDelay={ 500 }
          >
            <IconButton
              className={ classes.button }
              onClick={ () => this.handleModalOpen() }
            >
              <Edit className={ classes.edit_btn } />
            </IconButton>
          </Tooltip>
        }

        <SimpleModal
          modal_id={ modal_id }
          title={ t(`Edit album locations`) }
          title_controls={ <LocationsBar /> }
          size="full"
          disableEscapeKeyDown={ true }
        >
          <AlbumMap album_id={ album_id } />
        </SimpleModal>

      </div>
    )
  }
}

Locations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  album_id: PropTypes.number.isRequired
}

Locations.contextTypes = {
  t: PropTypes.func
}

export default connect()(withStyles(styles)(Locations))
