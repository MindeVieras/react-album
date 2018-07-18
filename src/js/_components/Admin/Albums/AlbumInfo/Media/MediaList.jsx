
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import MediaItem from './MediaItem'

import { albumsActions } from '../../../../../_actions'

const styles = theme => ({
  list: {
    display: `flex`,
    flexWrap: `wrap`,
    alignItems: `flex-start`,
    width: `100%`
  }
})

class MediaList extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.setMediaGrid(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setMediaGrid(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props

    dispatch(albumsActions.setMediaPagerPage(0))
  }

  setMediaGrid(props) {
    const { pager, wrapper_width, wrapper_height, dispatch } = props
    let cols = pager.cols,
        rows = pager.rows

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
    const { classes, files, pager, uploader, wrapper_width, wrapper_height } = this.props

    const firstList = pager.current_page * pager.per_page
    const lastList = firstList + pager.per_page
    const currentFiles = files.slice(firstList, lastList)

    let { cols, rows} = pager,
        gap_width = 15,
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
      <List
        className={ classes.list }
        style={ ulStyle }
        disablePadding={ true }
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
      </List>
    )
  }
}

MediaList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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
  const { admin_albums } = state
  return {
    pager: admin_albums.selected_album.pager
  }
}

export default connect(mapStateToProps)(withStyles(styles)(MediaList))
