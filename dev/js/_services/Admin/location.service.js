
import request from 'superagent'

// import { authHeader, baseServerUrl } from '../../_helpers'

export const locationService = {
  getCurrentLocation
}

function getCurrentLocation(cb) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let loc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      cb(loc)
    }, function() {
      // If cant get current location
      getLocationFromApi((loc) => {
        cb(loc)
      })

    })
  } else {
    // Browser doesn't support Geolocation
    getLocationFromApi((loc) => {
      cb(loc)
    })
  }
}

function getLocationFromApi(cb) {
  let location = {
    lat: 0,
    lng: 0
  }
  request
    .get('http://ip-api.com/json')
    .end((err, res) => {
      if (res.status === 200 && res.body.status == 'success') {
        location.lat = res.body.lat
        location.lng = res.body.lon
      }
      cb(location)
    })
}
