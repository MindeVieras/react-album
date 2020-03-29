import React, { FunctionComponent } from 'react'
import { List, Avatar } from 'antd'

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
        const { profile } = item
        return (
          <List.Item actions={['Edit']}>
            <List.Item.Meta
              avatar={<Avatar>{item.initials}</Avatar>}
              title={item.username}
              description={(profile && profile.displayName) ?? '-'}
            />
          </List.Item>
        )
      }}
    />
  )
}
