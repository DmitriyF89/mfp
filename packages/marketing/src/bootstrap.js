import React from 'react';
import { render } from 'react-dom';

import App from './App';

// startup function for our react App
const mount = (el) => {
  render(<App />, el);
};

// start in local environment, not inside MF Host
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_marketing-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
