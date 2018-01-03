import {handleActions, combineActions} from 'redux-actions';
import {keyBy} from 'lodash';

import type {User} from 'types';
import * as UserActions from 'actions';

type State = {
  usersById: {
    [string]: User
  },
  previousPageUrl: string,
  nextPageUrl: string,
  loading: boolean,
  loaded: boolean,
  error: Error
};

const initialState : State = {
  usersById: {},
  loading: false,
  loaded: false,
  error: null,
  previousPageUrl: null,
  nextPageUrl: null,
};

export default handleActions({
  [UserActions.loadUserListSuccess]: (state: State, {payload}) => ({
    usersById: keyBy(payload, 'id'),
    loading: false,
    loaded: true,
    error: null
  }),
  [UserActions.loadUserListFailure]: (state, {error}) => ({
    ...state,
    loading: false,
    error
  }),
  [combineActions(UserActions.loadUserSuccess, UserActions.updateUserSuccess)]: (state: State, {payload}) => ({
    ...state,
    usersById: {
      ...state.usersById,
      ...keyBy([payload], 'id')
    }
  })
}, initialState);

export const getUsers = state => state.users.usersById;
export const getUser = (state, userId) => state.users.usersById[userId];
export const isUsersLoading = state => state.users.loading;
export const isUsersLoaded = state => state.users.loaded;
export const getNextPageUrl = state => state.users.nextPageUrl;
export const getPreviousPageUrl = state => state.users.previousPageUrl;
export const isNextPageAvailable = state => !!state.users.nextPageUrl;
export const isPreviousPageAvailable = state => !!state.users.previousPageUrl;