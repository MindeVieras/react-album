
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Filename extends Component {

  render() {
    const { id, uploader } = this.props
    const filename = uploader.methods.getName(id)
    return (
      <div className="filename">
        { filename }
      </div>
    )
  }
}

Filename.propTypes = {
  id: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired
}

export default Filename
