
import { authHeader, baseServerUrl } from 'Helpers'

export const loginService = {
  login,
  logout
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return fetch(`${baseServerUrl}/api/auth`, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json()
    })
    .then(res => {
      let user = res.data
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }

      return res
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}
