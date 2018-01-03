import React from 'react';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from 'store';
import history from 'browserHistory';

import UsersPage from 'components/UsersPage';
import UserPage from 'components/UserPage';

const MainLayout = ({children}) => (
  <div
    style={{
      maxWidth: 800,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </div>
);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <MainLayout>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path='/users' component={UsersPage} />
            <Route path='/users/:userId' component={UserPage} />

            <Redirect to="/users" />
          </Switch>
        </ConnectedRouter>
      </MainLayout>
    </MuiThemeProvider>
  </Provider>
);

export default App;
