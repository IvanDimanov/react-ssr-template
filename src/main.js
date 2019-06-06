import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {hydrate, render} from 'react-dom';
import {hot} from 'react-hot-loader/root';

import Routes from './routes.browser';

const App = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

/* Check if the Server Pre-fetch some of the App data and we need to `hydrate` the App with it */
const renderMethod = global.__INITIAL_FETCHED_SERVER_DATA__ ? hydrate : render;
renderMethod(<App />, document.getElementById('app'));

export default module.hot ? hot(App) : App;
