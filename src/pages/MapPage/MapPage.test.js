import React from 'react'
import { render, cleanup } from '@testing-library/react'
import MapPage from './MapPage'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../../reducers/index'

describe('<MapPage/>', () => {
  let MapPageComponent
  let store

  beforeEach(() => {
    store = createStore(rootReducer)

    MapPageComponent = render(
      <Provider store={store}>
        <BrowserRouter>
          <MapPage />
        </BrowserRouter>
      </Provider>
    )
  })

  afterEach(cleanup)

  test('<MapPage/> component successfully renders', () => {
    const { getByTestId } = MapPageComponent
    expect(getByTestId('map-container')).toBeInTheDocument()
  })

  test('Tours icon and modal successfully renders', () => {
    const { getByText, getByTestId } = MapPageComponent
    const toursBtn = getByTestId('tours-icon')
    const popUp = getByText('Curated Walking Tours')
    const popUpBtn = getByText('back')
    expect(toursBtn).toBeInTheDocument()
    expect(popUp).toBeInTheDocument()
    expect(popUpBtn).toBeInTheDocument()
  })
})
