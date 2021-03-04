import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submit } from 'redux-form'
import { useHistory } from 'react-router-dom'
import { Translate } from 'react-redux-i18n'
import { LocationDescriptorObject } from 'history'
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import UserCreateForm from '../../../Form/UserAddForm'
import { IStoreState } from '../../../../reducers'
import { Tip } from '../../../Ui'

export function UserAdd() {
  const history = useHistory()
  const dispatch = useDispatch()
  const userAddForm = useSelector((state: IStoreState) => state.form.userAdd)

  // Modal open/close state.
  const [open, setOpen] = useState(false)

  // Determine if current location hash id #add.
  const isAddPath = history.location.hash === '#add'

  /**
   * Set location path hash to #add.
   */
  const handleOpen = () => {
    setOpen(true)
    const openLocation: LocationDescriptorObject = {
      pathname: history.location.pathname,
      hash: '#add',
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
      <Tip content={<Translate value="tooltip.userAdd" />}>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={handleOpen} />
      </Tip>
      <Modal
        visible={open || isAddPath}
        title={<Translate value="modal.userAdd.title" />}
        cancelText={<Translate value="button.cancel" />}
        onCancel={handleClose}
        okText={<Translate value="button.create" />}
        okButtonProps={{ loading: userAddForm && userAddForm.submitting }}
        onOk={() => dispatch(submit('userAdd'))}
        width={640}
      >
        <UserCreateForm />
      </Modal>
    </div>
  )
}
