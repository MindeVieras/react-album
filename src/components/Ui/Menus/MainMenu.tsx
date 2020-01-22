import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

// import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import Divider from '@material-ui/core/Divider'

import MoreVertIcon from '@material-ui/icons/MoreVert'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import Dashboard from '@material-ui/icons/Dashboard'
// import Face from '@material-ui/icons/Face'
import People from '@material-ui/icons/People'
import Delete from '@material-ui/icons/Delete'
// import Home from '@material-ui/icons/Home'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'

// import { userConstants } from 'Constants'
// import { Tip } from 'Common'
import { history } from '../../../helpers'

// const styles = (theme: any) => ({
//   accountMenuItem: {
//     paddingLeft: theme.spacing.unit * 2,
//     paddingRight: theme.spacing.unit * 2,
//   },
// })

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleItemClick = (l: string) => {
  //   // props.setLanguage(l)
  //   setAnchorEl(null)
  // }

  // constructor(props: any) {
  //   super(props)

  //   this.state = {
  //     anchorEl: null,
  //   }

  //   this.handleClick = this.handleClick.bind(this)
  //   this.handleMenuClick = this.handleMenuClick.bind(this)
  // }

  // handleClick(event: any) {
  //   this.setState({ anchorEl: event.currentTarget })
  // }

  const handleMenuClick = (href: string) => {
    setAnchorEl(null)
    history.push(href)
  }

  // render() {
  // const { t } = this.context
  // const { classes, user } = this.props
  // const { anchorEl } = this.state

  return (
    <Fragment>
      <IconButton
        // data-tip
        // data-for="tip_main_menu"
        aria-label="Main Menu"
        // aria-owns={anchorEl ? 'main-menu' : null}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>

      {/* <Tip id="tip_main_menu">Main menu</Tip> */}

      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={() => this.handleMenuClick(`/admin/users/${user.username}`)}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <div className={classes.accountMenuItem}>
            <Typography>{user.username}</Typography>
            <Typography variant="caption">{user.email}</Typography>
          </div>
        </MenuItem>
        <Divider /> */}
        <MenuItem component={Link} to="/">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText inset primary="Albums" />
        </MenuItem>
        {/* <MenuItem onClick={() => this.handleMenuClick('/admin/faces')}>
          <ListItemIcon>
            <Face />
          </ListItemIcon>
          <ListItemText inset primary={t(`Faces`)} />
        </MenuItem> */}
        <MenuItem component={Link} to="/users">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText inset primary="Users" />
        </MenuItem>
        {/* {user.access_level === userConstants.USER_ACCESS_ADMIN && ( */}
        <MenuItem component={Link} to="/trash">
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText inset primary="Trash" />
        </MenuItem>
        {/* // )} */}
        {/* <MenuItem onClick={() => this.handleMenuClick('/')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText inset primary={t(`Front`)} />
        </MenuItem> */}
        <MenuItem component={Link} to="/login">
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText inset primary="Logout" />
        </MenuItem>
      </Menu>
    </Fragment>
  )
  // }
}

// MainMenu.contextTypes = {
//   t: PropTypes.func,
// }

// MainMenu.propTypes = {
//   classes: PropTypes.object.isRequired,
//   user: PropTypes.shape({
//     username: PropTypes.string,
//   }).isRequired,
// }

export default MainMenu
