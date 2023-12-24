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
const { ACCOUNTING_PAGE } = STORE_NAMES;

const getAllAccountingsThunkName = `${ACCOUNTING_PAGE}/getAllAccountings`;
const updateOrCreateAccountingThunkName = `${ACCOUNTING_PAGE}/updateOrCreateAccounting`;
const deleteoprydatkuvannyasThunkName = `${ACCOUNTING_PAGE}/deleteoprydatkuvannya`;

export const deleteaccounting =  createAsyncThunk(
  deleteoprydatkuvannyasThunkName,
  async (body, { rejectWithValue }) => {
    const resp = await api.deleteaccounting(body);
    if (resp.error || !resp) {
      return rejectWithValue(resp.error);
    }
    return await api.getaccounting(body);
  }
);
export const updateOrCreateAccounting = createAsyncThunk(
  updateOrCreateAccountingThunkName,
  async (body, { rejectWithValue }) => {
    const accountings = await api.getaccounting(body);

    if (accountings.error || !accountings) {
      return rejectWithValue(accountings.error);
    }

    let [matchedJournal] = accountings.filter(
      (journal) => journal.id === body.id
    );

    if (!matchedJournal) {
      matchedJournal = api.createaccounting(body);
    } else {
      await api.updateaccounting({ ...matchedJournal, ...body });
    }
    return await api.getaccounting(body);;
  }
);

export const getAllAccountings = createAsyncThunk(
  getAllAccountingsThunkName,
  async (body, { rejectWithValue }) => {
    const accounting = await api.getaccounting(body);
    if (accounting.error || !accounting) {
      return rejectWithValue(accounting.error);
    }

    return accounting;
  }
);

const initialState = {
  ...INITIAL_STATE,
  accounting: [],
};

const accountingPageSlice = createSlice({
  name: ACCOUNTING_PAGE,
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
          getAllAccountings.pending,
          updateOrCreateAccounting.pending,
          deleteaccounting.pending,
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
          getAllAccountings.rejected,
          updateOrCreateAccounting.rejected,
          deleteaccounting.rejected,
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
          getAllAccountings.fulfilled,
          updateOrCreateAccounting.fulfilled,
          deleteaccounting.fulfilled
        ),
        (state, { payload }) => ({
          ...state,
          accounting: payload,
          ...FULFILLED_STATE
        })
      );
  }
});

const accountingPagePersistConfig = {
  key: ACCOUNTING_PAGE,
  storage
};

const { actions: accountingPageActions, reducer: accountingPageReducer } =
  accountingPageSlice;
export { accountingPageActions, accountingPageReducer, accountingPagePersistConfig };
