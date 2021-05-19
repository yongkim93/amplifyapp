import React, { Fragment, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useMouseDown, useMouseUp, useDraw } from "../utility/dragHandlers";
import { useWindowSize } from "../utility/windowSize";

export default function DragAndCreate() {
  const {
    x_start,
    y_start,
    x_end,
    y_end,
    reset,
    setMouseStartPosition,
    setMouseEndPosition,
  } = useDraw();

  const [list, setList] = useState([]);

  const mystyle = {
    position: "absolute",
    width: x_end ? Math.abs(x_start - x_end) : 0,
    height: y_end ? Math.abs(y_start - y_end) : 0,
    backgroundColor: "yellow",
    left: x_start,
    top: y_start,
  };

  const mystyleTemplate = (width, height, left, top) => {
    return {
      position: "absolute",
      width: width,
      height: height,
      backgroundColor: "yellow",
      left: left,
      top: top,
    };
  };

  const onMouseUp = () => {
    let x_start, y_start, x_end, y_end;

    setMouseStartPosition((value) => {
      x_start = value.x_start;
      y_start = value.y_start;
      return value;
    });

    if (x_start && y_start) {
      setMouseEndPosition((value) => {
        x_end = value.x_end;
        y_end = value.y_end;
        return value;
      });
      console.log(x_start, x_end, y_start, y_end);
      //must add key later
      setList((value) => {
        return [
          ...value,
          <div
            style={mystyleTemplate(
              Math.abs(x_start - x_end),
              Math.abs(y_start - y_end),
              x_start,
              y_start
            )}
          ></div>,
        ];
      });
    }
    reset();
  };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div className="App">
      {ReactDOM.createPortal(
        <div style={mystyle}></div>,
        document.getElementById("root")
      )}
      {ReactDOM.createPortal(list, document.getElementById("root"))}
    </div>
  );
}
