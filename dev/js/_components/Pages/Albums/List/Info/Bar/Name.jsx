
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Popup from 'react-popup'

import { IoEdit } from 'react-icons/lib/io'
// import { RingLoader } from 'react-spinners'

// import { albumsActions } from '../../../../_actions'

class Name extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     selectedAlbum: 53
  //   }
  // }

  // componentDidMount(){
  //   const { albums, dispatch } = this.props
  //   // console.log(albums)
  //   dispatch(albumsActions.getList())
  // }

  // onAlbumSelect(id) {
  //   this.props.dispatch(albumsActions.getOne(id))
  //   this.setState({
  //     selectedAlbum: id
  //   })
  // }
  handleClick() {

    Popup.create({
      title: 'Edit album name',
      content: 'Hello, look at me',
      className: 'alert',
      buttons: {
        right: ['ok']
      }
    })
  }

  render() {
    // const { albums } = this.props
    return (
      <div className="name-wrapper">
        <div className="name">
          { this.props.name }
        </div>
        <div className="btn btn-xs btn-info">
          <IoEdit onClick={ () => this.handleClick() } />
        </div>
      </div>
    )
  }
}

// UsersList.propTypes = {
//   auth: PropTypes.object.isRequired,
//   users: PropTypes.object.isRequired,
//   dispatch: PropTypes.func
// }

function mapStateToProps(state) {
  return state
  // const { auth, albums } = state
  // return {
  //   auth,
  //   albums: albums.list
  // }
}

export default connect(mapStateToProps)(Name)
