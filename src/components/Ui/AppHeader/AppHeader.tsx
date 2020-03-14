import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

import MainMenu from '../Menus/MainMenu'
import { ButtonFullScreen } from '../ButtonFullScreen'
import { IStoreState } from '../../../reducers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menus: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export const AppHeader: FunctionComponent = () => {
  const appName = useSelector((state: IStoreState) => state.client.appName)
  const classes = useStyles()
  const trigger = useScrollTrigger()

  return (
    <div className={classes.root}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {appName}
            </Typography>

            <div className={classes.menus}>
              <ButtonFullScreen />
              <MainMenu />
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
    </div>
  )
}
