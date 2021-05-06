import React, { useEffect } from 'react';
import './Form.scss';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            name: {
                initial: true,
                submit: false,
                isValid: false
            },
            email: {
                initial: true,
                submit: false,
                isValid: false
            },
            message: {
                initial: true,
                submit: false,
                isValid: false
            }
        };
        this.validateOnSubmit = this.validateOnSubmit.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.messageHandler = this.messageHandler.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.setState(
            {
                update: false,
                name: {
                    initial: true,
                    submit: false,
                    isValid: false
                },
                email: {
                    initial: true,
                    submit: false,
                    isValid: false
                },
                message: {
                    initial: true,
                    submit: false,
                    isValid: false
                }
            })
    }

    nameHandler(e) {
        this.setState({
            update: true,
            name: { ...this.state.name, initial: false }
        });
        this.props.nameHandler(e);
    }

    emailHandler(e) {
        this.setState({ update: true, submit: { ...this.state.submit, email: false } });
        this.props.emailHandler(e);
    }

    messageHandler(e) {
        this.setState({ update: true, submit: { ...this.state.submit, email: false } });
        this.props.messageHandler(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.update) {
            this.validateOnSubmit(false)
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateOnSubmit(shouldSubmit) {
        this.setState({
            update: false,
            name: { initial: this.props.info.name.trim() ? false : true, isValid: this.props.info.name.trim() ? true : false, submit: shouldSubmit },
            email: { initial: this.props.info.email.trim() ? false : true, isValid: this.validateEmail(this.props.info.email), submit: shouldSubmit },
            message: { initial: this.props.info.message.trim() ? false : true, isValid: this.props.info.message.trim() ? true : false, submit: shouldSubmit }
        });
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Form text-left">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className={`input ${this.state.name.submit && this.state.name.initial && !this.state.name.isValid && "is-danger"} ${this.state.name.submit && !this.state.name.initial && this.state.name.isValid && "is-success"}`} type="text" placeholder="Your Name" value={this.props.info.name} onChange={this.nameHandler} />
                    </div>
                </div>

                <fieldset disabled>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-right">
                            <input className="input is-disable" type="text" placeholder="Text input" value="guest" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                    </div>
                </fieldset>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-right">
                        <input className={`input ${this.state.email.submit && (!this.state.email.initial || !this.props.info.email) && !this.state.email.isValid && "is-danger"} ${this.state.email.submit && !this.state.email.initial && this.state.email.isValid && "is-success"}`} type="email" placeholder="my-email@example.com" value={this.props.info.email} onChange={this.emailHandler} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                    <p className={`help is-danger ${(this.state.email.initial || this.state.email.isValid) && "is-hidden"}`}>This email is invalid</p>
                </div>

                <div className="field">
                    <label className="label">Subject</label>
                    <div className="control">
                        <div className="select">
                            <select value={this.props.info.purpose} onChange={this.props.purposeHandler}>
                                <option value="Hang Out">Hang Out</option>
                                <option value="Study">Study</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                        <textarea className={`textarea ${this.state.message.submit && this.state.message.initial && !this.state.message.isValid && "is-danger"} ${this.state.message.submit && !this.state.message.initial && this.state.message.isValid && "is-success"}`} placeholder="Please leave a message!" value={this.props.info.message} onChange={this.messageHandler}></textarea>
                    </div>
                </div>
            </div>
        )
    };
}

export default Form;