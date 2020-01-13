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
  page: number
  pages: number
}

export interface IResponsePaginatedData<T> extends IResponsePager {
  docs: T[]
}

export interface IRequestGetListParams {
  limit?: number
  page?: number
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
  createdBy?: string
  lastLogin?: Date
  updatedAt?: Date
  createdAt?: Date
  profile?: {
    email?: string
    displayName?: string
    locale?: string
  }
}
