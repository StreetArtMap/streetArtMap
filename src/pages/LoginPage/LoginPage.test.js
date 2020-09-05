import React from 'react'
import ReactDOM from 'react-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'
const setIsLoggedIn = jest.fn()

describe('<LoginPage/>', () => {
  beforeEach(() => {
  })
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

  // this test goes in APP
  it('should change page with successful login', () => {
    const { getByText, getByPlaceholderText, getByRole, debug } = render(
      <BrowserRouter>
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter>)

    const title = getByText('Street | ART | Walk')
    const usernameInput = getByPlaceholderText('Username...')
    const passwordInput = getByPlaceholderText('Password...')
    const loginBtn = getByRole('button', { name: 'LOG IN' })

    expect(title).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    // fireEvent.change(usernameInput, {target: {value: 'testUser'}})
    // fireEvent.change(passwordInput, {target: {value: 'testPassword'}})
    fireEvent.click(loginBtn) 
    debug()
    // expect(usernameInput).not.toBeInTheDocument()
    // expect(passwordInput).not.toBeInTheDocument()
    // expect(loginBtn).not.toBeInTheDocument()
    
  })

  // it('Should change locations when the log in button is clicked', async () => {
  //   const testHistoryObject = createMemoryHistory()
  //   const { getByRole } = render( 
  //     <Router history={ testHistoryObject }>
  //       <App />
  //     </Router> )
  //   expect(testHistoryObject.location.pathname).toEqual('/')
  //   const logInButton = await waitFor(() => getByRole('button', {name: 'LOG IN'}))
  //   fireEvent.click(logInButton) 
  //   expect(testHistoryObject.location.pathname).toEqual('/login')
  // })
})