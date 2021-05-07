import React from "react";
import "./Grid.scss";
import Cell from "./cell/Cell";
import PutEvent from "../../dynamodb/app/PutEvent";
import ReadEvents from "../../dynamodb/app/ReadEvents";
import Form from "../form/Form";
require("datejs");

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      dateTime: "",
      formInfo: {
        name: "",
        email: "",
        purpose: "Hang Out",
        message: "",
      },
      appointments: new Map(),
      fetchedData: false,
    };
    this.activeModal = this.activeModal.bind(this);
    this.deActiveModal = this.deActiveModal.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.nameHandler = this.nameHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.purposeHandler = this.purposeHandler.bind(this);
    this.messageHandler = this.messageHandler.bind(this);
    this.resetFormInfo = this.resetFormInfo.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.formRef = React.createRef();
  }

  resetFormInfo() {
    this.setState({
      isActive: false,
      dateTime: null,
      formInfo: {
        name: "",
        email: "",
        purpose: "Hang Out",
        message: "",
      },
    });
  }

  nameHandler(event) {
    event.preventDefault();
    this.setState({
      formInfo: { ...this.state.formInfo, name: event.target.value },
    });
  }

  emailHandler(event) {
    event.preventDefault();
    this.setState({
      formInfo: { ...this.state.formInfo, email: event.target.value },
    });
  }

  purposeHandler(event) {
    event.preventDefault();
    this.setState({
      formInfo: { ...this.state.formInfo, purpose: event.target.value },
    });
  }

  messageHandler(event) {
    event.preventDefault();
    this.setState({
      formInfo: { ...this.state.formInfo, message: event.target.value },
    });
  }

  activeModal(dateTime) {
    return this.setState({ isActive: true, dateTime: dateTime });
  }

  deActiveModal() {
    this.resetFormInfo();
    this.formRef.current.reset();
  }

  createTableHead() {
    const td = [];
    const currentDateTime = new Date(); // date time now
    currentDateTime.last().monday();

    // add monday
    td.push(<th>{currentDateTime.toString("ddd MM/d")}</th>);
    // add rest
    for (let i = 0; i < 6; i++) {
      currentDateTime.setDate(currentDateTime.getDate() + 1);
      td.push(<th>{currentDateTime.toString("ddd MM/d")}</th>);
    }

    return <tr>{td}</tr>;
  }

  createTable() {
    const table = [];
    this.createTableHead();
    // Outer loop to create parent
    for (let i = 0; i < 48; i++) {
      const children = [];
      const currentDateTime = new Date(); // date time now
      currentDateTime.last().monday();
      currentDateTime.setHours(0, 0, 0, 0);
      currentDateTime.addMinutes(30 * i);

      // add monday
      children.push(
        <td>
          <Cell
            taken={this.state.dateTime === currentDateTime.toString()}
            time={currentDateTime.toString("HH:mm")}
            info={this.state.appointments.get(this.getEpoch(currentDateTime))}
            dateTime={currentDateTime.toString()}
            modalHandler={this.activeModal}
          />
        </td>
      );
      // add the rest
      for (let j = 0; j < 6; j++) {
        currentDateTime.setDate(currentDateTime.getDate() + 1);
        children.push(
          <td>
            <Cell
              taken={this.state.dateTime === currentDateTime.toString()}
              time={currentDateTime.toString("HH:mm")}
              info={this.state.appointments.get(this.getEpoch(currentDateTime))}
              dateTime={currentDateTime.toString()}
              modalHandler={this.activeModal}
            />
          </td>
        );
      }

      // Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }
    return table;
  }

  getEpoch(dateTime) {
    return Math.floor(dateTime.getTime() / 1000);
  }

  submitHandler() {
    // putEvent(...state)
    this.formRef.current.validateOnSubmit(true);
    if (
      this.formRef.current.state.name.isValid &&
      this.formRef.current.state.email.isValid &&
      this.formRef.current.state.message.isValid
    ) {
      let { dateTime, formInfo } = this.state;
      dateTime = new Date(dateTime);
      // cover up the page with loading
      this.setState({ fetchedData: false });
      // send data to dynamodb
      PutEvent(
        null,
        null,
        dateTime.toISOString(),
        this.getEpoch(dateTime),
        formInfo
      ).then(() =>
        this.fetchData().then(() => {
          this.resetFormInfo();
          this.formRef.current.reset();
        })
      );
    }
  }

  fetchData() {
    return ReadEvents(
      "yongshine-guest",
      "guest",
      1620122400,
      this.state.appointments
    ).then(() => this.setState({ fetchedData: true }));
  }

  componentDidMount() {
    this.fetchData();

    // this.setState({ appointments: await ReadEvents('yongshine-guest', 'guest', 1620122400) });
    // console.log(this.state.appointments.get(1620122400));
  }

  render() {
    return (
      <div>
        <table className="table is-bordered is-striped timeGrid">
          <thead>{this.createTableHead()}</thead>
          <tbody>{this.createTable()}</tbody>
        </table>
        <div className={`modal ${this.state.isActive ? "is-active" : ""}`}>
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
    );
  }
}

export default Grid;
