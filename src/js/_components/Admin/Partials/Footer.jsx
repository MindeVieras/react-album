
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import { history } from '../../../_helpers'
import NewAlbum from '../Buttons/NewAlbum'
import DeleteAlbum from '../Buttons/DeleteAlbum'
import UserCreate from '../Buttons/UserCreate'
import UploadMedia from '../Buttons/UploadMedia'
import MediaPager from './MediaPager'
// import OpenLightbox from '../Buttons/OpenLightbox'
// <OpenLightbox
//   key={ i }
//   btn_type={ link.type }
//   { ...link.data }
// />

import { IoTrashA } from 'react-icons/lib/io'

class Footer extends Component {

  render() {
    const { footer } = this.props
    // console.log(this.props)
    let buttons = null
    if (footer.buttons) {
      buttons = footer.buttons.map((link, i) => {
        if (link.action === 'goBack')
          return <div key={i} className={`btn btn-sm btn-${link.type}`} onClick={()=>history.goBack()}>{link.name}</div>

        if (link.action === 'newUser')
          return (
            <UserCreate
              key={ i }
              type={ link.type }
              name={ link.name }
            />
          )

        if (link.action === 'newAlbums')
          return (
            <NewAlbum
              key={ i }
              type={ link.type }
            />
          )

        if (link.action === 'deleteAlbum')
          return (
            <DeleteAlbum
              key={ i }
              id={ link.data.album_id }
              name={ link.data.name }
              type={ link.type }
            />
          )

        if (link.action === 'uploadMedia')
          return (
            <UploadMedia
              key={ i }
              type={ link.type }
              { ...link.data }
            />
          )

        if (link.action === 'openLightbox')
          return (
            <span key={ i } />
          )

        return <Link key={i} to={link.action} className={`btn btn-sm btn-${link.type}`}>{link.name}</Link>
      })
    }

    return (
      <div className="footer" id="app_footer">
        <MediaPager />
        <div id="footer_buttons" className="pull-right">
          {buttons}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { admin_footer } = state
  return {
    footer: admin_footer
  }
}

export default connect(mapStateToProps)(Footer)
