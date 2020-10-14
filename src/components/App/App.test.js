import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import App from './App'

describe('<App />', () => {
  let AppContainer
  let store
  let client
  let initialState
  let mockStore

  beforeEach(() => {
    initialState = {
      user: {
        name: 'edita',
      },
      arts: [
        {
          id: '1',
          latitude: +'39.744137',
          longitude: +'-104.95005',
          address: 'address1',
          city: 'city1',
          state: 'state1',
          zipcode: 'zip1',
          imageUrls: ['url2', 'url1'],
          description: 'something about this art',
          artistName: 'artist name',
          instagramHandle: null,
          favorite: true,
          visited: false,
        },
        {
          id: '2',
          latitude: +'39.744137',
          longitude: +'-104.95005',
          address: 'address2',
          city: 'city2',
          state: 'state2',
          zipcode: 'zip2',
          imageUrls: ['url2', 'url1'],
          description: 'test this art',
          artistName: 'artist name2',
          instagramHandle: null,
          favorite: true,
          visited: false,
        },
      ],
      session: { selectedArt: '' },
    }

    mockStore = configureStore()
    store = mockStore(initialState)

    client = new ApolloClient({
      uri: 'https://streetwalker-backend.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    })

    AppContainer = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      </ApolloProvider>
    )
  })

  afterEach(cleanup)

  it('should render a login form on load', () => {
    const { getByText, getByPlaceholderText, getByTestId } = AppContainer
    const title = getByText('Street | ART | Walk')
    const usernameInput = getByPlaceholderText('Username...')
    const passwordInput = getByPlaceholderText('Password...')
    const loginBtn = getByText('LOG IN')
    const signupBtn = getByText('SIGN UP')
    const noAccountMessage = getByTestId('signup-message')
    expect(title).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    expect(signupBtn).toBeInTheDocument()
    expect(noAccountMessage).toBeInTheDocument()
  })

  it('should change page with successful login', () => {
    const { getByText, getByPlaceholderText } = AppContainer
    const title = getByText('Street | ART | Walk')
    const usernameInput = getByPlaceholderText('Username...')
    const passwordInput = getByPlaceholderText('Password...')
    const loginBtn = getByText('LOG IN')

    expect(title).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    fireEvent.change(usernameInput, { target: { value: 'a' } })
    fireEvent.change(passwordInput, { target: { value: 'a' } })
    fireEvent.click(loginBtn)
    expect(usernameInput).not.toBeInTheDocument()
    expect(passwordInput).not.toBeInTheDocument()
    expect(loginBtn).not.toBeInTheDocument()
  })

  it('Should display error mesage and stay on login page if username and password are not correct', () => {
    const { getByText, getByPlaceholderText } = AppContainer
    const loginBtn = getByText('LOG IN')
    fireEvent.change(getByPlaceholderText('Username...'), {
      target: { value: 'wrong username' },
    })
    fireEvent.change(getByPlaceholderText('Password...'), {
      target: { value: 'wrong password' },
    })
    fireEvent.click(loginBtn)
    expect(getByText(`Don't have an account?`)).toBeInTheDocument()
  })

  it('Should redirect to explore page after successful login and show explore, header, nav data', () => {
    const { getByText, getByPlaceholderText, getByTestId } = AppContainer
    const loginBtn = getByText('LOG IN')
    fireEvent.change(getByPlaceholderText('Username...'), {
      target: { value: 'username' },
    })
    fireEvent.change(getByPlaceholderText('Password...'), {
      target: { value: 'password' },
    })
    fireEvent.click(loginBtn)
    const header = getByText('Street | ART | Walk')
    const exploreNav = getByText('explore')
    const mapNav = getByText('map')
    const createNav = getByText('explore')
    const profileNav = getByText('profile')
    const exploreContainer = getByTestId('explore-container')
    expect(header).toBeInTheDocument()
    expect(exploreNav).toBeInTheDocument()
    expect(mapNav).toBeInTheDocument()
    expect(createNav).toBeInTheDocument()
    expect(profileNav).toBeInTheDocument()
    expect(exploreContainer).toBeInTheDocument()
  })

  it('Should open map page', () => {
    const { getByText, getByPlaceholderText, getByTestId } = AppContainer
    const loginBtn = getByText('LOG IN')
    fireEvent.change(getByPlaceholderText('Username...'), {
      target: { value: 'username' },
    })
    fireEvent.change(getByPlaceholderText('Password...'), {
      target: { value: 'password' },
    })
    fireEvent.click(loginBtn)
    const exploreContainer = getByTestId('explore-container')
    const mapNav = getByText('map')
    fireEvent.click(mapNav)
    const mapContainer = getByTestId('map-container')
    expect(mapContainer).toBeInTheDocument()
    expect(exploreContainer).not.toBeInTheDocument()
  })

  it('Should open create page', () => {
    const { getByText, getByPlaceholderText, getByTestId } = AppContainer
    const loginBtn = getByText('LOG IN')
    fireEvent.change(getByPlaceholderText('Username...'), {
      target: { value: 'username' },
    })
    fireEvent.change(getByPlaceholderText('Password...'), {
      target: { value: 'password' },
    })
    fireEvent.click(loginBtn)
    const exploreContainer = getByTestId('explore-container')
    const createNav = getByText('create')
    fireEvent.click(createNav)
    const cameraContainer = getByTestId('camera-container')
    expect(cameraContainer).toBeInTheDocument()
    expect(exploreContainer).not.toBeInTheDocument()
  })
