import {takeLatest, put, call, fork, all, select} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import * as api from 'api';
import * as Actions from 'actions';
import {getNextPageUrl, getPreviousPageUrl} from 'reducers/users';

export default function* rootUserSaga() {
  yield all([
    fork(watchLoadUsersFlow),
    fork(watchLoadUserInfoFlow),
    fork(watchUpdateUserInfoFlow),
    fork(watchLoadNextPageFlow),
    fork(watchLoadPreviousPageFlow)
  ]);
}

function* loadUsersFlow({payload: url}) {
  try {
    const {
      result: users
    } = yield call(api.getUsers, url);

    yield put(Actions.loadUserListSuccess(users));
  } catch (e) {
    yield put(Actions.loadUserListFailure(e));
  }
}

export function* watchLoadUsersFlow() {
  yield takeLatest(Actions.loadUserListRequest, loadUsersFlow);
}

function* loadUserInfoFlow({payload: userId}) {
  try {
    const {
      result: user
    } = yield call(api.getUser, userId);

    yield put(Actions.loadUserSuccess(user));
  } catch (e) {
    yield put(Actions.loadUserFailure(e))
  }
}

export function* watchLoadUserInfoFlow() {
  yield takeLatest(Actions.loadUserRequest, loadUserInfoFlow);
}

function* updateUserInfoFlow({payload: {userId, userInfo}}) {
  try {
    const {
      result: user
    } = yield call(api.updateUser, userId, userInfo);

    yield put(Actions.updateUserSuccess(user));
    yield put(push('/users'));
  } catch (e) {
    yield put(Actions.updateUserFailure(e))
  }
}

export function* watchUpdateUserInfoFlow() {
  yield takeLatest(Actions.updateUserRequest, updateUserInfoFlow);
}

function* loadNextPageFlow() {
  const url = yield select(getNextPageUrl);

  if (url) {
    loadUsersFlow(Actions.loadUserListRequest({url}));
  }
}

export function* watchLoadNextPageFlow() {
  yield takeLatest(Actions.loadNextPage, loadNextPageFlow);
}

function* loadPreviousPageFlow() {
  const url = yield select(getPreviousPageUrl);

  if (url) {
    loadUsersFlow(Actions.loadUserListRequest({url}));
  }
}

export function* watchLoadPreviousPageFlow() {
  yield takeLatest(Actions.loadPreviousPage, loadPreviousPageFlow);
}