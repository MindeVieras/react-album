import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { PageWrapper } from '../PageWrapper'
import { setAppTitle } from '../../../actions'

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
 * @route /trash
 *
 * @returns {FunctionComponent}
 *   Functional 'TrashPage' component.
 */
export const TrashPage: FunctionComponent = () => {
  const classes = styles({})
  const dispatch = useDispatch()

  useEffect(() => {
    // Set app title for this page.
    dispatch(setAppTitle('Trash'))
  }, [dispatch])

  return (
    <PageWrapper>
      <div className={classes.root}>
        <Paper className={classes.container}>Trash page!!!</Paper>
      </div>
    </PageWrapper>
  )
}
