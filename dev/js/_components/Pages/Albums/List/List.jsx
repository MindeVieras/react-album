
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
