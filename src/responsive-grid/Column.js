import React from "react";
import { useWindowSize } from "../utility/windowSizeManager";
import "./Column.scss";

const Column = () => {
  const { state: windowSizeState } = useWindowSize();
  const elements = [];

  const style = {
    width: windowSizeState?.colWidth,
    height: windowSizeState?.height,
  };

  for (let i = 1; i < 8; i++) {
    elements.push(<Cell key={i} className="border-right" style={style} />);
  }

  return elements;
};

const Cell = (props) => {

//   const mouseDownHandler = (e) => {
//     console.log("clientX", e.pageX);
//     console.log("clienty", e.pageY);
//     console.log(e);
//   };
  return (
    <div
      key={props.key}
      className={props.className + " cell"}
      style={props.style}
    ></div>
  );
};

export default Column;
