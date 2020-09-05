import React, { useState } from 'react'
import './CameraPage.css'
import Camera from '../../components/Camera/Camera'
import CreateForm from '../../components/CreateForm/CreateForm'
import ImageUpload from '../../components/ImageUpload/ImageUpload'

const CameraPage = () => {
  const [images, setImages] = useState([])
  const [isSupported, setIsSupported] = useState(true)
  const [postImage, setPostImage] = useState(false)

  return (
    <section className="camera-container">
      {(isSupported && !postImage) && (
        <>
          <Camera setImages={setImages} images={images} setIsSupported={setIsSupported} setPostImage={setPostImage} />
          <ImageUpload setImages={setImages} images={images} setPostImage={setPostImage} />
        </>
      )}
      {(!isSupported && !postImage) && (
        <ImageUpload setImages={setImages} images={images} setPostImage={setPostImage} />
      )}
      {postImage && (
        <CreateForm images={images} setPostImage={setPostImage} />
      )}
    </section>
  )
}

export default CameraPage
