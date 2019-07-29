import React, {lazy} from 'react';
import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';
import {ThemeProvider} from '@material-ui/styles';

import {PeopleContextProvider} from './AppTemplate/PeopleContext';
import {TerminalContextProvider} from './AppTemplate/TerminalContext';

import waitingComponent from './utils/waitingComponent';
import AppTemplate from './AppTemplate';
import theme from './utils/theme';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const People = lazy(() => import(/* webpackChunkName: "People" */ './pages/People'));
const Terminal = lazy(() => import(/* webpackChunkName: "Terminal" */ './pages/Terminal'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const Routes = () => (
  <ThemeProvider theme={theme}>
    <PeopleContextProvider>
      <TerminalContextProvider>
        <AppTemplate>
          <Switch>
            <Route path='/home' component={waitingComponent(Home)} />
            <Redirect exact from='/' to='/home' />

            <Route path='/people/:personId' component={waitingComponent(People)} />
            <Redirect from='/people' to='/people/1' />

            <Route exact path='/terminal' component={waitingComponent(Terminal)} />

            <Route component={waitingComponent(NotFound)} />
          </Switch>
        </AppTemplate>
      </TerminalContextProvider>
    </PeopleContextProvider>
  </ThemeProvider>
);

export default Routes;
