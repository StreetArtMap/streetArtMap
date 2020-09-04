import React, { Component } from 'react'
import { Webcam } from './webcam'
import './Camera.css'
import axios from 'axios'

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
    // initialize the camera
    this.canvasElement = document.createElement('canvas')
    this.webcam = new Webcam(
      document.getElementById('webcam'),
      this.canvasElement
    )
    this.webcam.setup().catch(() => {
      alert('Error getting access to your camera')
    })
  }

  componentDidUpdate(prevProps) {
    if (!this.props.offline && prevProps.offline === true) {
      // if its online
      this.batchUploads()
    }
  }

  render() {
    const imageDisplay = this.state.capturedImage ? (
      <img
        src={this.state.capturedImage}
        alt='captured'
        width='350'
        height='auto'
      />
    ) : null

    const buttons = this.state.captured ? (
      <div>
        <button className='deleteButton' onClick={this.discardImage}>
          {' '}
          Delete Photo{' '}
        </button>
        <button className='captureButton' onClick={this.uploadImage}>
          {' '}
          Upload Photo{' '}
        </button>
      </div>
    ) : (
      <button className='captureButton' onClick={this.captureImage}>
        {' '}
        Take Picture{' '}
      </button>
    )

    const uploading = this.state.uploading ? (
      <div>
        <p> Uploading Image, please wait ... </p>
      </div>
    ) : (
      <span />
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
      // create a random string with a prefix
      const prefix = 'cloudy_pwa_'
      // create random string
      const rs = Math.random().toString(36).substr(2, 5)
      localStorage.setItem(`${prefix}${rs}`, this.state.capturedImage)
      alert(
        'Image saved locally, it will be uploaded to your Cloudinary media library once internet connection is detected'
      )
      this.discardImage()
      // save image to local storage
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
          alert('Sorry, we encountered an error uploading your image')
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
      alert('Image Uploaded to Cloudinary Media Library')
      this.setState({
        imageURLs: [...this.state.imageURLs, data.data.secure_url],
      })
      console.log(this.state.imageURLs)
      this.discardImage()
    } else {
      alert('Sorry, we encountered an error uploading your image')
    }
  }

  batchUploads = () => {
    // this is where all the images saved can be uploaded as batch uploads
    const images = this.findLocalItems(/^cloudy_pwa_/)
    let error = false
    if (images.length > 0) {
      this.setState({ uploading: true })
      for (let i = 0; i < images.length; i++) {
        // upload
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
        alert(
          'All saved images have been uploaded to your Cloudinary Media Library'
        )
      }
    }
  }
}

export default Camera
