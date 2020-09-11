import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { selectArt } from '../../actions/userAction'
import { FaHeart, FaRegHeart, FaMapMarked } from 'react-icons/fa'
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
}) => {
  const FAVORITE_ART = gql`
    mutation favoriteStreetAr($streetArtId: String!, $favorite: Bool!) {
      favoriteStreetAr(
        input: { streetArtId: $streetArtId, favorite: $favorite }
      ) {
        id
        favorite
      }
    }
  `
  const [favoriteStreetAr, { data, loading, error }] = useMutation(FAVORITE_ART)

  const dispatch = useDispatch()

  const toggleFavorite = (e) => {
    e.preventDefault()
    favoriteStreetAr({
      variables: {
        userId: 1,
        favorite: true,
      },
    })
  }

  return (
    <section className='art-details-container'>
      <section className='art-icons-wrapper'>
        {favorite ? (
          <FaHeart className='art-icon' onClick={toggleFavorite} />
        ) : (
          <FaRegHeart className='art-icon' onClick={toggleFavorite} />
        )}
        {visited ? (
          <RiCheckboxCircleLine className='art-icon' />
        ) : (
          <RiCheckboxBlankCircleLine className='art-icon' />
        )}
        <FaMapMarked
          className='art-icon'
          onClick={() => dispatch(selectArt(id))}
        />
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
