import React, { useState, useEffect, useRef } from 'react'
import { Webcam } from './webcam'
import './Camera.css'
import axios from 'axios'
import Button from '../../UIComponents/Button/Button'

const Camera = ({
  offline,
  images,
  setImages,
  setIsSupported,
  setPostImage,
  isUploading,
  setIsUploading,
}) => {
  let canvasElement = useRef(null)
  let webcam = useRef(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [isCaptured, setIsCaptured] = useState(false)

  useEffect(() => {
    canvasElement.current = document.createElement('canvas')
    webcam.current = new Webcam(
      document.getElementById('webcam'),
      canvasElement.current
    )
    webcam.current.setup().catch(() => {
      setIsSupported(false)
      alert('Cannot access device camera...')
    })
  }, [])

  const captureImage = async () => {
    const capturedData = await webcam.current.takeBase64Photo({
      type: 'jpeg',
      quality: 1,
    }).base64
    setCapturedImage(capturedData)
    setIsCaptured(true)
  }

  const discardImage = () => {
    setIsCaptured(false)
    setCapturedImage(null)
  }

  const uploadImage = () => {
    if (offline) {
      const prefix = 'cloudy_pwa_'
      const rs = Math.random().toString(36).substr(2, 5)
      localStorage.setItem(`${prefix}${rs}`, this.state.capturedImage)
      alert(
        'Image saved locally, it will be uploaded once internet connection is detected'
      )
      this.discardImage()
    } else {
      setIsUploading(true)
      axios
        .post(`https://api.cloudinary.com/v1_1/ds6dxgvxo/image/upload`, {
          file: capturedImage,
          upload_preset: 'artmode',
        })
        .then((data) => {
          checkUploadStatus(data)
          setPostImage(true)
        })
        .catch((error) => {
          console.log(error, 'ERROR')
          alert('Error uploading an image!!!')
          setIsUploading(false)
        })
    }
  }

  const checkUploadStatus = (data) => {
    setIsUploading(false)
    if (data.status === 200) {
      alert('Image uploaded!')
      setImages([...images, data.data.secure_url])
      console.log(images)
      discardImage()
    } else {
      alert('Error uploading an image...')
    }
  }

  const imageUploadHandler = async (e) => {
    e.preventDefault()
    await captureImage()
    alert(capturedImage)
    // async await doesn't work
    uploadImage()
  }

  return (
    <>
      <video
        autoPlay
        playsInline
        muted
        className='video-camera-wrapper'
        id='webcam'
        width='100px'
        height='100px'
      />
      <br />
      <Button onClick={imageUploadHandler}>Take Photo</Button>
    </>
  )
}

export default Camera

// componentDidUpdate(prevProps) {
//   console.log(prevProps, 'previos preops into compo did update')
//   console.log(this.props.offline, 'what is props offline')
//   if (!this.props.offline && prevProps.offline === true) {
//     this.batchUploads()
//   }
// }

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

// const batchUploads = () => {
//   const images = this.findLocalItems(/^cloudy_pwa_/)
//   let error = false
//   if (images.length > 0) {
//     setIsUploading(true)
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
//     setIsUploading(false)
//     if (!error) {
//       alert('All saved images have been uploaded!')
//     }
//   }
// }
