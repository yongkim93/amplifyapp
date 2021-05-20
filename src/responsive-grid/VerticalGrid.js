import React, { useLayoutEffect, useRef } from "react";
import {
  useWindowSize
} from "../utility/windowSizeManager";
import { RowHeader, ColumnHeader } from "./Headers";
import Column from "./Column";
import Row from "./Row";
import DragAndCreate from "./DragOnColumn";
import "./VerticalGrid.scss";
import { DateTimeProvider } from "../utility/DateTimeManager";

const VerticalGrid = (props) => {
  const { state: windowSizeState, dispatch: windowSizeDispatch } =
    useWindowSize();

  const setResizedWindow = () => {
    const el = document.getElementById("vertical_grid");
    windowSizeDispatch({
      type: "RESIZE",
      payload: { width: el.clientWidth, height: el.clientHeight },
    });
  };

  const reportWindowSize = () => {
    setResizedWindow();
    // const el = document.getElementById("vertical_grid");
    // console.log(el.clientWidth, el.clientHeight);
  };

  useLayoutEffect(() => {
    setResizedWindow();
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);

  return (
    <DateTimeProvider>
      <div className="row-align">
        <RowHeader />
        <div className="colunm-align">
          <ColumnHeader />
          <div className="vertical_grid" id="vertical_grid">
            <div className="horizontal_grid" id="horizontal_grid">
              <Row />
            </div>
            <Column />
            <DragAndCreate />
          </div>
        </div>
      </div>
    </DateTimeProvider>
  );
};

export default VerticalGrid;
