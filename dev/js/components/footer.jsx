
import React from 'react';

class Footer extends React.Component {
  
  render() {
    return (
      <div className="footer-component">
        <div id="app-footer">
          <div id="recycle-bin">
            <a href="/trash" className="tip-default" title="Recycle bin"><i className="fa fa-trash"></i></a>
          </div>

          <div id="recycle-bin">
            <a href="/unattached-media" className="tip-default" title="Unattached media"><i className="fa fa-cloud-download"></i></a>
          </div>

          <div id="footer-buttons">
            BTNS
          </div>
        </div>
      </div>
    )
  }

}

export default Footer; 