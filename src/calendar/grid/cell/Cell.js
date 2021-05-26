import React from 'react'
import './Cell.scss'

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.clickHandler = this.clickHandler.bind(this)
    this.dragStartHandler = this.dragStartHandler.bind(this)
  }

  clickHandler() {
    if (!this.props.info) {
      this.props.modalHandler(this.props.dateTime)
    }
  }

  dragStartHandler(e) {
    if (this.props.info) {
      e.persist()
      // console.log(e.target);
      e.dataTransfer.setData('text/plain', e.target.id)
      setTimeout(() => {
        e.target.classList.remove('taken')
        //  console.log(e.target.parentNode);
        // this.forceUpdate();
      }, 0)
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div
        className={`cell center ${
          (this.props.taken || this.props.info) && 'taken'
        }`}
        id={this.props.id}
        onClick={this.clickHandler}
        onDragStart={this.dragStartHandler}
        draggable={this.props.info && true}
      >
        {this.props.time}
      </div>
    )
  }
}

export default Cell
