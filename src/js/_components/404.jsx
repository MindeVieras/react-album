
import React, { Component } from 'react'

class Error404 extends Component {

  render() {
    return (
      <div id="error_404_page">
        Not found { location.pathname }
      </div>
    )
  }
}

export default Error404
