import React, { FunctionComponent } from 'react'

import { IAlbumSelectedProps } from '../../../reducers'

interface IAlbumInfoProps {
  album?: IAlbumSelectedProps
}

/**
 * Albums info component.
 *
 * @route /
 *
 * @returns {FunctionComponent<IAlbumInfoProps>}
 *   Functional 'AlbumsInfo' component.
 */
export const AlbumInfo: FunctionComponent<IAlbumInfoProps> = ({ album }) => {
  if (album) {
    return (
      <div>
        <div>{album.id}</div>
        <div>{album.name}</div>
        <div>{album.createdAt}</div>
        <div>{album.error}</div>
      </div>
    )
  }
  return <div>Album is not selected</div>
}
