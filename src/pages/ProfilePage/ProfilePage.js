import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectArt } from '../../actions/actions'
import { DEFAULT_IMG_URL, PROFILE_IMG_PLACEHOLDER } from '../../constants'
import { FaBookOpen, FaHeart } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
import './ProfilePage.css'

const ProfilePage = () => {
  const [showFavorites, setShowFavorites] = useState(false)
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

  const handleShowAll = () => {
    setShowFavorites(false)
  }

  const handleFavorites = () => {
    setShowFavorites(true)
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
            <section className='all-button' onClick={handleShowAll}>
              <FaBookOpen
                className='art-icon'
                title='collection-icon'
                data-testid='collection-icon'
              />
            </section>
            <section className='saved-button' onClick={handleFavorites}>
              <FaHeart
                className='art-icon'
                title='bookmark-icon'
                data-testid='bookmark-icon'
              />
            </section>
          </section>
        </section>
      </section>
      {showFavorites ? (
        <section className='photo-container'>{favoritedArts}</section>
      ) : (
        <section className='photo-container'>{arts}</section>
      )}
    </section>
  )
}

export default ProfilePage
