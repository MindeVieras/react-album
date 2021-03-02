import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submit } from 'redux-form'
import { useHistory } from 'react-router-dom'
import { Translate } from 'react-redux-i18n'
import { LocationDescriptorObject } from 'history'
import { Tooltip, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'

import UsersCreateForm from '../../../Form/UserAddForm'
import { IStoreState } from '../../../../reducers'
import { IUserProps } from '../../../../services'

interface IUserEditProps {
  user: IUserProps
}

export const UserEdit: FunctionComponent<IUserEditProps> = ({ user }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userAddForm = useSelector((state: IStoreState) => state.form.userAdd)

  // Modal open/close state.
  const [open, setOpen] = useState(false)

  // Determine if current location hash id #edit and search param is user id.
  const isEditPath = history.location.hash === '#edit' && history.location.search === `?${user.id}`

  /**
   * Set location path hash to #edit.
   */
  const handleOpen = () => {
    setOpen(true)
    const openLocation: LocationDescriptorObject = {
      pathname: history.location.pathname,
      search: user.id,
      hash: '#edit',
    }
    history.push(history.createHref(openLocation))
  }

  /**
   * On modal close go back to original location.
   */
  const handleClose = () => {
    setOpen(false)
    history.push(history.location.pathname)
  }

  return (
    <div>
      <Tooltip title={<Translate value="tooltip.userEdit" />} placement="bottom">
        <EditTwoTone onClick={handleOpen} style={{ fontSize: 18 }} />
      </Tooltip>
      <Modal
        visible={open || isEditPath}
        title={<Translate value="modal.userEdit.title" username={user.username} />}
        cancelText={<Translate value="button.cancel" />}
        onCancel={handleClose}
        okText={<Translate value="button.create" />}
        okButtonProps={{ loading: userAddForm && userAddForm.submitting }}
        onOk={() => dispatch(submit('userAdd'))}
        width={640}
      >
        <UsersCreateForm />
      </Modal>
    </div>
  )
}
