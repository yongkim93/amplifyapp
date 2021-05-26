import React, { useContext, createContext, useEffect } from 'react'
import useEnhancedReducer from './useEnhancedReducer'
import useHttp from '../db/useHttp'
import { getDateToEpoch } from './DateTimeManager'

const eventsInfo = createContext({})
const { Provider } = eventsInfo
const initialState = {
  events: new Map()
}

const EventManagerProvider = ({ children }) => {
  const { readEvents } = useHttp()
  const [state, dispatch, getState] = useEnhancedReducer((state, action) => {
    switch (action.type) {
      case 'REFRESH':
        return { ...state, events: action.payload }
      default:
        return state
    }
  }, initialState)

  const refreshEvents = () => {
    readEvents('yongshine_appointment', 'guest', null).then((data) => {
      const events = new Map()
      data.Items.forEach((item) => {
        const startTime = getDateToEpoch(new Date(item.startTime))
        const endTime = getDateToEpoch(new Date(item.endTime))
        events.set(startTime, {
          ...item,
          startTimeEpochi: startTime,
          endTimeEpochi: endTime
        })
      })
      dispatch({ type: 'REFRESH', payload: events })
    })
  }

  useEffect(() => {
    refreshEvents()
  }, [])

  return (
    <Provider value={{ state, dispatch, getState, refreshEvents }}>
      {children}
    </Provider>
  )
}

const useEventManager = () => useContext(eventsInfo)

export { useEventManager, EventManagerProvider }
