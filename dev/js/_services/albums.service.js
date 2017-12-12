
import { authHeader, baseServerUrl } from '../_helpers'

export const albumsService = {
  create,
  getList,
  getOne,
  delete: _delete
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

function getOne(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/get-one/'+id, requestOptions).then(handleResponse)
}

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/delete/'+id, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }

  return response.json()
}
