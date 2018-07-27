
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'

import grey from '@material-ui/core/colors/grey'

import { PrevArrow, NextArrow } from './Arrows'

import { adminUiActions } from '../../../../../../_actions'

const styles = theme => ({
  backdrop: {
    backgroundColor: `rgba(0,0,0,0.8)`
  },
  root: {
    justifyContent: `center`,
    alignItems: `center`
  },
  paper: {
    position: `relative`,
    width: `90%`,
    height: `98%`,
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  slider: {
    position: `absolute`,
    width: `100%`,
    height: `100%`,
    overflow: `hidden`
  },
  sliderTray: {
    display: `flex`,
    height: `100%`,
    transition: `all 0.3s cubic-bezier(0.4, 0, 0.6, 1)`
  },
  slide: {
    display: `flex`
  },
  slideInner: {
    flex: 1
  },
  imageBg: {
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
    backgroundSize: `contain`,
    width: `100%`,
    height: `100%`
  }
})

class LightboxSlider extends Component {

  handleClose() {
    this.props.dispatch(adminUiActions.lightboxClose())
  }

  render() {

    const { dispatch, classes, isOpen, initialId, selected_album } = this.props
    const { media } = selected_album.album

    let initialSlide = 0
    if (initialId) {
      initialSlide = media.findIndex(m => m.id === initialId)
    }

    const slides = media.map((m, i) => {

      const { id, mime } = m

      if (mime.includes('image')) {
        return (
          <div
            className={ classes.imageBg }
            key={ i }
          >
            <img src={ m.thumbs.fullhd } />
          </div>
        )
      }
      else {
        return (
          <div key={ i }><Typography>Unsuported format</Typography></div>
        )
      }
    })

    const slickSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    }

    return (
      <Modal
        className={ classes.root }
        open={ isOpen }
        onClose={ () => this.handleClose() }
        disableAutoFocus={ true }
        BackdropProps={{ classes: { root: classes.backdrop } }}
      >
        <div className={ classes.paper }>
          <Slider { ...slickSettings }>
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
  initialId: 0,
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
