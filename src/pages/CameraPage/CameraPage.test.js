import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CameraPage from './CameraPage'

describe('CameraPage', () => {
  let CameraPageContainer = render(
    <BrowserRouter>
      <CameraPage />
    </BrowserRouter>
  )

  it('<CameraPage /> component successfully renders', () => {
    const { getByText, getAllByRole, getByTestId } = CameraPageContainer
    const selectBtn = getByText('Select from device')
    const uploadInput = getByTestId('image-input')
    const uploadBtn = getByText('Upload Via Widget')
    const selectButtons = getAllByRole('button')
    expect(selectBtn).toBeInTheDocument()
    expect(uploadInput).toBeInTheDocument()
    expect(uploadBtn).toBeInTheDocument()
    expect(selectButtons).toHaveLength(2)
  })
})
