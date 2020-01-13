import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core'
import { Theme, createStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'

import { usersGetList } from '../../actions'
import MainLayout from '../MainLayout'
import { IStoreState, IReducerList } from '../../reducers'
import { IRequestGetListParams } from '../../services'
// import UsersTable from './UsersTable'

interface IUsersProps {
  usersGetList(params?: IRequestGetListParams): void
  // usersGetList: typeof usersGetList
  users: IReducerList<IUserProps>
  classes: {
    root: string
    container: string
    table: string
  }
}

const styles = (theme: Theme) =>
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
    table: {
      minWidth: 500,
    },
  })

/**
 * Users page component.
 *
 * @returns {FunctionComponent}
 *   Functional 'Users' component.
 */
class Users extends Component<IUsersProps> {
  constructor(props: IUsersProps) {
    super(props)

    props.usersGetList({ limit: props.users.pager.limit })
  }

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    // console.log(newPage)
    this.props.usersGetList({
      limit: this.props.users.pager.limit,
      page: newPage,
    })
  }

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.props.usersGetList({
      limit: parseInt(event.target.value),
      page: 1,
    })
  }

  // const classes = styles()
  // console.log(props)
  render() {
    // const classes = styles()
    const { items, pager } = this.props.users
    // const emptyRows = limit - Math.min(limit, total - page * limit)
    // console.log(pager.page)
    return (
      <MainLayout>
        <TableContainer component={Paper}>
          <Table className={this.props.classes.table} aria-label="users table">
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.username}>
                  <TableCell component="th" scope="row">
                    {item.username}
                  </TableCell>
                  <TableCell align="right">{item.initials}</TableCell>
                  <TableCell align="right">{item.role}</TableCell>
                </TableRow>
              ))}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
            {pager.total > 0 && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={pager.total}
                    rowsPerPage={pager.limit}
                    page={pager.page === pager.pages ? pager.page - 1 : pager.page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      </MainLayout>
    )
  }
}

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  // console.log(props)
  // const classes = useStyles1()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 1)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage)))
  }

  return (
    <div>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 1} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) + 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) + 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  )
}

/**
 * Create props for the component from the redux store.
 *
 * @param {IStoreState} state
 *   Global redux state.
 */
const mapStateToProps = (state: IStoreState): { users: IReducerList<IUserProps> } => {
  return {
    users: state.users.list,
  }
}

export default connect(mapStateToProps, { usersGetList })(withStyles(styles)(Users))
