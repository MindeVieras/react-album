
import { authHeader, baseServerUrl } from '../../_helpers'

export const mediaService = {
  setLocation,
  updateLocation,
  removeLocation,
  putToTrash,
  moveMedia,
  generateImageThumbs,
  generateVideos,
  saveMetadata,
  saveRekognitionLabels
}

function setLocation(media_id, location) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id, location })
  }

  return fetch(`${baseServerUrl}/api/media/set-location`, requestOptions).then(handleResponse)
}

function updateLocation(media_id, location) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id, location })
  }

  return fetch(`${baseServerUrl}/api/media/update-location`, requestOptions).then(handleResponse)
}

function removeLocation(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/media/remove-location/${id}`, requestOptions).then(handleResponse)
}

// Puts media file to trash
function putToTrash(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(`${baseServerUrl}/api/media/put-to-trash`, requestOptions).then(handleResponse)
}

// Moves media to another album
function moveMedia(media_id, album_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id, album_id })
  }
  return fetch(`${baseServerUrl}/api/media/move`, requestOptions).then(handleResponse)
}

// Generates image Thumbnails
function generateImageThumbs(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(`${baseServerUrl}/api/media/generate-image-thumbs`, requestOptions).then(handleResponse)
}

// Generates videos
function generateVideos(key) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ key })
  }
  return fetch(`${baseServerUrl}/api/media/generate-videos`, requestOptions).then(handleResponse)
}

// Saves media metadata to DB
function saveMetadata(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(`${baseServerUrl}/api/media/save-metadata`, requestOptions).then(handleResponse)
}

// Saves rekognition labels to DB
function saveRekognitionLabels(media_id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  }
  return fetch(`${baseServerUrl}/api/media/save-rekognition-labels`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText)
  }
  return response.json()
}
