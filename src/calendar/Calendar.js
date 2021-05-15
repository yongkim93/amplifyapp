import React from "react";
import "./Calendar.scss";
import Grid from "./grid/Grid";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="calendar noselect">
        <h1>Drag and drop existing appointment</h1>
        <Grid />
      </div>
    );
  }
}

export default Calendar;
