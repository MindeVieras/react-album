
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
      let pos = {
        lat: 0,
        lng: 0
      }

      cb(null, pos)
    })
  } else {
    // Browser doesn't support Geolocation
    console.log('Your browser doesn\'t support Geolocation')
    let pos = {
      lat: 0,
      lng: 0
    }

    cb(null, pos)
  }
}


