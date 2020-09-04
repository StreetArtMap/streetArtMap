import React, { useState } from 'react'

const ImageUpload = () => {
  const [images, setImages] = useState('')

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'artmode')
    const options = {
      method: 'POST',
      body: formData,
    }

    return fetch(
      'https://api.cloudinary.com/v1_1/ds6dxgvxo/image/upload',
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImages(res.secure_url)
      })
      .catch((err) => console.log(err))
  }

  const openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'ds6dxgvxo',
          uploadPreset: 'artmode',
        },
        (error, result) => {
          setImages(result.info.secure_url)
        }
      )
      .open()
  }

  return (
    <form>
      <input type='file' />
      <button type='button' onClick={handleImageUpload}>
        Submit
      </button>
      <button type='button' onClick={openWidget}>
        Upload Via Widget
      </button>
    </form>
  )
}

export default ImageUpload
