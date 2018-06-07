
import  React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Popup from 'react-popup'

import UserCreateForm from '../Forms/UserCreateForm'
import { footerActions } from '../../../_actions'

class UserCreate extends Component {

  handleClick() {
    const { name, dispatch } = this.props

    Popup.create({
      title: 'Create user',
      content: <UserCreateForm />,
      className: 'xxl',
      buttons: {
        left: [{
          text: 'Cancel',
          className: 'btn btn-default',
          action: () => { Popup.close() }
        }],
        right: [{
          text: 'Save',
          className: 'btn btn-success',
          action: () => {
            dispatch(submit('user_create'))
            // dispatch(albumsActions.delete(id))
            // dispatch(footerActions.buttonRemove('deleteAlbum'))
            // dispatch(albumsActions.getOne(null))
            // Popup.close()
          }
        }]
      }
    })
  }

  render() {
    return (
      <div
        onClick={() => this.handleClick()}
        className={ `btn btn-sm btn-${this.props.type}` }
      >
        { this.props.name }
      </div>
    )
  }
}

UserCreate.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string
}

UserCreate.defaultProps = {
  type: 'success',
  name: 'New user'
}

export default connect()(UserCreate)
