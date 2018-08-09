
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import grey from '@material-ui/core/colors/grey'

import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

import { albumsActions } from 'Actions'

const styles = theme => ({
  pagerList: {
    display: `flex`,
    alignItems: `center`,
    alignSelf: `center`,
    listStyle: `none`,
    margin: 0,
    padding: 0
  },
  arrowButton: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  page: {
    display: `flex`,
    justifyContent: `center`,
    fontFamily: theme.typography.fontFamily,
    fontSize: 13,
    cursor: `pointer`,
    width: theme.spacing.unit * 2,
    color: grey[600]
  },
  pageActive: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightMedium,
    width: theme.spacing.unit * 3,
    color: grey[400]
  }
})

class MediaPager extends Component {
  constructor(props) {
    super(props)

    this.handlePageChanged = this.handlePageChanged.bind(this)
  }

  handlePageChanged(data) {
    const { dispatch } = this.props

    dispatch(albumsActions.setMediaPagerPage(data.selected))
  }

  render() {

    const { classes, pager, media } = this.props
    let totalPages = 0

    if (pager)
      totalPages = Math.ceil(media.length / pager.per_page)

    const prevArrow = <IconButton
      className={ classes.arrowButton }
    >
      <ChevronLeft />
    </IconButton>

    const nextArrow = <IconButton
      className={ classes.arrowButton }
    >
      <ChevronRight />
    </IconButton>

    if (totalPages > 1) {
      return (
        <ReactPaginate
          forcePage={ pager.current_page }
          pageCount={ totalPages }
          pageRangeDisplayed={ 2 }
          marginPagesDisplayed={ 0 }
          previousLabel={ prevArrow }
          nextLabel={ nextArrow }
          breakLabel=""
          onPageChange={ this.handlePageChanged }
          containerClassName={ classes.pagerList }
          pageClassName={ classes.page }
          activeClassName={ classes.pageActive }
        />
      )
    }
    else {
      return <span />
    }
  }
}

MediaPager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  pager: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(withStyles(styles)(MediaPager))
