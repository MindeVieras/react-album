
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'
import _ from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'
import Datetime from 'react-datetime'
import { IoRefresh } from 'react-icons/lib/io'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import AutorenewIcon from '@material-ui/icons/Autorenew'

import { renderDateRange, RenderButton } from 'Common'

import { albumsActions } from 'Actions'

import submit from './submit'

const styles = theme => ({
  pickersRoot: {
    display: `flex`,
    justifyContent: `space-between`
  },
  actionsRoot: {
    display: `flex`,
    alignItems: `center`,
    marginTop: theme.spacing.unit * 2
  },
  resetButton: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2
  },
  auth_error: {
    marginLeft: theme.spacing.unit
  }
})

class DatesPickerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      start_date: props.start_date,
      end_date: props.end_date
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.startDateChange = this.startDateChange.bind(this)
    this.endDateChange = this.endDateChange.bind(this)
    // this.handleGetDates = this.handleGetDates.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(albumsActions.changeDate({
      album_id: this.props.album_id,
      start_date: this.state.start_date,
      end_date: this.state.end_date
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

  // handleGetDates(e) {
  //   const { media_dates } = this.props

  //   media_dates.sort((a,b) => {
  //     return moment.utc(a).diff(moment.utc(b))
  //   })

  //   let sd = media_dates[0]
  //   let ed = media_dates.slice(-1).pop()
  //   this.setState({
  //     start_date: sd,
  //     end_date: ed
  //   })
  // }

  render() {

    const { t } = this.context
    // const { start_date, end_date } = this.state
    const { classes, handleSubmit, reset, submitting, error, locale, start_date, end_date } = this.props

    // let yesterday = moment().subtract( 1, 'day' )
    // let valid = function( current ){
    //     return current.isAfter( yesterday )
    // }

    let setDatesButton
    // if (_.isEmpty(media_dates)) {
    //   setDatesButton = <span />
    // }
    // else {
    //   setDatesButton = <div className="btn btn-info pull-right" onClick={ this.handleGetDates }>
    //     <IoRefresh />
    //   </div>
    // }

    return (
      <form onSubmit={ handleSubmit(submit) }>
        {/*<div className="start-date">
          <Datetime
            open={ false }
            value={ start_date }
            defaultValue={ start_date }
            dateFormat={ 'YYYY-MM-DD' }
            timeFormat={ 'HH:mm:ss' }
            onChange={ this.startDateChange }
            locale={ locale }
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
            locale={ locale }
          />
        </div>*/}

        <Field
          name="date_range"
          component={ renderDateRange }
          locale={ locale }
          start_date={ start_date }
          end_date={ end_date }
        />

        <div className={ classes.actionsRoot }>

          <RenderButton
            type="submit"
            loading={ submitting }
            text={ t(`Save`) }
            variant="raised"
            color="primary"
          />
          <IconButton
            className={ classes.resetButton }
            onClick={ reset }
            aria-label="Reset form">
            <AutorenewIcon />
          </IconButton>

          { setDatesButton }

          {error &&
            <Typography
              className={ classes.auth_error }
              color="error"
            >
              { t(error) }
            </Typography>
          }
        </div>
      </form>
    )
  }

}

DatesPickerForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  album_id: PropTypes.number.isRequired,
  media_dates: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  locale: PropTypes.string
}

DatesPickerForm.defaultProps = {
  error: null,
  submitting: false,
  locale: 'en'
}

DatesPickerForm.contextTypes = {
  t: PropTypes.func
}

function mapStateToProps(state) {
  const { admin_albums, i18nState } = state
  return {
    initialValues: {
      start_date: admin_albums.selected_album.album.start_date,
      end_date: admin_albums.selected_album.album.end_date
    },
    media_dates: admin_albums.selected_album.album.media.map(f => {
      return f.metadata.datetime
    }).filter(Boolean),
    locale: i18nState.lang
  }
}

DatesPickerForm = reduxForm({
  form: 'album_change_dates_form',
  // validate
})(DatesPickerForm)

DatesPickerForm = connect(mapStateToProps)(DatesPickerForm)

export default withStyles(styles)(DatesPickerForm)
