import { HTTP_METHODS, AUTH_ENDPOINTS } from '@constants';
import { apiClient } from '../apiClient';

const { GET } = HTTP_METHODS;

const { TRENDING } = AUTH_ENDPOINTS;

const getTrending = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: TRENDING,
    data
  });

export const api = { getTrending };
