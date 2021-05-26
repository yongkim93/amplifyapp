import React, { useState, useEffect } from 'react'
import { useWindowSize } from '../utility/windowSizeManager'
import './Cell.scss'
import { useEventManager } from '../utility/useEventManager'

const sortKeys = (eventManager, startEpoch, endEpoch) => {
  const tempKeys = []
  eventManager.events.forEach((value, key) => {
    if (key >= startEpoch && key < endEpoch) {
      tempKeys.push(key)
    }
  })
  return tempKeys
}

const Cell = (props) => {
  const { state: windowSizeManager } = useWindowSize()
  const { state: eventManager } = useEventManager()
  const { refreshEvents } = useEventManager()
  const [keys, setKeys] = useState([]) // keys are startTime

  useEffect(() => {
    const keyHolder = sortKeys(
      eventManager,
      props.startOfTheDay,
      props.endOfTheDay
    )
    setKeys([...keyHolder])
  }, [eventManager, sortKeys])

  const interval = (highEpochi, lowEpochi) => {
    // 30m interval
    return (highEpochi - lowEpochi) / 60 / 30
  }

  const getYPosition = (interval) => {
    return interval * windowSizeManager.rowHeight
  }

  const createBlocks = () => {
    let acc = 0
    keys.sort((a, b) => a - b)
    return keys.map((key) => {
      const { startTimeEpochi, endTimeEpochi } = eventManager.events.get(key)
      const height =
        interval(endTimeEpochi, startTimeEpochi) * windowSizeManager.rowHeight
      const top =
        getYPosition(interval(startTimeEpochi, props.startOfTheDay)) - acc
      acc += height

      return (
        <div
          key={startTimeEpochi + endTimeEpochi}
          style={{
            position: 'relative',
            backgroundColor: 'aquamarine',
            width: windowSizeManager.colWidth,
            height,
            top
          }}
        ></div>
      )
    })
  }

  const clickHandler = (e) => {
    refreshEvents()
  }

  return (
    <div
      className={props.className + ' cell'}
      style={props.style}
      onClick={clickHandler}
    >
      {createBlocks()}
    </div>
  )
}

export default Cell
