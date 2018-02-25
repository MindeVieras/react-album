
import { authHeader, baseServerUrl } from '../../_helpers'

export const albumsService = {
  create,
  getList,
  getListDates,
  getOne,
  getLocations,
  removeLocation,
  setLocation,
  updateLocation,
  rename,
  changeDate,
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

function getList(start_date, end_date) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({start_date, end_date})
  }

  return fetch(baseServerUrl+'/api/albums/get-list', requestOptions).then(handleResponse)
}

function getListDates() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/get-list-dates', requestOptions).then(handleResponse)
}

function getOne(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/get-one/'+id, requestOptions).then(handleResponse)
}

function getLocations(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/get-locations/'+id, requestOptions).then(handleResponse)
}

function removeLocation(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/remove-location/'+id, requestOptions).then(handleResponse)
}

function setLocation(album_id, location) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ album_id, location })
  }

  return fetch(baseServerUrl+'/api/albums/set-location', requestOptions).then(handleResponse)
}

function updateLocation(album_id, location) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ album_id, location })
  }

  return fetch(baseServerUrl+'/api/albums/update-location', requestOptions).then(handleResponse)
}

function rename(name, id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, id })
  }

  return fetch(baseServerUrl+'/api/albums/rename', requestOptions).then(handleResponse)
}

function changeDate(payload) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }

  return fetch(baseServerUrl+'/api/albums/change-date', requestOptions).then(handleResponse)
}

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(baseServerUrl+'/api/albums/move-to-trash/'+id, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }

  return response.json()
}
