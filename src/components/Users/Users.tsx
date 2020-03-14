import React, { Component } from 'react'
import { connect } from 'react-redux'

import Alert from '@material-ui/lab/Alert'

import { setAppTitle, usersGetList } from '../../actions'
import MainLayout from '../MainLayout'
import { IStoreState, IReducerList } from '../../reducers'
import { IRequestGetListParams } from '../../services'
import PageContent from '../PageContent'
import UsersTable from './UsersTable'
import UsersPagination from './UsersPagination'
import UsersHeader from './UsersHeader'

interface IUsersProps {
  setAppTitle(title: string): void
  usersGetList(params?: IRequestGetListParams): void
  users: IReducerList<IUserProps>
}

/**
 * Users page component.
 *
 * @route /users
 *
 * @returns {FunctionComponent}
 *   Functional 'Users' component.
 */
class Users extends Component<IUsersProps> {
  constructor(props: IUsersProps) {
    super(props)

    props.setAppTitle('Users')
    props.usersGetList({ limit: props.users.pager.limit })
  }

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    this.props.usersGetList({
      limit: this.props.users.pager.limit,
      offset: (newPage - 1) * this.props.users.pager.limit,
    })
  }

  render() {
    const { items, pager, error } = this.props.users
    return (
      <MainLayout>
        <PageContent>
          <UsersHeader title={'Users'} pager={pager} />
          {error && <Alert severity="error">{error}</Alert>}
          <UsersTable items={items} />
          <UsersPagination pager={pager} onChangePage={this.handleChangePage} />
        </PageContent>
      </MainLayout>
    )
  }
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

export default connect(mapStateToProps, { setAppTitle, usersGetList })(Users)
