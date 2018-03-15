
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Player } from 'video-react'

import Spinner from '../../../../Partials/Spinner'
import { IoAlertCircled } from 'react-icons/lib/io'

class ThumbnailSrv extends Component {

  render() {
    const { maxSize, mime, thumbs, videos } = this.props
    let sizeStyle = {
      height: maxSize,
      width: maxSize
    }
    if (mime.includes('image')) {
      const style = {
        ...sizeStyle,
        backgroundImage: `url(${thumbs.thumb})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
      }
      return (
        <span
          className="uploader-thumbnail image"
          style={ style }
        >
        </span>
      )
    }
    else if (mime.includes('video')) {    
      return (
        <span
          className="uploader-thumbnail video"
          style={ sizeStyle }
        >
          {videos &&
            <Player
              playsInline
              // poster="/assets/poster.png"
              src={ videos.video }
            />
          }
        </span>
      )
    }
    else {
      return <span />
    }
  }

}

ThumbnailSrv.propTypes = {
  maxSize: PropTypes.number.isRequired,
  thumbs: PropTypes.object,
  videos: PropTypes.object,
  mime: PropTypes.string
}

ThumbnailSrv.defaultProps = {
  mime: ''
}

export default ThumbnailSrv
