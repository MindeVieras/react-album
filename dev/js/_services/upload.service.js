import { authHeader, baseServerUrl } from '../_helpers';

export const uploadService = {
  avatar
};

function avatar(file) {
  var formData = new FormData();
  formData.append('file', file);
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: formData
  };

  return fetch(baseServerUrl+'/api/upload/avatar', requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}