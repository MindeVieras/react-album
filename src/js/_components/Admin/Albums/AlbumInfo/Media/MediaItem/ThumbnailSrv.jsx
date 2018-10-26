
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
  
  constructor(props) {
    super(props)

    this.imageRef = React.createRef()
  }

  componentDidMount() {

    const { mime, thumbs, metadata, text } = this.props
    
    let canvas = this.imageRef.current
    if (mime.includes('image')) {
      // Draw summary icon image canvas
      let orientation = 1
      if (metadata && metadata.orientation) {
        orientation = parseInt(metadata.orientation)
      }
      drawCanvasImage(canvas, thumbs.thumb, orientation, text)
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.id != nextProps.id) {
      
      const { id, mime, thumbs, metadata, text } = nextProps

      let canvas = this.imageRef.current
      if (mime.includes('image')) {
        // Draw summary icon image canvas
        let orientation = 1
        if (metadata && metadata.orientation) {
          orientation = metadata.orientation
        }
        drawCanvasImage(canvas, thumbs.thumb, orientation, text)
      }
    }
  }

  render() {

    const { classes, onClick, id, width, height, mime, thumbs, videos } = this.props
    // console.log(id, thumbs.thumb)
    let item = <span>Unsuported media type</span>
    
    if (mime.includes('image')) {  
      item = <canvas
        ref={ this.imageRef }
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
  mime: PropTypes.string,
  thumbs: PropTypes.object,
  videos: PropTypes.object,
  metadata: PropTypes.object,
  text: PropTypes.array
}

ThumbnailSrv.defaultProps = {
  mime: '',
  thumbs: null,
  videos: null,
  metadata: null,
  text: null
}

export default withStyles(styles)(ThumbnailSrv)
