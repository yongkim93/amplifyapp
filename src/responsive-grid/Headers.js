import React from 'react'
import { useWindowSize } from '../utility/windowSizeManager'
import './Headers.scss'
import { useDateTimeManager } from '../utility/DateTimeManager'
import SideNav from '../sideNav/SideNav'

const heightOfHeaderColumn = 60

const RowHeader = () => {
  const { state: windowSizeState } = useWindowSize()
  const elements = []
  let j = 0
  const hours = [
    '',
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
    top: -9, // -windowSizeState?.rowHeight - 10 + 'px', // +10px for fontsize
    fontSize: '10px'
  }

  for (let i = 0; i < 47; i++) {
    if (i % 2) {
      elements.push(
        <div key={i} className="col-header">
          <div style={timeStyle}></div>
          <div className="border-right border-bottom" style={style(10)}></div>
        </div>
      )
    } else {
      elements.push(
        <div
          key={i}
          className="border-right border-bottom-dashed"
          style={style(40)}
        >
          <div style={timeStyle}>{hours[j++]}</div>
        </div>
      )
    }
  }
  elements.push(
    <div key={48} className="col-header">
      <div className="border-right border-bottom" style={style(40)}></div>
    </div>
  )
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

  elements.push(
    <div
      key={0}
      className="border-right border-bottom row-header background-color"
      style={{ width: '40px', height: heightOfHeaderColumn + 'px' }}
    >
      <SideNav />
    </div>
  )
  for (let i = 1; i < 8; i++) {
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
