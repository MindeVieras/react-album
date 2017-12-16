
import React from 'react'
import { connect } from 'react-redux'

import { AlbumsList } from './List'
import { AlbumInfo } from './Info'

import { headerActions, footerActions } from '../../../../_actions'

class AlbumsPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(headerActions.setTitle('Album'))
    this.props.dispatch(footerActions.buttonsClear())
    this.props.dispatch(footerActions.buttonSet('', 'newAlbum', 'success'))
    // this.props.dispatch(footerActions.buttonSet('New album', '/album-create', 'success'))
  }

  render() {
    return (
      <div id="albums_page">
        <div className="albums-wrapper">
          <AlbumsList />
        </div>
        <div className="info-wrapper">
          <AlbumInfo />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dispatch } = state
  return {
    dispatch
  }
}

const connectedAlbumsPage = connect(mapStateToProps)(AlbumsPage)
export { connectedAlbumsPage as AlbumsPage }
