
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { IoCloseCircled } from 'react-icons/lib/io'

class RemoveButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      deletable: false,
      deleting: false
    }

    const statusEnum =  props.uploader.qq.status

    this._onStatusChange = (id, oldStatus, newStatus) => {
      if (id === this.props.id && !this._unmounted) {
        if (!isDeletable(newStatus, statusEnum) && newStatus !== statusEnum.DELETING && this.state.deletable) {
          !this._unmounted && this.setState({
            deletable: false,
            deleting: false
          })
          this._unregisterStatusChangeHandler()
        }
        else if (isDeletable(newStatus, statusEnum) && !this.state.deletable) {
          this.setState({
            deletable: true,
            deleting: false
          })
        }
        else if (newStatus === statusEnum.DELETING && !this.state.deleting) {
          this.setState({ deleting: true })
        }
      }
    }

    this._onClick = () => this.props.uploader.methods.deleteFile(this.props.id)
  }

  componentDidMount() {
    // this.props.uploader.on('statusChange', this._onStatusChange)
  }

  componentWillUnmount() {
    // this._unmounted = true
    // this.props.uploader.off('statusChange', this._onStatusChange)
  }

  handleClick() {
    const { id, uploader, status } = this.props
    if (status === 'submitted') {
      uploader.methods.cancel(id)
    }
    else if (status === 'upload successful') {
      uploader.methods.deleteFile(id)
    }
  }

  render() {
    return (
      <div
        className="remove-button"
        onClick={ () => this.handleClick() }
      >
        <IoCloseCircled />
      </div>
    )
  }
}

RemoveButton.propTypes = {
  id: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired
}

const isDeletable = (statusToCheck, statusEnum) => {
  return [
    statusEnum.DELETE_FAILED,
    statusEnum.UPLOAD_SUCCESSFUL
  ].indexOf(statusToCheck) >= 0
}

export default RemoveButton
