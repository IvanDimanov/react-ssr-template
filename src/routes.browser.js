import React, {lazy} from 'react';
import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';
import {ThemeProvider} from '@material-ui/styles';

import {PeopleContextProvider} from './AppTemplate/PeopleContext';

import waitingComponent from './utils/waitingComponent';
import AppTemplate from './AppTemplate';
import theme from './utils/theme';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const People = lazy(() => import(/* webpackChunkName: "People" */ './pages/People'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const Routes = () => (
  <ThemeProvider theme={theme}>
    <PeopleContextProvider>
      <AppTemplate>
        <Switch>
          <Route path='/home' component={waitingComponent(Home)} />
          <Redirect exact from='/' to='/home' />

          <Route path='/people/:personId' component={waitingComponent(People)} />
          <Redirect from='/people' to='/people/1' />

          <Route component={waitingComponent(NotFound)} />
        </Switch>
      </AppTemplate>
    </PeopleContextProvider>
  </ThemeProvider>
);

export default Routes;
