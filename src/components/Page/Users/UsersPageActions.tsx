import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { IResponsePager } from '../../../services'
import { usersGetList } from '../../../actions'
import { UserAdd } from './UserAdd'
import { FilterItemsPerPage } from '../../Ui'

interface IUsersPageActionsProps {
  pager: IResponsePager
}

/**
 * Users pagination component.
 *
 * @returns {FunctionComponent<IUsersPageActionsProps>}
 *   Functional 'UsersPageActions' component.
 */
export const UsersPageActions: FunctionComponent<IUsersPageActionsProps> = (props) => {
  const dispatch = useDispatch()
  const { total, limit } = props.pager

  const handleChangeRowsPerPage = (value: number) => {
    dispatch(
      usersGetList({
        limit: value,
        offset: 0,
      }),
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* Filters. */}
      <div>
        <FilterItemsPerPage total={total} limit={limit} onChange={handleChangeRowsPerPage} />
      </div>
      {/* Actions. */}
      <div style={{ marginLeft: 16 }}>
        <UserAdd />
      </div>
    </div>
  )
}
