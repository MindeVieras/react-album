
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import { Spinner, Tip } from 'Common'
import DeleteUser from '../../../Buttons/DeleteUser'

const styles = theme => ({
  root: {
    position: `relative`
  },
  link: {
    display: `flex`,
    alignItems: `center`,
    textDecoration: `none`,
    color: `inherit`
  },
  itemRoot: {
    justifyContent: `space-between`,
    width: `100%`,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit,
    boxShadow: theme.shadows[3]
  },
  itemTextPrimary: {
    fontSize: 18
  }
})

class UsersListItem extends Component {

  render() {

    const { classes, authId, id, username, email, initials, deleting } = this.props

    const ItemLink = props => <Link to={ `/admin/users/${username}` } {...props} />

    return (
      <li className={ classes.root }>

        <ListItem
          button
          component={ ItemLink }
          classes={{
            root: classes.itemRoot
          }}
        >
          <Avatar
            alt={ username }
          >
            { initials }
          </Avatar>

          <ListItemText
            primary={ username }
            secondary={ email }
            classes={{
              primary: classes.itemTextPrimary
            }}
          />

          {deleting &&
            <Spinner type="list-item" size={ 30 } />
          }

        </ListItem>

        {authId != id &&
          <DeleteUser
            id={ id }
            username={ username }
          />
        }

      </li>
    )
  }
}

UsersListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  authId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  email: PropTypes.string,
  deleting: PropTypes.bool
}

UsersListItem.defaultProps = {
  email: null,
  deleting: false
}

export default withStyles(styles)(UsersListItem)
