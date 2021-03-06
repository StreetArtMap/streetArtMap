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
  setError,
  mapArtDetails,
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
    onError(error) {
      console.log(error.message)
      setError('Something went wrong... ')
    },
  })

  const [visitStreetArt] = useMutation(VISITED_ART, {
    onError(error) {
      console.log(error)
      setError('Something went wrong... ')
    },
  })

  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(id))
    favoriteStreetArt({
      variables: {
        streetArtId: +id,
        favorite: !favorite,
      },
    })
  }

  const toggleVisitedHandler = () => {
    dispatch(toggleVisited(id))
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
          <FaHeart className='art-icon' data-testid="favorite-icon"  onClick={toggleFavoriteHandler} />
        ) : (
          <FaRegHeart className='art-icon' data-testid="unfavorite-icon" onClick={toggleFavoriteHandler} />
        )}
        {visited ? (
          <RiCheckboxCircleLine
            className='art-icon'
            data-testid="unvisited-icon"
            onClick={toggleVisitedHandler}
          />
        ) : (
          <RiCheckboxBlankCircleLine
            className='art-icon'
            data-testid="visited-icon"
            onClick={toggleVisitedHandler}
          />
        )}
      </section>
      {artName && !mapArtDetails && <p className='artist-name'>{artName}</p>}
      {artistName && !mapArtDetails && (
        <p className='artist-name'>{artistName}</p>
      )}
      {instagramHandle && !mapArtDetails && (
        <a
          href={`https://www.instagram.com/${instagramHandle}`}
          className='instagram-wrapper'
          target='_blank'
          rel='noopener noreferrer'
        >
          <AiFillInstagram className='art-icon' data-testid="instagram-icon" />
          {instagramHandle}
        </a>
      )}
      {address && !mapArtDetails && (
        <p className='address'>{`${address} ${city} ${state} ${zipcode}`}</p>
      )}
      {description && !mapArtDetails && (
        <p className='description'>{description}</p>
      )}
    </section>
  )
}

export default ArtDetails

ArtDetails.propTypes = {
  art: PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
    artName: PropTypes.string,
    artistName: PropTypes.string,
    instagramHandle: PropTypes.string,
    description: PropTypes.string,
    visited: PropTypes.bool,
    favorite: PropTypes.bool,
  }),
  setLoading: PropTypes.func,
  setError: PropTypes.func,
}
