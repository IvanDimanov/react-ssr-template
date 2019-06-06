import {useState, useMemo} from 'react';
import {fromJS} from 'immutable';

const checkPrimitive = (variable) => !variable || typeof variable !== 'object';

const useImmutableState = (initialState) => {
  const [{isPrimitive, immutableState}, setState] = useState({
    isPrimitive: checkPrimitive(initialState),
    immutableState: fromJS(initialState),
  });

  const setImmutableState = (newState) => {
    setState({
      isPrimitive: checkPrimitive(newState),
      immutableState: fromJS(newState),
    });
  };

  const value = isPrimitive ? immutableState : immutableState.toJS();
  const response = useMemo(() => ([
    value,
    setImmutableState,
  ]), [
    value,
  ]);

  return response;
};

export default useImmutableState;
