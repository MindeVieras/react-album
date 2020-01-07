import React from 'react'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `10% ${theme.spacing()}px`,
      overflow: 'auto',
      height: '100vh',
    },
    container: {
      maxWidth: 360,
      padding: theme.spacing(3),
      margin: '0 auto',
    },
  }),
)

/**
 * Trash page component.
 *
 * @param {Props} props
 *   Component props.
 *
 * @returns {JSX.Element}
 *   Jsx html page.
 */
const Trash = (): JSX.Element => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>Trash page!!!</Paper>
    </div>
  )
}

export default Trash
