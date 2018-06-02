
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

import { userActions } from '../../../../_actions'

class UsersList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentSelectedId: props.auth.user.id
    }
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(userActions.getList())
  }

  onUserSelect(id) {
    this.props.dispatch(userActions.getOne(id))
    this.setState({
      currentSelectedId: id
    })
  }

  render() {
    const { users } = this.props
    return (
      <div className="user-list">
        {users.loading &&
          <RingLoader />
        }
        {users.err &&
          <div>{users.err}</div>
        }
        {users.items &&
          <ul>
            {users.items.map(user =>
              <li
                key={user.id}
                className={`users-item${ this.state.currentSelectedId === user.id ? ' active' : ''}`}
                onClick={() => this.onUserSelect(user.id)}
              >
                <div className="avatar">
                  {user.deleting &&
                    <RingLoader />
                  }
                  {user.avatar &&
                    <div className="image" style={{backgroundImage: 'url('+user.avatar+')'}}></div>
                  }
                  {user.initials}
                </div>
                <div className="name">{user.username}</div>
              </li>
            )}
          </ul>
        }
      </div>
    )
  }
}

UsersList.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  const { auth, users } = state
  return {
    auth,
    users: users.list
  }
}

export default connect(mapStateToProps)(UsersList)
