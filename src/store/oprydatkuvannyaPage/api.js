import { HTTP_METHODS, AUTH_ENDPOINTS } from '@constants';
import { apiClient } from '../apiClient';

const { GET, PUT, POST, DELETE } = HTTP_METHODS;

const { OPRYDATKUVANNYA } = AUTH_ENDPOINTS;

const getoprydatkuvannya = (data) =>
  apiClient.unauthorizedRequest({
    method: GET,
    url: OPRYDATKUVANNYA,
    data
  });

const updateoprydatkuvannya = (data) =>
  apiClient.authorizedRequest({
    method: PUT,
    url: `${OPRYDATKUVANNYA}/${data.id}`,
    data
  });

const createoprydatkuvannya =  (data) =>
apiClient.unauthorizedRequest({
  method: POST,
  url: `${OPRYDATKUVANNYA}`,
  headers: {
    'Content-Type': 'application/json',
 },
 data
  
});


const deleteoprydatkuvannya =  (data) =>
apiClient.unauthorizedRequest({
  method: DELETE,
  url: `${OPRYDATKUVANNYA}/${data.id}`,
 data
  
});

export const api = {
  getoprydatkuvannya,
  updateoprydatkuvannya,
  createoprydatkuvannya,
  deleteoprydatkuvannya
};
