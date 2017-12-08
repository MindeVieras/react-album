
import { authHeader, baseServerUrl } from '../_helpers';

export const userService = {
  login,
  logout,
  getList,
  getOne,
  create,
  update,
  delete: _delete
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(baseServerUrl+'/api/authenticate', requestOptions)
    .then(response => {
      if (!response.ok) { 
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then(res => {
      let user = res.data;
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return res;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getList() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(baseServerUrl+'/api/users/get-list', requestOptions).then(handleResponse);
}

function getOne(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(baseServerUrl+'/api/users/get-one/'+id, requestOptions).then(handleResponse);
}

function create(user) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(baseServerUrl+'/api/users/create', requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/users/' + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(baseServerUrl+'/api/users/delete/'+id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  // console.log(response);
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}