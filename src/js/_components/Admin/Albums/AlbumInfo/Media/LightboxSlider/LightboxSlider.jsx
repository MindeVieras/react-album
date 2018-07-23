
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'

import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

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
    position: `relative`,
    width: `98%`,
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
    height: `100%`
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
  },
  prevNextBtns: {
    position: `absolute`,
    top: `50%`,
    background: `none`,
    border: `none`,
    padding: 0,
    margin: 0
  },
  prevBtn: {
    left: 0
  },
  nextBtn: {
    right: 0
  }
})

class LightboxSlider extends Component {

  handleClose() {
    this.props.dispatch(adminUiActions.lightboxClose())
  }

  render() {

    const { dispatch, classes, isOpen, initialId, selected_album } = this.props
    const { media } = selected_album.album

    const initialSlide = media.findIndex(m => m.id === initialId)

    const slides = media.map((m, i) => {

      const { id, mime } = m

      if (mime.includes('image')) {
        return (
          <Slide
            index={ i }
            key={ m.id }
            className={ classes.slide }
            innerClassName={ classes.slideInner }
            tag="div"
          >
            <div
              className={ classes.imageBg }
              style={{ backgroundImage: `url(${m.thumbs.fullhd})` }}
            >

            </div>
          </Slide>
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

    return (
      <Modal
        className={ classes.root }
        open={ isOpen }
        onClose={ () => this.handleClose() }
        disableAutoFocus={ true }
      >
        <div className={ classes.paper }>
          <CarouselProvider
            totalSlides={ media.length }
            currentSlide={ initialSlide }
          >
            <Slider
              classNameTrayWrap={ classes.slider }
              classNameTray={ classes.sliderTray }
              trayTag="div"
            >
              { slides }
            </Slider>

            <ButtonBack
              className={ `${classes.prevNextBtns} ${classes.prevBtn}` }
            >
              <ChevronLeft fontSize={ 42 } />
            </ButtonBack>

            <ButtonNext
              className={ `${classes.prevNextBtns} ${classes.nextBtn}` }
            >
              <ChevronRight fontSize={ 42 } />
            </ButtonNext>

          </CarouselProvider>
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