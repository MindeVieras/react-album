
import publicIp from 'public-ip'

import { authHeader, baseServerUrl } from 'Helpers'

export const locationService = {
  getCurrentLocation
}

function getCurrentLocation() {

  return new Promise((resolve) => {
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        resolve(loc)
      }, err => {
        // If can't get navigator location
        console.warn(`${err.message}, IP location used instead.`)
        getLocationFromApi()
          .then(loc => {
            const {lat, lng} = loc.data
            resolve({lat, lng})
          })

      })
    }
    else {
      console.warn(`Browser doesn't support Geolocation, IP location used instead.`)
      getLocationFromApi()
        .then(loc => {
          const {lat, lng} = loc.data
          resolve({lat, lng})
        })
    }
  })
}

function getLocationFromApi() {
  
  return publicIp.v4()
    .then(ip => {
      const requestOptions = {
        method: 'GET',
        headers: authHeader()
      }
      
      return fetch(`${baseServerUrl}/api/utils/ip-location/${ip}`, requestOptions)
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json()
    })
}
