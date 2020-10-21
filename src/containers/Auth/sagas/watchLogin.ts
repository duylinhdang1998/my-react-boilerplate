import fetchAPI from '@utils/functions/fetchAPI';
import { getActionType } from '@utils/functions/reduxActions';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthSuccess } from 'types/Auth';
import { loginFailure, loginRequest, LoginSuccess, loginSuccess } from '../slices/authSlice';

function* handleLogin({ payload }: ReturnType<typeof loginRequest>) {
  try {
    const res: AxiosResponse<AuthSuccess> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: payload.data,
      params: {
        remember_me: '1',
        submit: '1',
        _sand_domain: payload.data.domain,
      },
    });
    console.log({ res });
    if (res.data.success) {
      yield put(loginSuccess({ token: res.data.result.token, domain: payload.data.domain, data: res.data.result }));
    } else {
      yield put(loginFailure(res.data.message ?? 'Đăng nhập không thành công'));
    }
  } catch (err) {
    console.log(err);
    yield put(loginFailure('Lỗi không đăng nhập được'));
  }
}

export default function* watchLogin() {
  console.log('type= ', getActionType(loginRequest));
  yield takeLatest(getActionType(loginRequest), handleLogin);
}
