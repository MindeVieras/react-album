
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MediaItem from './MediaItem'

import { albumsActions } from '../../../../../_actions'

class MediaList extends Component {
  constructor(props) {
    super(props)

  }

  componentWillUnmount() {
    const { dispatch } = this.props

    dispatch(albumsActions.setMediaPagerPage(0))
  }
  
  render() {
    const { files, pager, uploader, wrapper_width } = this.props

    const firstList = pager.current_page * pager.per_page
    const lastList = firstList + pager.per_page
    const currentFiles = files.slice(firstList, lastList)

    let cols = 1, item_gap = 15
    
    if (wrapper_width < 680 && wrapper_width >= 480) {
      cols = 2
    }
    else if (wrapper_width >= 680 && wrapper_width < 1000) {
      cols = 3
    }
    else if (wrapper_width >= 1000) {
      cols = 4
    }
    
    let allGaps = (cols + 1) * item_gap
    let item_width = (wrapper_width - allGaps) / cols

    return (
      <div>
        <ul
          className="uploader-files"
          style={{paddingLeft: `${item_gap}px`}}
        >
          {currentFiles.map((file, i) => (
            <MediaItem
              key={ i }
              index={ i }
              uploader={ uploader }
              item_width={ item_width }
              item_gap={ item_gap }
              { ...file }
            />
          ))}
        </ul>

      </div>
    )
  }
}

MediaList.propTypes = {
  files: PropTypes.array.isRequired,
  wrapper_width: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired,
  pager: PropTypes.shape({
    current_page: PropTypes.number,
    per_page: PropTypes.number
  })
}

MediaList.defaultProps = {
  pager: {
    current_page: 0,
    per_page: 8
  }
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    pager: admin_albums.selected_album.pager
  }
}

export default connect(mapStateToProps)(MediaList)
