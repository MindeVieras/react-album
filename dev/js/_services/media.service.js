
import { authHeader, baseServerUrl } from '../_helpers'

export const mediaService = {
  save,
  saveImageMetadata
}

function save(file, user_id, content_type) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, user_id, content_type })
  }
  return fetch(baseServerUrl+'/api/media/save', requestOptions).then(handleResponse)
}

function saveImageMetadata(media_id, key) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id, key })
  }
  return fetch(baseServerUrl+'/api/media/save-image-metadata', requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }
  return response.json()
}
