import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'
const setIsLoggedIn = jest.fn()

describe('<LoginPage/>', () => {
  afterEach(cleanup)

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render a login form', () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter>)

    const title = getByText('Street | ART | Walk')
    const usernameInput = getByPlaceholderText('Username...')
    const passwordInput = getByPlaceholderText('Password...')
    const loginBtn = screen.getByRole('button', { name: /LOG IN/})
    const signupBtn = screen.getByRole('button', { name: /SIGN UP/})
    expect(title).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    expect(signupBtn).toBeInTheDocument()
  })
})