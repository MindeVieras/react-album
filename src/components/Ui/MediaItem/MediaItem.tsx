import React, { FunctionComponent } from 'react'
import { Spin, Typography } from 'antd'

import { IMediaSubmitProps, MediaItem as MediaItemType } from '../../../services'
import { Filesize } from './Filesize'
import { MediaItemRemove } from './MediaItemRemove'
import { MediaItemProgress } from './MediaItemProgress'
import { MediaItemThumbnail } from './MediaItemThumbnail'

interface IMediaItemProps {
  mediaItem: MediaItemType
}

export const MediaItem: FunctionComponent<IMediaItemProps> = ({ mediaItem }) => {
  const { id, size, name, loading, error } = mediaItem

  let progress

  if (mediaItem.isUppy) {
    const item = mediaItem as IMediaSubmitProps
    progress = <MediaItemProgress progress={item.progress} />
  }

  return (
    <div
      style={{
        position: 'relative',
        border: `1px solid ${error ? 'red' : 'grey'}`,
        margin: 4,
        width: 150,
        height: 200,
        float: 'left',
      }}
    >
      <MediaItemRemove id={id} loading={Boolean(loading)} isUppy={mediaItem.isUppy} />
      <Spin spinning={Boolean(loading)} style={{ height: 100 }}>
        <MediaItemThumbnail width={150} height={100} mediaItem={mediaItem} />
        <div style={{ padding: 6 }}>
          <Typography style={{ fontSize: 11, letterSpacing: -0.5 }}>{name}</Typography>
          <Filesize size={size} />
          {progress}
        </div>
      </Spin>
    </div>
  )
}
