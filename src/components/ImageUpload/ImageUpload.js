import React, { useState } from 'react'
import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'

const ImageUpload = ({ setImages, images }) => {
  const handleImageUpload = (e) => {
    e.preventDefault()
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
        setImages([...images, res.secure_url])
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
          if (result.event === 'success') {
            console.log(result.info.secure_url)
            // if adding multiple images only able to push urls to array, setImage overwrites with last one
            setImages([result.info.secure_url, ...images])
          }
        }
      )
      .open()
  }

  return (
    <form onSubmit={handleImageUpload}>
      <Input type='file' />
      <Button type='submit'>Submit</Button>
      <Button onClick={openWidget}>Upload Via Widget</Button>
    </form>
  )
}

export default ImageUpload
