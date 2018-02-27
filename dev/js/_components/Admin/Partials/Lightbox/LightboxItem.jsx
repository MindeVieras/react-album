
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LightboxItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { mime, thumbs } = this.props.media
    console.log(mime)
    if (mime.includes('image')) {
      const style = {
        backgroundImage: `url(${ thumbs.fullhd })`
      }
      return (
        <div className="lightbox-item">
          <div className="image" style={ style }></div>
        </div>
      )
    }
    else {
      return <div className="error-wrapper">ERROR!</div>
    }
  }
}

LightboxItem.propTypes = {
  media: PropTypes.object.isRequired
}

export default LightboxItem
