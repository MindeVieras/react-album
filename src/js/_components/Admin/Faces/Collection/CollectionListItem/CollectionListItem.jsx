
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { Spinner } from 'Common'
import DeleteCollectionItem from './DeleteCollectionItem'

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

class CollectionListItem extends Component {

  render() {

    const { classes, FaceId, ExternalImageId, deleting } = this.props

    return (
      <li className={ classes.root }>

        <ListItem
          button
          classes={{
            root: classes.itemRoot
          }}
        >

          <ListItemText
            primary={ FaceId }
            secondary={ ExternalImageId }
            classes={{
              primary: classes.itemTextPrimary
            }}
          />

          {deleting &&
            <Spinner type="list-item" size={ 30 } />
          }

        </ListItem>

        <DeleteCollectionItem
          id={ FaceId }
        />

      </li>
    )
  }
}

CollectionListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  FaceId: PropTypes.string.isRequired,
  ExternalImageId: PropTypes.string.isRequired,
  deleting: PropTypes.bool
}

CollectionListItem.defaultProps = {
  deleting: false
}

export default withStyles(styles)(CollectionListItem)
