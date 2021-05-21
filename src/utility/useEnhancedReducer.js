import { useReducer, useRef, useCallback } from "react";

const useEnhancedReducer = (reducer, initState, initializer) => {
  const lastState = useRef(initState);
  const getState = useCallback(() => lastState.current, []);
  return [
    ...useReducer(
      useCallback(
        (state, action) => (lastState.current = reducer(state, action)),
        [lastState]
      ),
      initState,
      initializer
    ),
    getState,
  ];
};

export default useEnhancedReducer;
