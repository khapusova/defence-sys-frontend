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
const { ORDER_PAGE } = STORE_NAMES;

const getAllordersThunkName = `${ORDER_PAGE}/getAllorders`;
const updateOrcreateOrderThunkName = `${ORDER_PAGE}/updateOrcreateOrder`;
const deleteoprydatkuvannyasThunkName = `${ORDER_PAGE}/deleteoprydatkuvannya`;

export const deleteOrder =  createAsyncThunk(
  deleteoprydatkuvannyasThunkName,
  async (body, { rejectWithValue }) => {
    const resp = await api.deleteOrder(body);
    if (resp.error || !resp) {
      return rejectWithValue(resp.error);
    }
    return await api.getOrder(body);
  }
);
export const updateOrcreateOrder = createAsyncThunk(
  updateOrcreateOrderThunkName,
  async (body, { rejectWithValue }) => {
    const orders = await api.getOrder(body);

    if (orders.error || !orders) {
      return rejectWithValue(orders.error);
    }

    let [matchedJournal] = orders.filter(
      (journal) => journal.id === body.id
    );

    if (!matchedJournal) {
      matchedJournal = api.createOrder(body);
    } else {
      await api.updateOrder({ ...matchedJournal, ...body });
    }
    return await api.getOrder(body);;
  }
);

export const getAllorders = createAsyncThunk(
  getAllordersThunkName,
  async (body, { rejectWithValue }) => {
    const order = await api.getOrder(body);
    if (order.error || !order) {
      return rejectWithValue(order.error);
    }

    return order;
  }
);

const initialState = {
  ...INITIAL_STATE,
  order: [],
};

const orderPageSlice = createSlice({
  name: ORDER_PAGE,
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
          getAllorders.pending,
          updateOrcreateOrder.pending,
          deleteOrder.pending,
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
          getAllorders.rejected,
          updateOrcreateOrder.rejected,
          deleteOrder.rejected,
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
          getAllorders.fulfilled,
          updateOrcreateOrder.fulfilled,
          deleteOrder.fulfilled
        ),
        (state, { payload }) => ({
          ...state,
          order: payload,
          ...FULFILLED_STATE
        })
      );
  }
});

const orderPagePersistConfig = {
  key: ORDER_PAGE,
  storage
};

const { actions: orderPageActions, reducer: orderPageReducer } =
  orderPageSlice;
export { orderPageActions, orderPageReducer, orderPagePersistConfig };
