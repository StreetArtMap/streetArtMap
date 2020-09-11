import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { addData } from '../../actions/userAction'
import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import './LoginPage.css'

const LoginPage = ({
  setIsLoggedIn,
  isLoggedIn,
  currentUser,
  setCurrentUser,
}) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [credentialsError, setCredentialsError] = useState(false)
  //eslint-disable-next-line
  const [artData, setArtData] = useState([])
  const ART_FETCH = gql`
    query {
      streetArts {
        id
        latitude
        longitude
        address
        city
        state
        zipcode
        imageUrls
        description
        artistName
        artName
        instagramHandle
        favorite
        visited
        createdAt
        updatedAt
        userId
      }
    }
  `
  const { loading, error, data } = useQuery(ART_FETCH)

  const verifyUser = () => {
    if (username === '' && password === '') {
      setIsLoggedIn(true)
      getArt()
    } else {
      setCredentialsError(true)
    }
  }

  const getArt = () => {
    if (data) {
      const parsedData = data.streetArts.map((item) => {
        const images = JSON.parse(item.imageUrls)
        return {
          ...item,
          images,
        }
      })
      dispatch(addData(parsedData))
      setArtData(parsedData)
      setCurrentUser({
        name: 'Matt Example',
        posts: parsedData.length,
        location: 'Denver, CO',
        favorites: '',
      })
    } else if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      console.log(error)
    }
  }

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
          {credentialsError && (
            <p className='credentials-error'>
              Please Enter Valid Username and Password
            </p>
          )}
          <Button
            onClick={() => verifyUser()}
            type='submit'
            to={currentUser.name ? '/explore' : '/'}
          >
            LOG IN
          </Button>
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

export default withRouter(LoginPage)
