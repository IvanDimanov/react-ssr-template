import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
  Link: {
    textDecoration: 'none',
  },

  ButtonSelected: {
    color: 'white',
  },

  ButtonNotSelected: {
    color: 'grey',
  },
});

const LinkButton = ({classes, location, path, label}) => (
  <Link
    className={classes.Link}
    to={path}
  >
    <Button className={location.pathname.startsWith(path) ? classes.ButtonSelected : classes.ButtonNotSelected}>{label}</Button>
  </Link>
);

LinkButton.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(LinkButton));
