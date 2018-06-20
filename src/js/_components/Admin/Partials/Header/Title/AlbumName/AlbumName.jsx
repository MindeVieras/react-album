
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import lightBlue from '@material-ui/core/colors/lightBlue'
import Edit from '@material-ui/icons/Edit'

import AlbumNameForm from './AlbumNameForm'
import SimpleModal from '../../../../../Common/Modals'
import { adminUiActions } from '../../../../../../_actions'

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
    height: 32
  },
  edit_btn: {
    fontSize: 16,
    color: lightBlue[500]
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

    const modal_id = `album_rename`
    const { t } = this.context
    const { showEditBtn } = this.state
    const { classes, album_id, name } = this.props

    return (
      <div>
        <Typography
          variant="title"
          color="inherit"
          className={ classes.title }
          onMouseOver={ () => this.setState({ showEditBtn: true }) }
          onMouseLeave={ () => this.setState({ showEditBtn: false }) }
          onClick={ () => this.setState({ showEditBtn: !showEditBtn }) }
        >

          { name }

          {showEditBtn &&
            <Tooltip
              id="tooltip_edit_album_name"
              title={ t(`Edit album name`) }
              enterDelay={ 500 }
            >
              <IconButton
                className={ classes.button }
                iconstyle={ styles.icon }
                color="inherit"
                onClick={ () => this.handleModalOpen(modal_id) }
              >
                <Edit className={ classes.edit_btn } />
              </IconButton>
            </Tooltip>
          }

        </Typography>

        <SimpleModal
          modal_id={ modal_id }
          title={ t(`Edit album name`) }
          disableEscapeKeyDown={ true }
        >
          <AlbumNameForm name={ name } album_id={ album_id } />
        </SimpleModal>
      </div>
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
