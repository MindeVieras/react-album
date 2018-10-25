
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import classNames from 'classnames'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import TextFieldsIcon from '@material-ui/icons/TextFields'

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
  tipListRoot: {
    display: `flex`,
    flexDirection: `column`
  },
  tipListItemRoot: {
    display: `flex`,
    justifyContent: `center`,
    padding: 0
  }
})

class StatusRekognitionTextIcon extends Component {

  constructor(props) {
    super(props)

    this.handleResaveRekognitionText = this.handleResaveRekognitionText.bind(this)
  }

  handleResaveRekognitionText(e) {
    const { id, media_id, dispatch } = this.props
    dispatch(albumsActions.saveRekognitionText(id, media_id))
  }

  render() {

    const contextMenuId = uuidv4()
    const { t } = this.context
    const { classes, className, id, rekognition_text } = this.props
    
    let tooltipText = ''

    let icon = <ContextMenuTrigger id={ contextMenuId } className={ classes.flex }>
      <TextFieldsIcon
        className={classNames(
          className,
          { [classes.iconSuccess]: rekognition_text.ack == 'ok' || true },
          { [classes.iconError]: rekognition_text.ack == 'err' }
        )}
      />
    </ContextMenuTrigger>
    
    let contextMenu = <ContextMenu id={ contextMenuId }>
      <MenuItem onClick={ this.handleResaveRekognitionText }>
        Reset rekognition text
      </MenuItem>
      <MenuItem>
        Edit rekognition text
      </MenuItem>
    </ContextMenu>

    if (rekognition_text.ack == 'ok' && rekognition_text.text) {

      tooltipText = <List
        disablePadding={ true }
        classes={{ root: classes.tipListRoot }}
      >
        {
          rekognition_text.text.map((t, i) => {

            if (t.type === 'LINE') {
              return (
                <ListItem
                  key={ i }
                  classes={{ root: classes.tipListItemRoot }}
                >
                  <Typography variant="body2">{ t.text }</Typography>
                </ListItem>
              )
            }
          })
        }
      </List>
    }
    else if (rekognition_text.ack == 'loading') {
      tooltipText = rekognition_text.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (rekognition_text.ack == 'err') {
      tooltipText = rekognition_text.msg
    }

    return (
      <Fragment>
        <div
          data-tip
          data-for={ `tip_album_media_rekognition_text_${id}` }
        >
          { icon }
          <Tip id={ `tip_album_media_rekognition_text_${id}` }>{ tooltipText }</Tip>
        </div>

        { contextMenu }

      </Fragment>
    )
  }
}

StatusRekognitionTextIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  rekognition_text: PropTypes.object.isRequired,
  className: PropTypes.string
}

StatusRekognitionTextIcon.defaultProps = {
  className: null
}

StatusRekognitionTextIcon.contextTypes = {
  t: PropTypes.func
}

export default connect()(withStyles(styles)(StatusRekognitionTextIcon))
