import React, { Component } from 'react'
import { Webcam } from './webcam'
import './Camera.css'
import axios from 'axios'
import Button from '../../UIComponents/Button/Button'

class Camera extends Component {
  constructor() {
    super()
    this.webcam = null
    this.state = {
      capturedImage: null,
      captured: false,
      uploading: false,
      imageURLs: [],
    }
  }

  componentDidMount() {
    this.canvasElement = document.createElement('canvas')
    this.webcam = new Webcam(
      document.getElementById('webcam'),
      this.canvasElement
    )
    this.webcam.setup().catch(() => {
      alert('Cannot access device camera...')
    })
  }

  componentDidUpdate(prevProps) {
    if (!this.props.offline && prevProps.offline === true) {
      this.batchUploads()
    }
  }

  render() {
    const imageDisplay = this.state.capturedImage && (
      <img
        src={this.state.capturedImage}
        alt='captured'
        width='350'
        height='auto'
      />
    )

    const buttons = this.state.captured ? (
      <div>
        <Button onClick={this.discardImage}>DELETE</Button>
        <Button onClick={this.uploadImage}>Upload Photo</Button>
      </div>
    ) : (
      <Button onClick={this.captureImage}>Take Picture</Button>
    )

    const uploading = this.state.uploading && (
      <div>
        <p>Uploading Image...</p>
      </div>
    )

    return (
      <div>
        {uploading}
        <video
          autoPlay
          playsInline
          muted
          id='webcam'
          width='500px'
          height='500px'
        />
        <br />
        <div className='image-canvas'>{imageDisplay}</div>
        {buttons}
      </div>
    )
  }
  captureImage = async () => {
    const capturedData = this.webcam.takeBase64Photo({
      type: 'jpeg',
      quality: 1,
    })
    this.setState({
      captured: true,
      capturedImage: capturedData.base64,
    })
  }

  discardImage = () => {
    this.setState({
      captured: false,
      capturedImage: null,
    })
  }
  uploadImage = () => {
    if (this.props.offline) {
      console.log("you're using in offline mode sha")
      const prefix = 'cloudy_pwa_'
      const rs = Math.random().toString(36).substr(2, 5)
      localStorage.setItem(`${prefix}${rs}`, this.state.capturedImage)
      alert(
        'Image saved locally, it will be uploaded once internet connection is detected'
      )
      this.discardImage()
    } else {
      this.setState({ uploading: true })
      axios
        .post(`https://api.cloudinary.com/v1_1/ds6dxgvxo/image/upload`, {
          file: this.state.capturedImage,
          upload_preset: 'artmode',
        })
        .then((data) => {
          this.checkUploadStatus(data)
        })
        .catch((error) => {
          alert('Error uploading an image...')
          this.setState({ uploading: false })
        })
    }
  }
  findLocalItems = (query) => {
    let i
    let results = []
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          const value = localStorage.getItem(i)
          results.push({ key: i, val: value })
        }
      }
    }
    return results
  }

  checkUploadStatus = (data) => {
    this.setState({ uploading: false })
    if (data.status === 200) {
      alert('Image uploaded!')
      this.setState({
        imageURLs: [...this.state.imageURLs, data.data.secure_url],
      })
      console.log(this.state.imageURLs)
      this.discardImage()
    } else {
      alert('Error uploading an image...')
    }
  }

  batchUploads = () => {
    const images = this.findLocalItems(/^cloudy_pwa_/)
    let error = false
    if (images.length > 0) {
      this.setState({ uploading: true })
      for (let i = 0; i < images.length; i++) {
        axios
          .post(`https://api.cloudinary.com/v1_1/ds6dxgvxo/image/upload`, {
            file: images[i].val,
            upload_preset: 'artmode',
          })
          .then((data) => this.checkUploadStatus(data))
          .catch((error) => {
            error = true
          })
      }
      this.setState({ uploading: false })
      if (!error) {
        alert('All saved images have been uploaded!')
      }
    }
  }
}

export default Camera
