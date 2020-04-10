import { IResponsePager } from '../services'

/**
 * Generic reducer list.
 */
export interface IReducerList<T> {
  loading?: boolean
  error?: string
  items: T[]
}

/**
 * Paginated reducer list.
 */
export interface IReducerPaginatedList<T> {
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

/**
 * Generic reducer selected item.
 */
export interface IReducerSelectedItem {
  selected?: boolean
  loading?: boolean
  isLoaded?: boolean
  error?: string
}
