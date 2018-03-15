
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TotalProgressBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bytesUploaded: null,
      hidden: true,
      totalSize: null
    }

    this._createEventHandlers()
  }

  componentDidMount() {
    this.props.uploader.on('totalProgress', this._trackProgressEventHandler)
    this.props.uploader.on('statusChange', this._trackStatusEventHandler)
  }

  componentWillUnmount() {
    this._unmounted = true
    this.props.uploader.off('totalProgress', this._trackProgressEventHandler)
    this.props.uploader.off('statusChange', this._trackStatusEventHandler)
  }

  render() {
      
    const percentWidth = this.state.bytesUploaded / this.state.totalSize * 100 || 0

    return (
      <div
        className="uploader-total-progress-bar"
        hidden={ this.state.hidden }
      >
        <div
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={ percentWidth }
          className="progress-bar"
          role="progressbar"
          style={ { width: percentWidth + '%' } }
        />
      </div>
    )
  }

  _createEventHandlers() {
    
    this._trackProgressEventHandler = (bytesUploaded, totalSize) => {
      this.setState({ bytesUploaded, totalSize })
    }

    const statusEnum = this.props.uploader.qq.status

    this._trackStatusEventHandler = (id, oldStatus, newStatus) => {
      if (!this._unmounted) {
        if (!this.state.hidden
          && isUploadComplete(newStatus, statusEnum)
          && !this.props.uploader.methods.getInProgress()) {

          this.setState({ hidden: true })
        }
        else if (this.state.hidden && this.props.uploader.methods.getInProgress()) {
          this.setState({ hidden: false })
        }
      }
    }
  }
}

TotalProgressBar.propTypes = {
  uploader: PropTypes.object.isRequired
}

const isUploadComplete = (statusToCheck, statusEnum) => (
  statusToCheck === statusEnum.UPLOAD_FAILED
  || statusToCheck === statusEnum.UPLOAD_SUCCESSFUL
  || statusToCheck === statusEnum.CANCELED
)

export default TotalProgressBar
