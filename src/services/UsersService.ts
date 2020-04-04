import { IResponsePaginatedData, IRequestGetListParams } from './types'
import { ApiService } from './ApiService'
import { IFormUserAddValues } from '../components/Form/UserAddForm'
import { UserRoles, UserStatus } from '../enums'

export interface IUserProps {
  id: string
  username: string
  initials: string
  role: UserRoles
  status: UserStatus
  lastLogin?: Date
  updatedAt: Date
  createdAt: Date
  profile?: {
    email?: string
    displayName?: string
    locale?: string
  }
}

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

  /**
   * Create user.
   *
   * @param {IFormUsersCreateValues} values
   *   Url parameters for requesting lists from API.
   *
   * @returns {Promise<IResponse<IUserProps>>}
   *   Response promise including paginated list of users.
   */
  public async create(values: IFormUserAddValues) {
    const res = await this.post<IFormUserAddValues, IUserProps>('users', values)
    return res
  }
}
