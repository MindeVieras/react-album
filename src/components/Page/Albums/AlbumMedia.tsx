import React, { FunctionComponent } from 'react'

import { MediaItem } from '../../Ui'
import { MediaItem as MediaItemType } from '../../../services/MediaService'

interface IAlbumMediaProps {
  albumId: string
  media?: MediaItemType[]
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
