
import { authHeader, baseServerUrl } from '../../_helpers'

export const frontService = {
  getList
}

function getList(page, limit, media_limit) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, limit, media_limit })
  }

  return fetch(baseServerUrl+'/api/front/albums/get-list', requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }

  return response.json()
}
