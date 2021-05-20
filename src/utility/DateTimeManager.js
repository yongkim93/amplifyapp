import React, { useContext, createContext } from "react";
import useEnhancedReducer from "./useEnhancedReducer";
require("datejs");

const dateTimeInfo = createContext({});
const { Provider } = dateTimeInfo;

const initialState = {
  currentDate: new Date(),
  mondayOfTheCurrentWeek: new Date().last().monday(),
};

const DateTimeProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer((state, action) => {
    switch (action.type) {
      case "setCurrentDate":
        return { ...state, currentDate: action.payload };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useDateTimeManager = () => useContext(dateTimeInfo);

export { useDateTimeManager, DateTimeProvider };
