import React from 'react';
import './Grid.scss';
import Cell from './cell/Cell';
import putEvent from '../../dynamodb/app/PutEvent'
require('datejs');

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            dateTime: null
        };
        this.activeModal = this.activeModal.bind(this);
        this.deActiveModal = this.deActiveModal.bind(this);
    }

    activeModal(dateTime) {
        console.log(dateTime);
        return this.setState({ isActive: true, dateTime: dateTime });
    }

    deActiveModal() {
        this.setState({ isActive: false, dateTime: null });
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
                            <p class="modal-card-title">Modal title</p>
                            <button class="delete" aria-label="close" onClick={this.deActiveModal}></button>
                        </header>
                        <section class="modal-card-body">
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-success" onClick={putEvent}>Save changes</button>
                            <button class="button" onClick={this.deActiveModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    };
}

export default Grid;
