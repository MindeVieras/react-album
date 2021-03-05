import React, { FunctionComponent } from 'react'
import { List, Avatar, Spin } from 'antd'

import { IUserProps } from '../../../services'
import { UserEdit } from './UserActions/UserEdit'
import { UserDelete } from './UserActions/UserDelete'

interface IUsersListProps {
  items?: IUserProps[]
  loading?: boolean
}

/**
 * Users list component.
 *
 * @returns {FunctionComponent<IUsersListProps>}
 *   Functional 'UsersList' component.
 */
export const UsersList: FunctionComponent<IUsersListProps> = (props) => {
  const { items, loading } = props
  return (
    <List
      itemLayout="horizontal"
      loading={loading}
      dataSource={items}
      renderItem={(item) => {
        const { profile, loading } = item
        return (

          <Spin spinning={Boolean(loading)}>
            <List.Item actions={[
              <UserEdit user={item} />,
              <UserDelete user={item} />
            ]}>
              <List.Item.Meta
                avatar={<Avatar>{item.initials}</Avatar>}
                title={item.username}
                description={(profile && profile.displayName) ?? '-'}
              />
            </List.Item>
          </Spin>
        )
      }}
    />
  )
}
