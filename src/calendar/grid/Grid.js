import React from 'react'
import './Grid.scss'
import Cell from './cell/Cell'
import PutEvent from '../../dynamodb/app/PutEvent'
import deleteEvent from '../../dynamodb/app/DeleteEvent'
import ReadEvents from '../../dynamodb/app/ReadEvents'
import Form from '../form/Form'
require('datejs')

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      dateTime: '',
      formInfo: {
        name: '',
        email: '',
        purpose: 'Hang Out',
        message: ''
      },
      appointments: new Map(),
      isLoading: true
    }
    this.activeModal = this.activeModal.bind(this)
    this.deActiveModal = this.deActiveModal.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.nameHandler = this.nameHandler.bind(this)
    this.emailHandler = this.emailHandler.bind(this)
    this.purposeHandler = this.purposeHandler.bind(this)
    this.messageHandler = this.messageHandler.bind(this)
    this.resetFormInfo = this.resetFormInfo.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.formRef = React.createRef()
    this.dropHandler = this.dropHandler.bind(this)
    this.submitEvent = this.submitEvent.bind(this)
  }

  resetFormInfo() {
    this.setState({
      isActive: false,
      dateTime: null,
      formInfo: {
        name: '',
        email: '',
        purpose: 'Hang Out',
        message: ''
      }
    })
  }

  nameHandler(event) {
    event.preventDefault()
    this.setState({
      formInfo: { ...this.state.formInfo, name: event.target.value }
    })
  }

  emailHandler(event) {
    event.preventDefault()
    this.setState({
      formInfo: { ...this.state.formInfo, email: event.target.value }
    })
  }

  purposeHandler(event) {
    event.preventDefault()
    this.setState({
      formInfo: { ...this.state.formInfo, purpose: event.target.value }
    })
  }

  messageHandler(event) {
    event.preventDefault()
    this.setState({
      formInfo: { ...this.state.formInfo, message: event.target.value }
    })
  }

  activeModal(dateTime) {
    return this.setState({ isActive: true, dateTime: dateTime })
  }

  deActiveModal() {
    this.resetFormInfo()
    this.formRef.current.reset()
  }

  createTableHead() {
    const td = []
    const currentDateTime = new Date() // date time now
    currentDateTime.last().monday()

    // add monday
    td.push(<th>{currentDateTime.toString('ddd MM/d')}</th>)
    // add rest
    for (let i = 0; i < 6; i++) {
      currentDateTime.setDate(currentDateTime.getDate() + 1)
      td.push(<th>{currentDateTime.toString('ddd MM/d')}</th>)
    }

    return <tr>{td}</tr>
  }

  createTable() {
    const table = []
    this.createTableHead()
    // Outer loop to create parent
    for (let i = 0; i < 48; i++) {
      const children = []
      const currentDateTime = new Date() // date time now
      currentDateTime.last().monday()
      currentDateTime.setHours(0, 0, 0, 0)
      currentDateTime.addMinutes(30 * i)

      // add monday
      children.push(
        <td
          onDragEnter={this.dragEnterHandler}
          onDragOver={this.dragOverHandler}
          onDragLeave={this.dragLeaveHandler}
          onDrop={this.dropHandler}
        >
          <Cell
            taken={this.state.dateTime === currentDateTime.toString()}
            time={currentDateTime.toString('h:mmtt')}
            info={this.state.appointments.get(this.getEpoch(currentDateTime))}
            dateTime={currentDateTime.toString()}
            modalHandler={this.activeModal}
            id={this.getEpoch(currentDateTime)}
          />
        </td>
      )
      // add the rest
      for (let j = 0; j < 6; j++) {
        currentDateTime.setDate(currentDateTime.getDate() + 1)
        children.push(
          <td
            onDragEnter={this.dragEnterHandler}
            onDragOver={this.dragOverHandler}
            onDragLeave={this.dragLeaveHandler}
            onDrop={this.dropHandler}
          >
            <Cell
              taken={this.state.dateTime === currentDateTime.toString()}
              time={currentDateTime.toString('h:mmtt')}
              info={this.state.appointments.get(this.getEpoch(currentDateTime))}
              dateTime={currentDateTime.toString()}
              modalHandler={this.activeModal}
              id={this.getEpoch(currentDateTime)}
            />
          </td>
        )
      }

      // Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }

  getEpoch(dateTime) {
    return Math.floor(dateTime.getTime() / 1000)
  }

  async submitHandler() {
    // putEvent(...state)
    this.formRef.current.validateOnSubmit(true)
    if (
      this.formRef.current.state.name.isValid &&
      this.formRef.current.state.email.isValid &&
      this.formRef.current.state.message.isValid
    ) {
      const { dateTime, formInfo } = this.state
      console.log(dateTime)
      await this.submitEvent(dateTime, formInfo)
      await this.fetchData()
      this.resetFormInfo()
      this.formRef.current.reset()
    }
  }

  submitEvent(dateTime, formInfo) {
    dateTime = new Date(dateTime)
    // cover up the page with loading
    // this.setState({ fetchData: true });
    // send data to dynamodb
    return PutEvent(
      null,
      null,
      dateTime.toISOString(),
      this.getEpoch(dateTime),
      formInfo
    )
  }

  fetchData() {
    return ReadEvents(
      'yongshine-guest',
      'guest',
      null,
      this.state.appointments
    )
  }

  componentDidMount() {
    this.fetchData().then(() => this.setState({ isLoading: false }))
  }

  dragEnterHandler(e) {
    e.preventDefault()
    e.target.classList.add('drag-over')
  }

  dragOverHandler(e) {
    e.preventDefault()
    e.target.classList.add('drag-over')
  }

  dragLeaveHandler(e) {
    e.target.classList.remove('drag-over')
  }

  async dropHandler(e) {
    e.persist()
    e.target.style['pointer-events'] = 'none'
    e.target.classList.add('taken')
    // e.target.removeEventListener('click',this.activeModal);
    e.target.classList.remove('drag-over')
    const id = e.dataTransfer.getData('text/plain')
    if (id !== e.target.id) {
      const dateTime = new Date(+e.target.id * 1000)
      const { info } = this.state.appointments.get(+id)
      this.state.appointments.delete(+id)
      await this.submitEvent(dateTime, info)
      await deleteEvent('yongshine-guest', 'guest', +id)
      await this.fetchData()
      this.setState({ appointments: new Map(this.state.appointments) })
    }
    e.target.style['pointer-events'] = 'auto'
    // this.resetFormInfo();
    // this.formRef.current.reset();
  }

  render() {
    return (
      <div>
        <table className="table is-bordered is-striped timeGrid">
          <thead>{this.createTableHead()}</thead>
          <tbody>{this.createTable()}</tbody>
        </table>
        <div className={`modal ${this.state.isActive ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Appointment</p>
              <button
                className="delete"
                aria-label="close"
                onClick={this.deActiveModal}
              ></button>
            </header>
            <section className="modal-card-body is-clipped">
              <Form
                ref={this.formRef}
                info={this.state.formInfo}
                nameHandler={this.nameHandler}
                emailHandler={this.emailHandler}
                purposeHandler={this.purposeHandler}
                messageHandler={this.messageHandler}
                onSubmit={this.submitHandler}
              />
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={this.submitHandler}
              >
                Submit
              </button>
              <button className="button" onClick={this.deActiveModal}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default Grid
