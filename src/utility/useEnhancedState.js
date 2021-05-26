import { useState, useRef, useCallback } from 'react'

const useEnhancedState = (value) => {
  const [state, setState] = useState(value)
  const lastState = useRef()
  lastState.current = state
  const getState = useCallback(() => lastState.current, [])
  return [state, setState, getState]
}

export default useEnhancedState
