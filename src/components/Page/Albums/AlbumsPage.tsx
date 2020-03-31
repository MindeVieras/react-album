import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import MainLayout from '../../MainLayout'
import { setAppTitle } from '../../../actions'

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
    // Set app title for this page.
    dispatch(setAppTitle('Albums'))
  }, [dispatch])

  return <MainLayout>Albums page</MainLayout>
}
