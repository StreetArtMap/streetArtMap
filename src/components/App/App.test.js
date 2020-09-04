import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../reducers/index'
import App from './App'

describe('<App/>', () => {
  let AppContainer
  let store

  beforeEach(() => {
    store = createStore(rootReducer)

    AppContainer = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
  })

  afterEach(cleanup)

  test('<App/>', () => {
    const { getByText } = AppContainer
    expect(getByText('test')).toBeInTheDocument()
  })
})
