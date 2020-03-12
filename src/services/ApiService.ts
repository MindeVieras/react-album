import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { config, authHeader } from '../helpers'

/**
 * Base ApiService class.
 */
export class ApiService {
  protected req: AxiosInstance

  constructor(authed: boolean) {
    const instanceConfig: AxiosRequestConfig = {
      baseURL: `${config.baseServerUrl}/api`,
    }
    if (authed) {
      instanceConfig.headers = authHeader()
    }
    this.req = axios.create(instanceConfig)
  }

  // isSuccess
}
