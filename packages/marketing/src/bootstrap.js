import React from 'react';
import { render } from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

// startup function for our react App
const mount = (el, { onNavigate, defaultHistory, initialPath } = {}) => {
  // add memory history in order to use it inside non-container apps.
  // we need to use Browser history only in main Host, to prevent race conditions of changing History
  const history =
    defaultHistory ??
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  render(<App history={history} />, el);

  // Providing some function to Host container to be able to communicate with our child App
  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// start in local environment, not inside MF Host
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_marketing-dev-root');

  if (devRoot) {
    // Use browser history when running app in isolation
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
