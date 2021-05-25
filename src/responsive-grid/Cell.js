import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useWindowSize } from "../utility/windowSizeManager";
import "./Cell.scss";
import { useEventManager } from "../utility/useEventManager";
import {
  getDateToEpoch,
  getEpochToDate,
  useDateTimeManager,
} from "../utility/DateTimeManager";
const sortKeys = (eventManager, startEpoch, endEpoch) => {
  const tempKeys = [];
  eventManager.events.forEach((value, key) => {
    if (key >= startEpoch && key < endEpoch) {
      tempKeys.push(key);
    }
  });
  return tempKeys;
};
const Cell = (props) => {
  const { state: windowSizeManager } = useWindowSize();
  const { state: eventManager } = useEventManager();
  const { refreshEvents } = useEventManager();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const keyHolder = sortKeys(eventManager, props.startEpoch, props.endEpoch);
    setKeys([...keyHolder]);
  }, [eventManager, sortKeys]);

  const interval = (currentEpoch, startEpoch) => {
    //30m interval
    return (currentEpoch - startEpoch) / 60 / 30;
  };

  const getYPosition = (interval, position) => {
    return Math.round((interval - position) * windowSizeManager.rowHeight);
  };

  const createBlocks = () => {
    let i = 0;
    return keys.map((element) => {
      return (
        <div
          key={i}
          style={{
            backgroundColor: "aquamarine",
            width: windowSizeManager.colWidth,
            height: windowSizeManager.rowHeight,
            position: "relative",
            top: getYPosition(interval(element, props.startEpoch), i++),
          }}
        ></div>
      );
    });
  };

  const clickHandler = (e) => {
    refreshEvents();
  };

  return (
    <div
      className={props.className + " cell"}
      style={props.style}
      onClick={clickHandler}
    >
      {createBlocks()}
    </div>
  );
};

export default Cell;
