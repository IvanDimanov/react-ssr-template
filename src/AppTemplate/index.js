import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Header from './Header';

const styles = (theme) => ({
  main: theme.typography.body1,
});

const Layout = ({children, classes}) => (
  <div className={classes.main}>
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
