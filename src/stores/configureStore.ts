import { persistStore, persistReducer, PersistConfig, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers, configureStore, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducers';
import rootSagas from './rootSagas';

const persistConfig: PersistConfig<(keyof Reducers)[]> & { whitelist: (keyof Reducers)[] } = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  debug: true,
};

const _combineReducers = combineReducers({
  ...rootReducers,
});

const reducers = persistReducer(persistConfig as any, _combineReducers);
const sagaMiddleWare = createSagaMiddleware();

const middlewares: Middleware[] = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  sagaMiddleWare,
];
if (__DEV__) {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: reducers,
  middleware: middlewares,
});

sagaMiddleWare.run(rootSagas);
const persistor = persistStore(store);

export { store, persistor };

export type Reducers = ReturnType<typeof _combineReducers>;
