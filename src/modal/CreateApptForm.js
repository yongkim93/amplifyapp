import React from 'react'

const CreateApptForm = ({ modalState, formState, setFormState }) => {
  const { name, email, purpose, message } = formState

  const nameHandler = (e) => {
    e.preventDefault()
    setFormState({ type: 'CHANGE_NAME', payload: e.target.value })
  }

  const emailHandler = (e) => {
    e.preventDefault()
    setFormState({ type: 'CHANGE_EMAIL', payload: e.target.value })
  }

  const purposeHandler = (e) => {
    e.preventDefault()
    setFormState({ type: 'CHANGE_PURPOSE', payload: e.target.value })
  }

  const messageHandler = (e) => {
    e.preventDefault()
    setFormState({ type: 'CHANGE_MESSAGE', payload: e.target.value })
  }

  return (
    <div className="Form text-left">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            disabled={modalState.submit}
            className={`input ${name.initial && !name.isValid && 'is-danger'} ${
              !name.initial && name.isValid && 'is-success'
            }`}
            type="text"
            placeholder="Your Name"
            value={name.value}
            onChange={nameHandler}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-right">
          <input
            disabled
            className="input is-disable"
            type="text"
            placeholder="Text input"
            value="guest"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-right">
          <input
            disabled={modalState.submit}
            className={`input ${!email.isValid && 'is-danger'} ${
              email.isValid && 'is-success'
            }`}
            type="email"
            placeholder="my-email@example.com"
            value={email.value}
            onChange={emailHandler}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              disabled={modalState.submit}
              value={purpose.value}
              onChange={purposeHandler}
            >
              <option value="Hang Out">Hang Out</option>
              <option value="Study">Study</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            disabled={modalState.submit}
            className={`textarea ${
              message.initial && !message.isValid && 'is-danger'
            } ${!message.initial && message.isValid && 'is-success'}`}
            placeholder="Please leave a message!"
            value={message.value}
            onChange={messageHandler}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default CreateApptForm
