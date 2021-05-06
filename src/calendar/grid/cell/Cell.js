import React from 'react';
import './Cell.scss';

class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        if (!this.props.info)
            this.props.modalHandler(this.props.dateTime);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={`cell center ${(this.props.taken || this.props.info) && 'taken'}`} onClick={this.clickHandler}>
                <p>{this.props.time}</p>
            </div>
        )
    };
}

export default Cell;
