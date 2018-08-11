
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import { Scrollbar, Spinner } from 'Common'

import UsersListItem from './UsersListItem'
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
    padding: theme.spacing.unit * 2
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
          <Scrollbar position="left" className={ classes.scrollbar }>
            <List
              className={ classes.list }
              disablePadding={ true }
            >
              {users.items.map(user =>
                <UsersListItem key={ user.id } { ...user } />
              )}
            </List>
          </Scrollbar>
        }

        <UserCreateButton />

      </Fragment>
    )
  }
}

UsersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { auth, users } = state
  return {
    auth,
    users: users.list
  }
}

export default connect(mapStateToProps)(withStyles(styles)(UsersList))
