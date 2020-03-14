import React, { FunctionComponent, Fragment } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { IResponsePager } from '../../services'

interface IUsersPaginationProps {
  pager: IResponsePager
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
)

/**
 * Users pagination component.
 *
 * @returns {FunctionComponent}
 *   Functional 'UsersPagination' component.
 */
const UsersPagination: FunctionComponent<IUsersPaginationProps> = (props) => {
  const classes = useStyles()
  const { total, limit } = props.pager
  console.log(props.pager)
  const totalPages = Math.ceil(total / limit)

  return (
    <Fragment>
      {total > 0 && limit > 0 && (
        <div className={classes.root}>
          <Pagination count={totalPages} onChange={props.onChangePage} />
        </div>
      )}
    </Fragment>
  )
}

export default UsersPagination
