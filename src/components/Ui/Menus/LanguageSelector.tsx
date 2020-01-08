import React from 'react'
import { connect } from 'react-redux'
import { setLanguage } from 'redux-i18n'
import ISO6391 from 'iso-639-1'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { IStoreState } from '../../../reducers'

interface ILanguageSelectorProps {
  currentLanguage: string
  setLanguage: typeof setLanguage
}

const availableLanguages = ['en', 'ru', 'lt']

function LanguageSelector(props: ILanguageSelectorProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleItemClick = (l: string) => {
    props.setLanguage(l)
    setAnchorEl(null)
  }

  return (
    <div>
      <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleClick}>
        {props.currentLanguage}
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
            <MenuItem key={l} onClick={() => handleItemClick(l)}>
              {ISO6391.getNativeName(l)}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

function mapStateToProps(state: IStoreState) {
  return {
    currentLanguage: state.i18nState.lang,
  }
}

export default connect(mapStateToProps, { setLanguage })(LanguageSelector)
