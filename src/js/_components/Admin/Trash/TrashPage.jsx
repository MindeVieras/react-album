
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import grey from '@material-ui/core/colors/grey'

import { IoTrashA } from 'react-icons/io'

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

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(headerActions.setTitle('Trash'))
    dispatch(trashActions.getList())
  }

  handleChange(event, value) {
    console.log(value)
    this.setState({ activeTab: value })
  }

  render() {

    const { activeTab } = this.state
    
    const { classes } = this.props
    const { media, albums, loading, err } = this.props.list
    // console.log(media)
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

        <Paper square>
          <Tabs value={ activeTab } onChange={ this.handleChange }>
            <Tab label="Media" />
            <Tab label="Albums" />
          </Tabs>
        </Paper>

        {media &&
          <div className={ classes.flex }>

            <Typography
              variant="h5"
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
              variant="h5"
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
