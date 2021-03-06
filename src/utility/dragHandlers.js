import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useWindowSize } from './windowSizeManager'

const useMouseDown = () => {
  const [mousePosition, setMousePosition] = useState({
    x_start: null,
    y_start: null
  })

  const updateMousePosition = (ev) => {
    setMousePosition({ x_start: ev.clientX, y_start: ev.clientY })
  }

  useEffect(() => {
    window.addEventListener('mousedown', updateMousePosition)

    return () => window.removeEventListener('mousedown', updateMousePosition)
  }, [])

  return mousePosition
}

const useMouseUp = () => {
  const [mousePosition, setMousePosition] = useState({
    x_end: null,
    y_end: null
  })
  const updateMousePosition = (ev) => {
    setMousePosition({ x_end: ev.pageX, y_end: ev.pageY })
  }

  const updateMouseUp = (ev) => {
    window.removeEventListener('mousemove', updateMousePosition)
    setMousePosition({ x_end: ev.pageX, y_end: ev.pageY })
  }

  useEffect(() => {
    window.addEventListener('mouseup', updateMouseUp)
    window.addEventListener('mousemove', updateMousePosition)

    return () => window.removeEventListener('mouseup', updateMousePosition)
  }, [])

  return mousePosition
}

const useDraw = () => {
  const { getState: getWindowSizeState } = useWindowSize()
  const myref = useRef(0)

  const [mouseStartPosition, setMouseStartPosition] = useState({
    x_start: null,
    y_start: null
  })
  const [mouseEndPosition, setMouseEndPosition] = useState({
    x_end: null,
    y_end: null
  })
  const [selected, setSelected] = useState({
    col_start: null,
    row_start: null,
    col_end: null,
    row_end: null
  })

  const selectedRef = useRef()

  const reset = () => {
    setMouseStartPosition({ x_start: null, y_start: null })
    setMouseEndPosition({ x_end: null, y_end: null })
    setSelected({
      col_start: null,
      row_start: null,
      col_end: null,
      row_end: null
    })
  }

  const onMouseMove = (e) => {
    e.preventDefault()
    if (e.offsetY - myref.current > 0) {
      setMouseEndPosition((prev) => {
        return {
          x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth,
          y_end:
            e.pageY -
            e.offsetY +
            Math.ceil(
              getWindowSizeState().interval *
                Math.ceil(e.offsetY / getWindowSizeState().interval)
            )
        }
      })
    }
  }

  const onMouseDown = (e) => {
    e.preventDefault()
    myref.current = e.offsetY
    window.addEventListener('mousemove', onMouseMove)

    setSelected((prev) => {
      const col = Math.round(
        (e.pageX - e.offsetX - getWindowSizeState().offsetLeft + 1) /
          getWindowSizeState().colWidth
      )
      const row = Math.floor(
        (e.pageY - getWindowSizeState().offsetTop + 1) /
          getWindowSizeState().rowHeight
      )
      selectedRef.current = { ...prev, row_start: row, col_start: col }
      return { ...prev, row_start: row, col_start: col }
    })

    setMouseStartPosition({
      x_start: e.pageX - e.offsetX,
      y_start:
        e.pageY -
        e.offsetY -
        1 +
        getWindowSizeState().interval *
          Math.floor(e.offsetY / getWindowSizeState().interval)
    })
  }

  const onMouseUp = (e) => {
    e.preventDefault()
    window.removeEventListener('mousemove', onMouseMove)
    setSelected((prev) => {
      const col = Math.round(
        (e.pageX - e.offsetX - getWindowSizeState().offsetLeft + 1) /
          getWindowSizeState().colWidth
      )
      const row = Math.floor(
        (e.pageY - getWindowSizeState().offsetTop + 1) /
          getWindowSizeState().rowHeight
      )
      selectedRef.current = { ...prev, row_end: row, col_end: col }
      return { ...prev, row_end: row, col_end: col }
    })
    setMouseEndPosition((prev) => {
      if (prev.y_end) {
        return {
          x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth,
          y_end:
            e.pageY -
            e.offsetY +
            getWindowSizeState().interval *
              Math.ceil(e.offsetY / getWindowSizeState().interval)
        }
      } else {
        return prev
      }
    })
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

  return {
    ...mouseStartPosition,
    ...mouseEndPosition,
    selectedRef,
    setMouseStartPosition,
    setMouseEndPosition,
    reset
  }
}

export { useMouseDown, useMouseUp, useDraw }
