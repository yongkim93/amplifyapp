import React from 'react'
import './Calendar.scss'
import Grid from './grid/Grid'

class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
        <div className="calendar">
            <Grid />
        </div>
    )
  };
}

export default Calendar
