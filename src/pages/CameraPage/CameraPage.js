import React, { useState } from 'react'
import Camera from '../../components/Camera/Camera'
import CreateForm from '../../components/CreateForm/CreateForm'
import ImageUpload from '../../components/ImageUpload/ImageUpload'

const CameraPage = () => {
  const [images, setImages] = useState([])

  return (
    <section>
      CREATE PAGE
      <Camera />
      <ImageUpload setImages={setImages} images={images} />
      <CreateForm images={images} />
    </section>
  )
}

export default CameraPage
