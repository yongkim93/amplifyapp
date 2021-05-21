import React from "react";
import { useWindowSize } from "../utility/windowSizeManager";
import "./Column.scss";
import Cell from "./Cell";
import { getDateToEpoch, getEpochToDate, useDateTimeManager } from "../utility/DateTimeManager";

const Column = () => {
  const { state: windowSizeState } = useWindowSize();
  const { state: dateTimeManager} = useDateTimeManager();
  const elements = [];

  const date = new Date(dateTimeManager.mondayOfTheCurrentWeek);

  const style = {
    width: windowSizeState?.colWidth,
    height: windowSizeState?.height,
  };

  for (let i = 0; i < 7; i++) {
    const startDateTime = getDateToEpoch(date);
    date.setDate(date.getDate() + 1);
    const endDateTime = getDateToEpoch(date);
    elements.push(<Cell key={i} startEpoch={startDateTime} endEpoch={endDateTime} className="border-right" style={style} />);
  }

  return elements;
};

export default Column;
