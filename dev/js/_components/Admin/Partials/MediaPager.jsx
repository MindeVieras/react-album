
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pager from 'react-pager'
import {
  IoIosSkipforwardOutline,
  IoIosFastforwardOutline,
  IoIosSkipbackwardOutline,
  IoIosRewindOutline } from 'react-icons/lib/io'

import { albumsActions } from '../../../_actions'

class MediaPager extends Component {
  constructor(props) {
    super(props)

    this.handlePageChanged = this.handlePageChanged.bind(this)
  }

  handlePageChanged(newPage) {
    const { dispatch } = this.props

    dispatch(albumsActions.setMediaPagerPage(newPage))
  }

  render() {
    const { pager, media } = this.props
    const totalPages = Math.ceil(media.length / pager.per_page)

    if (totalPages > 1) {
      return (
        <div className="pager-wrapper">
          <Pager
            total={ totalPages }
            current={ pager.current_page }
            visiblePages={ 4 }
            titles={{
              first: <IoIosSkipbackwardOutline />,
              last: <IoIosSkipforwardOutline />,
              prev: <IoIosRewindOutline />,
              next: <IoIosFastforwardOutline />
            }}
            className="album-media-pager"
            onPageChanged={ this.handlePageChanged }
          />
        </div>
      )
    }
    else {
      return <span />
    }
  }
}

MediaPager.propTypes = {
  media: PropTypes.array
}

MediaPager.defaultProps = {
  media: []
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    pager: admin_albums.selected_album.pager,
    media: admin_albums.selected_album.album.media
  }
}

export default connect(mapStateToProps)(MediaPager)
