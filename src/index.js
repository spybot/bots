import React from 'react';
import {render} from 'react-dom';

import rootSaga, {sagaMiddleware} from 'saga';

import './index.css';
import App from 'components/App';

sagaMiddleware.run(rootSaga);

render(<App />, document.getElementById('root'));

