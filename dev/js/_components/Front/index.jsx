
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { RingLoader } from 'react-spinners'

import Header from './Partials/Header'
import CircleMenu from './Partials/CircleMenu'

import { frontActions } from '../../_actions'

import '../../../scss/Front/main.scss'

class Front extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(frontActions.getList())
  }

  render() {
    const { albums } = this.props
    return (
      <div id="front_page">
        
        <Header />

        <div id="fornt_content">
          {albums.loading &&
            <RingLoader />
          }
          {albums.err &&
            <div>{albums.err}</div>
          }

          {albums.items &&
            <div className="albums-list">
              {albums.items.map((album) =>
                <div
                  key={album.id}
                  className={`item`}
                  id={`item-${album.id}`}
                >
                  <div className="name">{album.name}</div>
                  {album.media &&
                    <div className="media">
                      {album.media.map((media, i) => 
                        <div className="media-item" key={ i }>
                          <img src={ media.key } />
                        </div>
                      )}
                    </div>
                  }
                </div>
              )}
            </div>
          }
        </div>

        <CircleMenu />

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { front_albums } = state
  return {
    albums: front_albums.list
  }
}

export default connect(mapStateToProps)(Front)
