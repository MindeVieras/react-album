
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

import { albumsActions, uploaderActions } from '../../../../_actions'

class AlbumsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedAlbum: 1
    }
  }

  componentDidMount(){
    const { albums, dispatch } = this.props
    // console.log(albums)
    dispatch(albumsActions.getList())
  }

  onAlbumSelect(id) {
    this.props.dispatch(uploaderActions.clearFiles())
    this.props.dispatch(albumsActions.getOne(id))
    this.setState({
      selectedAlbum: id
    })
  }

  render() {
    const { albums } = this.props
    if (albums) {      
      return (
        <div className="albums-list">
          {albums.loading &&
            <RingLoader />
          }
          {albums.err &&
            <div>{albums.err}</div>
          }

          {albums.items && 
            <ul>
              {albums.items.map((album) =>
                <li
                  key={album.id}
                  className={`albums-item${ this.state.selectedAlbum === album.id ? ' active' : ''}`}
                  onClick={() => this.onAlbumSelect(album.id)}
                >
                  <div className="name">{album.name}</div>
                </li>
              )}
            </ul>
          }
        </div>
      )
    }
    else {
      return <span>Nothing to display</span>
    }
  }
}

AlbumsList.propTypes = {
  albums: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { auth, admin_albums } = state
  return {
    auth,
    albums: admin_albums.list
  }
}

export default connect(mapStateToProps)(AlbumsList)
