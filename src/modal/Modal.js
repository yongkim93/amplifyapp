import React from 'react'

const Modal = (props) => {
  return (
    <div className={`modal ${props.isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Appointment</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.onClose}
          ></button>
        </header>
        <section className="modal-card-body is-clipped">
          {props.children}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={props.onSubmit}>
            Submit
          </button>
          <button className="button" onClick={props.onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal
