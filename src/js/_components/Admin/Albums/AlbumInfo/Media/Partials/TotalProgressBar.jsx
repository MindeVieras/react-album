
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  progress_wrapper: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar + 1
  }
})

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

    const { classes } = this.props
    const { bytesUploaded, totalSize, hidden } = this.state

    const percentWidth = bytesUploaded / totalSize * 100 || 0

    return (
      <div
        className={ classes.progress_wrapper }
        hidden={ hidden }
      >
        <LinearProgress variant="determinate" value={ percentWidth } />
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
  classes: PropTypes.object.isRequired,
  uploader: PropTypes.object.isRequired
}

const isUploadComplete = (statusToCheck, statusEnum) => (
  statusToCheck === statusEnum.UPLOAD_FAILED
  || statusToCheck === statusEnum.UPLOAD_SUCCESSFUL
  || statusToCheck === statusEnum.CANCELED
)

export default withStyles(styles)(TotalProgressBar)
