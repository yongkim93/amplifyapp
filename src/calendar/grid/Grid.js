import React from 'react';
import './Grid.scss';
require('datejs');

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    createTable() {
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < 12; i++) {
            let children = [];
            let currentDateTime = new Date();// date time now
            //currentDateTime.setDate(currentDateTime.getDate() + i);
            currentDateTime.setHours(0, 0, 0, 0);
            currentDateTime.addMinutes(30 * i);
            //Date.today();
            //Inner loop to create children
            for (let j = 0; j < 8; j++) {
                currentDateTime.setDate(currentDateTime.getDate() + 1);
                //children.push(<td>{`Column ${j + 1}`}</td>);
                children.push(<td>{currentDateTime.toString()}</td>);
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
                <table className="timeGrid">
                    {this.createTable()}
                </table>
            </div>
        )
    };
}

export default Grid;
