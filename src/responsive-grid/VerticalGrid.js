import React, { Fragment, useEffect, useState, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useWindowSize } from '../utility/windowSizeManager'
import { RowHeader, ColumnHeader } from './Headers'
import Column from './Column'
import Row from './Row'
import DragAndCreate from './DragOnColumn'
import './VerticalGrid.scss'
import { useDateTimeManager } from '../utility/DateTimeManager'
import { useEventManager } from '../utility/useEventManager'
import ReactDOM from 'react-dom'
import CreateApptForm from '../modal/CreateApptForm'
import Modal from '../modal/Modal'
import useHttp from '../db/useHttp'

const initialModalState = {
  isActive: false,
  update: false,
  submit: false
}

const initialFormState = {
  name: { value: 'yong', initial: true, isValid: false },
  email: { value: 'yong4@hawaii.edu', initial: true, isValid: false },
  purpose: { value: 'Study', initial: true, isValid: false },
  message: { value: 'text', initial: true, isValid: false }
}

const modalStateReducer = (state, action) => {
  switch (action.type) {
    case 'ACTIVE':
      return { ...state, isActive: true }
    case 'NOT_ACTIVE':
      return { ...state, isActive: false }
    case 'UPDATE':
      return { ...state, update: true }
    case 'NOT_UPDATE':
      return { ...state, update: false }
    case 'SUBMIT':
      return { ...state, submit: true }
    case 'NOT_SUBMIT':
      return { ...state, submit: false }
    case 'RESET':
      return { ...initialModalState }
    default:
      throw new Error('No action type')
  }
}

const formStateReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: {
          value: action.payload,
          initial: !action.payload,
          isValid: !!action.payload.trim()
        }
      }
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: {
          value: action.payload,
          initial: !action.payload,
          isValid: validateEmail(action.payload)
        }
      }
    case 'CHANGE_PURPOSE':
      return {
        ...state,
        purpose: {
          value: action.payload,
          initial: !action.payload,
          isValid: !!action.payload.trim()
        }
      }
    case 'CHANGE_MESSAGE':
      return {
        ...state,
        message: {
          value: action.payload,
          initial: !action.payload,
          isValid: !!action.payload.trim()
        }
      }
    case 'RESET':
      return { ...initialFormState }
    default:
      throw new Error('No action type')
  }
}
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const VerticalGrid = (props) => {
  const { state: windowSizeState, dispatch: windowSizeDispatch } =
    useWindowSize()
  const { putEvents } = useHttp()
  const [formState, setFormState] = useReducer(
    formStateReducer,
    initialFormState
  )
  const [modalState, setModalState] = useReducer(
    modalStateReducer,
    initialModalState
  )
  const [selected, setSelected] = useState({})

  const { state: dateTimeManager } = useDateTimeManager()

  const [dragDiv, setDragDiv] = useState(<div></div>)

  const { refreshEvents } = useEventManager()

  const setResizedWindow = () => {
    const el = document.getElementById('vertical_grid')
    windowSizeDispatch({
      type: 'RESIZE',
      payload: { width: el.clientWidth, height: el.clientHeight }
    })
  }

  const onSubmitHandler = async () => {
    setModalState({ type: 'SUBMIT' })
    // console.log(dateTimeManager);
    const concurrentKey = uuidv4()
    const tempArray = []
    for (let i = selected.col_start; i <= selected.col_end; i++) {
      const dateTime = new Date(dateTimeManager.mondayOfTheCurrentWeek)
      dateTime.setDate(dateTime.getDate() + i)
      const startTime = dateTime
        .addMinutes(selected.row_start * windowSizeState.intervalMinutes)
        .toISOString()
      const endTime = dateTime
        .addMinutes(
          (selected.row_end - selected.row_start + 1) *
            windowSizeState.intervalMinutes
        )
        .toISOString()
      const info = {
        userId: 'guest',
        uuid: uuidv4(),
        concurrentKey,
        startTime,
        endTime,
        info: {
          name: formState.name.value,
          email: formState.email.value,
          purpose: formState.purpose.value,
          message: formState.message.value
        }
      }
      tempArray.push(info)
      // putEvent(null, null, uuid, startTime, endTime, info).catch((error) =>
      //   console.log(error)
      // )
      // for (let j = selected.row_start; j <= selected.row_end; j++) {
      //   dateTime.addMinutes(windowSizeState.intervalMinutes);
      //   console.log(dateTime.toString());
      // }
    }
    await putEvents(tempArray)
    await refreshEvents()
    setFormState({ type: 'RESET' })
    setModalState({ type: 'RESET' })
  }

  useEffect(() => {
    window.addEventListener('resize', setResizedWindow)
    return () => {
      window.removeEventListener('resize', setResizedWindow)
    }
  }, [])

  return (
    <Fragment>
      <div className="row-align">
        <RowHeader />
        <div className="colunm-align">
          <ColumnHeader />
          <div className="vertical_grid" id="vertical_grid">
            <div className="horizontal_grid" id="horizontal_grid">
              <Row />
            </div>
            <Column />
          </div>
        </div>
      </div>
      <DragAndCreate
        setActive={() => setModalState({ type: 'ACTIVE' })}
        setSelected={setSelected}
        dragDiv={dragDiv}
        setDragDiv={setDragDiv}
      />
      {ReactDOM.createPortal(
        <Modal
          isActive={modalState.isActive}
          onClose={() => {
            setModalState({ type: 'NOT_ACTIVE' })
            setDragDiv(<div></div>)
          }}
          onSubmit={onSubmitHandler}
        >
          <CreateApptForm
            modalState={modalState}
            formState={formState}
            setFormState={setFormState}
          />
        </Modal>,
        document.getElementById('root')
      )}
    </Fragment>
  )
}

export default VerticalGrid
