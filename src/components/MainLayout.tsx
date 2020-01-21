import React, { FunctionComponent } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { AppHeader } from './Ui'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
)

const MainLayout: FunctionComponent = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppHeader />
      {props.children}
    </div>
  )
}

export default MainLayout
