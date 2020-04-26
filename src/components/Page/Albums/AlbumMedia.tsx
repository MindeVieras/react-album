import React, { FunctionComponent } from 'react'

import { MediaItem } from '../../Ui'
import { IMediaProps, IMediaSubmitProps } from '../../../services/MediaService'

interface IAlbumMediaProps {
  albumId: string
  media?: (IMediaProps | IMediaSubmitProps)[]
}

export const AlbumMedia: FunctionComponent<IAlbumMediaProps> = ({ albumId, media }) => {
  return (
    <div>
      {media?.map((m) => (
        <MediaItem key={m.id} mediaItem={m} />
      ))}
    </div>
  )
}
