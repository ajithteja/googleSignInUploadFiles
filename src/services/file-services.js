import { api } from '.';

export const uploadFiles = (files = []) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  return api
    .post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getFiles = () => {
  return api.get('/').then((response) => {
    console.log('RESPONSE', response.data);
    return response.data;
  });
};

export const getFile = (fileId) => {
  return api
    .get(`/download/${fileId}`, { responseType: 'blob' })
    .then((response) => {
      const blob = response.data;
      return window.URL.createObjectURL(blob);
    });
};
