
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'
import _ from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'
import Datetime from 'react-datetime'
import { IoRefresh } from 'react-icons/lib/io'

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
    this.handleGetDates = this.handleGetDates.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(albumsActions.changeDate({
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      sd: '',
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
  
  handleGetDates(e) {
    const { media_dates } = this.props
    
    media_dates.sort(function(a,b){
      return moment.utc(a).diff(moment.utc(b))
    })

    let sd = media_dates[0]
    let ed = media_dates.slice(-1).pop()
    this.setState({
      start_date: sd,
      end_date: ed
    })
  }

  render() {
    const { start_date, end_date } = this.state
    const { media_dates } = this.props
    // let yesterday = moment().subtract( 1, 'day' )
    // let valid = function( current ){
    //     return current.isAfter( yesterday )
    // }
    let setDatesButton
    if (_.isEmpty(media_dates)) {
      setDatesButton = <span />
    }
    else {
      setDatesButton = <div className="btn btn-info pull-right" onClick={ this.handleGetDates }>
        <IoRefresh />
      </div>
    }

    return (
      <form id="album_change_datetime_picker_form" onSubmit={this.handleSubmit}>
        <div className="start-date">
          <Datetime
            open={ true }
            value={ start_date }
            defaultValue={ start_date }
            dateFormat={ 'YYYY-MM-DD' }
            timeFormat={ 'HH:mm:ss' }
            onChange={ this.startDateChange }
          />
        </div>

        <div className="end-date">
          <Datetime
            open={ true }
            value={ end_date }
            defaultValue={ end_date }
            dateFormat={ 'YYYY-MM-DD' }
            timeFormat={ 'HH:mm:ss' }
            onChange={ this.endDateChange }
          />
        </div>
        <div className="buttons">
          <input type="submit" value="Save" className="btn btn-success" />
          { setDatesButton }
        </div>
      </form>
    )
  }

}

Picker.propTypes = {
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  album_id: PropTypes.number.isRequired,
  media_dates: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { uploader } = state
  return {
    media_dates: uploader.files.map((f) => { return f.metadata.datetime }).filter(Boolean)
  }
}

export default connect(mapStateToProps)(Picker)
