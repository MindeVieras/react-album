import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends React.Component {

    render() {
        const { footer } = this.props;
        if (footer.links) {
          var links = footer.links.map((link) => {
            return <Link className="btn btn-sm btn-success" to={link.url} key={link.id}>{link.name}</Link>
          })
        }
        return (
            <div className="footer" id="app_footer">
              <div id="recycle_bin">
                <a href="/trash" className="tip-default" title="Recycle bin"><i className="fa fa-trash"></i></a>
              </div>

              <div id="recycle_bin">
                <a href="/unattached-media" className="tip-default" title="Unattached media"><i className="fa fa-cloud-download"></i></a>
              </div>

              <div id="footer_buttons">
                {links}
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