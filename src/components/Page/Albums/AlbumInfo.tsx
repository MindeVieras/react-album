import React, { FunctionComponent } from 'react'
import { Empty, PageHeader, Spin } from 'antd'

import { IAlbumSelectedProps } from '../../../reducers'
import AlbumMedia from './AlbumMedia'
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
  if (album) {
    return (
      <div>
        <PageHeader
          title={album.name}
          style={{ paddingLeft: 0, paddingRight: 0 }}
          extra={<UploadMediaButton />}
        />

        <Spin spinning={Boolean(album.loading)}>
          <AlbumMedia media={album.media} albumId={album.id} />
        </Spin>
      </div>
    )
  }
  return <Empty />
}
