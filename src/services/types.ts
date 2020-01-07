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
export interface IServiceResponse {
  status: ServiceResponseStatus
  message: string
  data?: any
  errors?: { [name: string]: string }
  code?: number | string
  stack?: string
}
