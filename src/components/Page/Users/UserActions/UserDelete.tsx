import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Translate } from 'react-redux-i18n'
import { Modal } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

import { IUserProps } from '../../../../services'
import { usersDelete } from '../../../../actions'
import { Tip } from '../../../Ui'

interface IUserDeleteProps {
  user: IUserProps
}

const { confirm } = Modal

export const UserDelete: FunctionComponent<IUserDeleteProps> = ({ user }) => {
  const dispatch = useDispatch()
  /**
   * Show delete confirmation modal.
   */
  function showDeleteConfirm() {
    confirm({
      title: <Translate value="modal.userDelete.title" username={user.username} />,
      content: <Translate value="modal.userDelete.content" />,
      okText: <Translate value="modal.userDelete.ok" />,
      okType: 'danger',
      cancelText: <Translate value="modal.userDelete.cancel" />,
      onOk(func) {
        dispatch(usersDelete([user.id]))
        return func()
      },
    });
  }

  return (
    <Tip content={<Translate value="tooltip.userDelete" />}>
      <DeleteTwoTone twoToneColor="red" onClick={showDeleteConfirm} style={{ fontSize: 18 }} />
    </Tip>
  )
}
