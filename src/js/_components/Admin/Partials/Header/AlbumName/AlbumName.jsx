
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import lightBlue from '@material-ui/core/colors/lightBlue'
import Edit from '@material-ui/icons/Edit'

import EditForm from './EditForm'

const styles = theme => ({
  title: {
    position: `relative`,
    display: `flex`,
    alignItems: `center`,
    paddingRight: 35
  },
  button: {
    position: `absolute`,
    right: 0,
    width: 32,
    height: 32
  },
  edit_btn: {
    fontSize: 16,
    color: lightBlue[500]
  }
})

class AlbumName extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showEditBtn: false
    }

    this.toggleEditBtn = this.toggleEditBtn.bind(this)
  }

  handleClick() {
    const { t } = this.context
    const { album_id, name } = this.props
    const content = <EditForm
      name={ name }
      album_id={ album_id }
    />

    Popup.create({
      title: t('Edit album name'),
      content,
      className: 'alert'
    })
  }

  toggleEditBtn() {
    this.setState({ showEditBtn: !this.state.showEditBtn })
  }

  render() {

    const { t } = this.context
    const { showEditBtn } = this.state
    const { classes, album_id, name } = this.props

    return (
      <Typography
        variant="title"
        color="inherit"
        className={ classes.title }
        onMouseEnter={ this.toggleEditBtn }
        onMouseLeave={ this.toggleEditBtn }
      >
        { name }
        {album_id && showEditBtn &&
          <Tooltip
            id="tooltip_edit_album_name"
            title={ t(`Edit album name`) }
            enterDelay={ 500 }
          >
            <IconButton
              className={ classes.button }
              iconstyle={ styles.icon }
              color="inherit"
              onClick={ () => this.handleClick() }
            >
              <Edit className={ classes.edit_btn } />
            </IconButton>
          </Tooltip>
        }
      </Typography>
    )
  }
}

AlbumName.contextTypes = {
  t: PropTypes.func
}

AlbumName.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  album_id: PropTypes.number
}

AlbumName.defaultProps = {
  album_id: null
}

export default withStyles(styles)(AlbumName)
