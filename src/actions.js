import {createAction} from 'redux-actions';

// namespaced create action
const action = (type, ...args) => createAction(`bots/USERS/${type}`, ...args);

export const loadUserListRequest = action('LOAD_USERS_REQUEST');
export const loadUserListSuccess = action('LOAD_USERS_SUCCESS');
export const loadUserListFailure = action('LOAD_USERS_FAILURE');

export const loadNextPage = action('LOAD_NEXT_PAGE');
export const loadPreviousPage = action('LOAD_PREVIOUS_PAGE');

export const loadUserRequest = action('LOAD_USER_REQUEST');
export const loadUserSuccess = action('LOAD_USER_SUCCESS');
export const loadUserFailure = action('LOAD_USER_FAILURE');

export const updateUserRequest = action('UPDATE_USER_REQUEST', (userId, userInfo) => ({
  userId,
  userInfo
}));
export const updateUserSuccess = action('UPDATE_USER_SUCCESS');
export const updateUserFailure = action('UPDATE_USER_FAILURE');