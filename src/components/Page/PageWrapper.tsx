import React, { FunctionComponent } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(1),
    },
  }),
)

export const PageWrapper: FunctionComponent = (props) => {
  const classes = useStyles()
  return <Container className={classes.root}>{props.children}</Container>
}
