import React, { Fragment } from "react";
import { useWindowSize } from "../utility/windowSize";
import "./Headers.scss";

const RowHeader = () => {
  const { state: windowSizeState } = useWindowSize();
  const elements = [];

  const style = {
    width: "40px",
    height: windowSizeState?.rowHeight,
  };
  elements.push(
    <div
      key={0}
      className="border-right border-bottom"
      style={{ width: "40px", height: "70px" }}
    />
  );
  for (let i = 1; i < 25; i++) {
    elements.push(
      <div key={i} className="border-right border-bottom" style={style} />
    );
  }

  return <div className="row-header">{elements}</div>;
};

const ColumnHeader = () => {
  const { state: windowSizeState } = useWindowSize();
  const elements = [];

  const style = {
    width: windowSizeState?.colWidth,
    height: "70px",
  };

  for (let i = 0; i < 7; i++) {
    elements.push(
      <div key={i} className="border-right border-bottom" style={style} />
    );
  }

  return <div className="col-header">{elements}</div>;
};

export { RowHeader, ColumnHeader };
