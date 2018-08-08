
import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  image: {
    cursor: `zoom-in`
  }
})

const ThumbnailSrv = (props) => {

  const { classes, onClick, width, height, mime, thumbs, videos, metadata } = props

  let item = <span>Unsuported media type</span>

  if (mime.includes('image')) {
    item = <img
      src={ thumbs.thumb }
      onClick={ onClick }
      width={ width }
      height={ height }
      className={ classes.image }
    />
  }

  else if (mime.includes('video')) {
    item = <ReactPlayer
      url={ videos.medium }
      controls={ true }
      width={ width }
      height={ height }
    />
  }

  return item

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
  thumbs: null,
  videos: null,
  metadata: null,
  mime: ''
}

export default withStyles(styles)(ThumbnailSrv)
