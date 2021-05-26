import { useState, useEffect } from 'react'

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
    setMousePosition({ x_end: ev.clientX, y_end: ev.clientY })
  }

  const updateMouseUp = (ev) => {
    window.removeEventListener('mousemove', updateMousePosition)
    setMousePosition({ x_end: ev.clientX, y_end: ev.clientY })
  }

  useEffect(() => {
    window.addEventListener('mouseup', updateMouseUp)
    window.addEventListener('mousemove', updateMousePosition)

    return () => window.removeEventListener('mouseup', updateMousePosition)
  }, [])

  return mousePosition
}

const useDraw = () => {
  const [mouseStartPosition, setMouseStartPosition] = useState({
    x_start: null,
    y_start: null
  })
  const [mouseEndPosition, setMouseEndPosition] = useState({
    x_end: null,
    y_end: null
  })

  const reset = () => {
    setMouseStartPosition({ x_start: null, y_start: null })
    setMouseEndPosition({ x_end: null, y_end: null })
  }

  const onMouseMove = (e) => {
    e.preventDefault()
    setMouseEndPosition({ x_end: e.clientX, y_end: e.clientY })
  }

  const onMouseDown = (e) => {
    e.preventDefault()
    window.addEventListener('mousemove', onMouseMove)
    setMouseStartPosition({ x_start: e.clientX, y_start: e.clientY })
  }

  const onMouseUp = (e) => {
    e.preventDefault()
    window.removeEventListener('mousemove', onMouseMove)
    setMouseEndPosition({ x_end: e.clientX, y_end: e.clientY })
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousedown', onMouseDown)

    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  return {
    ...mouseStartPosition,
    ...mouseEndPosition,
    setMouseStartPosition,
    setMouseEndPosition,
    reset
  }
}

export { useMouseDown, useMouseUp, useDraw }
