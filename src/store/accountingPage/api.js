import { HTTP_METHODS, AUTH_ENDPOINTS } from '@constants';
import { apiClient } from '../apiClient';

const { GET, PUT, POST, DELETE } = HTTP_METHODS;

const { ACCOUNTING } = AUTH_ENDPOINTS;

const getaccounting = (data) =>
  apiClient.unauthorizedRequest({
    method: GET,
    url: ACCOUNTING,
    data
  });

const updateaccounting = (data) =>
  apiClient.authorizedRequest({
    method: PUT,
    url: `${ACCOUNTING}/${data.id}`,
    data
  });

const createaccounting =  (data) =>
apiClient.unauthorizedRequest({
  method: POST,
  url: `${ACCOUNTING}`,
  headers: {
    'Content-Type': 'application/json',
 },
 data
  
});


const deleteaccounting =  (data) =>
apiClient.unauthorizedRequest({
  method: DELETE,
  url: `${ACCOUNTING}/${data.id}`,
 data
  
});


export const api = {
  getaccounting,
  updateaccounting,
  createaccounting,
  deleteaccounting
};
