
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'

import renderText from '../../../../../Common/Form/Fields'
import RenderButton from '../../../../../Common/Form/RenderButton'

import { albumsActions, adminUiActions } from 'Actions'
import { adminConstants } from 'Constants'

const modal_id = adminConstants.MODAL_ALBUM_RENEME

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
