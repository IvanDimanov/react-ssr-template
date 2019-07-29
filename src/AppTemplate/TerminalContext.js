import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';

import useImmutableState from '../utils/useImmutableState';

import {getInitialFetchedServerData} from '../dataFetchers/initialFetchedServerData';
import fetchCommandResponse from '../dataFetchers/fetchCommandResponse';

const TerminalContext = createContext();

const TerminalContextProvider = ({children}) => {
  const {commandResponse: initialCommandResponse = ''} = getInitialFetchedServerData();

  const [command, setCommand] = useImmutableState('');
  const [commandResponse, setCommandResponse] = useImmutableState(initialCommandResponse);
  const [isLoading, setLoading] = useImmutableState(false);
  const [errors, setErrors] = useImmutableState([]);

  const minCommandLength = 2;

  const fetchCommandResponseValidator = async (command) => {
    const newErrors = [];
    if (typeof command !== 'string') {
      newErrors.push(new TypeError(`"command" must be a String but it is {${typeof command}} "${command}"`));
    }

    if (command.length < minCommandLength) {
      newErrors.push(
          new RangeError(`"command"(${command}) must be no less than ${minCommandLength} characters long`)
      );
    }

    setErrors(newErrors);
    if (newErrors.length) {
      return;
    }

    setLoading(true);
    try {
      setCommand(command);
      const {commandResponse} = await fetchCommandResponse(command);
      setCommandResponse(commandResponse);
    } catch (error) {
      setErrors([error]);
    } finally {
      setLoading(false);
    }
  };

  const providerValue = useMemo(() => ({
    command,
    commandResponse,
    fetchCommandResponse: fetchCommandResponseValidator,
    isLoading,
    errors,
  }), [
    commandResponse,
    isLoading,
    errors,
  ]);

  return (
    <TerminalContext.Provider value={providerValue}>
      {children}
    </TerminalContext.Provider>
  );
};

TerminalContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export {
  TerminalContext,
  TerminalContextProvider,
};
