
import { authHeader, baseServerUrl } from '../../_helpers'

export const mediaService = {
  save,
  putToTrash,
  generateImageThumbs,
  generateVideos,
  saveMetadata,
  saveRekognitionLabels
}

// Saves media file on upload
function save(file, user_id, content_type) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, user_id, content_type })
  }
  return fetch(baseServerUrl+'/api/media/save', requestOptions).then(handleResponse)
}

// Puts media file to trash
function putToTrash(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(baseServerUrl+'/api/media/put-to-trash', requestOptions).then(handleResponse)
}

// Generates image Thumbnails
function generateImageThumbs(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(baseServerUrl+'/api/media/generate-image-thumbs', requestOptions).then(handleResponse)
}

// Generates videos
function generateVideos(key) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ key })
  }
  return fetch(baseServerUrl+'/api/media/generate-videos', requestOptions).then(handleResponse)
}

// Saves media metadata to DB
function saveMetadata(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(baseServerUrl+'/api/media/save-metadata', requestOptions).then(handleResponse)
}

// Saves rekognition labels to DB
function saveRekognitionLabels(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(baseServerUrl+'/api/media/save-rekognition-labels', requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }
  return response.json()
}
