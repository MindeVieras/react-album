
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import { history } from '../../../_helpers'
import NewAlbum from '../Buttons/NewAlbum'
import DeleteAlbum from '../Buttons/DeleteAlbum'

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
        
        if (link.action === 'userCreate')
          return (
            <div
              key={i}
              onClick={() => this.props.dispatch(submit('user_create'))}
              className={`btn btn-sm btn-${link.type}`}
            >
              {link.name}
            </div>
          )
        
        if (link.action === 'newAlbum')
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

        return <Link key={i} to={link.action} className={`btn btn-sm btn-${link.type}`}>{link.name}</Link>
      })
    }

    return (
      <div className="footer" id="app_footer">
        <div id="footer_link" className="pull-left">
          <Link to="/admin/trash"><IoTrashA /></Link>
        </div>

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
