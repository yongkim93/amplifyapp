import React from 'react'
import './Sticker.scss'

class Sticker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addButton() {
    const body = document.getElementsByTagName('body')
    body[0].insertAdjacentHTML('afterbegin', '<div id="two">two</div>')
  }

  componentDidMount() {
    this.addButton()
  }

  render() {
    return <div className="sticker"></div>
  }
}

export default Sticker
