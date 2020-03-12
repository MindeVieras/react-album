import React, { FunctionComponent } from 'react'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MainLayout from '../MainLayout'

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `10% ${theme.spacing()}px`,
      overflow: 'auto',
      height: '100vh',
    },
    container: {
      maxWidth: 780,
      padding: theme.spacing(3),
      margin: '0 auto',
    },
  }),
)

/**
 * Albums page component.
 *
 * @returns {FunctionComponent}
 *   Functional 'Albums' component.
 */
const Albums: FunctionComponent = () => {
  const classes = styles({})

  return (
    <MainLayout>
      <div className={classes.root}>
        <Paper className={classes.container}>Albums page</Paper>
      </div>
    </MainLayout>
  )
}

export default Albums
