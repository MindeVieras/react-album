
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import Rnd from 'react-rnd'

import AlbumsList from './AlbumsList'
import AlbumInfo from './AlbumInfo'
import NewAlbum from '../Buttons/NewAlbum'

import { headerActions, utilsActions, albumsActions } from 'Actions'

const styles = {
  rnd_wrapper: {
    display: `flex`,
    flexDirection: `column`,
    borderRight: `1px solid grey`
  }
}

class Albums extends Component {

  constructor(props) {
    super(props)

    this.state = {
      infoWidth: props.client_width - props.sidebar_width
    }

    const { selected_album_id, dispatch } = this.props
    dispatch(headerActions.setTitle(''))
    dispatch(albumsActions.getOne(selected_album_id))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(albumsActions.clearSelected())
  }

  onSidebarResize(e, direction, ref, delta, position) {
    const { dispatch } = this.props
    let width = ref.offsetWidth
    dispatch(utilsActions.setAdminSetting('sidebar_width', width))
  }

  onSidebarResizeEnd(e, direction, ref, delta, position) {
    const { dispatch } = this.props
    let width = ref.offsetWidth
    dispatch(utilsActions.saveAdminSetting('sidebar_width', width))
  }

  render() {

    const { client_width, client_height, sidebar_width } = this.props
    let info_width = client_width - sidebar_width
    let info_height = client_height - 90 // substract header and footer

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Fragment>
          <Rnd
            default={{
              width: sidebar_width,
              height: `100%`
            }}
            enableResizing={{
              top:false,
              right:true,
              bottom:false,
              left:false,
              topRight:false,
              bottomRight:false,
              bottomLeft:false,
              topLeft:false
            }}
            minWidth={ 150 }
            maxWidth={ 350 }
            disableDragging={ true }
            onResize={ this.onSidebarResize.bind(this) }
            onResizeStop={ this.onSidebarResizeEnd.bind(this) }
            style={ styles.rnd_wrapper }
          >
            <AlbumsList />
          </Rnd>

          <AlbumInfo
            width={ info_width }
            height={ info_height }
          />

          <NewAlbum />

        </Fragment>
      </DragDropContextProvider>
    )
  }
}

Albums.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selected_album_id: PropTypes.number.isRequired,
  client_width: PropTypes.number.isRequired,
  client_height: PropTypes.number.isRequired,
  sidebar_width: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const { client, settings, admin_albums } = state
  console.log(settings)
  return {
    selected_album_id: parseInt(settings.admin.selected_album),
    sidebar_width: parseInt(settings.admin.sidebar_width),
    client_width: client.screen.width,
    client_height: client.screen.height
  }
}

export default connect(mapStateToProps)(Albums)
