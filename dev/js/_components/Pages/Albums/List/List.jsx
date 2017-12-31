
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

import { albumsActions } from '../../../../_actions'

class AlbumsList extends React.Component {

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
    this.props.dispatch(albumsActions.getOne(id))
    this.setState({
      selectedAlbum: id
    })
  }

  render() {
    const { albums } = this.props
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
}

// UsersList.propTypes = {
//   auth: PropTypes.object.isRequired,
//   users: PropTypes.object.isRequired,
//   dispatch: PropTypes.func
// }

function mapStateToProps(state) {
  const { auth, albums } = state
  return {
    auth,
    albums: albums.list
  }
}

const connectedAlbumsList = connect(mapStateToProps)(AlbumsList)
export { connectedAlbumsList as AlbumsList }
