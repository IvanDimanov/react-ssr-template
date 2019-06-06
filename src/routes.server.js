import React from 'react';
import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';
import {ThemeProvider} from '@material-ui/styles';

import {PeopleContextProvider} from './AppTemplate/PeopleContext';

import AppTemplate from './AppTemplate';
import theme from './utils/theme';

import Home from './pages/Home';
import People from './pages/People';
import NotFound from './pages/NotFound';

const Routes = () => (
  <ThemeProvider theme={theme}>
    <PeopleContextProvider>
      <AppTemplate>
        <Switch>
          <Route path='/home' component={Home} />
          <Redirect exact from='/' to='/home' />

          <Route path='/people/:personId' component={People} />
          <Redirect from='/people' to='/people/1' />

          <Route component={NotFound} />
        </Switch>
      </AppTemplate>
    </PeopleContextProvider>
  </ThemeProvider>
);

export default Routes;
