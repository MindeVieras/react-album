
import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Dashboard from '@material-ui/icons/Dashboard'
import Face from '@material-ui/icons/Face'
import People from '@material-ui/icons/People'
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
    this.handleClose = this.handleClose.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose() {
    this.setState({ anchorEl: null })
  }

  handleMenuClick(href) {
    this.setState({ anchorEl: null })
    history.push(href)
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-label="Menu"
          aria-owns={ anchorEl ? 'main-menu' : null }
          aria-haspopup="true"
          onClick={ this.handleClick }
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="main-menu"
          anchorEl={ anchorEl }
          open={ Boolean(anchorEl) }
          onClose={ this.handleClose }
        >
          <MenuItem onClick={ () => this.handleMenuClick('/admin') }>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="Albums" />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/admin/faces') }>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText inset primary="Faces" />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/admin/users') }>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText inset primary="Users" />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/') }>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText inset primary="Front" />
          </MenuItem>
          <MenuItem onClick={ () => this.handleMenuClick('/login') }>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText inset primary="Logout" />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default MainMenu
