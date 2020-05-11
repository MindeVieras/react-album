import { IResponsePager } from '../services'

// General reducer loading/error state.
export interface IReducerRequestState {
  loading?: boolean
  error?: string
}

/**
 * Generic reducer list.
 */
export interface IReducerList<T> extends IReducerRequestState {
  items: T[]
}

/**
 * Paginated reducer list.
 */
export interface IReducerPaginatedList<T> extends IReducerRequestState {
  items: T[]
  pager: IResponsePager
}

/**
 * Generic reducer selected item.
 */
export interface IReducerSelected<T> extends IReducerRequestState {
  item: T
}

/**
 * Generic reducer selected item.
 */
export interface IReducerSelectedItem extends IReducerRequestState {
  selected?: boolean
  isLoaded?: boolean
}
