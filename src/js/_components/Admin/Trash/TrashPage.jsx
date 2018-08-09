
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'

import grey from '@material-ui/core/colors/grey'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IoTrashA } from 'react-icons/lib/io'

import { Spinner } from 'Common'

import MediaItem from './MediaItem'
import AlbumsItem from './AlbumsItem'

import { headerActions, trashActions } from 'Actions'

const styles = theme => ({
  flex: {
    flex: 1,
    padding: theme.spacing.unit * 2,
    overflow: `auto`
  },
  subtitle: {
    color: grey[400],
    paddingLeft: theme.spacing.unit
  },
  list: {
    // display: `flex`,
    // flexWrap: `wrap`
  }
})

class TrashPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(headerActions.setTitle('Trash'))
    dispatch(trashActions.getList())
  }

  render() {
    const { classes } = this.props
    const { media, albums, loading, err } = this.props.list
    console.log(media)
    let emptyContent

    if (!media) {
      emptyContent = <span className="trash-empty-text">
        <div className="icon">
          <IoTrashA />
        </div>
        Trash is empty
      </span>
    }
    return (
      <Fragment>
        {loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {err &&
          <div>{err}</div>
        }
        {media &&
          <div className={ classes.flex }>

            <Typography
              variant="headline"
              gutterBottom
              className={ classes.subtitle }
            >
              Media
            </Typography>

            <div className={ classes.list }>
              {media.map((m) =>
                <MediaItem key={ m.id } media={ m } />
              )}
            </div>

          </div>
        }
        {albums &&
          <div className={ classes.flex }>

            <Typography
              variant="headline"
              gutterBottom
              className={ classes.subtitle }
            >
              Albums
            </Typography>

            <div className={ classes.list }>
              {albums.map((a) =>
                <AlbumsItem key={ a.id } album={ a } />
              )}
            </div>

          </div>
        }
        { emptyContent }
      </Fragment>
    )
  }
}

TrashPage.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { trash } = state
  return {
    list: trash.list
  }
}

export default connect(mapStateToProps)(withStyles(styles)(TrashPage))
