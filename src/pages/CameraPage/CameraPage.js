import React, { useState } from 'react'
import './CameraPage.css'
import Camera from '../../components/Camera/Camera'
import CreateForm from '../../components/CreateForm/CreateForm'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import Modal from '../../UIComponents/Modal/Modal'
import Button from '../../UIComponents/Button/Button'

const CameraPage = () => {
  const [images, setImages] = useState([])
  const [isSupported, setIsSupported] = useState(true)
  const [isSupportedError, setIsSupportedError] = useState(false)
  const [postImage, setPostImage] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  isUploading && (document.body.style.overflow = 'hidden')
  !isUploading && (document.body.style.overflow = 'scroll')

  return (
    <section className='camera-container'>
      {isSupported && !postImage && (
        <Camera
          setImages={setImages}
          images={images}
          setIsSupported={setIsSupported}
          setPostImage={setPostImage}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          setIsSupportedError={setIsSupportedError}
          setError={setError}
        />
      )}
      {!postImage && (
        <ImageUpload
          setImages={setImages}
          images={images}
          setPostImage={setPostImage}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          setError={setError}
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
      {(isSupportedError || error) && (
        <Modal show={true}>
          <p className='modal-message error-message'>
            {error}
            {isSupportedError && 'see other options'}
          </p>
          <Button
            styling='padding'
            onClick={() => {
              setError('')
              setIsSupportedError(false)
            }}
          >
            close
          </Button>
        </Modal>
      )}
    </section>
  )
}

export default CameraPage
