import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import {
  selectArt,
  toggleFavorite,
  toggleVisited,
} from '../../actions/userAction'
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
  setLoading,
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
  const [favoriteStreetArt, { dataF, loading, error }] = useMutation(
    FAVORITE_ART
  )

  const VISITED_ART = gql`
    mutation visitStreetArt($streetArtId: Int!, $visited: Boolean!) {
      visitStreetArt(input: { streetArtId: $streetArtId, visited: $visited }) {
        id
        visited
      }
    }
  `
  const [visitStreetArt, { data }] = useMutation(VISITED_ART)

  useEffect(() => {
    if (data && data.favoriteStreetArt) {
      dispatch(toggleFavorite(data.favoriteStreetArt.id))
    }
    //eslint-disable-next-line
  }, [data])

  useEffect(() => {
    if (data && data.visitStreetArt) {
      console.log(data.visitStreetArt)
      dispatch(toggleVisited(data.visitStreetArt.id))
    }
    //eslint-disable-next-line
  }, [data])

  const toggleFavoriteHandler = (e) => {
    e.preventDefault()
    // setLoading(true)
    favoriteStreetArt({
      variables: {
        streetArtId: +id,
        favorite: !favorite,
      },
    })
  }

  const toggleVisitedHandler = (e) => {
    e.preventDefault()
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
