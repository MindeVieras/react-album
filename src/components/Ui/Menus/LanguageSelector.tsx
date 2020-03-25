import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { setLocale } from 'react-redux-i18n'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { Locale } from '../../../helpers'

export const LanguageSelector: FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const dispatch = useDispatch()

  // Get available languages.
  const availableLanguages = Locale.getAvailableLanguages()

  const currentLanguage = Locale.getLocalLanguage()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleItemClick = (l: string) => {
    Locale.setLocalLanguage(l)
    dispatch(setLocale(l))
    setAnchorEl(null)
  }

  return (
    <div>
      <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleClick}>
        {currentLanguage}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {availableLanguages.map((l) => {
          return (
            <MenuItem key={l.code} onClick={() => handleItemClick(l.code)}>
              {l.nativeName}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
