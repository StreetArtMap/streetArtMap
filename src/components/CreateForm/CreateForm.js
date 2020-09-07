import React, { useState } from 'react'
import Input from '../../UIComponents/Input/Input'
import Button from '../../UIComponents/Button/Button'
import './CreateForm.css'
import { TiDelete } from 'react-icons/ti'
import { FaMapMarkerAlt, FaTelegramPlane } from 'react-icons/fa'
import { ImCamera } from 'react-icons/im'
import { DEFAULT_IMG_URL } from '../../constants'

const CreateForm = ({ images, setPostImage, setImages }) => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [title, setTitle] = useState('')
  const [artistName, setArtistName] = useState('')
  const [artistInstagram, setArtistInstagram] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')

  const getLocation = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geo Location is not supported by your device')
    }
  }

  const showPosition = (position) => {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    }
    setCurrentLocation(location)
    return location
  }

  const artCreateHandler = async (e) => {
    e.preventDefault()
    await getLocation()
  }

  const addDefaultImageSrc = (e) => {
    e.target.src = DEFAULT_IMG_URL
  }

  const removeImageHandler = (e) => {
    e.preventDefault()
    const newImages = images.filter((image) => image !== e.target.id)
    setImages([...newImages])
  }

  const mappedImages = images.map((image) => {
    return (
      <section className='form-image-wrapper'>
        <section onClick={removeImageHandler}>
          <TiDelete
            id={image}
            onClick={removeImageHandler}
            className='image-delete-btn'
          />
        </section>

        <img
          src={image || DEFAULT_IMG_URL}
          alt='new-shoot'
          className='form-image'
          key={image}
          onError={addDefaultImageSrc}
        />
      </section>
    )
  })

  return (
    <>
      <section className='form-images-container'>{mappedImages}</section>
      {!images.length && (
        <p className='no-images-error'>Please add at least one photo</p>
      )}
      <Button onClick={() => setPostImage(false)}>
        ADD MORE PHOTOS <ImCamera />
      </Button>
      <form onSubmit={artCreateHandler} className='create-art-form'>
        <Input
          className='create-art-input'
          type='text'
          placeholder='art title'
          value={title}
          onInput={(e) => setTitle(e.target.value)}
          isValid={false}
          errorMessage='Title is required'
        />
        <Input
          className='create-art-input'
          type='text'
          placeholder='artist name'
          value={artistName}
          onInput={(e) => setArtistName(e.target.value)}
          isValid={false}
          errorMessage='Artist name is required'
        />
        <Input
          className='create-art-input'
          type='text'
          placeholder='artist instagram'
          value={artistInstagram}
          onInput={(e) => setArtistInstagram(e.target.value)}
        />
        <Input
          className='create-art-input'
          type='text'
          placeholder='address'
          value={address}
          onInput={(e) => setAddress(e.target.value)}
          isValid={false}
          errorMessage='Address or current location is required'
        />
        <section className='form-btn-wrapper'>
          <Button>
            my location
            <FaMapMarkerAlt />
          </Button>
        </section>

        <Input
          className='create-art-input'
          type='text'
          element='textarea'
          placeholder='description'
          rows='5'
          value={description}
          onInput={(e) => setDescription(e.target.value)}
          isValid={false}
          errorMessage='Description is required'
        />
        <section className='form-btn-wrapper'>
          <Button type='submit'>
            POST ART <FaTelegramPlane />
          </Button>
        </section>

        {/* <p>
          {currentLocation
            ? `${currentLocation.latitude}, ${currentLocation.longitude}`
            : 'no location'}
        </p> */}
      </form>
    </>
  )
}

export default CreateForm
