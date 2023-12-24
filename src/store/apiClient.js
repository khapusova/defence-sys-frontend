import axios from 'axios';
import { LOCALSTORAGE } from '@constants';
import { getDataFromLS } from './localStorage';

const defaultRequestHeaders = {
  Accept: 'application/json',
  'content-type': 'application/json'
};

const headerInterceptor = async (config) => {
  const tokenLS = getDataFromLS(LOCALSTORAGE.activeUser);
  const token = tokenLS?.token || null;
  const options = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
      'X-User-Location': 'US'
    }
  };

  return options;
};

const authorizedInstanse = axios.create({
  baseURL: 'http://localhost:3000/'
});
authorizedInstanse.interceptors.request.use(headerInterceptor);

const unauthorizedInstanse = axios.create({
  baseURL: 'http://localhost:3000/'
});

unauthorizedInstanse.interceptors.request.use(headerInterceptor);

const axiosRequest =
  (isAuthorized) =>
  async ({ url, method, data = null, headers = {}, params = {} }) => {
    const config = {
      url,
      method,
      params,
      data,
      headers: {
        ...defaultRequestHeaders,
        ...headers
      }
    };

    if (data) config.data = data;

    const apiClient = isAuthorized ? authorizedInstanse : unauthorizedInstanse;
    try {
      const response = await apiClient.request(config);
      return response.data ? response.data : null;
    } catch (error) {
      return {
        response: null,
        error: {
          data: error.response.data,
          message: error.message,
          status: error.response.status
        }
      };
    }
  };

export const apiClient = {
  authorizedRequest: axiosRequest(true),
  unauthorizedRequest: axiosRequest(false)
};
