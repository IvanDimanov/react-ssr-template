import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';

import useImmutableState from '../utils/useImmutableState';
import delay from '../utils/delay';

import {getInitialFetchedServerData} from '../dataFetchers/initialFetchedServerData';
import fetchPersonAndSpecies from '../dataFetchers/fetchPersonAndSpecies';

const PeopleContext = createContext();

const PeopleContextProvider = ({children}) => {
  const {person: initialPeron = null} = getInitialFetchedServerData();

  const [person, setPerson] = useImmutableState(initialPeron);
  const [isLoading, setLoading] = useImmutableState(false);
  const [errors, setErrors] = useImmutableState([]);

  /**
   * NB: Please know that the real limit is from 1 to 88! but in order to simulate
   * error response we need to be able to send invalid ids like 89.
   */
  const minPersonId = 1;
  const maxPersonId = 100;

  const fetchPerson = async (personId) => {
    const newErrors = [];
    if (!Number.isInteger(personId)) {
      newErrors.push(new TypeError(`"personId" must be an Integer but it is "${personId}"`));
    }

    if (personId < minPersonId || personId > maxPersonId) {
      newErrors.push(
          new RangeError(`"personId"(${personId}) must be no less than ${minPersonId} and no higher than ${maxPersonId}`)
      );
    }

    setErrors(newErrors);
    if (newErrors.length) {
      return;
    }

    setLoading(true);

    /**
     * Normally the StarWars API is really fast so in order to test the loading UX
     * we need to artificially delay the request :D
     */
    await delay(2000);

    try {
      const person = await fetchPersonAndSpecies(personId);
      setPerson(person);
    } catch (error) {
      if ((error.response || {}).status === 404) {
        setErrors([new ReferenceError(`Person with id "${personId}" was not found`)]);
        return;
      }

      setErrors([error]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Our `providerValue` relies on props that are "values" (`person`, `isLoading`, `error`)
   * and props that are "functions" (`fetchPerson`).
   * When the provider re-renders - it'll have the same set of "values" props but new set of "functions" props.
   * This will make all of the provider's children to unnecessary re-render.
   * In order to avoid this re-rendering we'll change our `providerValue` only when the "values" props change.
   * https://kentcdodds.com/blog/always-use-memo-your-context-value
   */
  const providerValue = useMemo(() => ({
    person,
    fetchPerson,
    isLoading,
    errors,
  }), [
    person,
    isLoading,
    errors,
  ]);

  return (
    <PeopleContext.Provider value={providerValue}>
      {children}
    </PeopleContext.Provider>
  );
};

PeopleContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export {
  PeopleContext,
  PeopleContextProvider,
};
