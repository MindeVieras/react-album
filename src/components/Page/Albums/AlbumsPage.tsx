import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import MainLayout from '../../MainLayout'
import { setAppTitle } from '../../../actions'

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
 * @route /
 *
 * @returns {FunctionComponent}
 *   Functional 'AlbumsPage' component.
 */
export const AlbumsPage: FunctionComponent = () => {
  const classes = styles({})
  const dispatch = useDispatch()

  useEffect(() => {
    // Set app title for this page.
    dispatch(setAppTitle('Albums'))
  }, [dispatch])

  return (
    <MainLayout>
      <div className={classes.root}>
        <Paper className={classes.container}>Albums page</Paper>
      </div>
    </MainLayout>
  )
}
