import React, {
  useLayoutEffect,
  useCallback,
  useRef,
  Fragment,
  useEffect,
  useMemo,
  useState
} from "react";
import { useWindowSize } from "../utility/windowSizeManager";
import { RowHeader, ColumnHeader } from "./Headers";
import Column from "./Column";
import Row from "./Row";
import DragAndCreate from "./DragOnColumn";
import "./VerticalGrid.scss";
import { DateTimeProvider } from "../utility/DateTimeManager";
import { EventManagerProvider } from "../utility/useEventManager";

const VerticalGrid = (props) => {
  const { dispatch: windowSizeDispatch } = useWindowSize();
  
  const setResizedWindow = () => {
    const el = document.getElementById("vertical_grid");
    windowSizeDispatch({
      type: "RESIZE",
      payload: { width: el.clientWidth, height: el.clientHeight },
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setResizedWindow);
    return () => {
      window.removeEventListener("resize", setResizedWindow);
    };
  }, []);

  return (
    <Fragment>
      <DateTimeProvider>
        <div className="row-align">
          <RowHeader />
          <div className="colunm-align">
            <ColumnHeader />
            <div className="vertical_grid" id="vertical_grid">
              <div className="horizontal_grid" id="horizontal_grid">
                <Row />
              </div>
              <EventManagerProvider>
                <Column />
              </EventManagerProvider>
            </div>
          </div>
        </div>
      </DateTimeProvider>
      <DragAndCreate />
    </Fragment>
  );
};

export default VerticalGrid;
