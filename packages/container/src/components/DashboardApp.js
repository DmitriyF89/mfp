import React from 'react';
import { mount } from 'dashboard/DashboardApp';

const DashboardApp = () => {
  return (
    <div
      ref={(el) => {
        if (el) {
          mount(el);
        }
      }}
    />
  );
};

export default DashboardApp;
