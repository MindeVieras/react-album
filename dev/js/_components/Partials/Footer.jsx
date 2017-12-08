
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { history } from '../../_helpers'

import { IoTrashA, IoAndroidUpload } from 'react-icons/lib/io'

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
        
        if (link.action === 'albumCreate')
          return (
            <div
              key={i}
              onClick={() => this.props.dispatch(submit('album_create'))}
              className={`btn btn-sm btn-${link.type}`}
            >
              {link.name}
            </div>
          )

        return <Link key={i} to={link.action} className={`btn btn-sm btn-${link.type}`}>{link.name}</Link>
      })
    }

    return (
      <div className="footer" id="app_footer">
        <div id="footer_link" className="pull-left">
          <Link to="/trash"><IoTrashA /></Link>
          <Link to="/unattached-media"><IoAndroidUpload /></Link>
        </div>

        <div id="footer_buttons" className="pull-right">
          {buttons}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { footer } = state
  return {
    footer
  }
}

export default connect(mapStateToProps)(Footer)
