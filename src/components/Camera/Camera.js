import React, { useState, useEffect, useRef } from 'react'
import { Webcam } from './webcam'
import './Camera.css'
import axios from 'axios'
import Button from '../../UIComponents/Button/Button'
import { CLOUDINARY_ENDPOINT } from '../../constants'

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
        .post(CLOUDINARY_ENDPOINT, {
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
        width='250px'
        height='250px'
      />
      <br />
      <Button onClick={imageUploadHandler}>Take Photo</Button>
    </>
  )
}

export default Camera
