import React from 'react';
import './Cell.scss';

class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.props.modalHandler(this.props.dateTime);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="cell" onClick={this.clickHandler}>
            </div>
        )
    };
}

export default Cell;
