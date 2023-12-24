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
const { OPRYDATKUVANNYA_PAGE } = STORE_NAMES;

const getAlloprydatkuvannyasThunkName = `${OPRYDATKUVANNYA_PAGE}/getAlloprydatkuvannyas`;
const createoprydatkuvannyasThunkName = `${OPRYDATKUVANNYA_PAGE}/createoprydatkuvannyas`;
const updateoprydatkuvannyasThunkName = `${OPRYDATKUVANNYA_PAGE}/updateoprydatkuvannyas`;
const deleteoprydatkuvannyasThunkName = `${OPRYDATKUVANNYA_PAGE}/deleteoprydatkuvannya`;

export const deleteoprydatkuvannya =  createAsyncThunk(
  deleteoprydatkuvannyasThunkName,
  async (body, { rejectWithValue }) => {
    const resp = await api.deleteoprydatkuvannya(body);
    if (resp.error || !resp) {
      return rejectWithValue(resp.error);
    }
    return await api.getoprydatkuvannya(body);
  }
);
export const updateoprydatkuvannyas = createAsyncThunk(
  updateoprydatkuvannyasThunkName,
  async (body, { rejectWithValue }) => {
    const oprydatkuvannyas = await api.getoprydatkuvannya(body);

    if (oprydatkuvannyas.error || !oprydatkuvannyas) {
      return rejectWithValue(oprydatkuvannyas.error);
    }
    let [matchedJournal] = oprydatkuvannyas.filter(
      (journal) => journal.id === body.id
    );
    await api.updateoprydatkuvannya({ ...matchedJournal, ...body });
    const arr = await api.getoprydatkuvannya(body)
    const [active] = arr.filter(
      (journal) => journal.id === body.id
    );
    return {arr, active};
  }
);


export const createoprydatkuvannyas = createAsyncThunk(
  createoprydatkuvannyasThunkName,
  async (body, { rejectWithValue }) => {
    const oprydatkuvannyas = await api.getoprydatkuvannya(body);

    if (oprydatkuvannyas.error || !oprydatkuvannyas) {
      return rejectWithValue(oprydatkuvannyas.error);
    }

    await api.createoprydatkuvannya(body);
    return await api.getoprydatkuvannya(body);;
  }
);

export const getAlloprydatkuvannyas = createAsyncThunk(
  getAlloprydatkuvannyasThunkName,
  async (body, { rejectWithValue }) => {
    const oprydatkuvannya = await api.getoprydatkuvannya(body);
    if (oprydatkuvannya.error || !oprydatkuvannya) {
      return rejectWithValue(oprydatkuvannya.error);
    }

    return oprydatkuvannya;
  }
);

const initialState = {
  ...INITIAL_STATE,
  oprydatkuvannya: [],
  active: null,
};

const oprydatkuvannyaPageSlice = createSlice({
  name: OPRYDATKUVANNYA_PAGE,
  initialState,
  reducers: {
    resetState: () => initialState,
    setReplyComment: (state, { payload }) => ({
      ...state,
      replyTo: payload
    }),
    resetGeneralComment: (state) => ({ ...state, replyTo: null })
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getAlloprydatkuvannyas.pending,
          createoprydatkuvannyas.pending,
          updateoprydatkuvannyas.pending,
          deleteoprydatkuvannya.pending
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
          getAlloprydatkuvannyas.rejected,
          createoprydatkuvannyas.rejected,
          updateoprydatkuvannyas.rejected,
          deleteoprydatkuvannya.rejected
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
          getAlloprydatkuvannyas.fulfilled,
          createoprydatkuvannyas.fulfilled,
          deleteoprydatkuvannya.fulfilled
        ),
        (state, { payload }) => ({
          ...state,
          oprydatkuvannya: payload,
          ...FULFILLED_STATE
        })
      )
      .addMatcher(
        isAnyOf(
          updateoprydatkuvannyas.fulfilled
        ),
        (state, { payload }) => ({
          ...state,
          oprydatkuvannya: payload.arr,
          active: payload.active,
          ...FULFILLED_STATE
        })
      );;
  }
});

const oprydatkuvannyaPagePersistConfig = {
  key: OPRYDATKUVANNYA_PAGE,
  storage
};

const { actions: oprydatkuvannyaPageActions, reducer: oprydatkuvannyaPageReducer } =
  oprydatkuvannyaPageSlice;
export { oprydatkuvannyaPageActions, oprydatkuvannyaPageReducer, oprydatkuvannyaPagePersistConfig };
