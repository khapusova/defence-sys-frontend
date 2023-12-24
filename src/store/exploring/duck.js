/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES
} from '@constants';
import storage from 'redux-persist/lib/storage';
import { api } from './api';

const { EXPLORING } = STORE_NAMES;

const getAllThunkName = `${EXPLORING}/getAll`;
const getSearchingHistoryThunkName = `${EXPLORING}/getSearchingHistory`;
const addToSearchHistoryThunkName = `${EXPLORING}/addToSearchHistory`;
const deleteSearchHistoryThunkName = `${EXPLORING}/deleteSearchHistory`;

export const getAllExploringData = createAsyncThunk(
  getAllThunkName,
  async (body, { rejectWithValue }) => {
    const articles = await api.getArticles(body);
    const journals = await api.getJournals(body);
    const hubs = await api.getHubs(body);
    const researchers = await api.getResearchers(body);
    const funding = await api.getFunding(body);

    if (articles.error) {
      return rejectWithValue(articles.error);
    }

    if (journals.error) {
      return rejectWithValue(journals.error);
    }

    if (hubs.error) {
      return rejectWithValue(hubs.error);
    }

    if (researchers.error) {
      return rejectWithValue(researchers.error);
    }

    if (funding.error) {
      return rejectWithValue(funding.error);
    }

    return { articles, journals, hubs, researchers, funding };
  }
);

export const getSearchingHistory = createAsyncThunk(
  getSearchingHistoryThunkName,
  async (body, { rejectWithValue }) => {
    const responce = await api.getHistory(body);

    const [matchedUser] = responce.filter((el) => el.userID === body.userID);

    if (responce.error) {
      return rejectWithValue(responce.error);
    }

    if (!matchedUser) {
      return rejectWithValue('no availaible history for signed in user');
    }

    return matchedUser;
  }
);

export const addToSearchHistory = createAsyncThunk(
  addToSearchHistoryThunkName,
  async (body, { rejectWithValue }) => {
    const responce = await api.getHistory(body);

    const [matchedUser] = responce.filter((el) => el.userID === body.userID);

    if (responce.error) {
      return rejectWithValue(responce.error);
    }

    if (!matchedUser) {
      return rejectWithValue('no availaible history for signed in user');
    }
    if (matchedUser.history.includes(body.dataToSet)) {
      return matchedUser;
    }

    let history = [body.dataToSet, ...matchedUser.history];

    if (history.length > 9) {
      history = history.slice(0, 8);
    }

    await api.addToUserHistory({ userID: body.userID, history });

    return { ...matchedUser, history };
  }
);

export const deleteSearchHistory = createAsyncThunk(
  deleteSearchHistoryThunkName,
  async (body, { rejectWithValue }) => {
    const responce = await api.getHistory(body);

    const [matchedUser] = responce.filter((el) => el.userID === body.userID);

    if (responce.error) {
      return rejectWithValue(responce.error);
    }

    if (!matchedUser) {
      return rejectWithValue('no availaible history for signed in user');
    }
    const history = [];

    await api.addToUserHistory({ userID: body.userID, history });

    return { ...matchedUser, history };
  }
);

const initialState = {
  ...INITIAL_STATE,
  all: {
    articles: [],
    funding: [],
    researchers: [],
    journals: [],
    hubs: []
  },
  searchHistory: [],
  userID: null
};

const exploringSlice = createSlice({
  name: EXPLORING,
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getAllExploringData.pending,
          getSearchingHistory.pending,
          addToSearchHistory.pending,
          deleteSearchHistory.pending
        ),
        (state) => {
          if (!state.isPending) {
            return {
              ...state,
              ...PENDING_STATE
            };
          }
        }
      )
      .addMatcher(
        isAnyOf(
          getAllExploringData.rejected,
          getSearchingHistory.rejected,
          addToSearchHistory.rejected,
          deleteSearchHistory.rejected
        ),
        (state) => {
          if (state.isPending) {
            const newState = {
              ...state,
              ...REJECTED_STATE
            };
            return newState;
          }
          return state;
        }
      )
      .addMatcher(
        isAnyOf(
          getSearchingHistory.fulfilled,
          addToSearchHistory.fulfilled,
          deleteSearchHistory.fulfilled
        ),
        (state, { payload }) => ({
          ...state,
          searchHistory: payload.history,
          userID: payload.userID,
          ...FULFILLED_STATE
        })
      )
      .addMatcher(
        isAnyOf(getAllExploringData.fulfilled),
        (state, { payload }) => ({
          ...state,
          all: {
            articles: payload.articles || [],
            journals: payload.journals || [],
            hubs: payload.hubs || [],
            funding: payload.funding || [],
            researchers: payload.researchers || []
          },
          ...FULFILLED_STATE
        })
      );
  }
});

const exploringPersistConfig = {
  key: EXPLORING,
  storage
};

const { actions: exploringActions, reducer: exploringReducer } = exploringSlice;
export { exploringActions, exploringReducer, exploringPersistConfig };
