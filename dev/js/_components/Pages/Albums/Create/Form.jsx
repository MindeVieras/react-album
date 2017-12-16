
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
import Datetime from 'react-datetime'
import { IoIosCheckmark, IoCloseCircled } from 'react-icons/lib/io'

// import Select from 'react-select'
import Toggle from 'react-toggle'

import { albumsService } from '../../../../_services'

class AlbumCreateForm extends React.Component {
  
  render() {  
    const { handleSubmit } = this.props
    return (
      <form id="album_create_form" onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          component={textField}
          label="Name"
          id="name_field"
        />
        <Field
          name="start_date"
          type="text"
          component={dateField}
          label="Start date"
          id="start_date_field"
        />
        <Field
          name="end_date"
          type="text"
          component={dateField}
          label="End date"
          id="end_date_field"
        />
        <Field
          name="private"
          component={toggleField}
          label="Private"
          id="private_field"
        />
        <Field
          name="status"
          component={toggleField}
          label="Status"
          id="status_field"
        />
      </form>
    )
  }
}

const textField = ({ input, label, id, type }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input {...input} className="form-control" placeholder={label} type={type} id={id} />
  </div>
)

const dateField = ({ input, label }) => (
  <div className="form-group">
    <label>{label}</label>
    <Datetime
      {...input}
      value={input.value}
      dateFormat="YYYY-MM-DD"
      timeFormat={'HH:mm:ss'}
    />
  </div>
)

const toggleField = ({ input, label }) => (
  <div className="form-group">
    <label>    
      <label>{label}</label>
      <Toggle
        {...input}
        value="yes"
        defaultChecked={input.value || true}
        onChange={() => input.onChange(input.value)}
        icons={{
          checked: <IoIosCheckmark />,
          unchecked: <IoCloseCircled />,
        }}
      />
    </label>
  </div>
)

function submit(values, dispatch, form) {
  let start_date = moment(values.start_date).format('YYYY-MM-DD HH:mm:ss')
  let end_date = moment(values.end_date).format('YYYY-MM-DD HH:mm:ss')
  albumsService.create({...values, start_date, end_date, author: form.userid, media: form.albummedia})
    .then(function(res){
      if (res.ack == 'ok') {
        // dispatch(alertActions.success('Album created successful'))
        form.reset()
      } else {
        // dispatch(alertActions.error(res.msg))
      }
    })
}

const connectedAlbumCreateForm = reduxForm({
  form: 'album_create',
  initialValues: {
    name: '',
    start_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    end_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    private: true,
    status: true
  },
  onSubmit: submit
})(AlbumCreateForm)
export { connectedAlbumCreateForm as AlbumCreateForm }
