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

  isUploading && (document.body.style.overflow = 'hidden')
  !isUploading && (document.body.style.overflow = 'scroll')

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
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
        </>
      )}
      {!isSupported && !postImage && (
        <ImageUpload
          setImages={setImages}
          images={images}
          setPostImage={setPostImage}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      )}
      {postImage && (
        <CreateForm
          images={images}
          setPostImage={setPostImage}
          setImages={setImages}
        />
      )}
      {isUploading && <LoadingSpinner asOverlay />}
    </section>
  )
}

export default CameraPage
