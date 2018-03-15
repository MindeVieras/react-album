
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'
import { connect } from 'react-redux'

import { albumsActions } from '../../../../_actions'

class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {value: props.name}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    
    const { album_id, dispatch } = this.props
    const name = this.state.value

    dispatch(albumsActions.rename({ album_id, name }))
  }
  
  handleFocus(e) {
    e.target.select()
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({value})
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit } >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={ this.state.value }
            onChange={ this.handleChange }
            autoFocus
            onFocus={ this.handleFocus }
          />
        </div>
        <input type="submit" value="Save" className="btn btn-success" />
      </form>
    )
  }

}

EditForm.propTypes = {
  name: PropTypes.string.isRequired,
  album_id: PropTypes.number.isRequired,
  dispatch: PropTypes.func
}

export default connect()(EditForm)
