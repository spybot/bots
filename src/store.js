// @flow
import {createStore, applyMiddleware} from 'redux';
import {sagaMiddleware} from 'saga';
import {routerMiddleware} from 'react-router-redux';

import history from 'browserHistory';
import rootReducer from 'reducers';

export default createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history)
  )
);