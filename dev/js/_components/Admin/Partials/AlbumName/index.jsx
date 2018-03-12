
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'
import Marquee from 'react-text-marquee'

import { IoEdit } from 'react-icons/lib/io'

import EditForm from './EditForm'

class AlbumName extends Component {

  handleClick() {
    const content = <EditForm
      name={ this.props.name }
      id={ this.props.album_id }
    />

    Popup.create({
      title: 'Edit album name',
      content,
      className: 'alert'
    })
  }

  render() {
    const { name, album_id } = this.props
    let editClass = album_id ? ' edit' : ''
    return (
      <div className={ `name-wrapper${editClass}` }>
        <Marquee
          leading={ 500 }
          loop={ true }
          trailing={ 500 }
          text={ name }
          className="name"
        />
        {album_id &&
          <div
            className="btn btn-xs btn-info"
             onClick={ () => this.handleClick() }
            >
            <IoEdit />
          </div>
        }
      </div>
    )
  }
}

AlbumName.propTypes = {
  name: PropTypes.string.isRequired,
  album_id: PropTypes.number
}

AlbumName.defaultProps = {
  album_id: null
}

export default AlbumName
