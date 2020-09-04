import React from 'react'
import Input from '../../UIComponents/Input/Input'
import Button from '../../UIComponents/Button/Button'

const CreateForm = () => {
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
    console.log(location)
    return location
  }

  return (
    <form>
      <Input type='text' placeholder='art title' />
      <Input type='text' placeholder='artist name' />
      <Input type='text' placeholder='artist instagram' />
      <Input
        type='text'
        element='textarea'
        placeholder='description'
        rows='5'
      />
      <Input type='text' placeholder='address' />
      <Button to='/explore' onClick={getLocation}>
        CREATE
      </Button>
    </form>
  )
}

export default CreateForm
