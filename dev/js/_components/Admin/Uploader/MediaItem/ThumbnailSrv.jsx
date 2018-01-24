
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Player } from 'video-react'

import Spinner from '../../Partials/Spinner'
import { IoAlertCircled } from 'react-icons/lib/io'

class ThumbnailSrv extends Component {

  render() {
    const { maxSize, mime, videos } = this.props
    if (mime.includes('image')) {    
      return (
        <span
          className="uploader-thumbnail image"
          style={{height: maxSize, width: maxSize}}
        >
          image
        </span>
      )
    }
    else if (mime.includes('video')) {    
      return (
        <span
          className="uploader-thumbnail video"
          style={{height: maxSize, width: maxSize}}
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

}

ThumbnailSrv.propTypes = {
  maxSize: PropTypes.number.isRequired,
  videos: PropTypes.object,
  mime: PropTypes.string
}

ThumbnailSrv.defaultProps = {
  mime: ''
}

export default ThumbnailSrv
