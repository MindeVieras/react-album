import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';

class UserInfo extends React.Component {

  onUserDelete(id) {
    console.log(this.props);
    this.props.dispatch(userActions.delete(id));
    this.props.dispatch(userActions.getOne(this.props.auth.user.id));
  }

  render() {
      const { auth, userGetOne } = this.props;
      return (
        <div className="user-info">
          {userGetOne && userGetOne.loading &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
          {userGetOne.err &&
            <div>{userGetOne.err}</div>
          }
          {userGetOne.user &&
            <div className="selected-user">
              <div className="image-wrapper">
                <div className="inner">{userGetOne.user.initials}</div>
              </div>
              <div className="toolbar">
                <div className="btn btn-xs btn-info">Edit</div>
                {userGetOne.user.id != auth.user.id &&
                <div
                  className="btn btn-xs btn-danger"
                  onClick={() => this.onUserDelete(userGetOne.user.id)}
                >Delete</div>
                }
              </div>
              <div className="info-group">
                <div className="label">Username</div>
                <div className="info-item">{userGetOne.user.username}</div>
              </div>
              {userGetOne.user.display_name &&
              <div className="info-group">
                <div className="label">Display name</div>
                <div className="info-item">{userGetOne.user.display_name}</div>
              </div>
              }
              {userGetOne.user.email &&
              <div className="info-group">
                <div className="label">Email</div>
                <div className="info-item">{userGetOne.user.email}</div>
              </div>
              }
            </div>
          }
        </div>
      );
  }
}

UserInfo.propTypes = {
  auth: PropTypes.object,
  userGetOne: PropTypes.object
}

function mapStateToProps(state) {
  const { authentication, userGetOne } = state;
  return {
    auth: authentication,
    userGetOne
  };
  return state;
}

const connectedUserInfo = connect(mapStateToProps)(UserInfo);
export { connectedUserInfo as UserInfo };