
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'

import { IoEdit } from 'react-icons/lib/io'

import EditForm from './EditForm'

class Name extends Component {

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
    const { name } = this.props
    return (
      <div className="name-wrapper">
        <div className="name">
          { name }
        </div>
        <div className="btn btn-xs btn-info">
          <IoEdit onClick={ () => this.handleClick() } />
        </div>
      </div>
    )
  }
}

Name.propTypes = {
  name: PropTypes.string.isRequired,
  album_id: PropTypes.number.isRequired
}

export default Name
