import React, { useState } from 'react'
import Input from '../../UIComponents/Input/Input'
import Button from '../../UIComponents/Button/Button'
import './CreateForm.css'
import { TiDelete } from 'react-icons/ti'
import { FaMapMarkerAlt, FaTelegramPlane } from 'react-icons/fa'
import { ImCamera } from 'react-icons/im'
import { DEFAULT_IMG_URL } from '../../constants'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'

const CreateForm = ({ images, setPostImage, setImages }) => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [addressInput, setAddressInput] = useState(true)
  const [addressButton, setAddressButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [artistName, setArtistName] = useState('')
  const [artistInstagram, setArtistInstagram] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [isAddressValid, setIsAddressValid] = useState(true)
  const [isCityValid, setIsCityValid] = useState(true)
  const [isStateValid, setIsStateValid] = useState(true)
  const [isZipcodeValid, setIsZipcodeValid] = useState(true)

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
  }

  const getCurrentLocationHandler = (e) => {
    setIsLoading(true)
    e.preventDefault()
    setAddressInput(false)
    setAddress('')
    setCity('')
    setState('')
    setZipcode('')
    setAddressButton(true)
    // await get location is not working
    getLocation()
    setIsLoading(false)
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

  const postArtHandler = (e) => {
    e.preventDefault()
    const fullAddress = address && city && state && zipcode ? true : false

    if (addressInput && !fullAddress) {
      !address && setIsAddressValid(false)
      !city && setIsCityValid(false)
      !state && setIsStateValid(false)
      !zipcode && setIsZipcodeValid(false)
    } else if (!addressInput && !currentLocation) {
      alert(
        'Error getting your location. Please try again or enter address instead'
      )
      return
    } else if (!images.length) {
      alert('Please add at least one photo')
      return
    } else {
      const newArt = {
        image_urls: images,
        latitude: currentLocation ? currentLocation.latitude.toString() : '',
        longitude: currentLocation ? currentLocation.longitude.toString() : '',
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        description: description,
        artist_name: artistName,
        art_name: title,
        instagram_handle: artistInstagram,
        favorite: false,
        visited: false,
      }
      console.log(newArt)
      alert('Art created!')
    }
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
      {isLoading && <LoadingSpinner asOverlay />}
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
        />
        <Input
          className='create-art-input'
          type='text'
          placeholder='artist name'
          value={artistName}
          onInput={(e) => setArtistName(e.target.value)}
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
              isValid={isAddressValid}
              errorMessage='Address is required or current location'
            />
            <Input
              className='create-art-input'
              type='text'
              placeholder='city'
              value={city}
              onInput={(e) => setCity(e.target.value)}
              isValid={isCityValid}
              errorMessage='City is required or current location'
            />
            <Input
              className='create-art-input'
              type='text'
              placeholder='state'
              value={state}
              onInput={(e) => setState(e.target.value)}
              isValid={isStateValid}
              errorMessage='State is required or current location'
            />
            <Input
              className='create-art-input'
              type='number'
              placeholder='zipcode'
              value={zipcode}
              onInput={(e) => setZipcode(e.target.value)}
              isValid={isZipcodeValid}
              errorMessage='Zipcode is required or current location'
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
