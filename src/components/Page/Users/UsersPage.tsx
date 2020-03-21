import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Alert from '@material-ui/lab/Alert'

import { setAppTitle, usersGetList } from '../../../actions'
import MainLayout from '../../MainLayout'
import { IStoreState, IReducerList } from '../../../reducers'
import { IRequestGetListParams } from '../../../services'
import { PageWrapper } from '../PageWrapper'
import UsersTable from './UsersTable'
import UsersPagination from './UsersPagination'
import UsersHeader from './UsersHeader'
import { UsersAdd } from './UsersAdd'

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
        <PageWrapper>
          <UsersHeader title={'Users'} pager={pager} />
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Fragment>
              <UsersTable items={items} />
              {pager.total > pager.limit && (
                <UsersPagination pager={pager} onChangePage={this.handleChangePage} />
              )}
              <UsersAdd />
            </Fragment>
          )}
        </PageWrapper>
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
