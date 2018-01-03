import createSagaMiddleware from 'redux-saga';
import {fork, all} from 'redux-saga/effects';

import userSaga from 'saga/userSagas';

export default function* rootSaga() {
  yield all([
    fork(userSaga)
  ]);
}

export const sagaMiddleware = createSagaMiddleware();