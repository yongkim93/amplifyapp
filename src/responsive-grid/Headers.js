import React from 'react'
import { useWindowSize } from '../utility/windowSizeManager'
import './Headers.scss'
import { useDateTimeManager } from '../utility/DateTimeManager'

const heightOfHeaderColumn = 60

const RowHeader = () => {
  const { state: windowSizeState } = useWindowSize()
  const elements = []
  let j = 0
  const hours = [
    '12 AM',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
    '12 AM'
  ]
  const style = (width) => {
    return {
      width: width + 'px',
      height: windowSizeState?.rowHeight
    }
  }

  const timeStyle = {
    width: '30px',
    height: windowSizeState?.rowHeight,
    position: 'relative',
    bottom: -windowSizeState?.rowHeight + 10 + 'px', // +10px for fontsize
    fontSize: '10px'
  }

  const noonTimeStyle = {
    width: '30px',
    height: heightOfHeaderColumn + 'px',
    position: 'relative',
    bottom: -heightOfHeaderColumn + 10 + 'px',
    fontSize: '10px'
  }

  elements.push(
    <div key={-1} className="col-header">
      <div style={noonTimeStyle}>{hours[j++]}</div>
      <div
        className="border-right border-bottom"
        style={{ width: '10px', height: heightOfHeaderColumn + 'px' }}
      />
    </div>
  )
  for (let i = 0; i < 48; i++) {
    if (i % 2) {
      elements.push(
        <div key={i} className="col-header">
          <div style={timeStyle}>{hours[j++]}</div>
          <div className="border-right border-bottom" style={style(10)}></div>
        </div>
      )
    } else {
      elements.push(
        <div
          key={i}
          className="border-right border-bottom-dashed"
          style={style(40)}
        ></div>
      )
    }
    // elements.push(
    //   <div key={i} className={`border-right ${i % 2 ? "border-bottom": ""}`} style={style}></div>
    // );
  }

  return <div className="row-header">{elements}</div>
}

const ColumnHeader = () => {
  const { state: windowSizeState } = useWindowSize()
  const { state: dateTimeState } = useDateTimeManager()
  const elements = []

  const style = {
    width: windowSizeState?.colWidth,
    height: heightOfHeaderColumn + 'px'
  }

  const currentDateTime = new Date(dateTimeState.mondayOfTheCurrentWeek)

  for (let i = 0; i < 7; i++) {
    elements.push(
      <div
        key={i}
        className="border-right border-bottom row-header background-color"
        style={style}
      >
        <span>{currentDateTime.toString('ddd M/d')}</span>
      </div>
    )
    currentDateTime.setDate(currentDateTime.getDate() + 1)
  }

  return <div className="col-header sticky-header">{elements}</div>
}

export { RowHeader, ColumnHeader }
