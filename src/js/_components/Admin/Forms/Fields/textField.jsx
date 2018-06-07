
import React from 'react'
import PropTypes from 'prop-types'

export const textField = ({ input, label, id, type }) => {
  return (
    <div className="form-group">
      {label &&
        <label htmlFor={ id }>{ label }</label>
      }
      <input
        { ...input }
        className="form-control"
        placeholder={ label }
        type={ type }
        id={ id }
      />
    </div>
  )
}

textField.propTypes = {
  input: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
}

textField.defaultProps = {
  id: '',
  label: '',
  type: 'text'
}
