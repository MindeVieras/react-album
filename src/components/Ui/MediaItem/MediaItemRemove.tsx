import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Popconfirm } from 'antd'
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons'

import { MediaItem } from '../../../services'
import { mediaRemove } from '../../../actions'
import { Tip } from '../Tip'

interface IMediaItemRemoveProps {
  id: MediaItem['id']
  isUppy?: boolean
  loading?: boolean
}

export const MediaItemRemove: FunctionComponent<IMediaItemRemoveProps> = ({
  id,
  isUppy,
  loading,
}) => {
  const dispatch = useDispatch()

  // Popconfirm confirmation event callback.
  const onConfirm = () => {
    // Remove file from uploader.
    if (isUppy) {
      window.uploader.removeFile(id)
    }
    // Remove media item from the redux state.
    dispatch(mediaRemove(id, isUppy))
  }

  return (
    <Popconfirm
      title="Are you sure to remove this media?"
      onConfirm={onConfirm}
      okText="Yes"
      cancelText="No"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    >
      <div>
        {/* <Tip id={`tip_remove_media_${id}`}>Remove</Tip> */}
        <Tip content="remove">
          <Button
            type="primary"
            shape="circle"
            icon={<CloseOutlined />}
            size="small"
            disabled={loading}
            style={{
              position: 'absolute',
              right: -8,
              top: -8,
              width: 18,
              height: 18,
              minWidth: 18,
              fontSize: 10,
              zIndex: 1,
            }}
            data-tip
            data-for={`tip_remove_media_${id}`}
          /></Tip>
      </div>
    </Popconfirm>
  )
}
