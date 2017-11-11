import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { Header, HomePage, UsersPage } from '../_components';

// require('../../scss/app/main.scss');

class Footer extends React.Component {

    render() {
        // const { user, users } = this.props;
        return (
            <div className="footer" id="app_footer">
              <div id="recycle_bin">
                <a href="/trash" className="tip-default" title="Recycle bin"><i className="fa fa-trash"></i></a>
              </div>

              <div id="recycle_bin">
                <a href="/unattached-media" className="tip-default" title="Unattached media"><i className="fa fa-cloud-download"></i></a>
              </div>

              <div id="footer_buttons">
                footer_buttons
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