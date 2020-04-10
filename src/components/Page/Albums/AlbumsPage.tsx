import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PageWrapper } from '../PageWrapper'
import { AlbumsList } from './AlbumsList'
import { AlbumInfo } from './AlbumInfo'
import { setAppTitle, albumsGetList } from '../../../actions'
import { IStoreState } from '../../../reducers'
import { UiSizes } from '../../../enums'

/**
 * Albums page component.
 *
 * @route /
 *
 * @returns {FunctionComponent}
 *   Functional 'AlbumsPage' component.
 */
export const AlbumsPage: FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Get list of albums.
    // Load only if no albums loaded yet.
    if (!items.length) {
      dispatch(albumsGetList({ limit: -1 }))
    }
  }, [dispatch])

  const windowSize = useSelector((state: IStoreState) => state.ui.dimensions)
  const sidebarWidth = useSelector((state: IStoreState) => state.ui.siderWidth)
  const { items, loading, error } = useSelector((state: IStoreState) => state.albums)

  const selectedAlbum = items.filter((a) => a.selected)[0]

  useEffect(() => {
    // Set app title for this page.
    dispatch(setAppTitle('Albums'))
  }, [dispatch])

  return (
    <PageWrapper
      sidebar={
        <AlbumsList
          height={windowSize.height - UiSizes.headerHeight}
          width={sidebarWidth}
          items={items}
          loading={loading}
          error={error}
        />
      }
    >
      <AlbumInfo album={selectedAlbum} />
    </PageWrapper>
  )
}
