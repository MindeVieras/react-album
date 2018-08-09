
import { authHeader, baseServerUrl } from 'Helpers'

export const albumsService = {
  create,
  getList, getListDates,
  getOne,
  rename, changeDate,
  setLocation, updateLocation, removeLocation,
  delete: _delete
}

function create(album) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(album)
  }

  return fetch(`${baseServerUrl}/api/albums/create`, requestOptions).then(handleResponse)
}


/*
 * Album list services
 * calls getList, getListDates
 */

function getList(start_date, end_date) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({start_date, end_date})
  }

  return fetch(`${baseServerUrl}/api/albums/list`, requestOptions).then(handleResponse)
}

function getListDates() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/albums/list-dates`, requestOptions).then(handleResponse)
}


/*
 * Album get one services
 * calls getOne
 */

function getOne(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/albums/one/${id}`, requestOptions).then(handleResponse)
}


/*
 * Album data services
 * calls rename, changeDate
 */

function rename(payload) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }

  return fetch(`${baseServerUrl}/api/albums/rename`, requestOptions).then(handleResponse)
}

function changeDate(payload) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }

  return fetch(`${baseServerUrl}/api/albums/change-date`, requestOptions).then(handleResponse)
}


/*
 * Album location services
 * calls setLocation, updateLocation, removeLocation
 */

function setLocation(album_id, location) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ album_id, location })
  }

  return fetch(`${baseServerUrl}/api/albums/set-location`, requestOptions).then(handleResponse)
}

function updateLocation(album_id, location) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ album_id, location })
  }

  return fetch(`${baseServerUrl}/api/albums/update-location`, requestOptions).then(handleResponse)
}

function removeLocation(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/albums/remove-location/${id}`, requestOptions).then(handleResponse)
}



function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/albums/move-to-trash/${id}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.json()
}
