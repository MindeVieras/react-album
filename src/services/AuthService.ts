import { IAuthResponseData } from './types'
import { ApiService } from './ApiService'
import { IFormLoginValues } from '../components/Form/LoginForm'

/**
 * AuthService class.
 */
export class AuthService extends ApiService {
  constructor() {
    // Don't need to set authentication header.
    super(false)
  }

  /**
   * Auth login.
   *
   * @param {IFormLoginValues} values
   *   Authentication form data values.
   *
   * @returns {Promise<IResponse<IAuthResponseData>>}
   *   Response promise including paginated list of users.
   */
  public async login(values: IFormLoginValues) {
    const res = await this.post<IFormLoginValues, IAuthResponseData>('auth', values)
    // Login successful if there's a jwt token in the response.
    if (res.data && res.data.token) {
      // Store user details and jwt token in local storage
      // to keep user logged in between page refreshes.
      localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res
  }

  /**
   * Logout user.
   */
  public static logout() {
    // Remove user from local storage to log user out.
    localStorage.removeItem('user')
  }
}
