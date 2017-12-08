
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RingLoader } from 'react-spinners'
import { IoDocument } from 'react-icons/lib/io'

import Placeholder from './placeholder'

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
      this.props.fromServer,
      this.props.customResizer
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
    const customContainerClassName = this.props.className && this.props.className + '-container'

    return (
      <span className={ `react-fine-uploader-thumbnail-container ${customContainerClassName || ''}` }>
        <canvas
          className={ `react-fine-uploader-thumbnail ${this.props.className || ''}` }
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
    if (this._failure) {      
      return (
        <Placeholder
          className={ `react-fine-uploader-thumbnail ${this.props.className || ''}` }
          image={ <IoDocument /> }
          size={ this.props.maxSize }
          status={ 'not-available' }
        />
      )
    } else if (!this.state.drawComplete) {
      return (
        <Placeholder
          className={ `react-fine-uploader-thumbnail ${this.props.className || ''}` }
          image={ <RingLoader /> }
          size={ this.props.maxSize }
          status={ 'waiting' }
        />
      )
    }

    return <span />
  }
}

Thumbnail.propTypes = {
  customResizer: PropTypes.func,
  fromServer: PropTypes.bool,
  id: PropTypes.number.isRequired,
  maxSize: PropTypes.number,
  uploader: PropTypes.object.isRequired,
  waitingPlaceholder: PropTypes.element
}

Thumbnail.defaultProps = {
  maxSize: 120
}

export default Thumbnail
