import React, { useLayoutEffect, useRef } from "react";
import { useWindowSize, WindowSizeProvider } from "../utility/windowSize";
import { RowHeader, ColumnHeader } from "./Headers";
import Column from "./Column";
import Row from "./Row";
import DragAndCreate from "./DragOnColumn";
import "./VerticalGrid.scss";
import { CloudHSM } from "aws-sdk";

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
  );
};

export default VerticalGrid;
