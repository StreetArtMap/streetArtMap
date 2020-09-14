import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectArt } from '../../actions/actions'
import { DEFAULT_IMG_URL, PROFILE_IMG_PLACEHOLDER } from '../../constants'
import Modal from '../../UIComponents/Modal/Modal'
import Button from '../../UIComponents/Button/Button'
import { FaBookOpen, FaHeart, FaRoute } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
import './ProfilePage.css'

const ProfilePage = () => {
  const [showFavorites, setShowFavorites] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)
  const [tours, setTours] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const addDefaultImageSrc = (e) => {
    e.target.src = DEFAULT_IMG_URL
  }
  const username = useSelector((state) => state.user.name)
  const arts = useSelector((state) => state.arts).map((art) => (
    <section className='photo-wrapper' key={uuidv4()}>
      <Link to={`/arts/${art.id}`}>
        <img
          src={art.images[0] || DEFAULT_IMG_URL}
          alt='street art'
          onError={addDefaultImageSrc}
          className='art-tile'
          onClick={() => {
            dispatch(selectArt(art.id))
            window.scrollTo(0, 0)
          }}
        />
      </Link>
    </section>
  ))

  const getTours = async () => {
    try {
      return await axios.get('http://localhost:3000/tours')
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowAll = () => {
    setShowFavorites(false)
  }

  const handleFavorites = () => {
    setShowFavorites(true)
  }

  const handleShowTours = () => {
    getTours()
      .then(response => {
        showTours(response.data.data.allTours)
      })
      .catch(error => {
        setError(error.message)
        console.log(error)
      })
    setDisplayModal(true)
  }

  const showTours = (tours) => {
    const unpackedTours = tours.map(tour => {
      return (
        <Button key={tour.id} href={tour.link}>{tour.name}</Button>
      )
    })
    setTours(unpackedTours)
  }


  const favoritedArts = useSelector((state) => state.arts)
    .filter((art) => art.favorite)
    .map((art) => {
      return (
        <section className='photo-wrapper' key={uuidv4()}>
          <Link to={`/arts/${art.id}`}>
            <img
              src={art.images[0] || DEFAULT_IMG_URL}
              alt='street art'
              onError={addDefaultImageSrc}
              className='art-tile'
              onClick={() => {
                dispatch(selectArt(art.id))
                window.scrollTo(0, 0)
              }}
            />
          </Link>
        </section>
      )
    })

  return (
    <section className='profile-container'>
      <section className='user-details-container'>
        <section className='user-image'>
          <img
            src={PROFILE_IMG_PLACEHOLDER}
            alt='human-user'
            className='user-profile-image'
          />
        </section>
        <section className='user-stats'>
          <p className='username'>{username}</p>
          <p className='user-image-count'>{arts.length} Posts</p>
          <section className='button-container'>
            <section className='tours-button' onClick={handleShowTours}>
              <FaRoute className='art-icon' title='tours-icon' onClick={() => getTours()}/>
            </section>
            <section className='all-button' onClick={handleShowAll}>
              <FaBookOpen className='art-icon' title='collection-icon' />
            </section>
            <section className='saved-button' onClick={handleFavorites}>
              <FaHeart className='art-icon' title='bookmark-icon' />
            </section>
          </section>
        </section>
      </section>
      {showFavorites ? (
        <section className='photo-container'>{favoritedArts}</section>
      ) : (
        <section className='photo-container'>{arts}</section>
      )}
      <Modal show={displayModal}>
        <p className='modal-message'>Curated Waking Tours</p>
        {tours}
        <Button styling='padding' onClick={() => setDisplayModal(false)}>
          back
        </Button>
      </Modal>
      <Modal show={error}>
        <p className='modal-message error-message'>{error}</p>
        <Button
          styling='padding'
          onClick={() => {
            setError('')
          }}
        >
          close
        </Button>
      </Modal>
    </section>
  )
}

export default ProfilePage
