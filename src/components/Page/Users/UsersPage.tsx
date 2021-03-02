import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Translate } from 'react-redux-i18n'
import { Alert, PageHeader, Tag, Pagination } from 'antd'

import { setAppTitle, usersGetList } from '../../../actions'
import { IStoreState, IReducerPaginatedList } from '../../../reducers'
import { IRequestGetListParams, IUserProps } from '../../../services'
import { PageWrapper } from '../PageWrapper'
import { UsersList } from './UsersList'
import { UsersPageActions } from './UsersPageActions'

interface IUsersProps {
  setAppTitle(title: string): void
  usersGetList(params?: IRequestGetListParams): void
  users: IReducerPaginatedList<IUserProps>
}

/**
 * Users page component.
 *
 * @route /users
 *
 * @returns {FunctionComponent}
 *   Functional 'Users' component.
 */
class UsersPage extends Component<IUsersProps> {
  constructor(props: IUsersProps) {
    super(props)

    props.setAppTitle('Users')
    props.usersGetList({ limit: props.users.pager.limit })
  }

  handleChangePage = (page: number) => {
    this.props.usersGetList({
      limit: this.props.users.pager.limit,
      offset: (page - 1) * this.props.users.pager.limit,
    })
  }

  render() {
    const { items, pager, error, loading } = this.props.users
    return (
      <PageWrapper>
        <PageHeader
          title={<Translate value="pages.users.title" />}
          tags={[
            <Tag key={1} color="geekblue">
              {pager.total}
            </Tag>,
          ]}
          extra={<UsersPageActions pager={pager} />}
          style={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        />
        {error ? (
          <Alert type="error" message={error} banner />
        ) : (
            <Fragment>
              <UsersList items={items} loading={loading} />
              <Pagination
                style={{ textAlign: 'center', marginTop: 16 }}
                current={pager.offset / pager.limit + 1}
                pageSize={pager.limit}
                total={pager.total}
                onChange={this.handleChangePage}
                hideOnSinglePage={true}
                showSizeChanger={false}
              />
            </Fragment>
          )}
      </PageWrapper>
    )
  }
}

/**
 * Create props for the component from the redux store.
 *
 * @param {IStoreState} state
 *   Global redux state.
 */
const mapStateToProps = (state: IStoreState): { users: IReducerPaginatedList<IUserProps> } => {
  return {
    users: state.users.list,
  }
}

export default connect(mapStateToProps, { setAppTitle, usersGetList })(UsersPage)
