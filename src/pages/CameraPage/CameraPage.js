import React, { useState } from 'react'
import './CameraPage.css'
import Camera from '../../components/Camera/Camera'
import CreateForm from '../../components/CreateForm/CreateForm'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'

const CameraPage = () => {
  const [images, setImages] = useState([])
  const [isSupported, setIsSupported] = useState(true)
  const [postImage, setPostImage] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  return (
    <section className='camera-container'>
      {isSupported && !postImage && (
        <>
          <Camera
            setImages={setImages}
            images={images}
            setIsSupported={setIsSupported}
            setPostImage={setPostImage}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
          <ImageUpload
            setImages={setImages}
            images={images}
            setPostImage={setPostImage}
          />
        </>
      )}
      {!isSupported && !postImage && (
        <ImageUpload
          setImages={setImages}
          images={images}
          setPostImage={setPostImage}
        />
      )}
      {postImage && <CreateForm images={images} setPostImage={setPostImage} />}
      {isUploading && <LoadingSpinner asOverlay />}
    </section>
  )
}

export default CameraPage
