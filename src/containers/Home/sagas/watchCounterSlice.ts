import { put, takeLatest } from 'redux-saga/effects';
import { incrementCounter } from '../slices/counterSlice';

function* incrementAsync({ payload }: ReturnType<typeof incrementCounter>) {
  console.log({ payload });
  // yield put(incrementCounter({ step: payload.step }));
}

function* watchIncrementAsync() {
  yield takeLatest(incrementCounter, incrementAsync);
}

export default watchIncrementAsync;
