
import { authHeader, baseServerUrl } from 'Helpers'

export const facesService = {
  getCollection,
  deleteFace
}

function getCollection() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/faces/collection`, requestOptions).then(handleResponse)
}

function deleteFace(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/faces/collection/${id}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText)
  }
  return response.json()
}
