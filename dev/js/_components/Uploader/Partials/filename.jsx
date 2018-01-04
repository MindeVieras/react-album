
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Marquee from 'react-text-marquee'

class Filename extends Component {

  render() {
    const { id, uploader } = this.props
    const filename = uploader.methods.getName(id)
    return (
      <div className="filename">
        <Marquee leading={ 500 } loop={ true } trailing={ 500 } text={ filename } />
      </div>
    )
  }
}

Filename.propTypes = {
  id: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired
}

export default Filename
