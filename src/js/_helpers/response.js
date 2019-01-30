
// fetch json response
export function handleResponse(response) {

  console.log(response)
  // if (!response.ok) {
  //   return Promise.reject(response.statusText)
  // }
  return response.json()
}
