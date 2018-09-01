
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import { Spinner } from 'Common'

import UsersVirtualList from './UsersVirtualList'
import UserCreateButton from './UserCreateButton'

import { headerActions, userActions } from 'Actions'

const styles = theme => ({
  scrollbar: {
    width: `100%`,
    maxWidth: theme.spacing.unit * 75,
    margin: `0 auto`
  },
  list: {
    width: `100%`,
    padding: theme.spacing.unit * 2,
    overflow: `auto`
  }
})

class UsersList extends Component {

  componentDidMount(){
    const { dispatch } = this.props

    dispatch(headerActions.setTitle('Users'))
    dispatch(userActions.getList())
  }

  render() {
    const { classes, users } = this.props
    return (
      <Fragment>

        {users.loading &&
          <Spinner type="primary" size={ 70 } />
        }

        {users.err &&
          <div>{users.err}</div>
        }

        {users.items &&
          <UsersVirtualList
            users={ users.items }
          />
        }

        <UserCreateButton />

      </Fragment>
    )
  }
}

UsersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { users } = state
  return {
    users: users.list
  }
}

export default connect(mapStateToProps)(withStyles(styles)(UsersList))
