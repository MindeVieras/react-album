
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Media extends Component {
  
  constructor(props){
    super(props)
    
  }
  
  render(){
    const { media, media_height } = this.props
    const mediaList = media.map((media, i) => {
      const { mime } = media
      // Width and Height if not available set to media_height
      const widescreenRatio = 16 / 9
      const width = media.width || media_height * widescreenRatio
      const height = media.height || media_height

      const calculatedWidth = media_height * (width / height)
      const itemStyle = {
        height: media_height,
        width: calculatedWidth
      }
      if (mime === 'video') {
        return (
          <div className="media-item video" style={ itemStyle } key={ i }>
            <video height={ media_height } width={ calculatedWidth } controls>
              <source src={ media.key } type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
        )
      } else {      
        return (
          <div className="media-item image" style={ itemStyle } key={ i }>
            <img src={ media.key } />
          </div>
        )
      }
    })
    return (
      <div
        className="media"
      >
        { mediaList }
      </div>
    )
  }
}

Media.propTypes = {
  media: PropTypes.array.isRequired,
  media_height: PropTypes.number
}

Media.defaultProps = {
  media_height: 200
}

export default Media
