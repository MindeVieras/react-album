import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { setLocale } from 'react-redux-i18n'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { IconButton } from '@material-ui/core'

import Translate from '@material-ui/icons/Translate'

import { Locale } from '../../../helpers'

interface ILanguageSelectorProps {
  type?: 'icon'
}

export const LanguageSelector: FunctionComponent<ILanguageSelectorProps> = (props) => {
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
      {props.type && props.type === 'icon' ? (
        <IconButton
          color="inherit"
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Translate />
        </IconButton>
      ) : (
        <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleClick}>
          {currentLanguage}
        </Button>
      )}

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
