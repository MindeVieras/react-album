import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { PageWrapper } from '../PageWrapper'
import { setAppTitle } from '../../../actions'

/**
 * Trash page component.
 *
 * @route /trash
 *
 * @returns {FunctionComponent}
 *   Functional 'TrashPage' component.
 */
export const TrashPage: FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Set app title for this page.
    dispatch(setAppTitle('Trash'))
  }, [dispatch])

  return <PageWrapper>Trash page!!!</PageWrapper>
}
