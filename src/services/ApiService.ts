import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { config, authHeader } from '../helpers'
import { IResponse, IResponsePaginatedData, IRequestGetListParams } from './types'

export class ApiService {
  private req: AxiosInstance

  constructor(authed: boolean = false) {
    const instanceConfig: AxiosRequestConfig = {
      baseURL: `${config.baseServerUrl}/api`,
    }
    if (authed) {
      instanceConfig.headers = authHeader()
    }
    this.req = axios.create(instanceConfig)
  }

  public async getUsers(params?: IRequestGetListParams) {
    const res = await this.req.get<IResponse<IResponsePaginatedData<IUserProps>>>('users', {
      params,
    })
    return res.data
  }
}
