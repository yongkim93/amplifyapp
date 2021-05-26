import React, { useLayoutEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { useDraw } from '../utility/dragHandlers'

/* eslint-disable camelcase */
export default function DragAndCreate(props) {
  const {
    x_start,
    y_start,
    x_end,
    y_end,
    selectedRef,
    reset,
    setMouseStartPosition,
    setMouseEndPosition
  } = useDraw()

  const mystyle = {
    position: 'absolute',
    width: x_end - x_start < -1 ? 'undefined' : x_end - x_start,
    height: y_end - y_start < -1 ? 'undefined' : y_end - y_start,
    backgroundColor: 'yellow',
    left: x_start,
    top: y_start
  }

  const mystyleTemplate = (width, height, left, top) => {
    return {
      position: 'absolute',
      width: width,
      height: height,
      backgroundColor: 'yellow',
      left: left,
      top: top
    }
  }

  const onMouseUp = () => {
    let x_start, y_start, x_end, y_end

    setMouseStartPosition((value) => {
      x_start = value.x_start
      y_start = value.y_start
      return value
    })

    if (x_start && y_start) {
      setMouseEndPosition((value) => {
        x_end = value.x_end
        y_end = value.y_end
        return value
      })

      // must add key later
      if (x_end - x_start > 1 && y_end - y_start > 1) {
        props.setSelected(() => selectedRef.current)

        props.setDragDiv(() => (
          <div
            style={mystyleTemplate(
              x_end - x_start,
              y_end - y_start,
              x_start,
              y_start
            )}
          ></div>
        ))
        props.setActive()
      }
    }
    reset()
  }

  const onMouseDown = () => {
    props.setDragDiv(() => <div></div>)
  }

  useLayoutEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    document
      .getElementById('vertical_grid')
      .addEventListener('mousedown', onMouseDown)

    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      document.getElementById('vertical_grid') &&
        document
          .getElementById('vertical_grid')
          .removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div style={mystyle}></div>,
        document.getElementById('root')
      )}
      {ReactDOM.createPortal(props.dragDiv, document.getElementById('root'))}
    </Fragment>
  )
}
