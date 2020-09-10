import React, { useState } from 'react'
import Button from '../../UIComponents/Button/Button'
import './ImageUpload.css'
import { CLOUDINARY_ENDPOINT } from '../../constants'

const ImageUpload = ({
  setImages,
  images,
  setPostImage,
  setIsUploading,
  setError,
}) => {
  const [isImageSelected, setIsImageSelected] = useState(false)
  const [imageSelected, setImageSelected] = useState(null)

  const handleImageUpload = (e) => {
    setIsUploading(true)
    e.preventDefault()
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'artmode')
    const options = {
      method: 'POST',
      body: formData,
    }

    return fetch(CLOUDINARY_ENDPOINT, options)
      .then((res) => res.json())
      .then((res) => {
        setImages([...images, res.secure_url])
        setPostImage(true)
        setIsUploading(false)
      })
      .catch((error) => {
        setIsUploading(false)
        setError('Error uploading an image...')
      })
  }

  const openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'ds6dxgvxo',
          uploadPreset: 'artmode',
        },
        (error, result) => {
          if (result.event === 'success') {
            setPostImage(true)
            setImages([result.info.secure_url, ...images])
          }
          error && setError('Error uploading an image...')
        }
      )
      .open()
  }

  return (
    <section>
      <form onSubmit={handleImageUpload} className='input-file-form'>
        <input
          type='file'
          className='file-input'
          id='file-input'
          onChange={(e) => {
            setImageSelected(e.target.files[0].name)
          }}
        />
        {!isImageSelected && (
          <Button
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('file-input').click()
              setIsImageSelected(true)
            }}
          >
            Select from device
          </Button>
        )}
        <p>{imageSelected}</p>
        {isImageSelected && <Button type='submit'>Confirm upload</Button>}
      </form>
      <Button onClick={openWidget} className='widget-btn'>
        Upload Via Widget
      </Button>
    </section>
  )
}

export default ImageUpload
