
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

import Spinner from '../../../../Partials/Spinner'
import { IoAlertCircled } from 'react-icons/lib/io'

class ThumbnailSrv extends Component {

  render() {
    const { onClick, width, height, mime, thumbs, videos } = this.props
    let sizeStyle = {
      height: height,
      width: width
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
        <div
          className="uploader-thumbnail image"
          style={ style }
          onClick={ onClick }
        >
        </div>
      )
    }
    else if (mime.includes('video')) {
      return (
        <div
          className="uploader-thumbnail video"
          style={{ ...sizeStyle, overflow: `hidden`, display: `flex`, alignItems: `center`, justifyContent: `center` }}
        >
          {videos &&
            <ReactPlayer
              url={ videos.video }
              controls={ true }
              width={ width }
              height={ height }
            />
          }
        </div>
      )
    }
    else {
      return <span />
    }
  }

}

ThumbnailSrv.propTypes = {
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

export default ThumbnailSrv
