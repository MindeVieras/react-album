
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Spinner } from 'Common'

import { headerActions, userActions } from 'Actions'

class UserView extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props

    dispatch(headerActions.setTitle(match.params.username))
    dispatch(userActions.getOne(match.params.username))
  }

  onUserDelete(id) {
    // this.props.dispatch(userActions.delete(id))
  }

  render() {
    const { selected_user } = this.props
    return (
      <Fragment>
        {selected_user.loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {selected_user.err &&
          <div>{selected_user.err}</div>
        }
        {selected_user.user &&
          <div className="selected-user">
            <div className="image-wrapper">
              <div className="inner">{selected_user.user.initials}</div>
            </div>
            <div className="user-info">
              <div className="toolbar">
                <div className="btn btn-xs btn-info">Edit</div>
                <div
                  className="btn btn-xs btn-danger"
                  onClick={() => this.onUserDelete(selected_user.user.id)}
                >Delete</div>
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
          </div>
        }
      </Fragment>
    )
  }
}

UserView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  selected_user: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { users } = state
  return {
    selected_user: users.selected_user
  }
}

export default connect(mapStateToProps)(UserView)
