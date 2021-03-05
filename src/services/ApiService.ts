import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { config, authHeader, Locale } from '../helpers'
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
      instanceConfig.headers = { ...instanceConfig.headers, ...authHeader() }
    }

    // Add accept-language header.
    instanceConfig.headers = {
      ...instanceConfig.headers,
      'Accept-Language': Locale.getLocalLanguage(),
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
    // Get response with axios.
    const axiosResponse = await this.req.post<IResponse<R>>(url, data, config)
    const res = axiosResponse.data

    // Set successful response.
    if (res.status === ResponseStatus.success) {
      this.isSuccess = true
    }
    return res
  }

  /**
   * PATCH method.
   *
   * @param {string} url
   *   Request url.
   * @param {AxiosRequestConfig} config
   *   Request configuration.
   *
   * @returns {Promise<IResponse<T>>}
   *   Generic response promise.
   */
  protected async patch<T, R>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<IResponse<R>> {
    // Get response with axios.
    const axiosResponse = await this.req.patch<IResponse<R>>(url, data, config)
    const res = axiosResponse.data

    // Set successful response.
    if (res.status === ResponseStatus.success) {
      this.isSuccess = true
    }
    return res
  }

  /**
   * DELETE method.
   *
   * @param {string} url
   *   Request url.
   *
   * @returns {Promise<void>}
   *   Promise that returns nothing.
   */
  protected async delete<T>(
    url: string,
    data: T,
  ): Promise<void> {
    // Get response with axios.
    const axiosResponse = await this.req.delete<void>(url, { data })

    // Set successful response ir response status is 204.
    if (axiosResponse.status === 204) {
      this.isSuccess = true
    }
  }
}
