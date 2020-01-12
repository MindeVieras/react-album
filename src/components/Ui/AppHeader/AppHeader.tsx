import React, { FunctionComponent } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import MainMenu from '../Menus/MainMenu'

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
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Album
          </Typography>

          <div className={classes.menus}>
            <MainMenu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
