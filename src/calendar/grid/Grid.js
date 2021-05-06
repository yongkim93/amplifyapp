import React from 'react';
import './Grid.scss';
import Cell from './cell/Cell';
import putEvent from '../../dynamodb/app/PutEvent'
import Form from '../form/Form'
require('datejs');

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            dateTime: null,
            name: '',
            email: '',
            purpose: 'Hang Out',
            message: ''
        };
        this.activeModal = this.activeModal.bind(this);
        this.deActiveModal = this.deActiveModal.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.purposeHandler = this.purposeHandler.bind(this);
        this.messageHandler = this.messageHandler.bind(this);
        this.reset = this.reset.bind(this);
        this.formRef = React.createRef();
    }

    reset() {
        this.setState({
            isActive: false,
            dateTime: null,
            name: '',
            email: '',
            purpose: 'Hang Out',
            message: ''
        });
    }

    nameHandler(event) {
        event.preventDefault()
        this.setState({ name: event.target.value });
    }
    emailHandler(event) {
        event.preventDefault()
        this.setState({ email: event.target.value });
    }
    purposeHandler(event) {
        event.preventDefault()
        this.setState({ purpose: event.target.value });
    }

    messageHandler(event) {
        event.preventDefault()
        this.setState({ message: event.target.value });
    }

    activeModal(dateTime) {
        return this.setState({ isActive: true, dateTime: dateTime });
    }

    deActiveModal() {
        this.reset();
        this.formRef.current.reset();
    }

    createTableHead() {
        let td = [];
        let currentDateTime = new Date();// date time now
        currentDateTime.last().monday();

        //add monday
        td.push(<th>{currentDateTime.toString('ddd MM/d')}</th>);
        //add rest
        for (let i = 0; i < 6; i++) {
            currentDateTime.setDate(currentDateTime.getDate() + 1);
            td.push(<th>{currentDateTime.toString('ddd MM/d')}</th>);
        }

        return <tr>{td}</tr>;
    }

    createTable() {
        let table = [];
        this.createTableHead();
        // Outer loop to create parent
        for (let i = 0; i < 49; i++) {
            let children = [];
            let currentDateTime = new Date();// date time now
            currentDateTime.last().monday();
            currentDateTime.setHours(0, 0, 0, 0);
            currentDateTime.addMinutes(30 * i);

            //add monday
            children.push(<td><Cell dateTime={currentDateTime.toString()} modalHandler={this.activeModal} />{currentDateTime.toString()}</td>);
            //add the rest
            for (let j = 0; j < 6; j++) {
                currentDateTime.setDate(currentDateTime.getDate() + 1);
                children.push(<td><Cell dateTime={currentDateTime.toString()} modalHandler={this.activeModal} />{currentDateTime.toString()}</td>);
            }

            //Create the parent and add the children
            table.push(<tr>{children}</tr>);
        }
        return table;
    }

    submitHandler(state) {
        //putEvent(...state)
        this.formRef.current.validateOnSubmit(true);
        if (this.formRef.current.state.name.isValid && this.formRef.current.state.email.isValid && this.formRef.current.state.message.isValid) {
            const { isActive, dateTime, ...rest } = this.state;
            
            //send data to dynamodb
            putEvent(null, null, dateTime, "appointmentId", rest);

            this.reset();
            this.formRef.current.reset();
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <table className="table is-bordered is-striped">
                    <thead>
                        {this.createTableHead()}
                    </thead>
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </table>
                <div className={`modal ${this.state.isActive ? "is-active" : ""}`}>
                    <div className="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Appointment</p>
                            <button class="delete" aria-label="close" onClick={this.deActiveModal}></button>
                        </header>
                        <section class="modal-card-body is-clipped">
                            <Form ref={this.formRef} info={this.state} nameHandler={this.nameHandler} emailHandler={this.emailHandler} purposeHandler={this.purposeHandler} messageHandler={this.messageHandler} onSubmit={this.submitHandler} />
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-success" onClick={this.submitHandler}>Submit</button>
                            <button class="button" onClick={this.deActiveModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    };
}

export default Grid;
