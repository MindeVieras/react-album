
import { authHeader, baseServerUrl } from '../_helpers'

export const mediaService = {
  save,
  attach
}

function save(file, user_id, content_type) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, user_id, content_type })
  }
  return fetch(baseServerUrl+'/api/media/save', requestOptions).then(handleResponse)
}

function attach(media_id, entity_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id, entity_id })
  }
  return fetch(baseServerUrl+'/api/media/attach', requestOptions).then(handleResponse)
}

function handleResponse(response) {
  // console.log(response);
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }

  return response.json()
}
