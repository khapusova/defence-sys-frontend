import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { STORE_NAMES } from '@constants';
import {
  authorizationReducer,
  authorizationPersistConfig
} from './authorization';
// import { trendingReducer, trendingPersistConfig } from './trending';
// import { exploringReducer, exploringPersistConfig } from './exploring';
import { oprydatkuvannyaPageReducer, oprydatkuvannyaPagePersistConfig } from './oprydatkuvannyaPage';
import { accountingPageReducer, accountingPagePersistConfig } from './accountingPage';
import { orderPageReducer, orderPagePersistConfig } from './orderPage';

const persistedReducersObject = {
  authorization: persistReducer(
    authorizationPersistConfig,
    authorizationReducer
  ),
  // trending: persistReducer(trendingPersistConfig, trendingReducer),
  // exploring: persistReducer(exploringPersistConfig, exploringReducer),
  oprydatkuvannya: persistReducer(oprydatkuvannyaPagePersistConfig, oprydatkuvannyaPageReducer),
  accounting: persistReducer(accountingPagePersistConfig, accountingPageReducer),
  order: persistReducer(orderPagePersistConfig, orderPageReducer)
};

const rootReducer = combineReducers(persistedReducersObject);

const persistConfig = {
  key: STORE_NAMES.ROOT,
  storage,

  blacklist: Object.keys(persistedReducersObject)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

const persistor = persistStore(store);

export { store, persistor };
