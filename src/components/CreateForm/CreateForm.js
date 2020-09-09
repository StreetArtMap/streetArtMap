import React, { useState } from 'react'
import Input from '../../UIComponents/Input/Input'
import Button from '../../UIComponents/Button/Button'
import './CreateForm.css'
import { TiDelete } from 'react-icons/ti'
import { useMutation, gql } from '@apollo/client'
import { FaMapMarkerAlt, FaTelegramPlane } from 'react-icons/fa'
import { ImCamera } from 'react-icons/im'
import { DEFAULT_IMG_URL } from '../../constants'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import MapWithMarkers from '../MapWithMarkers/MapWithWithMarkers'

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

  const ART_POST = gql`
    mutation createStreetArt(
      $userId: Int!
      $latitude: String!
      $longitude: String!
      $address: String!
      $city: String!
      $state: String!
      $zipcode: String!
      $description: String!
      $artistName: String!
      $artName: String!
      $instagramHandle: String!
      $imageUrls: String!
    ) {
      createStreetArt(
        input: {
          userId: $userId
          latitude: $latitude
          longitude: $longitude
          address: $address
          city: $city
          state: $state
          zipcode: $zipcode
          description: $description
          artistName: $artistName
          artName: $artName
          instagramHandle: $instagramHandle
          imageUrls: $imageUrls
        }
      ) {
        id
        latitude
        longitude
        address
        city
        state
        zipcode
        imageUrls
        description
        artistName
        artName
        instagramHandle
        favorite
        visited
        createdAt
        updatedAt
        userId
      }
    }
  `
  const [createStreetArt, { data, loading, error }] = useMutation(ART_POST)

  // change later:
  const getArt = (e) => {
    e.preventDefault()
    if (data) {
      console.log(data)
    } else if (loading) {
      return alert('Loading')
    } else if (error) {
      return alert('Error')
    }
  }

  isLoading && (document.body.style.overflow = 'hidden')
  !isLoading && (document.body.style.overflow = 'scroll')

  const getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  const fetchCoordinates = async () => {
    try {
      const { coords } = await getCurrentPosition()
      const { latitude, longitude } = coords
      setCurrentLocation({ latitude, longitude })
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const getCurrentLocationHandler = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    setAddressInput(false)
    setAddress('')
    setCity('')
    setState('')
    setZipcode('')
    setAddressButton(true)
    await fetchCoordinates()
  }

  const addDefaultImageSrc = (e) => {
    e.target.src = DEFAULT_IMG_URL
  }

  const removeImageHandler = (e) => {
    e.preventDefault()
    const newImages = images.filter((image) => {
      if (image !== e.target.id && image !== undefined) {
        return image
      }
    })

    setImages([...newImages])
  }

  const toggleAddressOrLocationHandler = (e) => {
    e.preventDefault()
    setAddressInput(true)
    setCurrentLocation(null)
    setAddressButton(false)
  }

  const postArtHandler = async (e) => {
    e.preventDefault()
    const fullAddress = address && city && state && zipcode ? true : false
    const finalImages = images.filter((image) => image !== undefined)

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
    } else if (!finalImages.length) {
      alert('Please add at least one photo')
      return
    } else {
      await createStreetArt({
        variables: {
          userId: 1,
          latitude: currentLocation ? currentLocation.latitude.toString() : '',
          longitude: currentLocation
            ? currentLocation.longitude.toString()
            : '',
          address: address,
          city: city,
          state: state,
          zipcode: zipcode,
          description: description,
          artistName: artistName,
          artName: title,
          instagramHandle: artistInstagram,
          imageUrls: JSON.stringify(images),
        },
      })
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
      <section className='form-images-container'>{mappedImages}</section>
      {!images.length && (
        <p className='no-images-error'>Please add at least one photo</p>
      )}
      <Button onClick={() => setPostImage(false)}>
        ADD MORE PHOTOS <ImCamera />
      </Button>
      <Button onClick={getArt}>CHECK DATA</Button>

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

        {!addressInput && currentLocation && (
          <>
            <section className='current-location-map'>
              <MapWithMarkers
                formMap={true}
                zoom={14}
                lat={currentLocation.latitude}
                lng={currentLocation.longitude}
              />
            </section>
          </>
        )}
        {!addressButton && (
          <>
            <p className='my-location-message'>
              Enter address or click 'my location'
            </p>
            <section className='form-btn-wrapper my-location-btn'>
              <Button onClick={getCurrentLocationHandler}>
                my location
                <FaMapMarkerAlt />
              </Button>
            </section>
          </>
        )}

        {addressButton && (
          <section className='form-btn-wrapper address-btn'>
            <Button onClick={toggleAddressOrLocationHandler}>
              enter address
              <FaMapMarkerAlt />
            </Button>
          </section>
        )}

        <Input
          className='create-art-input description-input'
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
      {isLoading && <LoadingSpinner asOverlay />}
    </>
  )
}

export default CreateForm
