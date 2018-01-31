
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Address extends Component {

  render() {
    const { location } = this.props
    // let address
    console.log(location)
    return (
      <div className="addrees">
        London
      </div>
    )
  }
}

Address.propTypes = {
  location: PropTypes.object.isRequired
}

export default Address
