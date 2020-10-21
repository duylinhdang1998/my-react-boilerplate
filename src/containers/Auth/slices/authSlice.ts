import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthSuccess, User } from 'types/Auth';
import { LoginEndpoint } from 'types/Endpoint.ts';
import { createDispatchAction } from '@utils/functions/reduxActions';
import { boolean, string } from 'yup';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  data?: User;
  msg?: string;
  domain?: string;
}

export interface LoginRequest {
  endpoint: LoginEndpoint;
  data: {
    lname: string;
    domain: string;
    pass: string;
  };
}
export interface LoginSuccess {
  token?: string;
  domain?: string;
  data?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
  data: {},
  msg: '',
  domain: '',
};

const authSlice = createSlice({
  name: '@auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequest>) => {
      state.isLoggedIn = false;
      state.token = '';
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccess>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.data = action.payload.data;
      state.domain = action.payload.domain;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.token = '';
      state.msg = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;

export const useLogin = createDispatchAction(loginRequest);
const authReducer = authSlice.reducer;
export default authReducer;
