
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
        // If can't get current location
        console.warn(err.message)
        getLocationFromApi()
          .then(loc => {
            resolve({lat: loc.latitude, lng: loc.longitude})
          })

      })
    }
    else {
      console.warn('Browser doesn\'t support Geolocation')
      getLocationFromApi()
        .then(loc => {
          resolve({lat: loc.latitude, lng: loc.longitude})
        })
    }
  })
}

function getLocationFromApi() {

  return fetch(`https://ipapi.co/json/`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json()
    })
}
