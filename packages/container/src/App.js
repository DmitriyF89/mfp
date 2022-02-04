import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co', // this need to prevent CSS class names collisions in production. Every microfrontend should have own prefix
});

const history = createBrowserHistory(); // Using history + Router instead BrowserRouter lets us more convenient way to add logic for history and redirects...

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                {isSignedIn && <DashboardLazy />}
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};

export default App;
