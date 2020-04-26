import React, { FunctionComponent } from 'react'

import { IMediaProps, IMediaSubmitProps } from '../../../services'

interface IMediaItemProps {
  mediaItem: IMediaProps | IMediaSubmitProps
}

export const MediaItem: FunctionComponent<IMediaItemProps> = ({ mediaItem }) => {
  // Handle media item that is already saved on server.
  if (typeof mediaItem.id === 'string') {
    const item = mediaItem as IMediaProps
    return (
      <div>
        {item.name} - {item.metadata.width}
      </div>
    )
  }

  const item = mediaItem as IMediaSubmitProps
  // Handle just uploaded media items.
  return <div>{item.name}</div>
}
