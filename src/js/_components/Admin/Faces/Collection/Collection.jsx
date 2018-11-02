
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import { Scrollbar, Spinner } from 'Common'

import CollectionListItem from './CollectionListItem'

import { facesActions } from 'Actions'

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

class Collection extends Component {

  componentDidMount(){
    const { dispatch, collection: { items } } = this.props

    // // load user from API only if none
    if (items && items.length === 0)
      dispatch(facesActions.getCollection())
  }

  render() {

    const { classes, collection: { loading, err, items } } = this.props

    return (
      <Fragment>

        {loading &&
          <Spinner type="primary" size={ 70 } />
        }

        {err &&
          <div>{err}</div>
        }

        {items &&
          <Scrollbar className={ classes.scrollbar }>
            <List
              className={ classes.list }
              disablePadding={ true }
            >
              {items.map(face =>
                <CollectionListItem key={ face.FaceId } { ...face } />
              )}
            </List>
          </Scrollbar>
        }

      </Fragment>
    )
  }
}

Collection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { faces } = state
  return {
    collection: faces.collection
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Collection))
