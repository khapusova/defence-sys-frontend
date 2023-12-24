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

const { TRENDING } = STORE_NAMES;
const getTrendingFeedThunkName = `${TRENDING}/getTrendingFeed`;

export const getTrendingFeed = createAsyncThunk(
  getTrendingFeedThunkName,
  async (body, { rejectWithValue }) => {
    const response = await api.getTrending(body);

    const [matchedUser] = response.feed.filter(
      (el) => el.userID === body.userID
    );

    if (response.error) {
      return rejectWithValue(response.error);
    }

    if (!matchedUser) {
      return rejectWithValue('no availaible trending for signed in user');
    }

    return matchedUser;
  }
);

const initialState = {
  ...INITIAL_STATE,
  userID: null,
  trendingContent: []
};

const trendingSlice = createSlice({
  name: TRENDING,
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getTrendingFeed.pending), (state) => {
        if (!state.isPending) {
          return {
            ...state,
            ...PENDING_STATE
          };
        }
      })
      .addMatcher(isAnyOf(getTrendingFeed.rejected), (state) => {
        if (state.isPending) {
          const newState = {
            ...state,
            ...REJECTED_STATE
          };
          return newState;
        }
        return state;
      })
      .addMatcher(isAnyOf(getTrendingFeed.fulfilled), (state, { payload }) => ({
        ...state,
        userID: payload.userID,
        trendingContent: payload.userFeed,
        ...FULFILLED_STATE
      }));
  }
});

const trendingPersistConfig = {
  key: TRENDING,
  storage
};

const { actions: trendingActions, reducer: trendingReducer } = trendingSlice;
export { trendingActions, trendingReducer, trendingPersistConfig };
