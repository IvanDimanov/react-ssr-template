import React, {Suspense} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Timeout from './Timeout';

/* Inspired by https://codesandbox.io/s/basic-blog-with-reactlazy-and-reactsuspense-7p7g2 */
function waitingComponent(Component) {
  return function wrap(props) {
    return (
      <Suspense fallback={
        (/* Show the loading `CircularProgress` only if the component is not loaded in `1000`[milliseconds] */
          <Timeout ms={1000}>
            {(didTimeout) => didTimeout ? <CircularProgress /> : null}
          </Timeout>
        )}
      >
        <Component {...props} />
      </Suspense>
    );
  };
}

export default waitingComponent;
