import { IResponsePaginatedData, IRequestGetListParams } from './types'
import { ApiService } from './ApiService'

export class UsersService extends ApiService {
  constructor(authed: boolean = true) {
    super(authed)
  }

  public async getList(params?: IRequestGetListParams) {
    const res = await this.get<IResponsePaginatedData<IUserProps>>('users', {
      params,
    })
    return res
  }
}
