
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import People from './People'
import Collection from './Collection'

import { headerActions } from 'Actions'

const styles = theme => ({
  flex: {
    flex: 1
  }
})

class Faces extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0
    }

    props.dispatch(headerActions.setTitle('Faces'))

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(event, value) {
    this.setState({ activeTab: value })
  }

  render() {

    const { activeTab } = this.state
    const { classes } = this.props
    
    return (

      <div className={ classes.flex }>
        
        <Paper square>
          <Tabs
            value={ activeTab }
            onChange={ this.handleTabChange }
            textColor="primary"
          >
            <Tab label="People" />
            <Tab label="Collection" />
          </Tabs>
        </Paper>

        {activeTab === 0 && <People />}
        {activeTab === 1 && <Collection />}

      </div>

    )
  }

}

Faces.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(Faces))
