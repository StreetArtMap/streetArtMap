import React from 'react'
import './ArtDetails.css'
//eslint-disable-next-line
import { FaHeart, FaRegHeart, FaMapMarked, FaCheck } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri'

const ArtDetails = ({
  art: {
    id,
    latitude,
    longitude,
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
  return (
    <section className='art-details-container'>
      <section className='art-icons-wrapper'>
        {favorite ? (
          <FaHeart className='art-icon' />
        ) : (
          <FaRegHeart className='art-icon' />
        )}
        {visited ? (
          <RiCheckboxCircleLine className='art-icon' />
        ) : (
          <RiCheckboxBlankCircleLine className='art-icon' />
        )}
        <FaMapMarked className='art-icon' />
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
      <p></p>
    </section>
  )
}

export default ArtDetails
