import React from "react";
import { useWindowSize } from "../utility/windowSize";
import "./Row.scss";

const Row = () => {
  const { state: windowSizeState } = useWindowSize();
  const elements = [];

  const style = {
    width: windowSizeState?.width,
    height: windowSizeState?.rowHeight,
  };

  for (let i = 1; i < 25; i++) {
    elements.push(<div key={i} className="border-bottom row-header" style={style}></div>);
  }

  return elements;
};

export default Row;
