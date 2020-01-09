import { IServiceResponse } from './types'
import { config } from '../helpers'

export const authService = {
  login,
  logout,
}

/**
 * Login user service.
 *
 * @param {string} username
 *   Username.
 * @param {string} password
 *   Password
 */
async function login(username: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }

  const res = await fetch(`${config.baseServerUrl}/api/auth`, requestOptions)
  const resJson: IServiceResponse = await res.json()
  // Login successful if there's a jwt token in the response.
  if (resJson && resJson.data && resJson.data.token) {
    // Store user details and jwt token in local storage to keep user logged in between page refreshes.
    localStorage.setItem('user', JSON.stringify(resJson.data))
  }

  return resJson
}

/**
 * Logout user service.
 */
function logout() {
  // Remove user from local storage to log user out.
  localStorage.removeItem('user')
}
