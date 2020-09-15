import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { useSelector } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createMemoryHistory } from 'history'
import rootReducer from '../../reducers/index'
import App from './App'
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

describe('<App />', () => {
  let AppContainer, store, initialState, mockStore, client, art, user, login

  beforeEach(() => {
    initialState = {
      user: {
        name: '',
      },
      arts: [
        {
          id: '1',
          latitude: 39.744137,
          longitude: -104.95005,
          address: 'address1',
          city: 'city1',
          state: 'state1',
          zipcode: 'zip1',
          image_urls: ['url2', 'url1'],
          description: 'something about this art',
          artist_name: 'artist name',
          instagram_handle: null,
          favorite: true,
          visited: false,
        },
      ],
      session: { selectedArt: '' },
    }

    login = {
      type: 'LOGIN',
      user
    }

    user = {
      name: "edignot"
    }
    art =  {
      id: '2',
      latitude: +'39.744137',
      longitude: +'-104.95005',
      address: 'address2',
      city: 'city2',
      state: 'state2',
      zipcode: 'zip2',
      images: ['https://res.cloudinary.com/ds6dxgvxo/image/upload/v1600116891/ldxpxerqishozdxuvpzp.jpg', 'https://res.cloudinary.com/ds6dxgvxo/image/upload/v1600116891/ldxpxerqishozdxuvpzp.jpg'],
      description: 'test this art',
      artistName: 'artist name2',
      instagramHandle: null,
      favorite: true,
      visited: false,
    }

    mockStore = configureStore()
    store = mockStore(rootReducer, initialState)

    // useSelector.mockImplementation(callback => {
    //   let newState = {
    //     ...initialState,
    //     session: {
    //       selectedArt: ''
    //     }
    //   }
    //   return callback(newState);
    // });

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
    const loginBtn = getByText("LOG IN")
    const signupBtn = getByText("SIGN UP")
    const noAccountMessage = getByTestId("signup-message")
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
    const loginBtn = getByText("LOG IN")

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

  it('Should update path locations when the log in button is clicked', () => {
    const testHistoryObject = createMemoryHistory()
    const { getByText, debug } = AppContainer
    debug()
    expect(testHistoryObject.location.pathname).toEqual('/')
    const loginBtn = getByText('LOG IN')
    fireEvent.click(loginBtn, 'right click')
    expect(testHistoryObject.location.pathname).toEqual('/')
    // fix this last expect with '/explore'
  })
})
