import { useState, useEffect, useRef } from "react";
import { useWindowSize } from "../utility/windowSize";

const useMouseDown = () => {
  const [mousePosition, setMousePosition] = useState({
    x_start: null,
    y_start: null,
  });

  const updateMousePosition = (ev) => {
    setMousePosition({ x_start: ev.clientX, y_start: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousedown", updateMousePosition);

    return () => window.removeEventListener("mousedown", updateMousePosition);
  }, []);

  return mousePosition;
};

const useMouseUp = () => {
  const [mousePosition, setMousePosition] = useState({
    x_end: null,
    y_end: null,
  });
  const updateMousePosition = (ev) => {
    setMousePosition({ x_end: ev.pageX, y_end: ev.pageY });
  };

  const updateMouseUp = (ev) => {
    window.removeEventListener("mousemove", updateMousePosition);
    setMousePosition({ x_end: ev.pageX, y_end: ev.pageY });
  };

  useEffect(() => {
    window.addEventListener("mouseup", updateMouseUp);
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mouseup", updateMousePosition);
  }, []);

  return mousePosition;
};

const useDraw = () => {
  const { getState: getWindowSizeState } = useWindowSize();
  const myref = useRef(0);

  const [mouseStartPosition, setMouseStartPosition] = useState({
    x_start: null,
    y_start: null,
  });
  const [mouseEndPosition, setMouseEndPosition] = useState({
    x_end: null,
    y_end: null,
  });

  const reset = () => {
    setMouseStartPosition({ x_start: null, y_start: null });
    setMouseEndPosition({ x_end: null, y_end: null });
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    if (e.offsetY - myref.current > 0) {
    //   console.log(e.offsetY - myref.current);

      // -1 for border size 1px
      setMouseEndPosition((prev) => {
        // console.log(prev);
        const y =
          e.pageY -
          e.offsetY +
          getWindowSizeState().rowHeight *
            Math.ceil(e.offsetY / getWindowSizeState().rowHeight);

          return {
            x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth - 1,
            y_end: y,
          };
      });
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    myref.current = e.offsetY;
    window.addEventListener("mousemove", onMouseMove);
    setMouseStartPosition({
      x_start: e.pageX - e.offsetX,
      y_start:
        e.pageY -
        e.offsetY +
        getWindowSizeState().rowHeight *
          Math.floor(e.offsetY / getWindowSizeState().rowHeight),
    });
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    window.removeEventListener("mousemove", onMouseMove);

    // -1 for border size 1px
    setMouseEndPosition((prev) => {
      //   console.log(prev);
      if (prev.y_end) {
        return {
          x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth - 1,
          y_end:
            e.pageY -
            e.offsetY +
            getWindowSizeState().rowHeight *
              Math.ceil(e.offsetY / getWindowSizeState().rowHeight),
        };
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    document
      .getElementById("vertical_grid")
      .addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      document
        .getElementById("vertical_grid")
        .removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return {
    ...mouseStartPosition,
    ...mouseEndPosition,
    setMouseStartPosition,
    setMouseEndPosition,
    reset,
  };
};

export { useMouseDown, useMouseUp, useDraw };
