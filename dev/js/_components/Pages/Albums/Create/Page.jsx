import React from 'react';
import { connect } from 'react-redux';

import { AlbumCreateForm } from './Form';
import { AlbumCreateMedia } from './Media';

import { headerActions, footerActions } from '../../../../_actions';

class AlbumCreatePage extends React.Component {

  componentDidMount() {
    this.props.dispatch(headerActions.setTitle('Create album'));
    this.props.dispatch(footerActions.buttonsClear());
    this.props.dispatch(footerActions.buttonSet('Go back', 'goBack', 'info'));
    this.props.dispatch(footerActions.buttonSet('Save', 'albumCreate', 'success'));
  }

  render() {
    const { auth, album_media } = this.props;
    return (
      <div id="album_create_page">
        <div className="pull-left form-wrapper">
          <AlbumCreateForm userid={auth.user.id} albummedia={album_media} />
        </div>
        <div className="pull-left avatar-wrapper">
          <AlbumCreateMedia />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, upload } = state;
  return {
    auth,
    album_media: upload.album_media
  };
}

const connectedAlbumCreatePage = connect(mapStateToProps)(AlbumCreatePage);
export { connectedAlbumCreatePage as AlbumCreatePage };