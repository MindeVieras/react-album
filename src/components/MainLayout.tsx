import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import Fullscreen from 'react-full-screen'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { AppHeader } from './Ui'
import { IStoreState } from '../reducers'

/**
 * Main layout props.
 */
interface IMainLayoutProps {
  isFullScreen: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .fullscreen-enabled': {
        background: theme.palette.background.default,
      },
    },
  }),
)

/**
 *
 * Main Layout component.
 *
 * @param props
 */
const MainLayout: FunctionComponent<IMainLayoutProps> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Fullscreen enabled={props.isFullScreen}>
        <AppHeader />
        {props.children}
      </Fullscreen>
    </div>
  )
}

/**
 * Create props for the component from the redux store.
 *
 * @param {IStoreState} state
 *   Global redux state.
 */
const mapStateToProps = (state: IStoreState): { isFullScreen: boolean } => {
  return {
    isFullScreen: state.client.fullScreen,
  }
}

export default connect(mapStateToProps)(MainLayout)
