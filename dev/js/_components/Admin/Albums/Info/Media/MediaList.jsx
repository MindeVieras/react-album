
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MediaItem from './MediaItem'

import { albumsActions } from '../../../../../_actions'

class MediaList extends Component {
  constructor(props) {
    super(props)

  }
  
  componentDidMount() {
    this.setMediaGrid()
  }

  componentWillReceiveProps(nextProps) {
    this.setMediaGrid()
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props

    dispatch(albumsActions.setMediaPagerPage(0))
  }
  
  setMediaGrid() {
    const { pager, wrapper_width, wrapper_height, dispatch } = this.props
    let cols = pager.cols,
        rows = pager.rows

    // wrapper_height = client_height - 128 // sbstractig header, infobar and footer
    // console.log(wrapper_height)
    if (wrapper_width < 480) {
      cols = 1
    }
    if (wrapper_width < 680 && wrapper_width >= 480) {
      cols = 2
    }
    else if (wrapper_width >= 680 && wrapper_width < 1000) {
      cols = 3
    }
    else if (wrapper_width >= 1000) {
      cols = 4
    }

    if (wrapper_height < 400) {
      rows = 1
    } else if (wrapper_height >= 400) {
      rows = 2
    }

    if (pager.cols != cols || pager.rows != rows) {
      dispatch(albumsActions.setMediaPagerGrid(cols, rows))
    }
  }

  render() {
    const { files, pager, uploader, wrapper_width, wrapper_height } = this.props

    const firstList = pager.current_page * pager.per_page
    const lastList = firstList + pager.per_page
    const currentFiles = files.slice(firstList, lastList)

    let { cols, rows} = pager,
        gap_width = 10,
        gap_height = 15

    let vertGaps = (cols + 1) * gap_width
    let horiGaps = (rows + 1) * gap_height
    let item_width = (wrapper_width - vertGaps) / cols
    let item_height = (wrapper_height - horiGaps) / rows
    let ulStyle = {
      paddingLeft: `${gap_width}px`,
      paddingTop: `${gap_height}px`
    }

    return (
      <div>
        <ul
          className="uploader-files"
          style={ ulStyle }
        >
          {currentFiles.map((file, i) => (
            <MediaItem
              key={ i }
              index={ i }
              uploader={ uploader }
              item_width={ item_width }
              item_height={ item_height }
              gap_width={ gap_width }
              gap_height={ gap_height }
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
  wrapper_height: PropTypes.number.isRequired,
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
  const { client, admin_albums } = state
  return {
    pager: admin_albums.selected_album.pager
  }
}

export default connect(mapStateToProps)(MediaList)
