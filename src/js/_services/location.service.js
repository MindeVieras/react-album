
export const locationService = {
  getCurrentLocation
}

function getCurrentLocation() {

  return new Promise((resolve, reject) => {
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        resolve(loc)
      }, err => {
        // If cant get current location
        console.warn(err.message)
        getLocationFromApi(loc => {
          resolve(loc)
        })

      })
    }
    else {
      console.warn('Browser doesn\'t support Geolocation')
      getLocationFromApi(loc => {
        resolve(loc)
      })
    }
  })
}

function getLocationFromApi(cb) {
  let location = {
    lat: 0,
    lng: 0
  }

  cb(location)
}
