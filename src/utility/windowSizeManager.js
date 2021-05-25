import React, {
  useContext,
  createContext,
  useLayoutEffect,
  useReducer,
  useCallback,
  useMemo
} from "react";
import useMousePosition from "../drag-and-create/MousePosition";
import useEnhancedReducer from "./useEnhancedReducer";

const windowSizeInfo = createContext({});
const { Provider } = windowSizeInfo;

const WindowSizeProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer(
    useCallback((state, action) => {
      switch (action.type) {
        case "RESIZE":
          const { width, height, offsetLeft, offsetTop } = action.payload;
          return {
            width,
            height,
            colWidth: Math.round(width / 7) - 1, // -1 for the border px
            rowHeight: height / 48,
            interval: height / 24 / 2,
            intervalMinutes: 30,
            offsetLeft,
            offsetTop
          };
        default:
          return state;
      }
    }, [])
  );

  // const memo = useMemo(()=>({state, dispatch, getState}),[]);
  useLayoutEffect(() => {
    const el = document.getElementById("vertical_grid");
    console.log(el.offsetLeft, el.offsetTop)
    dispatch({
      type: "RESIZE",
      payload: { width: el.clientWidth, height: el.clientHeight, offsetTop: el.offsetTop, offsetLeft: el.offsetLeft },
    });
  }, []);

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useWindowSize = () => useContext(windowSizeInfo);

export { useWindowSize, WindowSizeProvider };
