
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'

import Close from '@material-ui/icons/Close'

import { adminUiActions } from '../../../../../../_actions'

const styles = theme => ({
  root: {
    justifyContent: `center`,
    alignItems: `center`
  },
  sliderWrapper: {
    height: `100%`
  },
  paper: {
    width: `95%`,
    height: `95%`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  slide: {
    width: 200,
    height: `100%`
  },
  imageBg: {
    backgroundPosition: `center`
  }
})

class LightboxSlider extends Component {

  handleClose() {
    this.props.dispatch(adminUiActions.lightboxClose())
  }

  render() {

    const { dispatch, classes, isOpen, initialId, selected_album } = this.props

    const { media } = selected_album.album

    const slides = media.map(m => {

      const { mime } = m

      if (mime.includes('image')) {
        return (
          <div
            key={ m.id }
            className={ classes.slide }
          >
            <div className={ classes.imageBg }></div>
            { m.filename }
          </div>
        )
      }
      else {
        return (
          <div><Typography>Unsuported format</Typography></div>
        )
      }
    })

    const sliderSettings = {
      className: classes.sliderWrapper,
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    }

    console.log(media)

    return (
      <Modal
        className={ classes.root }
        open={ isOpen }
        onClose={ () => this.handleClose() }
        disableAutoFocus={ true }
      >
        <div className={ classes.paper }>
          <Slider {...sliderSettings}>
            { slides }
          </Slider>
        </div>
      </Modal>
    )
  }
}

LightboxSlider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  initialId: PropTypes.number,
  selected_album: PropTypes.object
}

LightboxSlider.defaultProps = {
  initialId: null,
  selected_album: {}
}

function mapStateToProps(state) {
  const { admin_ui, admin_albums } = state
  return {
    initialId: admin_ui.lightbox.initialId,
    selected_album: admin_albums.selected_album
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LightboxSlider))
