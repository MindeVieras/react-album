
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import Edit from '@material-ui/icons/Edit'

import grey from '@material-ui/core/colors/grey'
import lightBlue from '@material-ui/core/colors/lightBlue'

import Picker from './Picker'
import TimeAgo from './TimeAgo'
import SimpleModal from '../../../../../Common/Modals'

import { adminConstants } from '../../../../../../_constants'
import { adminUiActions } from '../../../../../../_actions'

const modal_id = adminConstants.MODAL_ALBUM_DATES

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
  text_ago: {
    color: grey[400],
    marginLeft: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit / 4
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

class Dates extends Component {

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
    const { classes, album_id, start_date, end_date, locale } = this.props
    const date = moment(start_date).format('YYYY-MM-DD')

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
          { date }
        </Typography>

        <Typography
          className={ classes.text_ago }
          variant="caption"
        >
          <TimeAgo start_date={ start_date } locale={ locale } />
        </Typography>


        {showEditBtn &&
          <Tooltip
            id="tooltip_edit_album_dates"
            title={ t(`Edit album dates`) }
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
          title={ t(`Edit album dates`) }
          size="medium"
          disableEscapeKeyDown={ true }
        >
          <Picker
            album_id={ album_id }
            start_date={ start_date }
            end_date={ end_date }
          />
        </SimpleModal>

      </div>
    )
  }
}

Dates.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  album_id: PropTypes.number.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  locale: PropTypes.string
}

Dates.defaultProps = {
  locale: 'en'
}

Dates.contextTypes = {
  t: PropTypes.func
}

export default connect()(withStyles(styles)(Dates))