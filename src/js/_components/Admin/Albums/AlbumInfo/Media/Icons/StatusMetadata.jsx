
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import uuidv4 from 'uuid/v4'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import { ScaleLoader } from 'react-spinners'
import { IoClipboard } from 'react-icons/lib/io'

import Tip from 'Common'

import { albumsActions } from '../../../../../../_actions'

const styles = theme => ({
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
    const { classes, id, metadata } = this.props

    let className = ''
    let tooltipText = ''

    let icon = <ContextMenuTrigger id={ contextMenuId }>
      <IoClipboard />
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
      className = 'success'

      // Remove ack and location from metadata
      let { ack, location, ...restMeta } = metadata
      let newMeta = { ...restMeta }

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
      className = 'loading'
      tooltipText = metadata.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (metadata.ack == 'err') {
      className = 'failed'
      tooltipText = metadata.msg
    }

    return (
      <span>
        <div
          data-tip
          data-for={ `tip_album_media_metadata_${id}` }
          className={`icon ${className}`}
        >
          { icon }
          <Tip id={ `tip_album_media_metadata_${id}` }>{ tooltipText }</Tip>
        </div>

        { contextMenu }

      </span>
    )
  }
}

StatusMetadataIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  metadata: PropTypes.object.isRequired
}

StatusMetadataIcon.contextTypes = {
  t: PropTypes.func
}

export default connect()(withStyles(styles)(StatusMetadataIcon))
