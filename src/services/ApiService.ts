import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { config, authHeader } from '../helpers'
import { IResponse, ResponseStatus } from './types'

/**
 * Base ApiService class.
 */
export class ApiService {
  // Set unsuccessful response by default.
  public isSuccess: boolean = false

  private req: AxiosInstance

  constructor(authed: boolean) {
    const instanceConfig: AxiosRequestConfig = {
      baseURL: `${config.baseServerUrl}/api`,
      validateStatus: (status) => {
        // Reject only if the status code is greater than 500.
        return status <= 500
      },
    }
    if (authed) {
      instanceConfig.headers = authHeader()
    }
    this.req = axios.create(instanceConfig)
  }

  /**
   * GET method.
   *
   * @param {string} url
   * @param {AxiosRequestConfig} config
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    const axiosResponse = await this.req.get<IResponse<T>>(url, config)
    const res = axiosResponse.data

    // Set successful response.
    if (res.status === ResponseStatus.success) {
      this.isSuccess = true
    }
    return res
  }
}
