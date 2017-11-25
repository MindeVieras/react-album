import { authHeader, baseServerUrl } from '../_helpers';

export const uploadService = {
  upload
};

function upload(file, author, ct, status) {
  var formData = new FormData();
  formData.append('file', file);
  formData.append('author', author);
  formData.append('content_type', ct);
  formData.append('status', status);
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: formData
  };

  return fetch(baseServerUrl+'/api/upload', requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}