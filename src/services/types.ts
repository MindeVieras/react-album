import { UserRoles, UserStatus } from '../enums'

/**
 * Response status values.
 */
export enum ResponseStatus {
  success = 'SUCCESS',
  clientError = 'CLIENT_ERROR',
  serverError = 'SERVER_ERROR',
}

/**
 * API response.
 */
export interface IResponse<T> {
  status: ResponseStatus
  message?: string
  data?: T
  errors?: { [name: string]: string }
  code?: number | string
  stack?: string
}

export interface IResponsePager {
  total: number
  limit: number
  offset: number
}

export interface IResponsePaginatedData<T> extends IResponsePager {
  docs: T[]
}

export interface IRequestGetListParams {
  limit?: number
  offset?: number
  sort?: string
}

/**
 * Auth response data.
 */
export interface IAuthResponseData {
  username?: string
  token?: string
  initials?: string
  role?: UserRoles
  status?: UserStatus
  lastLogin?: Date
  updatedAt?: Date
  createdAt?: Date
  profile?: {
    email?: string
    displayName?: string
    locale?: string
  }
}
