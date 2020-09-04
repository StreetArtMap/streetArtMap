import React, { useState } from 'react'
import Input from '../../UIComponents/Input/Input'
import Button from '../../UIComponents/Button/Button'

const CreateForm = () => {
  const [currentLocation, setCurrentLocation] = useState(null)

  const getLocation = async () => {
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

  return (
    <form onSubmit={artCreateHandler}>
      <Input type='text' placeholder='art title' value='' />
      <Input type='text' placeholder='artist name' value='' />
      <Input type='text' placeholder='artist instagram' value='' />
      <Input
        type='text'
        element='textarea'
        placeholder='description'
        rows='5'
        value=''
      />
      <Input
        type='text'
        placeholder='address'
        value={
          currentLocation
            ? (currentLocation.latitude, currentLocation.longitude)
            : 'no location'
        }
      />
      <Button type='submit'>CREATE</Button>
    </form>
  )
}

export default CreateForm
