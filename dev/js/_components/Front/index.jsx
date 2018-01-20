
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import PerfectScrollbar from 'react-perfect-scrollbar'

import CircleMenu from './Partials/CircleMenu'
import Media from './Album/Media'

import { frontActions, frontUiActions } from '../../_actions'

import '../../../scss/Front/main.scss'

class Front extends Component {

  constructor(props) {
    super(props)

    this.closeMenu = this.closeMenu.bind(this)
    this.onScrollDown = this.onScrollDown.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(frontActions.getList())
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(frontUiActions.menuOpen(false))
  }

  closeMenu() {
    const { dispatch } = this.props
    dispatch(frontUiActions.menuOpen(false))
  }

  onScrollDown(container) {
    const { screen } = this.props
    const { scrollTop } = container
    if (screen.height < scrollTop) {
      console.log('load more')
    }
    
  }

  render() {
    const { albums } = this.props
    const scrollbarOptions = {
      wheelSpeed: 0.75,
      // useBothWheelAxes: true
    }
    return (
      <div>
        <div id="front_page" onClick={ this.closeMenu }>

          <div id="front_content">
            {albums.loading &&
              <RingLoader />
            }
            {albums.err &&
              <div>{albums.err}</div>
            }

            {albums.items &&
              <div className="albums-list">
                <PerfectScrollbar
                  option={ scrollbarOptions }
                  onScrollDown={ this.onScrollDown }
                >              
                  {albums.items.map((album) =>
                    <div
                      key={album.id}
                      className={`item`}
                      id={`item-${album.id}`}
                    >
                      <div className="name">{album.name}</div>
                      {album.media &&
                        <Media media={ album.media } />
                      }
                    </div>
                  )}
                </PerfectScrollbar>
              </div>
            }
          </div>

        </div>

        <CircleMenu />

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { client, front_albums } = state
  return {
    screen: client.screen,
    albums: front_albums.list
  }
}

export default connect(mapStateToProps)(Front)
