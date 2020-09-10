import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { addData } from '../../actions/userAction'
import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import './LoginPage.css'

const LoginPage = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch()
  const [, setUsername] = useState('')
  const [, setPassword] = useState('')
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
          <Link to='/explore' onClick={() => setIsLoggedIn(true)}>
            <Button onClick={() => getArt()} type='submit'>
              LOG IN
            </Button>
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

export default withRouter(LoginPage)
