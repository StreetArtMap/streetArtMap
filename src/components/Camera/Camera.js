import React, { Component, useState, useEffect } from 'react'
import { Webcam } from './webcam'
import './Camera.css'
import axios from 'axios'
import Button from '../../UIComponents/Button/Button'

class Camera extends Component {
// const Camera = () => {
  // what data type goes here usually that is better than null?
  // let canvasElement;
  // let webcam;
  // is this just a property on the camera class? not state?
  // const [webcam, setWebcam] = useState(null)
  // const [capturedImage, setCapturedImage] = useState(null)
  // const [isCaptured, setIsCaptured] = useState(false)
  // const [isUploading, setIsUploading] = useState(false)
  // const [imageUrls, setImageUrls] = useState([])
  // ^^^^^^ should this be images/setImages passed as props? 
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

  // useEffect(() => {
    // canvasElement = document.createElement('canvas')
    // webcam = new Webcam(
    //   document.getElementById('webcam'),
    //   canvasElement
    // )
    // webcam.setup().catch(() => {
    //   alert('Cannot access device camera...')
    // })
  // }, [])

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

  // is this method being used at all? 
  componentDidUpdate(prevProps) {
    if (!this.props.offline && prevProps.offline === true) {
      this.batchUploads()
    }
  }

  // const captureImage = async () => {
  //   const capturedData = webcam.takeBase64Photo({
  //     type: 'jpeg',
  //     quality: 1,
  //   })
  //   setCaptured(true)
  //   setCapturedImaged(capturedData.base64)
  // }

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

  // const discardImage = () => {
  //   setCaptured(false)
  //   setCapturedImage(null)
  // }
  discardImage = () => {
    this.setState({
      captured: false,
      capturedImage: null,
    })
  }
  
  // what are this.props.offline? is this something we should pass in from serviceworker status or something?
  // const uploadImage = () => {
  //   if (this.props.offline) {
  //     console.log("you're using in offline mode sha")
  //     const prefix = 'cloudy_pwa_'
  //     const rs = Math.random().toString(36).substr(2, 5)
  //     localStorage.setItem(`${prefix}${rs}`, this.state.capturedImage)
  //     alert(
  //       'Image saved locally, it will be uploaded once internet connection is detected'
  //     )
  //     this.discardImage()
  //   } else {
  //     setUploading(true)
  //     axios
  //       .post(`https://api.cloudinary.com/v1_1/ds6dxgvxo/image/upload`, {
  //         file: capturedImage,
  //         upload_preset: 'artmode',
  //       })
  //       .then((data) => {
  //         checkUploadStatus(data)
  //       })
  //       .catch((error) => {
  //         alert('Error uploading an image...')
  //         setUploading(false)
  //       })
  //   }
  // }

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

  // const findLocalItems = (query) => {
  //   let i
  //   let results = []
  //   for (i in localStorage) {
  //     if (localStorage.hasOwnProperty(i)) {
  //       if (i.match(query) || (!query && typeof i === 'string')) {
  //         const value = localStorage.getItem(i)
  //         results.push({ key: i, val: value })
  //       }
  //     }
  //   }
  //   return results
  // }

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

  // const checkUploadStatus = (data) => {
  //   setUploading(false)
  //   if (data.status === 200) {
  //     alert('Image uploaded!')
  //     setImageUrls([...imageUrls, data.data.secure_url])
  //     console.log(this.state.imageURLs)
  //     this.discardImage()
  //   } else {
  //     alert('Error uploading an image...')
  //   }
  // }

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

  // batchUploads = () => {
  //   const images = this.findLocalItems(/^cloudy_pwa_/)
  //   let error = false
  //   if (images.length > 0) {
  //     setUploading(true)
  //     for (let i = 0; i < images.length; i++) {
  //       axios
  //         .post(`https://api.cloudinary.com/v1_1/ds6dxgvxo/image/upload`, {
  //           file: images[i].val,
  //           upload_preset: 'artmode',
  //         })
  //         .then((data) => checkUploadStatus(data))
  //         .catch((error) => {
  //           error = true
  //         })
  //     }
  //     setUploading(false)
  //     if (!error) {
  //       alert('All saved images have been uploaded!')
  //     }
  //   }
  // }

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

  //   const imageDisplay = capturedImage && (
  //     <img
  //       src={capturedImage}
  //       alt='captured'
  //       width='350'
  //       height='auto'
  //     />
  //   )

  //   const buttons = captured ? (
  //     <div>
  //       <Button onClick={discardImage}>DELETE</Button>
  //       <Button onClick={uploadImage}>Upload Photo</Button>
  //     </div>
  //   ) : (
  //     <Button onClick={captureImage}>Take Picture</Button>
  //   )

  //   const uploading = uploading && (
  //     <div>
  //       <p>Uploading Image...</p>
  //     </div>
  //   )

  //   return (
  //     <div>
  //       {uploading}
  //       <video
  //         autoPlay
  //         playsInline
  //         muted
  //         id='webcam'
  //         width='500px'
  //         height='500px'
  //       />
  //       <br />
  //       <div className='image-canvas'>{imageDisplay}</div>
  //       {buttons}
  //     </div>
  //   )
  // }
  // ^^^^^^^^ are these divs used in the css styling? should update to <section>

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
}

export default Camera
