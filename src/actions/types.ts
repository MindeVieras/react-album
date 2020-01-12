import { IActionClientSetDimensions } from './client.actions'
import { IActionAuthSet, IActionAuthClear } from './auth.actions'

export enum ActionTypes {
  clientSetDimensions,
  authSet,
  authClear,
}

export type Action = IActionClientSetDimensions | IActionAuthSet | IActionAuthClear
