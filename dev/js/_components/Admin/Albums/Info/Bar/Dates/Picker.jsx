
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'
import { connect } from 'react-redux'
import moment from 'moment'
import Datetime from 'react-datetime'

import { albumsActions } from '../../../../../../_actions'

class Picker extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      start_date: props.start_date,
      end_date: props.end_date
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.startDateChange = this.startDateChange.bind(this)
    this.endDateChange = this.endDateChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(albumsActions.changeDate({
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      id: this.props.album_id
    }))
  }

  startDateChange(dt) {
    const start_date = dt.format('YYYY-MM-DD HH:mm:ss')
    this.setState({start_date})
  }

  endDateChange(dt) {
    const end_date = dt.format('YYYY-MM-DD HH:mm:ss')
    this.setState({end_date})
  }

  render() {
    const { start_date, end_date } = this.state
    // let yesterday = moment().subtract( 1, 'day' )
    // let valid = function( current ){
    //     return current.isAfter( yesterday )
    // }

    return (
      <form id="album_change_datetime_picker_form" onSubmit={this.handleSubmit}>
        <div className="start-date">
          <Datetime
            open={ true }
            defaultValue={ start_date }
            dateFormat={ 'YYYY-MM-DD' }
            timeFormat={ 'HH:mm:ss' }
            onChange={ this.startDateChange }
          />
        </div>

        <div className="end-date">
          <Datetime
            open={ true }
            defaultValue={ end_date }
            dateFormat={ 'YYYY-MM-DD' }
            timeFormat={ 'HH:mm:ss' }
            onChange={ this.endDateChange }
          />
        </div>
        <div className="buttons">
          <input type="submit" value="Save" className="btn btn-success" />
        </div>
      </form>
    )
  }

}

Picker.propTypes = {
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  album_id: PropTypes.number.isRequired
}

export default connect()(Picker)
