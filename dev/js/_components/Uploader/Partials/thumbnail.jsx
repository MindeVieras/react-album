
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RingLoader } from 'react-spinners'
import { IoDocument } from 'react-icons/lib/io'

class Thumbnail extends Component {

  constructor() {
    super()

    this.state = {
      drawComplete: false
    }
  }

  componentDidMount() {
    this.props.uploader.methods.drawThumbnail(
      this.props.id,
      this._canvas,
      this.props.maxSize,
      this.props.fromServer
    ).then(
      () => {
        this.setState({
          drawComplete: true,
          success: true
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

  render() {
    return (
      <span
        className="uploader-thumbnail"
        style={{height: this.props.maxSize, width: this.props.maxSize}}
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

  get _failure() {
    return this.state.drawComplete && !this.state.success
  }

  get _maybePlaceholder() {
    const style = {
      height: this.props.maxSize,
      width: this.props.maxSize
    }
    if (this._failure) {      
      return (
        <div
          className="placeholder not-available"
          style={ style }
        >
          <IoDocument />
        </div>
      )
    } else if (!this.state.drawComplete) {
      return (
        <div
          className="placeholder waiting"
          style={ style }
        >
          <RingLoader />
        </div>
      )
    }

    return <span />
  }
}

Thumbnail.propTypes = {
  fromServer: PropTypes.bool,
  id: PropTypes.number.isRequired,
  maxSize: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired
}

export default Thumbnail
