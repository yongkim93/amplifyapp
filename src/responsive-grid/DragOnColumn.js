import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDraw } from "../utility/dragHandlers";

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
    width: x_end - x_start < -1 ? "undefined" : x_end - x_start,
    height: y_end - y_start < -1 ? "undefined" : y_end - y_start,
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

      //must add key later
      setList((value) => {
        if (x_end - x_start > 1 && y_end - y_start > 1) {
          return [
            ...value,
            <div
              style={mystyleTemplate(
                x_end - x_start,
                y_end - y_start,
                x_start,
                y_start
              )}
            ></div>,
          ];
        } else {
          return value;
        }
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