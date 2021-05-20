import React from "react";
import { useWindowSize } from "../utility/windowSizeManager";
import "./Row.scss";

const Row = () => {
  const { state: windowSizeState } = useWindowSize();
  const elements = [];

  const style = {
    width: windowSizeState?.width,
    height: windowSizeState?.rowHeight,
  };

  for (let i = 0; i < 48; i++) {
    elements.push(<div key={i} className={`${i % 2 ? "border-bottom" : "border-bottom-dashed"} row-header`} style={style}></div>);
  }

  return elements;
};

export default Row;
