import { HTTP_METHODS, AUTH_ENDPOINTS } from '@constants';
import { apiClient } from '../apiClient';

const { GET, PUT } = HTTP_METHODS;

const { HUBS, ARTICLES, JOURNALS, RESEARCHERS, FUNDING, HISTORY } =
  AUTH_ENDPOINTS;

const getHubs = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: HUBS,
    data
  });

const getArticles = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: ARTICLES,
    data
  });

const getJournals = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: JOURNALS,
    data
  });

const getResearchers = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: RESEARCHERS,
    data
  });

const getFunding = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: FUNDING,
    data
  });

const getHistory = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: HISTORY,
    data
  });

const addToUserHistory = (data) =>
  apiClient.authorizedRequest({
    method: PUT,
    url: `${HISTORY}/${data.userID}`,
    data
  });

export const api = {
  getHubs,
  getArticles,
  getJournals,
  getResearchers,
  getFunding,
  getHistory,
  addToUserHistory
};
