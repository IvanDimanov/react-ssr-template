import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import SpeciesIcon from '@material-ui/icons/AccessibilityNew';
import MassIcon from '@material-ui/icons/Stop';
import HeightIcon from '@material-ui/icons/VerticalAlignTop';
import EyeColorIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    margin: 'auto',
  },
  title: {
    fontSize: 14,
  },
  CircularProgress: {
    marginLeft: theme.spacing(1),
  },

  propertyLabel: {
    verticalAlign: 'top',
    textTransform: 'capitalize',
    marginLeft: theme.spacing(1),
  },
  propertyDimension: {
    verticalAlign: 'super',
    fontSize: 10,
  },
}));

function PersonCard({person, isLoading}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <h4>
          {person.name}
          {isLoading && <CircularProgress size={15} className={classes.CircularProgress} />}
        </h4>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <SpeciesIcon />
            <span className={classes.propertyLabel}>
              {person.fetchedSpecies.map(({name}) => name).join(', ')}
            </span>
            <br />

            <EyeColorIcon />
            <span className={classes.propertyLabel}>
              {person.eye_color}
            </span>
          </Grid>

          <Grid item xs={6}>
            <HeightIcon />
            <span className={classes.propertyLabel}>
              {person.height}
              <em className={classes.propertyDimension}>cm</em>
            </span>
            <br />

            <MassIcon />
            <span className={classes.propertyLabel}>
              {person.mass}
              <em className={classes.propertyDimension}>kg</em>
            </span>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

PersonCard.propTypes = {
  person: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PersonCard;
