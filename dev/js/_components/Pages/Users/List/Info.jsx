import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Blur from 'react-blur';

import { userActions } from '../../../../_actions';

class UserInfo extends React.Component {

  componentDidMount() {
    this.props.dispatch(userActions.getOne(this.props.auth.user.id));
  }

  onUserDelete(id) {
    this.props.dispatch(userActions.delete(id));
  }

  render() {
      const { auth, selected_user } = this.props;
      console.log(this.props);
      return (
        <div className="user-info">
          {selected_user.loading &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
          {selected_user.err &&
            <div>{selected_user.err}</div>
          }
          {selected_user.user &&
            <div className="selected-user">
              <div className="image-wrapper">
                {selected_user.user.avatar &&
                <Blur img={selected_user.user.avatar} blurRadius={15}>
                  The content.
                </Blur>
                }
                <div className="inner">{selected_user.user.initials}</div>
              </div>
              <div className="toolbar">
                <div className="btn btn-xs btn-info">Edit</div>
                {selected_user.user.id != auth.user.id &&
                <div
                  className="btn btn-xs btn-danger"
                  onClick={() => this.onUserDelete(selected_user.user.id)}
                >Delete</div>
                }
              </div>
              <div className="info-group">
                <div className="label">Username</div>
                <div className="info-item">{selected_user.user.username}</div>
              </div>
              {selected_user.user.display_name &&
              <div className="info-group">
                <div className="label">Display name</div>
                <div className="info-item">{selected_user.user.display_name}</div>
              </div>
              }
              {selected_user.user.email &&
              <div className="info-group">
                <div className="label">Email</div>
                <div className="info-item">{selected_user.user.email}</div>
              </div>
              }
            </div>
          }
        </div>
      );
  }
}

UserInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  selected_user: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  const { auth, users } = state;
  return {
    auth,
    selected_user: users.selected_user
  };
}

const connectedUserInfo = connect(mapStateToProps)(UserInfo);
export { connectedUserInfo as UserInfo };