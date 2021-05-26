import React, { useContext, createContext } from 'react'
import useEnhancedReducer from './useEnhancedReducer'
require('datejs')

const dateTimeInfo = createContext({})
const { Provider } = dateTimeInfo

const initialState = {
  currentDate: new Date(),
  mondayOfTheCurrentWeek: new Date().last().monday().setHours(0, 0, 0, 0)
}

const DateTimeProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer((state, action) => {
    switch (action.type) {
      case 'setCurrentDate':
        return { ...state, currentDate: action.payload }
      default:
        return state
    }
  }, initialState)

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>
}

const useDateTimeManager = () => useContext(dateTimeInfo)

const getDateToEpoch = (dateTime) => {
  return Math.floor(dateTime.getTime() / 1000)
}

const getEpochToDate = (epoch) => {
  return new Date(+epoch * 1000)
}

export { useDateTimeManager, DateTimeProvider, getDateToEpoch, getEpochToDate }
