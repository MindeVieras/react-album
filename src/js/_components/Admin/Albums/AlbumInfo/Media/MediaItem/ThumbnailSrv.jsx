
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

import { withStyles } from '@material-ui/core/styles'

import { drawCanvasImage } from 'Helpers'

const styles = theme => ({
  image: {
    cursor: `zoom-in`
  }
})

class ThumbnailSrv extends Component {
  
  componentDidMount() {

    const { id, mime, thumbs } = this.props
    
    let canvas = this.refs['image_canvas_'+id]
    if (mime.includes('image')) {
      // Draw summary icon image canvas
      drawCanvasImage(canvas, thumbs.thumb)
    }

  }

  componentWillReceiveProps() {

    const { id, mime, thumbs } = this.props
    
    let canvas = this.refs['image_canvas_'+id]
    if (mime.includes('image')) {
      // Draw summary icon image canvas
      drawCanvasImage(canvas, thumbs.thumb)
    }
  }

  render() {

    const { classes, onClick, id, width, height, mime, thumbs, videos } = this.props

    let item = <span>Unsuported media type</span>
    
    if (mime.includes('image')) {  
      item = <canvas
        ref={ `image_canvas_${id}` }
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
}

ThumbnailSrv.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  thumbs: PropTypes.object,
  videos: PropTypes.object,
  mime: PropTypes.string
}

ThumbnailSrv.defaultProps = {
  thumbs: null,
  videos: null,
  mime: ''
}

export default withStyles(styles)(ThumbnailSrv)
