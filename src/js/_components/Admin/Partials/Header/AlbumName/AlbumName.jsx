
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'

import EditForm from './EditForm'

const styles = {
  edit_btn: {
    fontSize: 16
  }
}

class AlbumName extends Component {

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

  render() {
    const { classes, album_id, name } = this.props
    return (
      <div>
        <Typography variant="title" color="inherit">
          { name }
          {album_id &&
            <IconButton
              color="inherit"
              onClick={ () => this.handleClick() }
            >
              <Edit className={ classes.edit_btn } />
            </IconButton>
          }
        </Typography>
      </div>
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
