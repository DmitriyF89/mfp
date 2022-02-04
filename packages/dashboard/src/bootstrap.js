import { createApp } from 'vue';

import Dashboard from './components/Dashboard';

// startup function for our react App
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// start in local environment, not inside MF Host
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_dashboard-dev-root');

  if (devRoot) {
    // Use browser history when running app in isolation
    mount(devRoot);
  }
}

export { mount };
