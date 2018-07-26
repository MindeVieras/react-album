
import  React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { toastr } from 'react-redux-toastr'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'

import Tip from 'Common'

import { albumsActions, utilsActions } from '../../../_actions'
import { albumsService } from '../../../_services'
import { albumsConstants } from '../../../_constants'

const styles = theme => ({
  buttonTipWrapper: {
    position: `fixed`,
    right: 0,
    bottom: 0,
    margin: theme.spacing.unit,
    zIndex: theme.zIndex.appBar
  }
})

class NewAlbum extends Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    const { dispatch } = this.props
    let start_date = moment().format('YYYY-MM-DD HH:mm:ss')
    let end_date = moment().format('YYYY-MM-DD HH:mm:ss')
    const album = {
      name: 'Unknown album',
      start_date,
      end_date,
      access: albumsConstants.PRIVATE,
      status: albumsConstants.ENABLED
    }
    albumsService.create(album)
      .then(res => {
        if (res.ack == 'ok') {
          album.id = res.id
          dispatch(albumsActions.addToList(album))
          dispatch(albumsActions.clearMedia())
          dispatch(albumsActions.getOne(res.id))
          dispatch(utilsActions.saveAdminSetting('selected_album', res.id))
          toastr.success('Success', res.msg)
        } else {
          toastr.error('Error', res.msg)
        }
      })
  }

  render() {

    const { t } = this.context
    const { classes } = this.props

    return (
      <Tip
        content={ t(`Create new album`) }
        className={ classes.buttonTipWrapper }
      >
        <Button
          onClick={() => this.handleClick()}
          variant="fab"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Button>
      </Tip>
    )
  }
}

NewAlbum.contextTypes = {
  t: PropTypes.func
}

NewAlbum.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(NewAlbum))
