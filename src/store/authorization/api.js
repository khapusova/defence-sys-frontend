import { HTTP_METHODS, AUTH_ENDPOINTS } from '@constants';
import { apiClient } from '../apiClient';

const { GET, PUT, POST } = HTTP_METHODS;
const { LOGIN, AUTHORS } = AUTH_ENDPOINTS;

const login = (data) =>
  apiClient.unauthorizedRequest({
    method: GET,
    url: LOGIN,
    data
  });

const getAllAuthors = (data) =>
  apiClient.unauthorizedRequest({
    method: GET,
    url: AUTHORS,
    data
  });

const addNewAuthor = (data) =>
  apiClient.unauthorizedRequest({
    method: POST,
    url: AUTHORS,
    data
  });

const addNewLoginUser = (data) =>
  apiClient.unauthorizedRequest({
    method: PUT,
    url: LOGIN,
    data
  });

const getUserById = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: `${AUTHORS}/${data.id}`,
    data
  });

const setUserSettings = (data) =>
  apiClient.authorizedRequest({
    method: PUT,
    url: `${AUTHORS}/${data.id}`,
    data
  });

export const api = {
  login,
  getUserById,
  setUserSettings,
  addNewAuthor,
  getAllAuthors,
  addNewLoginUser
};
