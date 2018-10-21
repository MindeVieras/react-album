
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import uuidv4 from 'uuid/v4'
import classNames from 'classnames'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import DvrIcon from '@material-ui/icons/Dvr'

import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

import { ScaleLoader } from 'react-spinners'

import { Tip } from 'Common'

import { albumsActions } from 'Actions'

const styles = theme => ({
  iconSuccess: {
    color: green[700]
  },
  iconError: {
    color: red[700]
  },
  tipListItem: {
    display: `flex`,
    justifyContent: `space-between`,
    padding: 0
  }
})

class StatusMetadataIcon extends Component {

  constructor() {
    super()

    this.handleResaveMetadata = this.handleResaveMetadata.bind(this)
  }

  handleResaveMetadata(e) {
    const { id, media_id, dispatch } = this.props
    dispatch(albumsActions.saveMediaMetadata(id, media_id))
  }

  render() {

    const contextMenuId = uuidv4()
    const { t } = this.context
    const { classes, className, id, metadata } = this.props

    let tooltipText = ''

    let icon = <ContextMenuTrigger id={ contextMenuId }>
      <DvrIcon
        className={classNames(
          className,
          { [classes.iconSuccess]: metadata.ack == 'ok' || true },
          { [classes.iconError]: metadata.ack == 'err' }
        )}
      />
    </ContextMenuTrigger>

    let contextMenu = <ContextMenu id={ contextMenuId }>
      <MenuItem onClick={ this.handleResaveMetadata }>
        Reset metadata
      </MenuItem>
      <MenuItem>
        Edit metadata
      </MenuItem>
    </ContextMenu>

    if (metadata.ack == 'ok') {

      // Remove ack and location from metadata
      let { ack, location, ...restMeta } = metadata
      let newMeta = { ...restMeta }
      
      // Set orientation readable string
      if (metadata.orientation) {
        let orientation = orientationToString(parseInt(metadata.orientation))
        newMeta = { ...newMeta, orientation }
      }

      // Set flash readable string
      if (metadata.flash || metadata.flash === 0) {
        let flash = flashToString(parseInt(metadata.flash))
        newMeta = { ...newMeta, flash }
      }

      tooltipText = <List disablePadding={ true }>
        {
          Object.keys(newMeta).sort().map((key, i) => {
            let value = newMeta[key]
            return (
              <ListItem
                key={ i }
                classes={{ root: classes.tipListItem }}
              >
                <Typography variant="body2">
                  { _.startCase(_.toLower(t(key))) }:
                </Typography>
                <Typography>{ value }</Typography>
              </ListItem>
            )
          })
        }
      </List>
    }
    else if (metadata.ack == 'loading') {
      tooltipText = metadata.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (metadata.ack == 'err') {
      tooltipText = metadata.msg
    }

    return (
      <Fragment>
        <div
          data-tip
          data-for={ `tip_album_media_metadata_${id}` }
        >
          { icon }
          <Tip id={ `tip_album_media_metadata_${id}` }>{ tooltipText }</Tip>
        </div>

        { contextMenu }

      </Fragment>
    )
  }
}

// Converts exif orientation number to readable string
function orientationToString(dec) {

  switch(dec) {

  case 1:
    return `Horizontal`
    break
  case 2:
    return `Mirror horizontal`
    break
  case 3:
    return `Rotate 180`
    break
  case 4:
    return `Mirror vertical`
    break
  case 5:
    return `Mirror horizontal and rotate 270 CW`
    break
  case 6:
    return `Rotate 90 CW`
    break
  case 7:
    return `Mirror horizontal and rotate 90 CW`
    break
  case 8:
    return `Rotate 270 CW`
    break

  default:
    return dec

  }
}

// Converts exif flash number to readable string
function flashToString(dec) {

  switch(dec) {

  case 0:
    return `No Flash`
    break
  case 1:
    return `Fired`
    break
  case 5:
    return `Fired, Return not detected`
    break
  case 7:
    return `Fired, Return detected`
    break
  case 8:
    return `On, Did not fire`
    break
  case 9:
    return `On, Fired`
    break
  case 13:
    return `On, Return not detected`
    break
  case 15:
    return `On, Return detected`
    break
  case 16:
    return `Off, Did not fire`
    break
  case 20:
    return `Off, Did not fire, Return not detected`
    break
  case 24:
    return `Auto, Did not fire`
    break
  case 25:
    return `Auto, Fired`
    break
  case 29:
    return `Auto, Fired, Return not detected`
    break
  case 31:
    return `Auto, Fired, Return detected`
    break
  case 32:
    return `No flash function`
    break
  case 48:
    return `Off, No flash function`
    break
  case 65:
    return `Fired, Red-eye reduction`
    break
  case 69:
    return `Fired, Red-eye reduction, Return not detected`
    break
  case 71:
    return `Fired, Red-eye reduction, Return detected`
    break
  case 73:
    return `On, Red-eye reduction`
    break
  case 77:
    return `On, Red-eye reduction, Return not detected`
    break
  case 79:
    return `On, Red-eye reduction, Return detected`
    break
  case 80:
    return `Off, Red-eye reduction`
    break
  case 88:
    return `Auto, Did not fire, Red-eye reduction`
    break
  case 89:
    return `Auto, Fired, Red-eye reduction`
    break
  case 93:
    return `Auto, Fired, Red-eye reduction, Return not detected`
    break
  case 95:
    return `Auto, Fired, Red-eye reduction, Return detected`
    break

  default:
    return dec

  }
}

StatusMetadataIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  metadata: PropTypes.object.isRequired,
  className: PropTypes.string
}

StatusMetadataIcon.defaultProps = {
  className: null
}

StatusMetadataIcon.contextTypes = {
  t: PropTypes.func
}

export default connect()(withStyles(styles)(StatusMetadataIcon))
