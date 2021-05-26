import React from 'react'
import './Main.css'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  httpReq() {
    const Http = new XMLHttpRequest()
    const url = 'https://vp9rxx6qx3.execute-api.us-east-1.amazonaws.com/prod/'
    Http.open('POST', url)
    Http.send()

    return new Promise(function(resolve, reject) {
      Http.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const res = JSON.parse(Http.responseText)
          const imgs = res.Contents.map(img => 'https://yong-photo-album.s3.amazonaws.com/yong/' + img.Key.replace('yong/', ''))
          resolve(imgs)
        }
      }
    })
  }

  componentDidMount() {
    this.httpReq().then((imgs) => {
      const Imgs = imgs.map(img => <img key={img} src={img} className="img-fluid" alt="Responsive image" />)
      this.setState({ Imgs })
    })
  }

  render() {
    return (
        <div className="image-wrapper">
        {this.state.Imgs}
        </div>
    )
  };
}

export default Main
