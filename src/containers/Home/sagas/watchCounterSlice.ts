import { put, takeLatest } from 'redux-saga/effects';
import { incrementCounter } from '../slices/counterSlice';

function* incrementAsync() {
  yield put(incrementCounter({ step: 1 }));
}

function* watchIncrementAsync() {
  yield takeLatest('INCREMENT_COUNTER', incrementAsync);
}

export default watchIncrementAsync;
