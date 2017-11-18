import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';

import { PrivateRoute, Header, HomePage, UsersPage, UserCreatePage, Footer } from '../_components';

import { headerActions } from '../_actions';

class BaseLayout extends React.Component {
  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900', 'sans-serif']
      }
    });
  }

  render() {
      const { alert } = this.props;
      return (
          <div id="app_wrapper">
            <Header />
            <div id="app_content">

              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/users" component={UsersPage} />
                <PrivateRoute path="/user-create" component={UserCreatePage} />
                <PrivateRoute component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </div>
      );
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>404 No match for <code>{location.pathname}</code></h3>
  </div>
)


function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedHomePage = connect(mapStateToProps)(BaseLayout);
export { connectedHomePage as BaseLayout };