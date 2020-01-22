import React, { FunctionComponent } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
  }),
)

const PageContent: FunctionComponent = (props) => {
  const classes = useStyles()
  return <Container className={classes.root}>{props.children}</Container>
}

export default PageContent
