
import { authHeader, baseServerUrl } from 'Helpers'

export const userService = {
  getList,
  getOne,
  create,
  update,
  delete: _delete
}

function getList() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/users/get-list`, requestOptions).then(handleResponse)
}

function getOne(username) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/users/get-one/${username}`, requestOptions).then(handleResponse)
}

function create(user) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  return fetch(`${baseServerUrl}/api/users/create`, requestOptions).then(handleResponse)
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/users/delete/${id}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  // console.log(response);
  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.json()
}
