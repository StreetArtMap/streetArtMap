import React from 'react'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { toggleFavorite, toggleVisited } from '../../actions/actions'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri'
import './ArtDetails.css'

const ArtDetails = ({
  art: {
    id,
    address,
    city,
    state,
    zipcode,
    artName,
    artistName,
    instagramHandle,
    description,
    visited,
    favorite,
  },
  setLoading,
  setError,
}) => {
  const dispatch = useDispatch()
  const FAVORITE_ART = gql`
    mutation favoriteStreetArt($streetArtId: Int!, $favorite: Boolean!) {
      favoriteStreetArt(
        input: { streetArtId: $streetArtId, favorite: $favorite }
      ) {
        id
        favorite
      }
    }
  `
  const VISITED_ART = gql`
    mutation visitStreetArt($streetArtId: Int!, $visited: Boolean!) {
      visitStreetArt(input: { streetArtId: $streetArtId, visited: $visited }) {
        id
        visited
      }
    }
  `
  const [favoriteStreetArt] = useMutation(FAVORITE_ART, {
    onCompleted(data) {
      if (data && data.favoriteStreetArt) {
        dispatch(toggleFavorite(data.favoriteStreetArt.id))
        setLoading(false)
      }
    },
    onError(error) {
      console.log(error.message)
      setError('Something went wrong... ')
      setLoading(false)
    },
  })

  const [visitStreetArt] = useMutation(VISITED_ART, {
    onCompleted(data) {
      if (data && data.visitStreetArt) {
        dispatch(toggleVisited(data.visitStreetArt.id))
        setLoading(false)
      }
    },
    onError(error) {
      console.log(error)
      setError('Something went wrong... ')
      setLoading(false)
    },
  })

  const toggleFavoriteHandler = () => {
    setLoading(true)
    favoriteStreetArt({
      variables: {
        streetArtId: +id,
        favorite: !favorite,
      },
    })
  }

  const toggleVisitedHandler = () => {
    setLoading(true)
    visitStreetArt({
      variables: {
        streetArtId: +id,
        visited: !visited,
      },
    })
  }

  return (
    <section className='art-details-container'>
      <section className='art-icons-wrapper'>
        {favorite ? (
          <FaHeart className='art-icon' onClick={toggleFavoriteHandler} />
        ) : (
          <FaRegHeart className='art-icon' onClick={toggleFavoriteHandler} />
        )}
        {visited ? (
          <RiCheckboxCircleLine
            className='art-icon'
            onClick={toggleVisitedHandler}
          />
        ) : (
          <RiCheckboxBlankCircleLine
            className='art-icon'
            onClick={toggleVisitedHandler}
          />
        )}
      </section>
      {artName && <p className='artist-name'>{artName}</p>}
      {artistName && <p className='artist-name'>{artistName}</p>}
      {instagramHandle && (
        <a
          href={`https://www.instagram.com/${instagramHandle}`}
          className='instagram-wrapper'
        >
          <AiFillInstagram className='art-icon' />
          {instagramHandle}
        </a>
      )}
      {address && (
        <p className='address'>{`${address} ${city} ${state} ${zipcode}`}</p>
      )}
      {description && <p className='description'>{description}</p>}
    </section>
  )
}

export default ArtDetails

ArtDetails.propTypes = {
  art: PropTypes.shape({
    id: PropTypes.number,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.number,
    artName: PropTypes.string,
    artistName: PropTypes.string,
    instagramHandle: PropTypes.string,
    description: PropTypes.string,
    visited: PropTypes.bool,
    favorite: PropTypes.bool,
  }),
  setLoading: PropTypes.func,
  setError: PropTypes.func
}
