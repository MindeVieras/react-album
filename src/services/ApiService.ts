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
   *   Request url.
   * @param {AxiosRequestConfig} config
   *   Request configuration.
   *
   * @returns {Promise<IResponse<T>>}
   *   Generic response promise.
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    // Reset isSuccess to false.
    this.isSuccess = false

    // Get response with axios.
    const axiosResponse = await this.req.get<IResponse<T>>(url, config)
    const res = axiosResponse.data

    // Set successful response.
    if (res.status === ResponseStatus.success) {
      this.isSuccess = true
    }
    return res
  }

  /**
   * POST method.
   *
   * @param {string} url
   *   Request url.
   * @param {AxiosRequestConfig} config
   *   Request configuration.
   *
   * @returns {Promise<IResponse<T>>}
   *   Generic response promise.
   */
  protected async post<T, R>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<IResponse<R>> {
    // Reset isSuccess to false.
    this.isSuccess = false

    // Get response with axios.
    const axiosResponse = await this.req.post<IResponse<R>>(url, data, config)
    const res = axiosResponse.data

    // Set successful response.
    if (res.status === ResponseStatus.success) {
      this.isSuccess = true
    }
    return res
  }
}
