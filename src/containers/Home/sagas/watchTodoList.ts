import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { getTodoListFailure, getTodolistRequest, getTodolistSuccess, TodolistItem } from '../slices/todolistSlice';
import fetchAPI from '@utils/functions/fetchAPI';
import { getActionType } from '@utils/functions/reduxActions';

function* handleGetTodoList({ payload }: ReturnType<typeof getTodolistRequest>) {
  try {
    const res: AxiosResponse<TodolistItem[]> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    });
    console.log({ res });
    yield put(getTodolistSuccess({ data: res.data }));
  } catch (err) {
    console.log(err.response);
    yield put(getTodoListFailure({ msg: err.response.data }));
  }
}

export default function* watchGetTodoList() {
  const type = getActionType(getTodolistRequest);
  console.log({ type });
  yield takeLatest(getActionType(getTodolistRequest), handleGetTodoList);
}
