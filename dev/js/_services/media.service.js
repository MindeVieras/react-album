
import { authHeader, baseServerUrl } from '../_helpers'

export const mediaService = {
  save
}

function save(file, user_id, content_type) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, user_id, content_type })
  }
  return fetch(baseServerUrl+'/api/media/save', requestOptions).then(handleResponse)
}

// function getList() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(baseServerUrl+'/api/users/get-list', requestOptions).then(handleResponse);
// }

// function getOne(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(baseServerUrl+'/api/users/get-one/'+id, requestOptions).then(handleResponse);
// }

// function create(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(baseServerUrl+'/api/users/create', requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch('/users/' + user.id, requestOptions).then(handleResponse);
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(baseServerUrl+'/api/users/delete/'+id, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
  // console.log(response);
  if (!response.ok) { 
    return Promise.reject(response.statusText)
  }

  return response.json()
}
