import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../_helpers';

import { IoTrashA, IoAndroidUpload } from 'react-icons/lib/io';

class Footer extends React.Component {

  render() {
    const { footer } = this.props;
    // console.log(this.props);
    let buttons = null;
    if (footer.buttons) {
      buttons = footer.buttons.map((link, i) => {
        if (link.action === 'goBack')
          return <div key={i} className={`btn btn-sm btn-${link.type}`} onClick={()=>history.goBack()}>{link.name}</div>

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
    );
  }
}

function mapStateToProps(state) {
    return state;
}

const connectedFooter = connect(mapStateToProps)(Footer);
export { connectedFooter as Footer };