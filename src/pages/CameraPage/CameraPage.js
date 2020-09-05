import React, { useState } from 'react'
import './CameraPage.css'
import Camera from '../../components/Camera/Camera'
import CreateForm from '../../components/CreateForm/CreateForm'
import ImageUpload from '../../components/ImageUpload/ImageUpload'

const CameraPage = () => {
  const [images, setImages] = useState([])

  return (
    <section className="camera-container">
      <Camera />
      <ImageUpload setImages={setImages} images={images} />
      <CreateForm images={images} />
    </section>
  )
}

export default CameraPage
