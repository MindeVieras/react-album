
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Player } from 'video-react'

import Spinner from '../../../../Partials/Spinner'
import { IoAlertCircled } from 'react-icons/lib/io'

class Thumbnail extends Component {

  constructor() {
    super()

    this.state = {
      drawComplete: false
    }
  }

  componentDidMount() {
    const { id, height, width, mime } = this.props
    if (mime.includes('image')) {    
      this.props.uploader.methods.drawThumbnail(
        id,
        this._canvas,
        Math.max(height, width)
      ).then(
        () => {
          this.setState({
            drawComplete: true,
            success: true,
            mime: 'image'
          })
        },
        () => {
          this.setState({
            drawComplete: true,
            success: false
          })
        }
      )
    }
    else if (mime.includes('video')) {
      this.setState({
        drawComplete: true,
        success: true,
        mime: 'video'
      })
    }
  }

  render() {
    const { width, height, mime, videos } = this.props
    if (mime.includes('image')) {    
      return (
        <span
          className="uploader-thumbnail image"
          style={{height: height, width: width}}
        >
          <canvas
            className="thumbnail"
            hidden={ !this.state.drawComplete || this._failure }
            ref={ component => this._canvas = component }
          />
          { this._maybePlaceholder }
        </span>
      )
    }
    else if (mime.includes('video')) {    
      return (
        <span
          className="uploader-thumbnail video"
          style={{height: height, width: width}}
        >
          {videos &&
            <Player
              playsInline
              // poster="/assets/poster.png"
              src={ videos.video }
            />
          }
          { this._maybePlaceholder }
        </span>
      )
    }
    else {
      return <span />
    }
  }

  get _failure() {
    return this.state.drawComplete && !this.state.success
  }

  get _maybePlaceholder() {
    const style = {
      height: this.props.height,
      width: this.props.width
    }
    if (this._failure) {      
      return (
        <div
          className="placeholder not-available"
          style={ style }
        >
          <div className="icon"><IoAlertCircled /></div>
          <div className="message">Can't show thumbnail</div>
        </div>
      )
    } else if (!this.state.drawComplete) {
      return (
        <div
          className="placeholder waiting"
          style={ style }
        >
          <Spinner type="thumbnail" size={ 50 } />
        </div>
      )
    }

    return <span />
  }
}

Thumbnail.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  videos: PropTypes.object,
  uploader: PropTypes.object.isRequired,
  mime: PropTypes.string.isRequired
}

export default Thumbnail
