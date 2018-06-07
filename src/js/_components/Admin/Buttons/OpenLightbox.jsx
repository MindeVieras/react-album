
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Lightbox from 'lightbox-react'
import { IoPlay } from 'react-icons/lib/io'

import LightboxVideo from '../Partials/Lightbox/LightboxVideo'
import { albumsActions, footerActions } from '../../../_actions'

// const images = [
//   '//placekitten.com/1500/500',
//   '//placekitten.com/4000/3000',
//   '//placekitten.com/800/1200',
//   '//placekitten.com/1500/1500'
// ]

class OpenLightbox extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      photoIndex: 0,
      isOpen: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { album_id, dispatch } = this.props
    // console.log(album_id)
    this.setState({ isOpen: true })
  }

  render() {
    const { photoIndex, isOpen } = this.state
    const { album } = this.props
    // console.log(album.media)
    let images = []
    if (album.media) {
      images = album.media.map(m => {
        // let thumb = m.thumbs.thumb
        if (m.mime) {
          if (m.mime.includes('image')) {
            return m.thumbs.fullhd
          }
          else {
            return <LightboxVideo media={ m } />
          }
        } else {
          return <span />
        }
      })
    }
    // console.log(images)
    return (
      <div
        onClick={() => this.handleClick()}
        className={ `btn btn-sm btn-${this.props.btn_type}` }
      >
        <IoPlay />
        {isOpen &&
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => this.setState({
              photoIndex: (photoIndex + images.length - 1) % images.length,
            })}
            onMoveNextRequest={() => this.setState({
              photoIndex: (photoIndex + 1) % images.length,
            })}
          />
        }
      </div>
    )
  }
}

OpenLightbox.propTypes = {
  album_id: PropTypes.number.isRequired,
  album: PropTypes.object,
  btn_type: PropTypes.string
}

OpenLightbox.defaultProps = {
  btn_type: 'success'
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    album: admin_albums.selected_album.album
  }
}

export default connect(mapStateToProps)(OpenLightbox)
