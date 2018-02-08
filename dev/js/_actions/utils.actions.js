
import { utilsConstants } from '../_constants'
import { utilsService } from '../_services'

export const utilsActions = {
  getAppSettings,
  getAdminSettings,
  setAdminSetting,
  saveAdminSetting
}

function getAppSettings() {
  return dispatch => {
    utilsService.getAppSettings()
      .then(function(res) {
        dispatch(get(res.data))
      })
  }
  function get(settings) { return { type: utilsConstants.GET_APP_SETTINGS, settings } }
}

function getAdminSettings(id) {
  return dispatch => {
    utilsService.getAdminSettings(id)
      .then(function(res) {
        dispatch(get(res.data))
      })
  }
  function get(settings) { return { type: utilsConstants.GET_ADMIN_SETTINGS, settings } }
}

function setAdminSetting(name, value) {
  return dispatch => {
    dispatch(set(name, value))
  }

  function set(name, value) { return { type: utilsConstants.SET_ADMIN_SETTING_SUCCESS, name, value } }
}

function saveAdminSetting(name, value, uid) {
  return dispatch => {
    // dispatch(request())

    utilsService.saveAdminSetting(name, value, uid)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(save(name, value))
        } else {
          // dispatch(failure(res.msg))
        }
      })
  }

  // function request() { return { type: userConstants.SET_SETTING_REQUEST } }
  function save(name, value) { return { type: utilsConstants.SET_ADMIN_SETTING_SUCCESS, name, value } }
  // function failure(err) { return { type: userConstants.SET_SETTING_FAILURE, err } }
}
