
// import { authHeader, baseServerUrl } from '../../_helpers'

export const locationService = {
  getCurrentLocation
}

function getCurrentLocation(cb) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      cb(null, pos)
    }, function() {
      console.log('not supported')
    })
  } else {
    // Browser doesn't support Geolocation
    cb('Your browser doesn\'t support Geolocation')
  }
}


