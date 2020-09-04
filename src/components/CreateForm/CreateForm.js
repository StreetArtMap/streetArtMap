import React from 'react'
import Input from '../../UIComponents/Input/Input'
import Button from '../../UIComponents/Button/Button'

const CreateForm = () => {
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
      <Button to='/explore' onClick={() => alert('created')}>
        CREATE
      </Button>
    </form>
  )
}

export default CreateForm
