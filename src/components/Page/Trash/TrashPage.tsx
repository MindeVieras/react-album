import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { I18n } from 'react-redux-i18n'

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
    dispatch(setAppTitle(I18n.t('pages.trash.title')))
  }, [dispatch])

  return <PageWrapper>Trash page!!!</PageWrapper>
}
