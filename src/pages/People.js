import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import {PeopleContext} from '../AppTemplate/PeopleContext';
import CenteredPage from '../components/CenteredPage';
import PersonCard from '../forms/PersonCard';

import getRandomNumber from '../utils/getRandomNumber';

const LUKE_PERSON_ID = 1;
const LEIA_PERSON_ID = 5;

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  buttonWrap: {
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
    width: theme.spacing(15),
  },
  error: {
    color: 'red',
  },
}));

const People = ({match: {params: {personId}}, history}) => {
  const classes = useStyles();
  const {person, fetchPerson, isLoading, errors} = useContext(PeopleContext);

  useEffect(() => {
    personId = Number(personId);

    if (isLoading || errors.length) {
      /* No need to check anything if loading is in progress or user need to fix validation errors */
      return;
    }

    if (!person) {
      /* When we initially render the page there's no Person loaded yet */
      fetchPerson(personId);
    } else if (person.personId !== personId) {
      /* Update the URL according to the loaded Person */
      history.push(`/people/${person.personId}`);
    }
  }, [(person || {}).personId, isLoading, errors.length]);

  const onClickHandler = (personId) => () => fetchPerson(personId);

  return (
    <CenteredPage className={classes.CenteredPage}>
      <h3 className={classes.header}>Star Wars notable characters</h3>
      <br />

      {person && <PersonCard person={person} isLoading={isLoading} />}

      <br />
      <Divider />
      <br />

      <div className={classes.buttonWrap}>
        <Button
          className={classes.button}
          variant='outlined'
          color='primary'
          onClick={onClickHandler(LUKE_PERSON_ID)}
          disabled={isLoading}
        >
          Luke
        </Button>

        <Button
          className={classes.button}
          variant='outlined'
          color='secondary'
          onClick={onClickHandler(LEIA_PERSON_ID)}
          disabled={isLoading}
        >
          Leia
        </Button>

        <Button
          className={classes.button}
          variant='outlined'
          onClick={onClickHandler(getRandomNumber(1, 88))}
          disabled={isLoading}
        >
          Random ?
        </Button>

        <br />
        <br />

        <Button
          className={classes.button}
          variant='contained'
          color='secondary'
          onClick={onClickHandler()}
          disabled={isLoading}
        >
          Form Validation Error #1
        </Button>

        <Button
          className={classes.button}
          variant='contained'
          color='secondary'
          onClick={onClickHandler(0)}
          disabled={isLoading}
        >
          Form Validation Error #2
        </Button>

        <Button
          className={classes.button}
          variant='contained'
          color='secondary'
          onClick={onClickHandler(89)}
          disabled={isLoading}
        >
          Response Error
        </Button>
      </div>

      <br />
      <br />

      {errors.map(({message}, index) => <div key={index} className={classes.error}>{message}</div>)}

      <br />
    </CenteredPage>
  );
};

People.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(People);
