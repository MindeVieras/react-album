
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTranslations } from 'redux-i18n'
import { Link } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { IoCube, IoHome, IoLogOut } from 'react-icons/lib/io'

import { frontTranslations } from '../../translations/frontTranslations'

import Media from './Album/Media'

import { frontActions, frontUiActions, utilsActions } from 'Actions'

const page = 0
const limit = 1
const media_limit = 2

class Front extends Component {

  constructor(props) {
    super(props)

    this.state = {
      current_page: page,
      current_limit: limit
    }

    this.closeMenu = this.closeMenu.bind(this)
    this.onScrollDown = this.onScrollDown.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount() {
    const { uid, dispatch } = this.props

    dispatch(setTranslations(frontTranslations))

    dispatch(frontActions.getList(page, limit, media_limit))
    dispatch(utilsActions.getFrontSettings(uid))
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
    // const { screen } = this.props
    // const { scrollTop } = container
    // this.setState({
    //   load_more: false
    // })
    // if (!this.state.load_more) {
    //   const { dispatch } = this.props
    //   dispatch(frontActions.getListMore(page, limit, media_limit))
    //   this.setState({
    //     load_more: true
    //   })
    // }
    // console.log(scrollTop)
  }

  loadMore() {
    const { dispatch } = this.props
    const { current_page, current_limit } = this.state
    let cp = current_page + current_limit
    dispatch(frontActions.getListMore(cp, current_limit, media_limit))
    // console.log('load ore')
    this.setState({
      current_page: cp
    })

  }

  render() {
    const { front_settings, albums } = this.props
    const scrollbarOptions = {
      wheelSpeed: 0.75,
      // useBothWheelAxes: true
    }
    // console.log(this.state)
    return (
      <div>
        {front_settings &&
          <div>
            <div id="front_page" onClick={ this.closeMenu }>

              <div id="front_content">
                {albums.items &&
                  <div className="albums-list">
                    <PerfectScrollbar
                      option={ scrollbarOptions }
                      onYReachEnd={ this.onScrollDown }
                    >
                      {albums.items.map((album, i) =>
                        <div
                          key={ i }
                          className={`item`}
                          id={`item-${album.id}`}
                        >
                          <div className="name">{album.name}</div>
                          {album.media &&
                            <Media media={ album.media } />
                          }
                        </div>
                      )}

                      <div className="load-more" onClick={ this.loadMore }>load more</div>

                    </PerfectScrollbar>
                  </div>
                }

                {albums.loading &&
                  <RingLoader />
                }

                {albums.err &&
                  <div>{albums.err}</div>
                }

              </div>

            </div>

            <Link to="/login"><IoLogOut /></Link>
            <Link to="/"><IoHome /></Link>
            <Link to="/admin"><IoCube /></Link>

          </div>
        }

      </div>
    )
  }
}

Front.propTypes = {
  dispatch: PropTypes.func.isRequired,
  front_settings: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const { auth, client, settings, front_albums } = state
  return {
    uid: auth.id,
    screen: client.screen,
    albums: front_albums.list,
    front_settings: settings.front
  }
}

export default connect(mapStateToProps)(Front)
