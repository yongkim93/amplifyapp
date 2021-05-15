import React, { useLayoutEffect } from "react";
import windowSize from "../utility/windowSize";
import "./VerticalGrid.scss";

const VerticalGrid = (props) => {
  useLayoutEffect(() => windowSize());
  return <div className="vertical_grid" id="vertical_grid"></div>;
};

export default VerticalGrid;
