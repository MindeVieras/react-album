import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLocale, Translate } from 'react-redux-i18n'
import { Tooltip, Menu, Dropdown, Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'

import { Locale } from '../../../helpers'

interface ILanguageSelectorProps {
  buttonProps?: ButtonProps
  onChange?(code: string): void
}

export const LanguageSelector: FunctionComponent<ILanguageSelectorProps> = (props) => {
  const dispatch = useDispatch()

  // Get available languages.
  const availableLanguages = Locale.getAvailableLanguages()

  const currentLanguage = Locale.getLocalLanguage()

  const [code, setCode] = useState(currentLanguage)

  const handleChange = (langCode: string) => {
    Locale.setLocalLanguage(langCode)
    dispatch(setLocale(langCode))
    setCode(langCode)
    if (props.onChange) {
      props.onChange(langCode)
    }
  }
  const menu = (
    <Menu>
      {availableLanguages.map((l) => {
        return (
          <Menu.Item key={l.code} onClick={() => handleChange(l.code)}>
            {l.nativeName}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Tooltip title={<Translate value="tooltip.changeLanguage" />}>
        <Button type="link" {...props.buttonProps}>
          {code.toUpperCase()}
        </Button>
      </Tooltip>
    </Dropdown>
  )
}
