import { useState, useEffect } from "react";
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
  const { dispatch: windowSizeDispatch, getState: getWindowSizeState } =
    useWindowSize();

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
    // -1 for border size 1px
    setMouseEndPosition({ x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth - 1, y_end: e.pageY });
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    console.log("down")
    document.getElementById("vertical_grid").addEventListener("mousemove", onMouseMove);
    setMouseStartPosition({ x_start: e.pageX - e.offsetX, y_start: e.pageY });
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    document.getElementById("vertical_grid").removeEventListener("mousemove", onMouseMove);
    // -1 for border size 1px
    setMouseEndPosition({ x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth - 1 , y_end: e.pageY });
  };

  useEffect(() => {
    document.getElementById("vertical_grid").addEventListener("mouseup", onMouseUp);
    document.getElementById("vertical_grid").addEventListener("mousedown", onMouseDown);

    return () => {
        document.getElementById("vertical_grid").removeEventListener("mouseup", onMouseUp);
        document.getElementById("vertical_grid").removeEventListener("mousedown", onMouseDown);
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
