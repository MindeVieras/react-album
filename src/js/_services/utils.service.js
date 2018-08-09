
import { authHeader, baseServerUrl } from 'Helpers'

export const utilsService = {
  getAppSettings,
  getAdminSettings,
  saveAdminSetting,
  getFrontSettings,
  saveFrontSetting
}

function getAppSettings() {
  const requestOptions = {
    method: 'GET'
  }

  return fetch(`${baseServerUrl}/api/utils/app-settings`, requestOptions).then(handleResponse)
}

function getAdminSettings() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/utils/admin-settings`, requestOptions).then(handleResponse)
}

function saveAdminSetting(name, value) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, value })
  }

  return fetch(`${baseServerUrl}/api/utils/admin-settings`, requestOptions).then(handleResponse)
}

function getFrontSettings(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${baseServerUrl}/api/utils/front-settings`, requestOptions).then(handleResponse)
}

function saveFrontSetting(name, value, uid) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, value })
  }

  return fetch(`${baseServerUrl}/api/utils/front-settings`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText)
  }

  return response.json()
}
