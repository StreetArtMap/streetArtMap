import React from 'react'
import Camera from '../../components/Camera/Camera'
import CreateForm from '../../components/CreateForm/CreateForm'
import ImageUpload from '../../components/ImageUpload/ImageUpload'

const CreatePage = () => {
  return (
    <section>
      CREATE PAGE
      <Camera />
      <ImageUpload />
      <CreateForm />
    </section>
  )
}

export default CreatePage
