import { IResponsePager } from '../services'

/**
 * Generic reducer list.
 */
export interface IReducerList<T> {
  loading?: boolean
  error?: string
  items: T[]
  pager: IResponsePager
}

/**
 * Generic reducer selected item.
 */
export interface IReducerSelected<T> {
  loading?: boolean
  error?: string
  item: T
}
