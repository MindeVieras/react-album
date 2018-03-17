
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setLanguage } from 'redux-i18n'
import Select from 'react-select'

import SelectValue from './SelectValue'

class SelectLocale extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(sel) {
    const { dispatch } = this.props
    dispatch(setLanguage(sel.value))
  }

  render() {
    const localeValue = this.props.locale

    const wrapperStyles = {
      position: `relative`,
      fontSize: `26px`,
      width: `30px`,
      height: `30px`,
      lineHeight: `30px`,
      textAlign: `center`
    }

    return (      
      <Select
        name="select-locale"
        className="select-app-locale"
        value={ localeValue }
        onChange={ this.handleChange }
        searchable={ false }
        multiple={ false }
        arrowRenderer={ null }
        clearable={ false }
        valueComponent={ SelectValue }
        wrapperStyle={ wrapperStyles }
        options={[
          { value: 'en', label: 'English' },
          { value: 'lt', label: 'Lithuanian' },
        ]}
      />
    )
  }
}

SelectLocale.propTypes = {
  locale: PropTypes.string
}

SelectLocale.defaultProps = {
  locale: 'en'
}

function mapStateToProps(state) {
  const { i18nState } = state
  return {
    locale: i18nState.lang
  }
}

export default connect(mapStateToProps)(SelectLocale)
