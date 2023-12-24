import { HTTP_METHODS, AUTH_ENDPOINTS } from '@constants';
import { apiClient } from '../apiClient';

const { GET, PUT, POST, DELETE } = HTTP_METHODS;

const { ORDER } = AUTH_ENDPOINTS;

const getOrder = (data) =>
  apiClient.unauthorizedRequest({
    method: GET,
    url: ORDER,
    data
  });

const updateOrder = (data) =>
  apiClient.authorizedRequest({
    method: PUT,
    url: `${ORDER}/${data.id}`,
    data
  });

const createOrder =  (data) =>
apiClient.unauthorizedRequest({
  method: POST,
  url: `${ORDER}`,
  headers: {
    'Content-Type': 'application/json',
 },
 data
  
});


const deleteOrder =  (data) =>
apiClient.unauthorizedRequest({
  method: DELETE,
  url: `${ORDER}/${data.id}`,
 data
  
});


export const api = {
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder
};
