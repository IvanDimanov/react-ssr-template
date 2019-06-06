import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = (theme) => ({
  content: {
    margin: `${theme.spacing(1)}px auto 0px`,
    width: '500px',
  },
});

const CenteredPage = ({children, classes, className}) => (
  <div className={classNames(classes.content, className)}>
    {children}
  </div>
);

CenteredPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(CenteredPage);
