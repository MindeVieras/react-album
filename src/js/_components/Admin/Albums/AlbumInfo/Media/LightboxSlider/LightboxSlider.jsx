
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import ReactPlayer from 'react-player'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'

import grey from '@material-ui/core/colors/grey'

import { PrevArrow, NextArrow } from './Arrows'

import { fitMediaToWrapper } from '../../../../../../_helpers'
import { adminUiActions } from 'Actions'

const styles = theme => ({
  backdrop: {
    backgroundColor: `rgba(0,0,0,0.8)`
  },
  root: {
    justifyContent: `center`,
    alignItems: `center`
  },
  lightbox: {
    position: `relative`,
    width: `100%`,
    height: `100%`,
  },
  slickSlider: {

  },
  slideWrapper: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`
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

      const { id, mime, width, height, videos } = m

      if (width && height) {

        const mediaFitSize = fitMediaToWrapper(clientWidth, clientHeight, width, height)

        if (mime.includes('image')) {
          return (
            <div key={ i }>
              <div
                className={ classes.slideWrapper }
                style={{
                  width: clientWidth,
                  height: clientHeight
                }}
              >
                <img
                  src={ m.thumbs.fullhd }
                  width={ mediaFitSize.width }
                  height={ mediaFitSize.height }
                />
              </div>
            </div>
          )
        }
        else if (mime.includes('video')) {
          return (
            <div key={ i }>
              <div
                className={ classes.slideWrapper }
                style={{
                  width: clientWidth,
                  height: clientHeight
                }}
              >
                {videos &&
                  <ReactPlayer
                    url={ videos.video }
                    controls={ true }
                    width={ mediaFitSize.width }
                    height={ mediaFitSize.height }
                  />
                }
              </div>
            </div>
          )
        }
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
