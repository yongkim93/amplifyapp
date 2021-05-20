import React, { useContext, createContext } from "react";
import useEnhancedReducer from "./useEnhancedReducer";

const windowSizeInfo = createContext({});
const { Provider } = windowSizeInfo;

const WindowSizeProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer((state, action) => {
    switch (action.type) {
      case "RESIZE":
        const { width, height } = action.payload;
        return {
          width,
          height,
          colWidth: Math.round(width / 7) - 1, // -1 for the border px
          rowHeight: height / 48,
          interval: height / 24 / 2,
        };
      default:
        return state;
    }
  });

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useWindowSize = () => useContext(windowSizeInfo);

export { useWindowSize, WindowSizeProvider };
