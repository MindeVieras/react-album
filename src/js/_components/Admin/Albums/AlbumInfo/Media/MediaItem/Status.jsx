
import objectAssign from 'object-assign'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

class Status extends Component {

  constructor(props) {
    super(props)

    this.state = {
      status: '',
      text: objectAssign({}, Status.defaultProps.text, props.text || {})
    }

    this._onStatusChange = (id, oldStatus, newStatus) => {
      if (id === this.props.id && !this._unmounted) {
        const newStatusToDisplay = getStatusToDisplay({
          displayMap: this.state.text,
          status: newStatus
        })

        newStatusToDisplay && this.setState({ status: newStatusToDisplay })
      }
    }
  }

  componentDidMount() {
    this.props.uploader.on('statusChange', this._onStatusChange)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text) {
      this.setState({
        text: objectAssign({}, this.state.text, nextProps.text)
      })
    }
  }

  componentWillUnmount() {
    this._unmounted = true
    this.props.uploader.off('statusChange', this._onStatusChange)
  }

  render() {

    const { className, fromServer } = this.props

    const status = fromServer ? 'On server' : this.state.status

    return (
      <Typography
        className={ className }
        variant="caption"
      >
        { status }
      </Typography>
    )
  }
}

Status.propTypes = {
  className: PropTypes.string,
  fromServer: PropTypes.bool,
  id: PropTypes.number.isRequired,
  text: PropTypes.shape({
    canceled: PropTypes.string,
    deleted: PropTypes.string,
    deleting: PropTypes.string,
    paused: PropTypes.string,
    queued: PropTypes.string,
    retrying_upload: PropTypes.string,
    submitting: PropTypes.string,
    uploading: PropTypes.string,
    upload_failed: PropTypes.string,
    upload_successful: PropTypes.string
  }),
  uploader: PropTypes.object.isRequired
}

Status.defaultProps = {
  className: '',
  fromServer: false,
  text: {
    canceled: 'Canceled',
    deleted: 'Deleted',
    deleting: 'Deleting...',
    paused: 'Paused',
    queued: 'Queued',
    retrying_upload: 'Retrying...',
    submitting: 'Submitting...',
    uploading: 'Uploading...',
    upload_failed: 'Failed',
    upload_successful: 'Completed'
  }
}

const getStatusToDisplay = ({ displayMap, status }) => {
  let key

  if (status.indexOf(' ') > 0) {
    const statusParts = status.split(' ')

    key = `${statusParts[0]}_${statusParts[1]}`
  }
  else {
    key = status
  }

  return displayMap[key]
}

export default Status
