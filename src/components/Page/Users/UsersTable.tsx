import React, { FunctionComponent } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Avatar from '@material-ui/core/Avatar'
import Fade from '@material-ui/core/Fade'

interface IUsersTableProps {
  items?: IUserProps[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 500,
    },
    tableAvatar: {
      width: 1,
      whiteSpace: 'nowrap',
    },
  }),
)

/**
 * Users table component.
 *
 * @returns {FunctionComponent}
 *   Functional 'UsersTable' component.
 */
const UsersTable: FunctionComponent<IUsersTableProps> = (props) => {
  const classes = useStyles()
  const { items } = props
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items &&
            items.map((item) => (
              <Fade in={true} timeout={500} key={item.username}>
                <TableRow>
                  <TableCell className={classes.tableAvatar}>
                    <Avatar>{item.initials}</Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.username}
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              </Fade>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
