
import { authHeader, baseServerUrl } from '../_helpers'

export const albumsService = {
  create,
  getList
}

function create(album) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(album)
  }

  return fetch(baseServerUrl+'/api/albums/create', requestOptions).then(handleResponse)
}

function getList() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/get-list', requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }

  return response.json()
}
