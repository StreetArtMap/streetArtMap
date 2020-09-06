import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import './LoginPage.css'
import PropTypes from 'prop-types'

const LoginPage = (props) => {
  const { setIsLoggedIn } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section className='login-page'>
      <section className='login-container'>
        <section className='login-title'>Street | ART | Walk</section>
        <section className='user-validation'>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Username...'
          ></Input>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password...'
          ></Input>
          <Link to='/explore' onClick={() => setIsLoggedIn(true)}>
            <Button type='submit'>LOG IN</Button>
          </Link>
        </section>
        <p>Don't have an account?</p>
        <Button>SIGN UP</Button>
      </section>
    </section>
  )
}

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func,
}

export default LoginPage
