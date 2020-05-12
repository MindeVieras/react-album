import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Empty, PageHeader, Spin } from 'antd'

import { IAlbumSelectedProps } from '../../../reducers'
import { albumsGetOne } from '../../../actions'
import { AlbumMedia } from './AlbumMedia'
import { UploadMediaButton } from '../../Ui'

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
  const dispatch = useDispatch()

  const albumId = album?.id
  const albumLoaded = album?.isLoaded

  useEffect(() => {
    // Load album only if not already loaded.
    if (albumId && !albumLoaded) {
      dispatch(albumsGetOne(albumId))
    }
  }, [albumId, albumLoaded, dispatch])

  if (album) {
    return (
      <Spin spinning={Boolean(album.loading)} size="large">
        <PageHeader title={album.name} extra={<UploadMediaButton />} />
        <AlbumMedia media={album.media} albumId={album.id} />
      </Spin>
    )
  }
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No album selected" />
}
