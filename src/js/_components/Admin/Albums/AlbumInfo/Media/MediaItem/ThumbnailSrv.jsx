
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

import { withStyles } from '@material-ui/core/styles'

import { IoAlertCircled } from 'react-icons/lib/io'

import { fitMediaToWrapper } from '../../../../../../_helpers'

const styles = theme => ({
  root: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
  },
  image: {
    cursor: `zoom-in`
  }
})

class ThumbnailSrv extends Component {

  render() {
    const { classes, onClick, width, height, mime, thumbs, videos, metadata } = this.props

    const mediaSize = fitMediaToWrapper(width, height, metadata.width, metadata.height)
    let sizeStyle = { height, width }

    let item = <span>Unsupoerted media type</span>

    if (mime.includes('image')) {
      item = <img
        src={ thumbs.thumb }
        onClick={ onClick }
        width={ mediaSize.width }
        height={ mediaSize.height }
        className={ classes.image }
      />
    }
    else if (mime.includes('video')) {
      item = <ReactPlayer
        url={ videos.video }
        controls={ true }
        width={ mediaSize.width }
        height={ mediaSize.height }
      />
    }

    return (
      <div
        className={ classes.root }
        style={ sizeStyle }
      >
        { item }
      </div>
    )
  }

}

ThumbnailSrv.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  thumbs: PropTypes.object,
  videos: PropTypes.object,
  metadata: PropTypes.object,
  mime: PropTypes.string
}

ThumbnailSrv.defaultProps = {
  mime: ''
}

export default withStyles(styles)(ThumbnailSrv)
