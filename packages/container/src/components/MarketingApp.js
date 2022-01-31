import React from 'react';
import { mount } from 'marketing/MarketingApp';
// we did this instead of exporting React Component to
// get rid of coupling between container and marketing

const MarketingApp = () => {
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

export default MarketingApp;
