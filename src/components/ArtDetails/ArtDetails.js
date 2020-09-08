import React from 'react'
import './ArtDetails.css'
import { FaHeart, FaRegHeart, FaMapMarked, FaCheck } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'

const ArtDetails = ({
  art: {
    visited,
    favorite,
    address,
    city,
    state,
    zipcode,
    artist_name,
    instagram_handle,
    description,
    imageUrls,
  },
}) => {

  return (
    <section className='art-details-container'>
      <section className='art-icons-wrapper'>
        {favorite ? (
          <FaHeart className='art-icon' />
        ) : (
          <FaRegHeart className='art-icon' />
        )}
        {visited && <FaCheck className='art-icon' />}
        <FaMapMarked className='art-icon' />
      </section>

      {artist_name && <p className='artist-name'>{artist_name}</p>}

      {instagram_handle && (
        <a
          href={`https://www.instagram.com/${instagram_handle}`}
          className='instagram-wrapper'
        >
          <AiFillInstagram className='art-icon' />

          {instagram_handle}
        </a>
      )}

      {address && (
        <p className='address'>{`${address} ${city} ${state} ${zipcode}`}</p>
      )}

      {description && <p className='description'>{description}</p>}
      <p></p>
    </section>
  )
}

export default ArtDetails
