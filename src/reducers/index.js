// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';

import usersReducer from './users';

export default combineReducers({
  form: formReducer,
  router: routerReducer,
  users: usersReducer
});