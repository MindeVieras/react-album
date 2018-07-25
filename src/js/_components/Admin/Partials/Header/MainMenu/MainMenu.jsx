
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import Dashboard from '@material-ui/icons/Dashboard'
import Face from '@material-ui/icons/Face'
import People from '@material-ui/icons/People'
import Delete from '@material-ui/icons/Delete'
import Home from '@material-ui/icons/Home'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'

import { history } from '../../../../../_helpers'

class MainMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClick(href) {
    this.setState({ anchorEl: null })
    history.push(href)
  }

  render() {

    const { t } = this.context
    const { anchorEl } = this.state

    return (
      <Fragment>
        <Tooltip
          html={ <Typography>Main menu</Typography> }
          size="small"
        >
          <IconButton
            aria-label="Menu"
            aria-owns={ anchorEl ? 'main-menu' : null }
            aria-haspopup="true"
            onClick={ this.handleClick }
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>

        <Menu
          id="main-menu"
          anchorEl={ anchorEl }
          open={ Boolean(anchorEl) }
          onClose={ () => this.setState({ anchorEl: null }) }
        >
          <MenuItem onClick={ () => this.handleMenuClick('/admin') }>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary={ t(`Albums`) } />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/admin/faces') }>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText inset primary={ t(`Faces`) } />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/admin/users') }>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText inset primary={ t(`Users`) } />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/admin/trash') }>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText inset primary={ t(`Trash`) } />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/') }>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText inset primary={ t(`Front`) } />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/login') }>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText inset primary={ t(`Logout`) } />
          </MenuItem>
        </Menu>
      </Fragment>
    )
  }
}

MainMenu.contextTypes = {
  t: PropTypes.func
}

export default MainMenu
