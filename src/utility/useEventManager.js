import React, { useContext, createContext, useEffect } from 'react'
import useEnhancedReducer from './useEnhancedReducer'
import ReadEvents from '../db/useReadEvents'

const eventsInfo = createContext({})
const { Provider } = eventsInfo
const initialState = {
  events: new Map()
}

const EventManagerProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer((state, action) => {
    switch (action.type) {
      case 'REFRESH':
        return { ...state, events: action.payload }
      default:
        return state
    }
  }, initialState)

  const refreshEvents = () => {
    ReadEvents('yongshine-guest', 'guest', null).then((data) => {
      const events = new Map()
      data.Items.forEach((item) => {
        events.set(item.appointmentId, item)
      })
      dispatch({ type: 'REFRESH', payload: events })
    })
  }

  useEffect(() => {
    refreshEvents()
  }, [])

  return <Provider value={{ state, dispatch, getState, refreshEvents }}>{children}</Provider>
}

const useEventManager = () => useContext(eventsInfo)

export { useEventManager, EventManagerProvider }
