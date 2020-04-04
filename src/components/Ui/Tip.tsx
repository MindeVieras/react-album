import React, { FunctionComponent, ReactNode } from 'react'
import ReactTooltip, { Effect } from 'react-tooltip'

/**
 * Tip props.
 */
interface ITipProps {
  children: ReactNode
  id: string
  effect?: Effect
  delayShow?: number
}

export const Tip: FunctionComponent<ITipProps> = ({
  children,
  effect = 'solid',
  delayShow = 750,
  ...otherProps
}) => {
  return (
    <ReactTooltip effect={effect} delayShow={delayShow} {...otherProps}>
      {children}
    </ReactTooltip>
  )
}
