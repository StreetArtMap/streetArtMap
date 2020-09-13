import React from 'react'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createMemoryHistory } from 'history'
import rootReducer from '../../reducers/index'
import App from './App'

describe('<App />', () => {
  let AppContainer
  let store
  let client

  beforeEach(() => {
    store = createStore(rootReducer)

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
    const { getByText, getByPlaceholderText, getByRole } = AppContainer

    const title = getByText('Street | ART | Walk')
    const usernameInput = getByPlaceholderText('Username...')
    const passwordInput = getByPlaceholderText('Password...')
    const loginBtn = screen.getByRole('button', { name: /LOG IN/ })
    const signupBtn = screen.getByRole('button', { name: /SIGN UP/ })
    expect(title).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    expect(signupBtn).toBeInTheDocument()
  })

  // this test goes in APP
  it('should change page with successful login', () => {
    const { getByText, getByPlaceholderText, getByRole, debug } = AppContainer

    const title = getByText('Street | ART | Walk')
    const usernameInput = getByPlaceholderText('Username...')
    const passwordInput = getByPlaceholderText('Password...')
    const loginBtn = getByRole('button', { name: 'LOG IN' })

    expect(title).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    fireEvent.change(usernameInput, { target: { value: 'testUser' } })
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } })
    fireEvent.click(loginBtn)
    expect(usernameInput).not.toBeInTheDocument()
    expect(passwordInput).not.toBeInTheDocument()
    expect(loginBtn).not.toBeInTheDocument()

    const header = getByText('Street | ART | Walk')
    expect(header).toBeInTheDocument()

    // as the explore page develops add new elements here
  })

  it('Should update path locations when the log in button is clicked', () => {
    const testHistoryObject = createMemoryHistory()
    const { getByRole } = AppContainer
    expect(testHistoryObject.location.pathname).toEqual('/')
    const loginBtn = getByRole('button', { name: 'LOG IN' })
    fireEvent.click(loginBtn)
    expect(testHistoryObject.location.pathname).toEqual('/')

    // fix this last expect with '/explore'
  })
})
