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
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [addressInput, setAddressInput] = useState(true)
  const [addressButton, setAddressButton] = useState(false)

  const getLocation = async () => {
    if (navigator.geolocation) {
      return await navigator.geolocation.getCurrentPosition(showPosition)
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

  const getCurrentLocationHandler = async (e) => {
    e.preventDefault()
    setAddressInput(false)
    setAddress(null)
    setCity(null)
    setState(null)
    setZipcode(null)
    setAddressButton(true)
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

  const toggleAddressOrLocationHandler = (e) => {
    e.preventDefault()
    setAddressInput(true)
    setCurrentLocation(null)
    setAddressButton(false)
  }

  const postArtHandler = () => {
    const newArt = {
      image_urls: '',
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      address: 'a',
      city: 'a',
      state: 'a',
      zipcode: 'a',
      description: description,
      artist_name: artistName,
      art_name: title,
      instagram_handle: artistInstagram,
      favorite: false,
      visited: false,
    }
    console.log(newArt)
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
      <form onSubmit={postArtHandler} className='create-art-form'>
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

        {addressInput && (
          <>
            <Input
              className='create-art-input'
              type='text'
              placeholder='address'
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              isValid={false}
              errorMessage='Address is required'
            />
            <Input
              className='create-art-input'
              type='text'
              placeholder='city'
              value={city}
              onInput={(e) => setCity(e.target.value)}
              isValid={false}
              errorMessage='City is required'
            />
            <Input
              className='create-art-input'
              type='text'
              placeholder='state'
              value={state}
              onInput={(e) => setState(e.target.value)}
              isValid={false}
              errorMessage='State is required'
            />
            <Input
              className='create-art-input'
              type='text'
              placeholder='zipcode'
              value={zipcode}
              onInput={(e) => setZipcode(e.target.value)}
              isValid={false}
              errorMessage='Zipcode is required'
            />
          </>
        )}

        {!addressInput && (
          <p className='current-location-display'>
            {currentLocation &&
              `${currentLocation.latitude}° N, ${currentLocation.longitude}° W`}
          </p>
        )}
        {!addressButton && (
          <section className='form-btn-wrapper'>
            <Button onClick={getCurrentLocationHandler}>
              my location
              <FaMapMarkerAlt />
            </Button>
          </section>
        )}

        {addressButton && (
          <section className='form-btn-wrapper'>
            <Button onClick={toggleAddressOrLocationHandler}>
              enter address
              <FaMapMarkerAlt />
            </Button>
          </section>
        )}

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
        <section className='form-btn-wrapper post-art-btn'>
          <Button type='submit'>
            POST ART <FaTelegramPlane />
          </Button>
        </section>
      </form>
    </>
  )
}

export default CreateForm
