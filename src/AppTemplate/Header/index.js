import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {PeopleContext} from '../PeopleContext';

import LinkButton from './LinkButton';

const styles = {
  flex: {
    flex: 1,
  },
};

const Header = ({classes}) => {
  const {person} = useContext(PeopleContext);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography className={classes.flex}>
          <LinkButton path='/home' label='Home' />
          <LinkButton path='/people' label='People' />
          <LinkButton path='/not-found' label='(Test broken link)' />
        </Typography>

        {person && (<div>
          Last loaded character: <b>{person.name}</b>
        </div>)}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
