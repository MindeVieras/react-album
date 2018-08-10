
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import { Spinner } from 'Common'

const styles = theme => ({
  link: {
    textDecoration: `none`,
    color: `inherit`
  },
  itemRoot: {
    width: `100%`,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit,
    boxShadow: theme.shadows[3]
  },
})

class UsersListItem extends Component {

  render() {
    const { classes, id, username, initials, deleting } = this.props
    return (
      <li>
        <Link className={ classes.link } to={ `/admin/users/${username}` }>

          <ListItem
            dense
            button
            classes={{
              root: classes.itemRoot
            }}
          >
            <Avatar
              alt={ username }
            >
              { initials }
            </Avatar>

            <ListItemText primary={ username } />


            {deleting &&
              <Spinner type="primary" size={ 70 } />
            }

          </ListItem>

        </Link>
      </li>
    )
  }
}

UsersListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  deleting: PropTypes.bool
}

UsersListItem.defaultProps = {
  deleting: false
}

export default withStyles(styles)(UsersListItem)
