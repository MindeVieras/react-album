import React, { FunctionComponent } from 'react'

import { IMediaProps, IMediaSubmitProps } from '../../../services'
import Thumbnail from './Thumbnail'

interface IMediaItemProps {
  mediaItem: IMediaProps | IMediaSubmitProps
}

export const MediaItem: FunctionComponent<IMediaItemProps> = ({ mediaItem }) => {
  // Handle media item that is already saved on server.
  if (typeof mediaItem.id === 'string') {
    const item = mediaItem as IMediaProps
    return (
      <div>
        <img src={`data:${item.mime};base64,${item.metadata.icon}`} />
      </div>
    )
  }

  const item = mediaItem as IMediaSubmitProps
  // Handle just uploaded media items.
  return (
    <div>
      <Thumbnail item={item} width={100} height={100} />
    </div>
  )
}
