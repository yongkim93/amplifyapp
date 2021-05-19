import React, {
  useContext,
  createContext,
  useReducer,
  useCallback,
  useRef,
} from "react";

const windowSizeInfo = createContext({});
const { Provider } = windowSizeInfo;

const useEnhancedReducer = (reducer, initState, initializer) => {
  const lastState = useRef(initState);
  const getState = useCallback(() => lastState.current, []);
  return [
    ...useReducer(
      (state, action) => (lastState.current = reducer(state, action)),
      initState,
      initializer
    ),
    getState,
  ];
};

const WindowSizeProvider = ({ children }) => {
  const [state, dispatch, getState ] = useEnhancedReducer((state, action) => {
    switch (action.type) {
      case "RESIZE":
        const { width, height } = action.payload;
        return {
          width,
          height,
          colWidth: width / 7,
          rowHeight: height / 24,
        };
      default:
        return state;
    }
  });

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useWindowSize = () => useContext(windowSizeInfo);

export { useWindowSize, WindowSizeProvider };
