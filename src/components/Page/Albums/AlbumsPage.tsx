import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { setAppTitle } from '../../../actions'
import { PageWrapper } from '../PageWrapper'

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

  return <PageWrapper sidebar={'asdada'}>Albums page</PageWrapper>
}
