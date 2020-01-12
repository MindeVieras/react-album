/**
 * Response status values.
 */
export enum ServiceResponseStatus {
  success = 'SUCCESS',
  clientError = 'CLIENT_ERROR',
  serverError = 'SERVER_ERROR',
}

/**
 * API error middleware response interface.
 */
export interface IServiceResponse<T> {
  status: ServiceResponseStatus
  message: string
  data?: T
  errors?: { [name: string]: string }
  code?: number | string
  stack?: string
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
