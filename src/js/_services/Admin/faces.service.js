
import { authHeader, baseServerUrl, handleResponse } from 'Helpers'

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
