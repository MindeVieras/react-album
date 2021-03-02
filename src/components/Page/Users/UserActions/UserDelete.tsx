import React, { FunctionComponent } from 'react'
import { Translate } from 'react-redux-i18n'
import { Tooltip, Modal } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

import { IUserProps } from '../../../../services'

interface IUserDeleteProps {
  user: IUserProps
}

const { confirm } = Modal

export const UserDelete: FunctionComponent<IUserDeleteProps> = ({ user }) => {
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
        return func()
      },
    });
  }

  return (
    <div>
      <Tooltip title={<Translate value="tooltip.userDelete" />} placement="bottom">
        <DeleteTwoTone twoToneColor="red" onClick={showDeleteConfirm} style={{ fontSize: 18 }} />
      </Tooltip>
    </div>
  )
}
