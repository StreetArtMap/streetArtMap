import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addData } from '../../actions/userAction'
import { useQuery, gql } from '@apollo/client'
import Button from '../../UIComponents/Button/Button'
import Input from '../../UIComponents/Input/Input'
import './LoginPage.css'
import PropTypes from 'prop-types'

const LoginPage = (props) => {
  const { setIsLoggedIn, addData } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      addData(parsedData)

      setArtData(data.streetArts)
      console.log(artData)
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

const mapDispatch = (dispatch) => ({
  addData: (data) => dispatch(addData(data)),
})

const mapState = (state) => ({
  arts: state.arts,
})

export default connect(mapState, mapDispatch)(withRouter(LoginPage))
