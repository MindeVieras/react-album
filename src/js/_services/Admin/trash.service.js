
import { authHeader, baseServerUrl } from 'Helpers'

export const trashService = {
  getList,
  restore,
  delete: _delete
}

function getList() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/trash/get-list`, requestOptions).then(handleResponse)
}

function restore(id) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/trash/restore/${id}`, requestOptions).then(handleResponse)
}

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/trash/delete/${id}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.json()
}
