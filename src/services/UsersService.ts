import { IResponsePaginatedData, IRequestGetListParams } from './types'
import { ApiService } from './ApiService'

/**
 * UsersService class.
 */
export class UsersService extends ApiService {
  constructor(authed: boolean = true) {
    super(authed)
  }

  /**
   * Gets list of users.
   *
   * @param {IRequestGetListParams} params
   *   Url parameters for requesting lists from API.
   *
   * @returns {Promise<IResponse<IResponsePaginatedData<IUserProps>>>}
   *   Response promise including paginated list of users.
   */
  public async getList(params?: IRequestGetListParams) {
    const res = await this.get<IResponsePaginatedData<IUserProps>>('users', {
      params,
    })
    return res
  }
}
