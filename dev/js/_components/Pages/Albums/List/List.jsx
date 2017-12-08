
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

import { albumsActions } from '../../../../_actions'

class AlbumsList extends React.Component {

  constructor(props) {
    super(props)

    // this.state = {
    //   currentSelectedId: props.auth.user.id
    // }
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(albumsActions.getList())
  }

  onUserSelect(id) {
    // this.props.dispatch(userActions.getOne(id))
    // this.setState({
    //   currentSelectedId: id
    // })
  }

  render() {
    const { albums } = this.props
    // console.log(this.props)
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
