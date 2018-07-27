
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
  lightbox: {
    // display: `flex`,
    position: `relative`,
    width: `100%`,
    height: `100%`,
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5]
  },
  slickSlider: {
    height: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`
    // position: relative;

    // display: block;
    // box-sizing: border-box;

    // -webkit-user-select: none;
    //    -moz-user-select: none;
    //     -ms-user-select: none;
    //         user-select: none;

    // -webkit-touch-callout: none;
    // -khtml-user-select: none;
    // -ms-touch-action: pan-y;
    //     touch-action: pan-y;
    // -webkit-tap-highlight-color: transparent;

    // position: `absolute`,
    // width: `100%`,
    // height: `100%`,
    // overflow: `hidden`
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
    backgroundSize: `contain`
  },
  imageClassHor: {
    width: `100%`,
    height: `auto`
  },
  imageClassVer: {
    width: `auto`,
    height: `100%`
  }
})

class LightboxSlider extends Component {

  handleClose() {
    this.props.dispatch(adminUiActions.lightboxClose())
  }

  render() {

    const {
      dispatch, classes,
      isOpen, initialId,
      selected_album,
      clientWidth, clientHeight
    } = this.props

    const { media } = selected_album.album

    let initialSlide = 0
    if (initialId) {
      initialSlide = media.findIndex(m => m.id === initialId)
    }

    const slides = media.map((m, i) => {

      const { id, mime } = m
      let mediaWidth = m.metadata.width
      let mediaHeight = m.metadata.height

      let clientRatio = clientWidth / clientHeight
      let mediaRatio = mediaWidth / mediaHeight

      let imageClass = classes.imageClassHor
      if (clientRatio > mediaRatio) {
        imageClass = classes.imageClassVer
      }

      if (mime.includes('image')) {
        return (
          <div key={ i }>
            <div
              className={ classes.imageBg }
              style={{
                backgroundImage: `url(${m.thumbs.fullhd})`,
                width: clientWidth,
                height: clientHeight
              }}
            >
            </div>
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
      initialSlide,
      dots: false,
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
        <div className={ classes.lightbox }>
          <Slider
            { ...slickSettings }
            className={ classes.slickSlider }
          >
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
  clientWidth: PropTypes.number.isRequired,
  clientHeight: PropTypes.number.isRequired,
  initialId: PropTypes.number,
  selected_album: PropTypes.object
}

LightboxSlider.defaultProps = {
  initialId: 0,
  selected_album: {}
}

function mapStateToProps(state) {
  const { client, admin_ui, admin_albums } = state
  return {
    initialId: admin_ui.lightbox.initialId,
    selected_album: admin_albums.selected_album,
    clientWidth: client.screen.width,
    clientHeight: client.screen.height
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LightboxSlider))
