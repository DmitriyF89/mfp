import React from 'react';
import { mount } from 'marketing/MarketingApp';
// we did this instead of exporting React Component to
// get rid of coupling between container and marketing

import { useHistory } from 'react-router-dom';

const MarketingApp = () => {
  // get history from closest Browser router (Container's Browser router)
  const history = useHistory();

  return (
    <div
      ref={(el) => {
        if (el) {
          const { onParentNavigate } = mount(el, {
            // Pass callback to inner app to get updates from MemoryRouter
            onNavigate: ({ pathname: nextPathname }) => {
              // update history by next path name
              // but need to check if current path is not the same as nextPath, to prevent infinite loop of updates
              const { pathname } = history.location;

              if (pathname !== nextPathname) {
                history.push(nextPathname);
              }
            },
            initialPath: history.location,
          });

          // make child app know about host navigation
          history.listen(onParentNavigate);
        }
      }}
    />
  );
};

export default MarketingApp;
