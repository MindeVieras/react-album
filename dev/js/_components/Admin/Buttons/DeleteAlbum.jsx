
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IoTrashA } from 'react-icons/lib/io'

import { albumsActions } from '../../../_actions'

class DeleteAlbum extends Component {

  handleClick() {
    const { id, dispatch } = this.props
    dispatch(albumsActions.delete(id))
    dispatch(albumsActions.getOne(53))
  }

  render() {
    return (
      <div
        onClick={() => this.handleClick()}
        className={ `btn btn-xs btn-${this.props.type}` }
      >
        <IoTrashA />
      </div>
    )
  }
}

DeleteAlbum.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string
}

DeleteAlbum.defaultProps = {
  type: 'danger'
}

export default connect()(DeleteAlbum)
