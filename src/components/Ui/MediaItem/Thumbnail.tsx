import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { IMediaSubmitProps } from '../../../services'
// import ReactPlayer from 'react-player'

// import { Spinner } from 'Common'
// import { IoAlertCircled } from 'react-icons/io'

interface IThumbnailProps {
  item: IMediaSubmitProps
  width: number
  height: number
}

interface IThumbnailState {
  drawComplete: boolean
  success: boolean
  mime: string
}

class Thumbnail extends Component<IThumbnailProps, IThumbnailState> {
  _canvas: any
  constructor(props: IThumbnailProps) {
    super(props)

    this.state = {
      drawComplete: false,
      success: false,
      mime: 'image',
    }
  }

  componentDidMount() {
    // const { id, mime } = this.props
    const {
      item: { id, mime },
      width,
      height,
    } = this.props

    if (mime.includes('image')) {
      window.uploader.methods.drawThumbnail(id, this._canvas, Math.max(height, width)).then(
        () => {
          this.setState({
            drawComplete: true,
            success: true,
            mime: 'image',
          })
        },
        () => {
          this.setState({
            drawComplete: true,
            success: false,
          })
        },
      )
    } else if (mime.includes('video')) {
      this.setState({
        drawComplete: true,
        success: true,
        mime: 'video',
      })
    }
  }

  render() {
    const {
      item: { mime },
      width,
      height,
    } = this.props
    if (mime.includes('image')) {
      return (
        <Fragment>
          <canvas
            className="thumbnail"
            hidden={!this.state.drawComplete || this._failure}
            width={width}
            height={height}
            ref={(component) => (this._canvas = component)}
          />
          {this._maybePlaceholder}
        </Fragment>
      )
    }
    return <span />
  }

  get _failure() {
    return this.state.drawComplete && !this.state.success
  }

  get _maybePlaceholder() {
    const style = {
      height: this.props.height,
      width: this.props.width,
    }
    if (this._failure) {
      return (
        <div className="placeholder not-available" style={style}>
          <div className="icon">
            {/* <IoAlertCircled /> */}
            Can't show!
          </div>
          <div className="message">Can't show thumbnail</div>
        </div>
      )
    } else if (!this.state.drawComplete) {
      return (
        <div className="placeholder waiting" style={style}>
          {/* <Spinner type="thumbnail" size={50} /> */}
          Loading...
        </div>
      )
    }

    return <span />
  }
}

// Thumbnail.propTypes = {
//   id: PropTypes.number.isRequired,
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   uploader: PropTypes.object.isRequired,
//   mime: PropTypes.string.isRequired,
//   videos: PropTypes.object,
// }

// Thumbnail.defaultProps = {
//   videos: null,
// }

export default Thumbnail
