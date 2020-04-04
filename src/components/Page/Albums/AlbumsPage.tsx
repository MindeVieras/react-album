import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setAppTitle } from '../../../actions'
import { PageWrapper } from '../PageWrapper'
import { AlbumsList } from './AlbumsList'
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

  const windowSize = useSelector((state: IStoreState) => state.ui.dimensions)
  const sidebarWidth = useSelector((state: IStoreState) => state.ui.siderWidth)

  useEffect(() => {
    // Set app title for this page.
    dispatch(setAppTitle('Albums'))
  }, [dispatch])

  return (
    <PageWrapper
      sidebar={
        <AlbumsList height={windowSize.height - UiSizes.headerHeight} width={sidebarWidth} />
      }
    >
      Albums page
    </PageWrapper>
  )
}
