
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'

import renderText from '../../../../../Common/Form/Fields'
import RenderButton from '../../../../../Common/Form/RenderButton'
import { albumsActions, adminUiActions } from '../../../../../../_actions'

const modal_id = `album_rename`

const styles = {
  actions_wrapper: {
    display: `flex`,
    justifyContent: `space-between`
  }
}

class AlbumNameForm extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount () {
    const { initialize, name } = this.props
    initialize({ name })
  }

  handleClose() {
    this.props.dispatch(adminUiActions.modalClose(modal_id))
  }

  render() {

    const { t } = this.context
    const { classes, name, album_id, handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit }>

        <Field
          name="name"
          component={ renderText }
          label={ t(`Album name`) }
          type="text"
          autoFocus
        />

        <div style={ styles.actions_wrapper }>
          <Button onClick={ () => this.handleClose() } color="primary">
            Cancel
          </Button>
          <RenderButton
            type="submit"
            text={ t(`Save`) }
            color="primary"
            className={ classes.btn_submit }
          />
        </div>

      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

function submit(values, dispatch, form) {
  const { album_id } = form
  const { name } = values
  dispatch(albumsActions.rename({ album_id, name }))
  dispatch(adminUiActions.modalClose(modal_id))
}

AlbumNameForm.contextTypes = {
  t: PropTypes.func
}

AlbumNameForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  album_id: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'edit_album_name_form',
  onSubmit: submit,
  validate
})(withStyles(styles)(AlbumNameForm))
