import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {TerminalContext} from '../AppTemplate/TerminalContext';
import useImmutableState from '../utils/useImmutableState';
import CenteredPage from '../components/CenteredPage';

const useStyles = makeStyles((theme) => ({
  error: {
    color: 'red',
  },
}));

const Terminal = () => {
  const classes = useStyles();

  const {commandResponse, fetchCommandResponse, isLoading, errors} = useContext(TerminalContext);
  const [command, setCommand] = useImmutableState('');
  const onCommandChange = (event) => setCommand(event.target.value);

  const submit = (event) => {
    event.preventDefault();

    if (!isLoading) {
      fetchCommandResponse(command);
    }
  };

  return (
    <CenteredPage>
      <h1>Terminal page</h1>

      <form onSubmit={submit}>
        <input
          type='text'
          value={command}
          onChange={onCommandChange}
          disabled={isLoading}
          autoFocus
        />

        <input
          type='submit'
          value='Run'
          disabled={isLoading}
        />
      </form>

      {errors.map(({message}, index) => <div key={index} className={classes.error}>{message}</div>)}

      <pre>{commandResponse
        ? commandResponse.replace('\n', `
`)
        : ''
      }</pre>
    </CenteredPage>
  );
};

export default Terminal;
