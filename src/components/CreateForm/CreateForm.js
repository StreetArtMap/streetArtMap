import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { addData } from '../../actions/actions'
import { DEFAULT_IMG_URL } from '../../constants'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import MapWithMarkers from '../MapWithMarkers/MapWithWithMarkers'
import Modal from '../../UIComponents/Modal/Modal'
import Input from '../../UIComponents/Input/Input'
import Button from '../../UIComponents/Button/Button'
import { v4 as uuidv4 } from 'uuid'
import { TiDelete } from 'react-icons/ti'
import { FaMapMarkerAlt, FaTelegramPlane } from 'react-icons/fa'
import { ImCamera } from 'react-icons/im'
import './CreateForm.css'

const CreateForm = ({ images, setPostImage, setImages, setError }) => {
  const dispatch = useDispatch()
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
  const [isArtUploaded, setIsArtUploaded] = useState(false)

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

  useEffect(() => {
    if (data) {
      const images = JSON.parse(data.createStreetArt.imageUrls)
      const parsedData = [
        {
          ...data.createStreetArt,
          images,
        },
      ]
      dispatch(addData(parsedData))
      setIsArtUploaded(true)
    }
    //eslint-disable-next-line
  }, [data])
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
    //eslint-disable-next-line
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

  const postArtHandler = (e) => {
    e.preventDefault()
    const fullAddress = address && city && state && zipcode ? true : false
    const finalImages = images.filter((image) => image !== undefined)

    if (addressInput && !fullAddress) {
      !address && setIsAddressValid(false)
      !city && setIsCityValid(false)
      !state && setIsStateValid(false)
      !zipcode && setIsZipcodeValid(false)
    } else if (!addressInput && !currentLocation) {
      setError(
        'Error getting your location. Please try again or enter address instead'
      )
      return
    } else if (!finalImages.length) {
      setError('Please add at least one photo')
      return
    } else {
      createStreetArt({
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
      <section className='form-image-wrapper' key={uuidv4()}>
        <section onClick={removeImageHandler}>
          <TiDelete id={image} className='image-delete-btn' />
        </section>

        <img
          src={image || DEFAULT_IMG_URL}
          alt='new-shoot'
          className='form-image'
          data-testid="image"
          key={image}
          onError={addDefaultImageSrc}
        />
      </section>
    )
  })

  const postDisabled =
    (currentLocation || (address && city && state && zipcode)) &&
    images.filter((image) => image !== undefined)
      ? false
      : true

  return (
    <>
      <section className='form-images-container'>{mappedImages}</section>
      {!images.length && (
        <p className='no-images-error'>Please add at least one photo</p>
      )}
      <Button onClick={() => setPostImage(false)} data-testid="add-more-photos-button">
        ADD MORE PHOTOS <ImCamera className='btn-icon' />
      </Button>
      <form onSubmit={postArtHandler} className='create-art-form'
      data-testid="image-form">
        <Input
          className='create-art-input'
          type='text'
          placeholder='art title'
          data-testid="title-input"
          value={title}
          onInput={(e) => setTitle(e.target.value)}
          label='art title'
          id='art title'
        />
        <Input
          className='create-art-input'
          type='text'
          placeholder='artist name'
          data-testid="name-input"
          value={artistName}
          onInput={(e) => setArtistName(e.target.value)}
          label='artist name'
          id='artist name'
        />
        <Input
          className='create-art-input'
          type='text'
          placeholder='artist instagram'
          data-testid="instagram-input"
          value={artistInstagram}
          onInput={(e) => setArtistInstagram(e.target.value)}
          label='artist instagram'
          id='artist instagram'
        />

        {addressInput && (
          <>
            <Input
              className='create-art-input'
              type='text'
              placeholder='address'
              data-testid="address"
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              isValid={isAddressValid}
              errorMessage='Address is required or current location'
              label='address'
              id='address'
            />
            <Input
              className='create-art-input'
              type='text'
              placeholder='city'
              data-testid="city"
              value={city}
              onInput={(e) => setCity(e.target.value)}
              isValid={isCityValid}
              errorMessage='City is required or current location'
              label='city'
              id='city'
            />
            <Input
              className='create-art-input'
              type='text'
              placeholder='state'
              data-testid="state"
              value={state}
              onInput={(e) => setState(e.target.value)}
              isValid={isStateValid}
              errorMessage='State is required or current location'
              label='state'
              id='state'
            />
            <Input
              className='create-art-input'
              type='number'
              placeholder='zipcode'
              data-testid="zipcode"
              value={zipcode}
              onInput={(e) => setZipcode(e.target.value)}
              isValid={isZipcodeValid}
              errorMessage='Zipcode is required or current location'
              label='zipcode'
              id='zipcode'
            />
          </>
        )}

        {!addressInput && currentLocation && !isArtUploaded && (
          <>
            <section className='current-location-map' data-testid="map-with-markers">
              <MapWithMarkers
                formMap={true}
                zoom={14}
                latitude={currentLocation.latitude}
                longitude={currentLocation.longitude}
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
                <FaMapMarkerAlt className='btn-icon' data-testid="my-location-button" />
              </Button>
            </section>
          </>
        )}

        {addressButton && (
          <>
            <p className='my-location-message'>
              Location not accurate? click 'enter address'
            </p>
            <section className='form-btn-wrapper address-btn'>
              <Button onClick={toggleAddressOrLocationHandler}>
                enter address
                <FaMapMarkerAlt className='btn-icon' />
              </Button>
            </section>
          </>
        )}

        <Input
          className='create-art-input description-input'
          type='text'
          element='textarea'
          placeholder='description'
          data-testid="description"
          rows='5'
          value={description}
          onInput={(e) => setDescription(e.target.value)}
          label='description'
          id='description'
        />
        <section className='form-btn-wrapper post-art-btn'>
          <Button type='submit' styling={postDisabled && 'disabled'}>
            POST ART <FaTelegramPlane data-testid="post-art-icon"/>
          </Button>
        </section>
      </form>
      <Modal show={isArtUploaded}>
        <p className='modal-message success-message'>ART POSTED!</p>
        <Button
          styling='padding'
          to='/explore'
          onClick={() => window.scrollTo(0, 0)}
        >
          view post
        </Button>
        <Button styling='padding' onClick={() => setPostImage(false)}>
          post again
        </Button>
      </Modal>
      <Modal show={error && true}>
        <p className='modal-message error-message'>ERROR WHILE POSTING!</p>
        <Button styling='padding' onClick={() => setPostImage(false)}>
          back
        </Button>
      </Modal>
      {(isLoading || loading) && <LoadingSpinner asOverlay />}
    </>
  )
}

export default withRouter(CreateForm)

CreateForm.propTypes = {
  images: PropTypes.array,
  setPostImage: PropTypes.func,
  setImages: PropTypes.func,
  setError: PropTypes.func,
}
