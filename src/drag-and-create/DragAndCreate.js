import React, { useState, useEffect } from 'react'
import './DragAndCreate.scss'
import ReactDOM from 'react-dom'
import useMousePosition from './MousePosition'
import { useDraw } from './useMouse'

export default function DragAndCreate() {
  const { x, y } = useMousePosition()
  const {
    x_start,
    y_start,
    x_end,
    y_end,
    reset,
    setMouseStartPosition,
    setMouseEndPosition
  } = useDraw()

  const [list, setList] = useState()

  const hasMovedCursor =
    typeof x_start === 'number' && typeof y_start === 'number'

  const mystyle = {
    position: 'absolute',
    width: x_end ? Math.abs(x_start - x_end) : 0,
    height: y_end ? Math.abs(y_start - y_end) : 0,
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

    setMouseEndPosition((value) => {
      x_end = value.x_end
      y_end = value.y_end
      return value
    })

    setList((value) => {
      return (
        <div
          style={mystyleTemplate(
            Math.abs(x_start - x_end),
            Math.abs(y_start - y_end),
            x_start,
            y_start
          )}
        ></div>
      )
    })

    reset()
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)

    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <div className="App">
      <h1>
        {hasMovedCursor
          ? `Your cursor is at ${x}, ${y}.`
          : 'Move your mouse around.'}
      </h1>
      <h1>
        {hasMovedCursor
          ? `Your cursor is at ${x_start}, ${y_start}.`
          : 'Move your mouse around.'}
      </h1>
      <h1>
        {hasMovedCursor
          ? `Your cursor is at ${x_end}, ${y_end}.`
          : 'Move your mouse around.'}
      </h1>
      {ReactDOM.createPortal(
        <div style={mystyle}></div>,
        document.getElementById('root')
      )}
      {ReactDOM.createPortal(list, document.getElementById('root'))}
    </div>
  )
}
