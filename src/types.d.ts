import * as React from 'react';
import { Reducers } from './stores/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type RootState = Reducers;
  declare type GetState = () => AppState;
  declare type Connect<TTypeOfMapStateToProps, TTypeOfMapDispatchToProps> = ReturnType<TTypeOfMapStateToProps> & TTypeOfMapDispatchToProps;

  declare type ValueOf<T> = T[keyof T];

  declare type ReducerStatus = 'loading' | 'success' | 'failure';

  declare type Timeout = NodeJS.Timeout;
}
